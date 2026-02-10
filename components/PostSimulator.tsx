'use client';

import { useState } from 'react';
import { TwitterAccount, XAlgorithmEngine } from '@/lib/x-algorithm';

interface PostSimulatorProps {
  account: TwitterAccount;
}

export default function PostSimulator({ account }: PostSimulatorProps) {
  const [postQuality, setPostQuality] = useState(7);
  const [postTiming, setPostTiming] = useState<'optimal' | 'good' | 'average' | 'poor'>('good');
  
  const metrics = XAlgorithmEngine.simulatePostPerformance(account, postQuality, postTiming);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎯 Post Performance Simulator</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        See how different factors affect your post performance
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Content Quality: {postQuality}/10
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={postQuality}
            onChange={(e) => setPostQuality(parseInt(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            How engaging and valuable is your content?
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Posting Time</label>
          <select
            value={postTiming}
            onChange={(e) => setPostTiming(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700"
          >
            <option value="optimal">Optimal (Peak Hours)</option>
            <option value="good">Good (Active Hours)</option>
            <option value="average">Average (Regular Hours)</option>
            <option value="poor">Poor (Off-Peak Hours)</option>
          </select>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Predicted Performance</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-3xl font-bold">{metrics.impressions.toLocaleString()}</div>
              <div className="text-sm opacity-90">Impressions</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{metrics.likes.toLocaleString()}</div>
              <div className="text-sm opacity-90">Likes</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{metrics.retweets.toLocaleString()}</div>
              <div className="text-sm opacity-90">Retweets</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{metrics.replies.toLocaleString()}</div>
              <div className="text-sm opacity-90">Replies</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="text-sm">Engagement Rate: <span className="font-bold">{metrics.engagementRate.toFixed(2)}%</span></div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-slate-700 rounded-lg p-4">
          <h4 className="font-semibold mb-2">💡 Tips for this scenario:</h4>
          <ul className="text-sm space-y-1">
            {postQuality < 5 && (
              <li>• Focus on creating more valuable, engaging content</li>
            )}
            {postTiming === 'poor' && (
              <li>• Try posting during peak hours for better reach</li>
            )}
            {postQuality >= 8 && postTiming === 'optimal' && (
              <li>• Great combination! This is your best-case scenario</li>
            )}
            <li>• Add media (images/videos) for 2-3x more engagement</li>
            <li>• Ask questions to encourage replies and boost visibility</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
