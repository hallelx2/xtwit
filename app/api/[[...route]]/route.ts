import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { XAlgorithmEngine, TwitterAccount, PostMetrics, GrowthForecast, PromotionSimulation } from '@/lib/x-algorithm';

// Create a new Hono app
const app = new Hono().basePath('/api');

// Analyze Twitter account endpoint
app.post('/analyze', async (c) => {
  try {
    const body = await c.req.json();
    const account = XAlgorithmEngine.validateTwitterAccount(body);
    
    if (!account) {
      return c.json({ error: 'Invalid account data' }, 400);
    }

    const engagementScore = XAlgorithmEngine.calculateEngagementScore(account);
    const { strengths, opportunities } = XAlgorithmEngine.identifyWorkingStrategies(account);
    const growthPlan = XAlgorithmEngine.generateGrowthPlan(account);

    return c.json({
      account,
      engagementScore,
      strengths,
      opportunities,
      growthPlan,
    });
  } catch (error) {
    console.error('Error analyzing account:', error);
    return c.json({ error: 'Failed to analyze account' }, 500);
  }
});

// Generate growth forecast endpoint
app.post('/forecast', async (c) => {
  try {
    const body = await c.req.json();
    const account = XAlgorithmEngine.validateTwitterAccount(body.account);
    const months = body.months;
    
    if (!account || typeof months !== 'number' || months <= 0) {
      return c.json({ error: 'Valid account data and positive months are required' }, 400);
    }

    const forecasts = XAlgorithmEngine.projectFollowerGrowth(account, months);

    return c.json({ forecasts });
  } catch (error) {
    console.error('Error generating forecast:', error);
    return c.json({ error: 'Failed to generate forecast' }, 500);
  }
});

// Simulate post performance endpoint
app.post('/simulate-post', async (c) => {
  try {
    const body = await c.req.json();
    const account = XAlgorithmEngine.validateTwitterAccount(body.account);
    const postQuality = body.postQuality;
    const postTiming = body.postTiming;
    
    const validTimings = ['optimal', 'good', 'average', 'poor'];

    if (
      !account ||
      typeof postQuality !== 'number' ||
      !validTimings.includes(postTiming)
    ) {
      return c.json({ error: 'Valid account, postQuality (number), and postTiming are required' }, 400);
    }

    const metrics = XAlgorithmEngine.simulatePostPerformance(account, postQuality, postTiming);

    return c.json({ metrics });
  } catch (error) {
    console.error('Error simulating post:', error);
    return c.json({ error: 'Failed to simulate post' }, 500);
  }
});

// Simulate promotion ROI endpoint
app.post('/simulate-promotion', async (c) => {
  try {
    const body = await c.req.json();
    const account = XAlgorithmEngine.validateTwitterAccount(body.account);
    const budget = body.budget;
    
    if (!account || typeof budget !== 'number' || budget < 0) {
      return c.json({ error: 'Valid account and non-negative budget are required' }, 400);
    }

    const simulation = XAlgorithmEngine.simulatePromotion(account, budget);

    return c.json({ simulation });
  } catch (error) {
    console.error('Error simulating promotion:', error);
    return c.json({ error: 'Failed to simulate promotion' }, 500);
  }
});

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ status: 'ok', message: 'xtwit API is running' });
});

// Export the Hono app for Next.js route handlers
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
