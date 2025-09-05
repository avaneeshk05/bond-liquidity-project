"use client";

import { Bond } from '@/src/lib/types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
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
// A custom component for the tooltip to match the app's style
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-gray-700 text-white rounded-md border border-gray-600 shadow-lg">
        <p className="label">{`Date : ${label}`}</p>
        <p className="intro">{`Price : ₹${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

export default function BondChart({ bond }: BondChartProps) {
    // Format date for better readability on the X-axis
  const formattedData = bond.priceHistory.map(item => ({
    ...item,
    // Displaying month and year is cleaner for this data
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
  }));

  // Determine Y-axis domain to give the chart some vertical padding
  const prices = bond.priceHistory.map(p => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const domainPadding = (maxPrice - minPrice) * 0.2; // 20% padding
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl transition-shadow duration-300 hover:shadow-2xl">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Price History: {bond.issuer}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{bond.cusip}</p>
      </div>
      {/* <div className="p-6">
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
        </div> */}
        <div className="p-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="date" tick={{ fill: '#9ca3af' }} tickLine={{ stroke: '#9ca3af' }} />
            <YAxis
              domain={[minPrice - domainPadding, maxPrice + domainPadding]}
              tickFormatter={(value) => `₹${value.toFixed(2)}`}
              tick={{ fill: '#9ca3af' }} tickLine={{ stroke: '#9ca3af' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(156, 163, 175, 0.5)', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Legend />
            <Line type="monotone" dataKey="price" name="Price" stroke="#34d399" strokeWidth={2} dot={{ r: 4, fill: '#34d399' }} activeDot={{ r: 8, stroke: '#10b981' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}