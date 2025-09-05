// "use client";

// import { useState, useEffect } from "react";
// import { getBonds } from "@/src/lib/data";
// import type { Bond } from "@/src/lib/types";


// export default function BuyBondPage() {
//   const [bonds, setBonds] = useState<Bond[]>([]);
//   const [selectedBond, setSelectedBond] = useState<Bond | null>(null);
//   const [buyType, setBuyType] = useState("full");
//   const [lots, setLots] = useState(1);
//   const [partialAmount, setPartialAmount] = useState(0);
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     getBonds().then((data) => setBonds(data));
//   }, []);

//   const handleBuy = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!selectedBond) return;
//     let message = "";
//     if (buyType === "full") {
//       message = `You have bought ${lots} lot(s) of ${selectedBond.issuer} bond.`;
//     } else {
//       message = `You have bought a partial amount (₹${partialAmount}) of ${selectedBond.issuer} bond.`;
//     }
//     setSuccess(message);
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
//       <h1 className="text-2xl font-bold mb-4">Buy Bonds</h1>
//       <form onSubmit={handleBuy}>
//         <label className="block mb-2 font-medium">Select Bond:</label>
//         <select
//           className="w-full p-2 border rounded mb-4"
//           value={selectedBond?.cusip || ""}
//           onChange={e => {
//             const bond = bonds.find(b => b.cusip === e.target.value) || null;
//             setSelectedBond(bond);
//             setSuccess("");
//           }}
//           required
//         >
//           <option value="" disabled>Select a bond</option>
//           {bonds.map(bond => (
//             <option key={bond.cusip} value={bond.cusip}>
//               {bond.issuer} ({bond.cusip})
//             </option>
//           ))}
//         </select>

//         <div className="mb-4">
//           <label className="mr-4">
//             <input
//               type="radio"
//               name="buyType"
//               value="full"
//               checked={buyType === "full"}
//               onChange={() => setBuyType("full")}
//             />
//             <span className="ml-2">Buy Full Bond (by lots)</span>
//           </label>
//           <label className="ml-8">
//             <input
//               type="radio"
//               name="buyType"
//               value="partial"
//               checked={buyType === "partial"}
//               onChange={() => setBuyType("partial")}
//             />
//             <span className="ml-2">Buy Partial Bond (₹ amount)</span>
//           </label>
//         </div>

//         {buyType === "full" ? (
//           <div className="mb-4">
//             <label className="block mb-2">Number of Lots:</label>
//             <input
//               type="number"
//               min={1}
//               value={lots}
//               onChange={e => setLots(Number(e.target.value))}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//         ) : (
//           <div className="mb-4">
//             <label className="block mb-2">Partial Amount (₹):</label>
//             <input
//               type="number"
//               min={1}
//               value={partialAmount}
//               onChange={e => setPartialAmount(Number(e.target.value))}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//         )}

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//           disabled={!selectedBond}
//         >
//           Buy
//         </button>
//       </form>
//       {success && (
//         <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
//           {success}
//         </div>
//       )}
//     </div>
//   );
// }

// app/buy/[cusip]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getBondByCusip, getOffersByCusip } from '@/src/lib/data';
import { Bond, Offer } from '@/src/lib/types';
import Link from 'next/link';

export default function BondOffersPage() {
  const params = useParams();
  const cusip = params.cusip as string;

  const [bond, setBond] = useState<Bond | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [bidPrice, setBidPrice] = useState('');
  // const [bidQuantity, setBidQuantity] = useState('');

  useEffect(() => {
    if (cusip) {
      const fetchData = async () => {
        setIsLoading(true);
        const [bondData, offersData] = await Promise.all([
          getBondByCusip(cusip),
          getOffersByCusip(cusip)
        ]);
        if (bondData) {
          setBond(bondData);
          setOffers(offersData);
        }
        setIsLoading(false);
      };
      fetchData();
    }
  }, [cusip]);

  // const handleBidSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // TODO: Implement bid submission logic
  //   console.log({
  //     cusip,
  //     bidPrice: parseFloat(bidPrice),
  //     bidQuantity: parseFloat(bidQuantity),
  //   });
  //   alert('Bid submitted!');
  // };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center dark:text-white">Loading bond offers...</div>;
  }

  if (!bond) {
    return <div className="flex h-screen items-center justify-center dark:text-white">Bond not found.</div>;
  }

  // const quantityStep = bond.fractional ? "0.01" : "1";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Buy Bond: {bond.issuer}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{bond.cusip}</p>
          </div>
          {/* <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Bond Details</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Issuer</span> <span className="font-medium text-gray-900 dark:text-white">{bond.issuer}</span></div>
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Coupon</span> <span className="font-medium text-gray-900 dark:text-white">{bond.coupon.toFixed(3)}%</span></div>
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Maturity</span> <span className="font-medium text-gray-900 dark:text-white">{bond.maturityDate}</span></div>
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Rating</span> <span className="font-medium text-gray-900 dark:text-white">{bond.rating}</span></div>
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Type</span> <span className="font-medium text-gray-900 dark:text-white">{bond.type}</span></div>
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Fractionally Tradable</span> <span className={`font-medium ${bond.fractional ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{bond.fractional ? 'Yes' : 'No'}</span></div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Place Bid</h2>
              <form onSubmit={handleBidSubmit} className="space-y-4">
                <div>
                  <label htmlFor="bidPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bid Price ($)</label>
                  <input
                    type="number"
                    id="bidPrice"
                    value={bidPrice}
                    onChange={(e) => setBidPrice(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    step="0.01"
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
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Submit Bid
                </button>
              </form>
            </div> */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Coupon</span> <span className="font-medium text-gray-900 dark:text-white">{bond.coupon.toFixed(3)}%</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Maturity</span> <span className="font-medium text-gray-900 dark:text-white">{bond.maturityDate}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Rating</span> <span className="font-medium text-gray-900 dark:text-white">{bond.rating}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Payment Frequency</span> <span className="font-medium text-gray-900 dark:text-white">{bond.paymentFrequency}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Fractionally Tradable</span> <span className={`font-medium ${bond.fractional ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{bond.fractional ? 'Yes' : 'No'}</span></div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Existing Sell Offers</h2>
          </div>
          <div className="overflow-x-auto">
            {offers.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price (₹)</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Quantity</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Buy</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {offers.map(offer => (
                    <tr key={offer.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">₹{offer.price.toFixed(4)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{offer.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200">Buy</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="p-6 text-center text-gray-500 dark:text-gray-400">No active sell offers for this bond.</p>
            )}
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-800/50 text-center">
            <Link href={`/buy/${cusip}/new`} passHref>
              <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md">
                Create New Bid
              </button>
            </Link>  
          </div>
        </div>
      </div>
    </div>
  );
}
