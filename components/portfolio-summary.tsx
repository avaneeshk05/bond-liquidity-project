"use client";

import { Bond } from '@/src/lib/types';

interface PortfolioSummaryProps {
  portfolio: Bond[];
}

export default function PortfolioSummary({ portfolio }: PortfolioSummaryProps) {
  const totalValue = portfolio.reduce((acc, bond) => acc + (bond.price * (bond.quantity || 0)), 0);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl transition-shadow duration-300 hover:shadow-2xl">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Portfolio Summary</h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-gray-500 dark:text-gray-400">Total Value</span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹{totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-gray-500 dark:text-gray-400">Number of Holdings</span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{portfolio.length}</span>
        </div>
      </div>
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3">Your Holdings</h4>
        <ul className="space-y-3">
          {portfolio.map(bond => (
            <li key={bond.cusip} className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{bond.issuer}</div>
                <div className="text-xs text-gray-400 dark:text-gray-500">{bond.cusip}</div>
              </div>
              <div className="text-sm text-right">
                <div className="font-mono text-gray-700 dark:text-gray-200">{bond.quantity} units</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">@ ₹{bond.price.toFixed(2)}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}