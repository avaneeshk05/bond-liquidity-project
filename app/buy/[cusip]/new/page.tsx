// app/buy/[cusip]/new/page.tsx
"use client";

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getBondByCusip } from '@/src/lib/data';
import { Bond } from '@/src/lib/types';
import Link from 'next/link';
import { calculateAccruedInterest } from '@/src/lib/finance';

export default function NewBidPage() {
  const params = useParams();
  const router = useRouter();
  const cusip = params.cusip as string;

  const [bond, setBond] = useState<Bond | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bidPrice, setBidPrice] = useState('');
  const [bidQuantity, setBidQuantity] = useState('');

  useEffect(() => {
    if (cusip) {
      const fetchBond = async () => {
        setIsLoading(true);
        const bondData = await getBondByCusip(cusip);
        if (bondData) {
          setBond(bondData);
          setBidPrice(bondData.price.toFixed(4)); // Default to last price
        }
        setIsLoading(false);
      };
      fetchBond();
    }
  }, [cusip]);

  const { accruedInterest } = useMemo(() => {
    if (!bond) return { accruedInterest: 0 };
    // For simplicity, using today as settlement date
    return calculateAccruedInterest(new Date(), bond);
  }, [bond]);

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement bid submission logic
    console.log({
      cusip,
      bidPrice: parseFloat(bidPrice), // Clean price
      bidQuantity: parseFloat(bidQuantity),
      accruedInterest,
      totalCost: (parseFloat(bidPrice) + accruedInterest) * parseFloat(bidQuantity)
    });
    alert('Bid submitted successfully!');
    router.push(`/buy/${cusip}`);
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center dark:text-white">Loading...</div>;
  }

  if (!bond) {
    return <div className="flex h-screen items-center justify-center dark:text-white">Bond not found.</div>;
  }

  const quantityStep = bond.fractional ? "0.01" : "1";
  const cleanPriceNum = parseFloat(bidPrice) || 0;
  const quantityNum = parseFloat(bidQuantity) || 0;
  const dirtyPrice = cleanPriceNum + accruedInterest;
  const totalCost = dirtyPrice * quantityNum;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <Link href={`/buy/${cusip}`} className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Offers</Link>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Bid for {bond.issuer}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{bond.cusip}</p>
          </div>
          <div className="p-6">
            <form onSubmit={handleBidSubmit} className="space-y-6">
              <div>
                <label htmlFor="bidPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bid Price (Clean)</label>
                <input
                  type="number"
                  id="bidPrice"
                  value={bidPrice}
                  onChange={(e) => setBidPrice(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  step="0.0001"
                  required
                />
              </div>
              <div>
                <label htmlFor="bidQuantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bid Quantity</label>
                <input
                  type="number"
                  id="bidQuantity"
                  value={bidQuantity}
                  onChange={(e) => setBidQuantity(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  step={quantityStep}
                  min={quantityStep}
                  placeholder={`Enter quantity (step: ${quantityStep})`}
                  required
                />
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-2 text-sm">
                <h3 className="font-semibold text-md text-gray-900 dark:text-white mb-2">Order Summary</h3>
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Accrued Interest / unit</span> <span className="font-mono font-medium text-gray-900 dark:text-white">₹{accruedInterest.toFixed(4)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Total Price / unit (Dirty)</span> <span className="font-mono font-medium text-gray-900 dark:text-white">₹{dirtyPrice.toFixed(4)}</span></div>
                <hr className="border-gray-300 dark:border-gray-600 my-2"/>
                <div className="flex justify-between text-base"><span className="font-bold text-gray-800 dark:text-gray-200">Total Cost</span> <span className="font-mono font-bold text-green-600 dark:text-green-400">₹{totalCost.toFixed(2)}</span></div>
              </div>

              <button
                type="submit"
                disabled={!bidPrice || !bidQuantity}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Submit Bid
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}