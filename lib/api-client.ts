// API client utilities for calling the Hono backend

import { TwitterAccount, PostMetrics, GrowthForecast, PromotionSimulation } from './x-algorithm';

const API_BASE = '/api';

export interface AnalysisResult {
  account: TwitterAccount;
  engagementScore: number;
  strengths: string[];
  opportunities: string[];
  growthPlan: string[];
}

export class ApiClient {
  /**
   * Analyze a Twitter account
   */
  static async analyzeAccount(account: TwitterAccount): Promise<AnalysisResult> {
    const response = await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(account),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to analyze account');
    }

    return response.json();
  }

  /**
   * Generate growth forecast
   */
  static async generateForecast(
    account: TwitterAccount,
    months: number
  ): Promise<{ forecasts: GrowthForecast[] }> {
    const response = await fetch(`${API_BASE}/forecast`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account, months }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate forecast');
    }

    return response.json();
  }

  /**
   * Simulate post performance
   */
  static async simulatePost(
    account: TwitterAccount,
    postQuality: number,
    postTiming: 'optimal' | 'good' | 'average' | 'poor'
  ): Promise<{ metrics: PostMetrics }> {
    const response = await fetch(`${API_BASE}/simulate-post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account, postQuality, postTiming }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to simulate post');
    }

    return response.json();
  }

  /**
   * Simulate promotion ROI
   */
  static async simulatePromotion(
    account: TwitterAccount,
    budget: number
  ): Promise<{ simulation: PromotionSimulation }> {
    const response = await fetch(`${API_BASE}/simulate-promotion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account, budget }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to simulate promotion');
    }

    return response.json();
  }

  /**
   * Health check
   */
  static async healthCheck(): Promise<{ status: string; message: string }> {
    const response = await fetch(`${API_BASE}/health`);
    
    if (!response.ok) {
      throw new Error('API health check failed');
    }

    return response.json();
  }
}
