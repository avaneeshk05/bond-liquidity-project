"use client";

import { useState, useEffect } from "react";
import { getBonds } from "@/src/lib/data";
import type { Bond } from "@/src/lib/types";


export default function BuyBondPage() {
  const [bonds, setBonds] = useState<Bond[]>([]);
  const [selectedBond, setSelectedBond] = useState<Bond | null>(null);
  const [buyType, setBuyType] = useState("full");
  const [lots, setLots] = useState(1);
  const [partialAmount, setPartialAmount] = useState(0);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getBonds().then((data) => setBonds(data));
  }, []);

  const handleBuy = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedBond) return;
    let message = "";
    if (buyType === "full") {
      message = `You have bought ${lots} lot(s) of ${selectedBond.issuer} bond.`;
    } else {
      message = `You have bought a partial amount (₹${partialAmount}) of ${selectedBond.issuer} bond.`;
    }
    setSuccess(message);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Buy Bonds</h1>
      <form onSubmit={handleBuy}>
        <label className="block mb-2 font-medium">Select Bond:</label>
        <select
          className="w-full p-2 border rounded mb-4"
          value={selectedBond?.cusip || ""}
          onChange={e => {
            const bond = bonds.find(b => b.cusip === e.target.value) || null;
            setSelectedBond(bond);
            setSuccess("");
          }}
          required
        >
          <option value="" disabled>Select a bond</option>
          {bonds.map(bond => (
            <option key={bond.cusip} value={bond.cusip}>
              {bond.issuer} ({bond.cusip})
            </option>
          ))}
        </select>

        <div className="mb-4">
          <label className="mr-4">
            <input
              type="radio"
              name="buyType"
              value="full"
              checked={buyType === "full"}
              onChange={() => setBuyType("full")}
            />
            <span className="ml-2">Buy Full Bond (by lots)</span>
          </label>
          <label className="ml-8">
            <input
              type="radio"
              name="buyType"
              value="partial"
              checked={buyType === "partial"}
              onChange={() => setBuyType("partial")}
            />
            <span className="ml-2">Buy Partial Bond (₹ amount)</span>
          </label>
        </div>

        {buyType === "full" ? (
          <div className="mb-4">
            <label className="block mb-2">Number of Lots:</label>
            <input
              type="number"
              min={1}
              value={lots}
              onChange={e => setLots(Number(e.target.value))}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ) : (
          <div className="mb-4">
            <label className="block mb-2">Partial Amount (₹):</label>
            <input
              type="number"
              min={1}
              value={partialAmount}
              onChange={e => setPartialAmount(Number(e.target.value))}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={!selectedBond}
        >
          Buy
        </button>
      </form>
      {success && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
          {success}
        </div>
      )}
    </div>
  );
}
