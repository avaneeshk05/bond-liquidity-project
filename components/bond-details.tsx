"use client";

import { Bond } from '@/lib/types';

interface BondDetailsProps {
  bond: Bond;
}

export default function BondDetails({ bond }: BondDetailsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl transition-shadow duration-300 hover:shadow-2xl">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{bond.issuer}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{bond.cusip}</p>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="text-gray-500 dark:text-gray-400">Coupon</div>
          <div className="text-right font-medium text-gray-900 dark:text-white">{bond.coupon.toFixed(3)}%</div>
          
          <div className="text-gray-500 dark:text-gray-400">Maturity</div>
          <div className="text-right font-medium text-gray-900 dark:text-white">{bond.maturityDate}</div>
          
          <div className="text-gray-500 dark:text-gray-400">Price</div>
          <div className="text-right font-medium text-gray-900 dark:text-white">${bond.price.toFixed(2)}</div>
          
          <div className="text-gray-500 dark:text-gray-400">Yield</div>
          <div className="text-right font-medium text-green-600 dark:text-green-400">{bond.yield.toFixed(2)}%</div>
          
          <div className="text-gray-500 dark:text-gray-400">Rating</div>
          <div className="text-right font-medium text-gray-900 dark:text-white">{bond.rating}</div>
          
          <div className="text-gray-500 dark:text-gray-400">Type</div>
          <div className="text-right font-medium text-gray-900 dark:text-white">{bond.type}</div>
        </div>
      </div>
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl mt-auto">
        <div className="flex space-x-4">
          <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-md">
            Buy
          </button>
          <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-md">
            Sell
          </button>
        </div>
      </div>
    </div>
  );
}