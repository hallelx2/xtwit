# xtwit - Twitter Growth Analyzer

A Next.js web application that analyzes your Twitter account and creates personalized growth strategies based on the X (Twitter) algorithm.

## Features

- **X Algorithm Analysis**: Get your account scored based on the real X algorithm metrics
- **Personalized Growth Plan**: Receive custom recommendations to improve your Twitter presence
- **What's Working Now**: Identify your current strengths and opportunities
- **Growth Forecasting**: Detailed projections of follower and engagement growth over time
- **Post Performance Simulator**: Predict how your posts will perform based on content quality and timing
- **Promotion ROI Calculator**: Calculate the return on investment for paid Twitter promotions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hallelx2/xtwit.git
cd xtwit
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter your Twitter account metrics (followers, engagement, etc.)
2. View your X Algorithm score and personalized analysis
3. Explore your growth plan with actionable recommendations
4. Use the forecasting tool to project future growth
5. Simulate post performance with different parameters
6. Calculate ROI for potential promotion campaigns

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Backend**: Hono (lightweight web framework)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React

## Architecture

### Backend API (Hono)

The application uses Hono as the backend framework, providing RESTful API endpoints:

- `GET /api/health` - Health check endpoint
- `POST /api/analyze` - Analyze Twitter account and generate insights
- `POST /api/forecast` - Generate growth forecasts
- `POST /api/simulate-post` - Simulate post performance
- `POST /api/simulate-promotion` - Calculate promotion ROI

All X algorithm calculations run server-side for better performance and security.

### Frontend

React components fetch data from the Hono API endpoints using a type-safe API client (`lib/api-client.ts`). Each component includes loading states and error handling for a smooth user experience.

## Algorithm Basis

This tool is based on the open-sourced X (Twitter) algorithm, incorporating:
- Engagement rate scoring
- Reply ratio importance
- Retweet amplification factors
- Follower quality metrics
- Post frequency optimization

## Building for Production

```bash
npm run build
npm start
```

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
