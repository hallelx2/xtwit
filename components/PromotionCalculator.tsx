'use client';

import { useState, useEffect } from 'react';
import { TwitterAccount, PromotionSimulation } from '@/lib/x-algorithm';
import { ApiClient } from '@/lib/api-client';

interface PromotionCalculatorProps {
  account: TwitterAccount;
}

export default function PromotionCalculator({ account }: PromotionCalculatorProps) {
  const [budget, setBudget] = useState(100);
  const [simulation, setSimulation] = useState<PromotionSimulation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSimulation = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await ApiClient.simulatePromotion(account, budget);
        setSimulation(result.simulation);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to simulate promotion');
      } finally {
        setLoading(false);
      }
    };

    fetchSimulation();
  }, [account, budget]);

  // Determine background gradient based on ROI
  const roiBgGradient = simulation && simulation.roi >= 50 
    ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
    : simulation && simulation.roi >= 0 
    ? 'bg-gradient-to-br from-yellow-500 to-orange-500' 
    : 'bg-gradient-to-br from-red-500 to-rose-600';

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💰 Promotion ROI Calculator</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Calculate the return on investment for paid promotion
      </p>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Promotion Budget: ${budget}
        </label>
        <input
          type="range"
          min="10"
          max="1000"
          step="10"
          value={budget}
          onChange={(e) => setBudget(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>$10</span>
          <span>$1,000</span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Calculating ROI...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>
      ) : simulation ? (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-slate-700 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Estimated Impressions
              </h3>
              <div className="text-2xl font-bold">
                {simulation.estimatedImpressions.toLocaleString()}
              </div>
            </div>

            <div className="bg-green-50 dark:bg-slate-700 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Estimated New Followers
              </h3>
              <div className="text-2xl font-bold">
                {simulation.estimatedFollowers.toLocaleString()}
              </div>
            </div>
          </div>

          <div className={`${roiBgGradient} rounded-lg p-6 text-white`}>
            <h3 className="text-lg font-semibold mb-2">Return on Investment (ROI)</h3>
            <div className="text-4xl font-bold">
              {simulation.roi > 0 ? '+' : ''}{simulation.roi.toFixed(1)}%
            </div>
            <p className="text-sm mt-2 opacity-90">
              {simulation.roi > 0 
                ? 'Positive ROI - Your promotion is projected to be profitable' 
                : 'Negative ROI - Consider improving content quality before promoting'}
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="font-semibold mb-3">Investment Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Investment Amount:</span>
                <span className="font-semibold">${simulation.investmentAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Cost per Impression:</span>
                <span className="font-semibold">$0.01</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Cost per Follower:</span>
                <span className="font-semibold">$2.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Break-even Followers:</span>
                <span className="font-semibold">{simulation.breakEvenPoint}</span>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
            <h4 className="font-semibold text-orange-900 dark:text-orange-200 mb-2">
              📊 Recommendation
            </h4>
            <p className="text-sm text-orange-800 dark:text-orange-300">
              {simulation.roi > 50 
                ? 'Great ROI potential! Your account is well-positioned for paid promotion.'
                : simulation.roi > 0
                ? 'Moderate ROI. Focus on organic growth strategies alongside promotion.'
                : 'Consider improving your engagement metrics before investing in promotion. Focus on organic growth strategies first.'}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
