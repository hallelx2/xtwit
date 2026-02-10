'use client';

import { useState } from 'react';
import { TwitterAccount } from '@/lib/x-algorithm';

interface AccountInputFormProps {
  onSubmit: (account: TwitterAccount) => void;
}

export default function AccountInputForm({ onSubmit }: AccountInputFormProps) {
  const [formData, setFormData] = useState<TwitterAccount>({
    username: '',
    followers: 0,
    following: 0,
    totalTweets: 0,
    avgLikes: 0,
    avgRetweets: 0,
    avgReplies: 0,
    avgImpressions: 0,
    verifiedBadge: false,
    accountAge: 12,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof TwitterAccount, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Enter Your Twitter Account Details</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => handleChange('username', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="@yourhandle"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Followers</label>
          <input
            type="number"
            value={formData.followers}
            onChange={(e) => handleChange('followers', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Following</label>
          <input
            type="number"
            value={formData.following}
            onChange={(e) => handleChange('following', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Total Tweets</label>
          <input
            type="number"
            value={formData.totalTweets}
            onChange={(e) => handleChange('totalTweets', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Avg Likes per Tweet</label>
          <input
            type="number"
            value={formData.avgLikes}
            onChange={(e) => handleChange('avgLikes', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Avg Retweets per Tweet</label>
          <input
            type="number"
            value={formData.avgRetweets}
            onChange={(e) => handleChange('avgRetweets', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Avg Replies per Tweet</label>
          <input
            type="number"
            value={formData.avgReplies}
            onChange={(e) => handleChange('avgReplies', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Avg Impressions per Tweet</label>
          <input
            type="number"
            value={formData.avgImpressions}
            onChange={(e) => handleChange('avgImpressions', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Account Age (months)</label>
          <input
            type="number"
            value={formData.accountAge}
            onChange={(e) => handleChange('accountAge', parseInt(e.target.value) || 1)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="verified"
            checked={formData.verifiedBadge}
            onChange={(e) => handleChange('verifiedBadge', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="verified" className="ml-2 text-sm font-medium">
            Verified Badge (Twitter Blue)
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Analyze Account & Generate Growth Plan
      </button>
    </form>
  );
}
