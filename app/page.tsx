'use client';

import { useState } from 'react';
import { TwitterAccount } from '@/lib/x-algorithm';
import AccountInputForm from '@/components/AccountInputForm';
import AnalysisDashboard from '@/components/AnalysisDashboard';
import ForecastingTool from '@/components/ForecastingTool';
import PostSimulator from '@/components/PostSimulator';
import PromotionCalculator from '@/components/PromotionCalculator';

export default function Home() {
  const [account, setAccount] = useState<TwitterAccount | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  const handleAccountSubmit = (accountData: TwitterAccount) => {
    setAccount(accountData);
  };

  const loadDemoAccount = () => {
    const demoAccount: TwitterAccount = {
      username: 'demo_account',
      followers: 5000,
      following: 1200,
      totalTweets: 850,
      avgLikes: 45,
      avgRetweets: 8,
      avgReplies: 5,
      avgImpressions: 2500,
      verifiedBadge: false,
      accountAge: 18,
    };
    setAccount(demoAccount);
    setShowDemo(false);
  };

  if (!account) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            xtwit
          </h1>
          <p className="text-2xl mb-4 text-gray-700 dark:text-gray-300">
            Twitter Growth Analyzer & Strategy Planner
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Analyze your Twitter account, get personalized growth strategies based on the X algorithm, 
            and simulate how your posts and promotion decisions affect your growth with detailed forecasting.
          </p>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-bold mb-2">X Algorithm Analysis</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get your account scored based on the real X algorithm
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="font-bold mb-2">Growth Plan</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Personalized strategies to grow your Twitter presence
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-3">📈</div>
            <h3 className="font-bold mb-2">Growth Forecasting</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              See detailed projections of your account growth
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-bold mb-2">Post Simulator</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Predict how your posts will perform before posting
            </p>
          </div>
        </div>

        {/* Input Form */}
        <AccountInputForm onSubmit={handleAccountSubmit} />

        {/* Demo Button */}
        <div className="text-center mt-6">
          <button
            onClick={loadDemoAccount}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Or try with a demo account
          </button>
        </div>

        {/* Footer */}
        <footer className="max-w-4xl mx-auto mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Based on the open-sourced X (Twitter) algorithm. Projections are estimates and 
            actual results may vary based on content quality, consistency, and algorithm updates.
          </p>
        </footer>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto mb-6">
        <button
          onClick={() => setAccount(null)}
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
        >
          ← Analyze Another Account
        </button>
      </div>

      {/* Analysis Dashboard */}
      <AnalysisDashboard account={account} />

      {/* Forecasting and Simulation Tools */}
      <div className="max-w-6xl mx-auto mt-8 grid lg:grid-cols-2 gap-6">
        <ForecastingTool account={account} />
        <PostSimulator account={account} />
      </div>

      {/* Promotion Calculator */}
      <div className="max-w-6xl mx-auto mt-8">
        <PromotionCalculator account={account} />
      </div>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-16 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-8">
        <p className="mb-4">
          <strong>xtwit</strong> - Twitter Growth Analyzer powered by X Algorithm Intelligence
        </p>
        <p>
          These insights and projections are based on analysis of the X algorithm and current best practices. 
          Results may vary based on content quality, audience, timing, and platform changes.
        </p>
      </footer>
    </main>
  );
}
