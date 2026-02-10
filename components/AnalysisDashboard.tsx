'use client';

import { TwitterAccount, XAlgorithmEngine } from '@/lib/x-algorithm';

interface AnalysisDashboardProps {
  account: TwitterAccount;
}

export default function AnalysisDashboard({ account }: AnalysisDashboardProps) {
  const engagementScore = XAlgorithmEngine.calculateEngagementScore(account);
  const { strengths, opportunities } = XAlgorithmEngine.identifyWorkingStrategies(account);
  const growthPlan = XAlgorithmEngine.generateGrowthPlan(account);

  const scoreColor = engagementScore >= 70 ? 'text-green-500' : 
                     engagementScore >= 40 ? 'text-yellow-500' : 'text-red-500';
  
  const scoreLabel = engagementScore >= 70 ? 'Excellent' : 
                     engagementScore >= 40 ? 'Good' : 'Needs Improvement';

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Analysis for @{account.username}</h1>
        <p className="text-gray-600 dark:text-gray-400">Based on X Algorithm Intelligence</p>
      </div>

      {/* Engagement Score Card */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">X Algorithm Score</h2>
        <div className={`text-6xl font-bold mb-2 ${scoreColor}`}>
          {engagementScore.toFixed(1)}
        </div>
        <div className="text-lg opacity-90">{scoreLabel}</div>
        <p className="mt-4 text-sm opacity-80">
          This score reflects how well your account performs according to the X algorithm
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Followers</h3>
          <div className="text-3xl font-bold">{account.followers.toLocaleString()}</div>
          <p className="text-xs text-gray-500 mt-1">Following: {account.following.toLocaleString()}</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Avg Engagement</h3>
          <div className="text-3xl font-bold">
            {(account.avgLikes + account.avgRetweets + account.avgReplies).toLocaleString()}
          </div>
          <p className="text-xs text-gray-500 mt-1">Per tweet</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Tweets</h3>
          <div className="text-3xl font-bold">{account.totalTweets.toLocaleString()}</div>
          <p className="text-xs text-gray-500 mt-1">Over {account.accountAge} months</p>
        </div>
      </div>

      {/* What's Working Now */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">📊 What's Working Now</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-3">✓ Strengths</h3>
          <ul className="space-y-2">
            {strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {opportunities.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-3">🎯 Opportunities</h3>
            <ul className="space-y-2">
              {opportunities.map((opportunity, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>{opportunity}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Growth Plan */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">🚀 Your Personalized Growth Plan</h2>
        <div className="space-y-3">
          {growthPlan.map((recommendation, idx) => (
            <div key={idx} className="flex items-start p-4 bg-blue-50 dark:bg-slate-700 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                {idx + 1}
              </div>
              <p className="flex-1">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
