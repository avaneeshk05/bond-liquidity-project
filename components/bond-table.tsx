"use client";

import { Bond } from '@/src/lib/types';

interface BondTableProps {
  bonds: Bond[];
  onSelectBond: (bond: Bond) => void;
  selectedBondCusip?: string | null;
}

export default function BondTable({ bonds, onSelectBond, selectedBondCusip }: BondTableProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Market Bonds</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Select a bond to see more details</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Issuer
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Coupon
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Maturity
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Yield
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Rating
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {bonds.map((bond) => (
              <tr
                key={bond.cusip}
                onClick={() => onSelectBond(bond)}
                className={`cursor-pointer transition-colors duration-200 ${
                  selectedBondCusip === bond.cusip
                    ? 'bg-blue-100 dark:bg-blue-900/50'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{bond.issuer}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{bond.cusip}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{bond.coupon.toFixed(2)}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{bond.maturityDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-mono text-gray-700 dark:text-gray-200">₹{bond.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-mono text-green-600 dark:text-green-400">{bond.yield.toFixed(2)}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    {bond.rating}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}