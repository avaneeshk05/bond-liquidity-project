// app/sell/[cusip]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getPortfolioBondByCusip, getBuyOffersByCusip } from '@/src/lib/data';
import { PortfolioBond, Offer } from '@/src/lib/types';
import Link from 'next/link';

export default function SellBondPage() {
  const params = useParams();
  const cusip = params.cusip as string;

  const [holding, setHolding] = useState<PortfolioBond | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (cusip) {
      const fetchData = async () => {
        setIsLoading(true);
        const [holdingData, offersData] = await Promise.all([
          getPortfolioBondByCusip(cusip),
          getBuyOffersByCusip(cusip)
        ]);
        setHolding(holdingData || null);
        setOffers(offersData);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [cusip]);

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center dark:text-white">Loading...</div>;
  }

  if (!holding) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">You do not own this bond.</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">You can only sell bonds that are in your portfolio.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
        
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sell Bond: {holding.issuer}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">You currently own: <span className="font-semibold text-blue-600 dark:text-blue-400">{holding.quantity} units</span></p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Existing Buy Offers (Bids)</h2>
          </div>
          <div className="overflow-x-auto">
            {offers.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price (₹)</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Quantity</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Sell</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {offers.map(offer => (
                    <tr key={offer.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">₹{offer.price.toFixed(4)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{offer.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200">Sell</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="p-6 text-center text-gray-500 dark:text-gray-400">No active buy offers for this bond.</p>
            )}
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-800/50 text-center">
            <Link href={`/sell/${cusip}/new`} passHref>
              <button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-md">
                Create New Sell Offer
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}