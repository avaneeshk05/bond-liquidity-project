// app/sell/[cusip]/new/page.tsx
"use client";

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPortfolioBondByCusip } from '@/src/lib/data';
import { PortfolioBond } from '@/src/lib/types';
import Link from 'next/link';
import { calculateAccruedInterest } from '@/src/lib/finance';

export default function NewAskPage() {
  const params = useParams();
  const router = useRouter();
  const cusip = params.cusip as string;

  const [holding, setHolding] = useState<PortfolioBond | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [askPrice, setAskPrice] = useState('');
  const [askQuantity, setAskQuantity] = useState('');

  useEffect(() => {
    if (cusip) {
      const fetchHolding = async () => {
        setIsLoading(true);
        const holdingData = await getPortfolioBondByCusip(cusip);
        if (holdingData) {
          setHolding(holdingData);
          setAskPrice(holdingData.price.toFixed(4)); // Default to last price
        }
        setIsLoading(false);
      };
      fetchHolding();
    }
  }, [cusip]);

  const { accruedInterest } = useMemo(() => {
    if (!holding) return { accruedInterest: 0 };
    return calculateAccruedInterest(new Date(), holding);
  }, [holding]);

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement ask submission logic
    console.log({
      cusip,
      askPrice: parseFloat(askPrice), // Clean price
      askQuantity: parseFloat(askQuantity),
      accruedInterest,
      totalProceeds: (parseFloat(askPrice) + accruedInterest) * parseFloat(askQuantity)
    });
    alert('Sell offer submitted successfully!');
    router.push(`/sell/${cusip}`);
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center dark:text-white">Loading...</div>;
  }

  if (!holding) {
    return <div className="flex h-screen items-center justify-center dark:text-white">Holding not found. Cannot create sell offer.</div>;
  }

  const quantityStep = holding.fractional ? "0.01" : "1";
  const maxQuantity = holding.quantity;
  const isQuantityInvalid = parseFloat(askQuantity) > maxQuantity || parseFloat(askQuantity) <= 0;

  const cleanPriceNum = parseFloat(askPrice) || 0;
  const quantityNum = parseFloat(askQuantity) || 0;
  const dirtyPrice = cleanPriceNum + accruedInterest;
  const totalProceeds = dirtyPrice * quantityNum;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <Link href={`/sell/${cusip}`} className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Buy Offers</Link>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Sell Offer for {holding.issuer}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{holding.cusip}</p>
          </div>
          <div className="p-6">
            <form onSubmit={handleAskSubmit} className="space-y-6">
              <div>
                <label htmlFor="askPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ask Price (Clean)</label>
                <input
                  type="number" id="askPrice" value={askPrice} onChange={(e) => setAskPrice(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  step="0.0001" required
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label htmlFor="askQuantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sell Quantity</label>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Max: {maxQuantity}</span>
                </div>
                <input
                  type="number" id="askQuantity" value={askQuantity} onChange={(e) => setAskQuantity(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border rounded-md shadow-sm focus:outline-none sm:text-sm ${isQuantityInvalid ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500'}`}
                  step={quantityStep} min={quantityStep} max={maxQuantity} placeholder={`Enter quantity (step: ${quantityStep})`} required
                />
                {isQuantityInvalid && <p className="mt-2 text-sm text-red-600 dark:text-red-400">Quantity cannot exceed your holdings.</p>}
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-2 text-sm">
                <h3 className="font-semibold text-md text-gray-900 dark:text-white mb-2">Transaction Summary</h3>
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Accrued Interest / unit</span> <span className="font-mono font-medium text-gray-900 dark:text-white">₹{accruedInterest.toFixed(4)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Total Price / unit (Dirty)</span> <span className="font-mono font-medium text-gray-900 dark:text-white">₹{dirtyPrice.toFixed(4)}</span></div>
                <hr className="border-gray-300 dark:border-gray-600 my-2"/>
                <div className="flex justify-between text-base"><span className="font-bold text-gray-800 dark:text-gray-200">Total Proceeds</span> <span className="font-mono font-bold text-green-600 dark:text-green-400">₹{totalProceeds.toFixed(2)}</span></div>
              </div>

              <button
                type="submit"
                disabled={!askPrice || !askQuantity || isQuantityInvalid}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Submit Sell Offer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}