"use client";

import { Bond } from '@/lib/types';

interface BondChartProps {
  bond: Bond;
}

// This is a placeholder for a chart.
// You can use a library like Recharts, Chart.js, or D3 to create an interactive chart.
// Example using Recharts:
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
//
// <ResponsiveContainer width="100%" height={300}>
//   <LineChart data={bond.priceHistory}>
//     <CartesianGrid strokeDasharray="3 3" />
//     <XAxis dataKey="date" />
//     <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
//     <Tooltip />
//     <Legend />
//     <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
//   </LineChart>
// </ResponsiveContainer>

export default function BondChart({ bond }: BondChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl transition-shadow duration-300 hover:shadow-2xl">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Price History: {bond.issuer}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{bond.cusip}</p>
      </div>
      <div className="p-6">
        <div className="h-64 bg-gray-100 dark:bg-gray-700/50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No chart data</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Integrate a charting library to see price history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}