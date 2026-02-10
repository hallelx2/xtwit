// X (Twitter) Algorithm Simulation Engine
// Based on the open-sourced X algorithm and best practices

export interface TwitterAccount {
  username: string;
  followers: number;
  following: number;
  totalTweets: number;
  avgLikes: number;
  avgRetweets: number;
  avgReplies: number;
  avgImpressions: number;
  verifiedBadge: boolean;
  accountAge: number; // in months
}

export interface PostMetrics {
  likes: number;
  retweets: number;
  replies: number;
  impressions: number;
  engagementRate: number;
}

export interface GrowthForecast {
  timeframe: string;
  projectedFollowers: number;
  projectedEngagement: number;
  confidenceLevel: number;
}

export interface PromotionSimulation {
  investmentAmount: number;
  estimatedImpressions: number;
  estimatedFollowers: number;
  roi: number;
  breakEvenPoint: number;
}

// X Algorithm scoring factors
export const ALGORITHM_WEIGHTS = {
  ENGAGEMENT_RATE: 0.35,
  REPLY_RATIO: 0.25,
  RETWEET_AMPLIFICATION: 0.20,
  FOLLOWER_QUALITY: 0.15,
  POST_FREQUENCY: 0.05,
};

export class XAlgorithmEngine {
  // Validate Twitter account object
  static validateTwitterAccount(data: any): TwitterAccount | null {
    if (!data || typeof data !== 'object') return null;

    const {
      username,
      followers,
      following,
      totalTweets,
      avgLikes,
      avgRetweets,
      avgReplies,
      avgImpressions,
      verifiedBadge,
      accountAge,
    } = data;

    if (
      typeof username !== 'string' || username.trim() === '' ||
      typeof followers !== 'number' || followers < 0 ||
      typeof following !== 'number' || following < 0 ||
      typeof totalTweets !== 'number' || totalTweets < 0 ||
      typeof avgLikes !== 'number' || avgLikes < 0 ||
      typeof avgRetweets !== 'number' || avgRetweets < 0 ||
      typeof avgReplies !== 'number' || avgReplies < 0 ||
      typeof avgImpressions !== 'number' || avgImpressions < 0 ||
      typeof verifiedBadge !== 'boolean' ||
      typeof accountAge !== 'number' || accountAge <= 0
    ) {
      return null;
    }

    return {
      username,
      followers,
      following,
      totalTweets,
      avgLikes,
      avgRetweets,
      avgReplies,
      avgImpressions,
      verifiedBadge,
      accountAge,
    };
  }

  // Calculate engagement score based on X algorithm
  static calculateEngagementScore(account: TwitterAccount): number {
    const engagementRate = 
      (account.avgLikes + account.avgRetweets + account.avgReplies) / 
      Math.max(account.avgImpressions, 1);
    
    const replyRatio = account.avgReplies / Math.max(account.avgLikes, 1);
    const retweetAmplification = account.avgRetweets / Math.max(account.avgLikes, 1);
    const followerRatio = account.followers / Math.max(account.following, 1);
    const postFrequency = Math.min(account.totalTweets / account.accountAge, 10);

    const score = 
      engagementRate * ALGORITHM_WEIGHTS.ENGAGEMENT_RATE * 100 +
      replyRatio * ALGORITHM_WEIGHTS.REPLY_RATIO * 100 +
      retweetAmplification * ALGORITHM_WEIGHTS.RETWEET_AMPLIFICATION * 100 +
      followerRatio * ALGORITHM_WEIGHTS.FOLLOWER_QUALITY * 10 +
      postFrequency * ALGORITHM_WEIGHTS.POST_FREQUENCY * 10;

    return Math.min(Math.max(score, 0), 100);
  }

  // Calculate virality coefficient
  static calculateViralityCoefficient(metrics: PostMetrics): number {
    const viralityScore = 
      (metrics.retweets * 3 + metrics.replies * 2 + metrics.likes) / 
      Math.max(metrics.impressions, 1);
    
    return Math.min(viralityScore * 100, 10);
  }

  // Project follower growth based on current metrics
  static projectFollowerGrowth(
    account: TwitterAccount, 
    months: number
  ): GrowthForecast[] {
    const forecasts: GrowthForecast[] = [];
    const engagementScore = this.calculateEngagementScore(account);
    const baseGrowthRate = (engagementScore / 100) * 0.15; // 15% max monthly growth
    
    let currentFollowers = account.followers;

    for (let i = 1; i <= months; i++) {
      // Apply diminishing returns
      const monthlyGrowth = baseGrowthRate * Math.pow(0.95, i - 1);
      currentFollowers = currentFollowers * (1 + monthlyGrowth);
      
      const projectedEngagement = account.avgLikes * (1 + monthlyGrowth * 0.8);
      const confidence = Math.max(95 - (i * 5), 50); // Confidence decreases over time

      forecasts.push({
        timeframe: `Month ${i}`,
        projectedFollowers: Math.round(currentFollowers),
        projectedEngagement: Math.round(projectedEngagement),
        confidenceLevel: confidence,
      });
    }

    return forecasts;
  }

