// import Image from "next/image";

// export default function Home() {
//   return (
//     <body><h1>Hello World</h1></body>
//   );
// }
"use client";

import { useState, useEffect } from 'react';
import { Bond, PortfolioBond } from '@/src/lib/types';
import { getBonds, getPortfolio } from '@/src/lib/data';
import BondTable from '@/components/bond-table';
import BondDetails from '@/components/bond-details';
import PortfolioSummary from '@/components/portfolio-summary';
import BondChart from '@/components/bond-chart';

export default function DashboardPage() {
  const [bonds, setBonds] = useState<Bond[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioBond[]>([]);
  const [selectedBond, setSelectedBond] = useState<Bond | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
     const bondsData = await getBonds();
      const portfolioData = await getPortfolio();
      setBonds(bondsData);
      setPortfolio(portfolioData);
      if (bondsData.length > 0) {
        setSelectedBond(bondsData[0]);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleSelectBond = (bond: Bond) => {
    setSelectedBond(bond);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white">
            Bond Trading Dashboard
          </h1>
        </div>
      </header>
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
          <BondTable bonds={bonds} onSelectBond={handleSelectBond} selectedBondCusip={selectedBond?.cusip} />
          {selectedBond && <BondChart bond={selectedBond} />}
        </div>
        <div className="space-y-6">
          {selectedBond && <BondDetails bond={selectedBond} />}
          <PortfolioSummary portfolio={portfolio} />
        </div>
      </div>
      </main>
    </div>
  );
}
