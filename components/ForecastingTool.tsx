'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TwitterAccount, GrowthForecast } from '@/lib/x-algorithm';
import { ApiClient } from '@/lib/api-client';

interface ForecastingToolProps {
  account: TwitterAccount;
}

export default function ForecastingTool({ account }: ForecastingToolProps) {
  const [forecastMonths, setForecastMonths] = useState(6);
  const [forecasts, setForecasts] = useState<GrowthForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await ApiClient.generateForecast(account, forecastMonths);
        setForecasts(result.forecasts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate forecast');
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [account, forecastMonths]);

  const chartData = [
    {
      month: 'Current',
      followers: account.followers,
      engagement: account.avgLikes,
    },
    ...forecasts.map(f => ({
      month: f.timeframe,
      followers: f.projectedFollowers,
      engagement: f.projectedEngagement,
    }))
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📈 Growth Forecast</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Forecast Period: {forecastMonths} months
        </label>
        <input
          type="range"
          min="3"
          max="12"
          value={forecastMonths}
          onChange={(e) => setForecastMonths(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Generating forecast...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>
      ) : (
        <>
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="followers" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Projected Followers"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Projected Engagement"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {forecasts.slice(-3).map((forecast, idx) => (
              <div key={idx} className="bg-blue-50 dark:bg-slate-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {forecast.timeframe}
                </h3>
                <div className="text-2xl font-bold mb-1">
                  {forecast.projectedFollowers.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500">
                  Confidence: {forecast.confidenceLevel}%
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Note:</strong> These projections are based on your current performance and assume consistent content quality. 
          Actual results may vary based on content strategy, posting frequency, and algorithm changes.
        </p>
      </div>
    </div>
  );
}