  // Simulate post performance
  static simulatePostPerformance(
    account: TwitterAccount,
    postQuality: number, // 1-10 scale (automatically clamped if out of range)
    postTiming: 'optimal' | 'good' | 'average' | 'poor'
  ): PostMetrics {
    // Clamp postQuality to 1-10 range to ensure valid calculations
    const quality = Math.max(1, Math.min(10, postQuality));
    
    const timingMultiplier = {
      optimal: 1.5,
      good: 1.2,
      average: 1.0,
      poor: 0.6,
    }[postTiming];

    const baseImpressions = account.followers * 0.15 * timingMultiplier;
    const impressions = Math.round(baseImpressions * (quality / 10));
    
    const engagementRate = 0.02 * (quality / 10) * timingMultiplier;
    const likes = Math.round(impressions * engagementRate);
    const retweets = Math.round(likes * 0.15);
    const replies = Math.round(likes * 0.08);

    return {
      likes,
      retweets,
      replies,
      impressions,
      engagementRate: engagementRate * 100,
    };
  }

  // Simulate promotion/ad campaign ROI
  static simulatePromotion(
    account: TwitterAccount,
    budget: number
  ): PromotionSimulation {
    const costPerImpression = 0.01; // $0.01 per impression
    const costPerFollower = 2.5; // Average $2.5 per follower
    
    const estimatedImpressions = Math.round(budget / costPerImpression);
    const conversionRate = 0.005; // 0.5% conversion rate
    const estimatedFollowers = Math.round(estimatedImpressions * conversionRate);
    
    // Calculate ROI based on follower lifetime value
    const followerValue = 5; // Average $5 lifetime value
    const totalValue = estimatedFollowers * followerValue;
    const roi = ((totalValue - budget) / budget) * 100;
    
    const breakEvenPoint = Math.ceil(budget / followerValue);

    return {
      investmentAmount: budget,
      estimatedImpressions,
      estimatedFollowers,
      roi,
      breakEvenPoint,
    };
  }

  // Generate growth plan recommendations
  static generateGrowthPlan(account: TwitterAccount): string[] {
    const recommendations: string[] = [];
    const engagementScore = this.calculateEngagementScore(account);

    // Engagement-based recommendations
    if (engagementScore < 30) {
      recommendations.push(
        "Focus on creating high-quality, engaging content that resonates with your audience"
      );
      recommendations.push(
        "Increase reply rate by engaging in meaningful conversations in your niche"
      );
    }

    // Follower ratio recommendations
    const followerRatio = account.followers / Math.max(account.following, 1);
    if (followerRatio < 0.5) {
      recommendations.push(
        "Your following/follower ratio needs improvement - focus on organic growth"
      );
    }

    // Post frequency recommendations
    const avgPostsPerMonth = account.totalTweets / account.accountAge;
    if (avgPostsPerMonth < 20) {
      recommendations.push(
        "Increase posting frequency to 1-2 times per day for optimal algorithm performance"
      );
    } else if (avgPostsPerMonth > 100) {
      recommendations.push(
        "Consider reducing post frequency - quality over quantity drives better engagement"
      );
    }

    // Engagement pattern recommendations
    const replyRatio = account.avgReplies / Math.max(account.avgLikes, 1);
    if (replyRatio < 0.05) {
      recommendations.push(
        "Ask more questions and create posts that encourage replies - the algorithm heavily favors conversation"
      );
    }

    // Algorithm-specific recommendations
    recommendations.push(
      "Post during peak hours (9-11 AM and 7-9 PM in your timezone) for maximum visibility"
    );
    recommendations.push(
      "Use 1-2 relevant hashtags maximum - too many can reduce reach"
    );
    recommendations.push(
      "Include images or videos - multimedia posts get 2-3x more engagement"
    );

    if (!account.verifiedBadge) {
      recommendations.push(
        "Consider Twitter Blue subscription - verified accounts get algorithm priority and higher reach"
      );
    }

    return recommendations;
  }

  // Identify what's working now based on metrics
  static identifyWorkingStrategies(account: TwitterAccount): {
    strengths: string[];
    opportunities: string[];
  } {
    const strengths: string[] = [];
    const opportunities: string[] = [];

    const engagementRate = 
      (account.avgLikes + account.avgRetweets + account.avgReplies) / 
      Math.max(account.avgImpressions, 1);

    if (engagementRate > 0.03) {
      strengths.push("High engagement rate - your content resonates with your audience");
    }

    if (account.avgRetweets / Math.max(account.avgLikes, 1) > 0.2) {
      strengths.push("Strong retweet amplification - your content is highly shareable");
    }

    if (account.avgReplies / Math.max(account.avgLikes, 1) > 0.1) {
      strengths.push("Great conversation starter - replies boost algorithm visibility");
    }

    if (account.followers / Math.max(account.following, 1) > 1) {
      strengths.push("Healthy follower/following ratio indicates quality content");
    }

    // Opportunities
    if (engagementRate < 0.02) {
      opportunities.push("Improve content quality to increase engagement rate");
    }

    if (account.avgImpressions / account.followers < 0.1) {
      opportunities.push("Reach is limited - optimize posting times and use relevant hashtags");
    }

    if (strengths.length === 0) {
      strengths.push("Building foundation - focus on consistent, quality content");
    }

    return { strengths, opportunities };
  }
}
