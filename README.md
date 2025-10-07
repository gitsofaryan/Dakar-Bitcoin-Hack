<h2 align="center">
 ## Overview

BitQuine is a specialized Bitcoin trading AI assistant powered by Groq's Compound model and Llama3 70b. It provides lightning-fast Bitcoin analysis, real-time trading signals, price charts, and AI-generated BUY/SELL/HOLD recommendations. Built with Vercel's AI SDK and TradingView widgets, BitQuine delivers near-instantaneous responses with interactive visualizations.

> [!IMPORTANT]
> Note: BitQuine may provide inaccurate information and does not provide investment advice. It is for entertainment and educational purposes only. Always do your own research before making investment decisions. ₿
 <br>
 <br>
 BitQuine: Lightning-Fast Bitcoin Trading AI Powered by Groq Compound 
 <br>
</h2>

<p align="center">
 <a href="#Overview">Overview</a> •
 <a href="#Features">Features</a> •
 <a href="#Quickstart">Quickstart</a> •
 <a href="#Credits">Credits</a>
</p>

<br>

> Bitcoin-focused AI assistant providing real-time trading signals, market analysis, and AI-powered BUY/SELL/HOLD recommendations

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgitsofaryan%2FDakar-Bitcoin-Hack&env=GROQ_API_KEY&envDescription=Get%20a%20Groq%20API%20Key&envLink=https%3A%2F%2Fconsole.groq.com%2Fkeys&project-name=bitquine&repository-name=bitquine&demo-title=BitQuine&demo-description=Lightning-fast%20Bitcoin%20trading%20AI%20powered%20by%20Groq%20Compound%20model)

## Overview

StockBot is an AI-powered chatbot that leverages Llama3 70b on Groq, Vercel’s AI SDK, and TradingView’s live widgets to respond in conversation with live, interactive charts and interfaces specifically tailored to your requests. Groq's speed makes tool calling and providing a response near instantaneous, allowing for a sequence of two API calls with separate specialized prompts to return a response.

> [!IMPORTANT]
>  Note: StockBot may provide inaccurate information and does not provide investment advice. It is for entertainment and instructional use only.

## Features

- ₿ **Bitcoin Trading Recommendations**: AI-powered BUY/SELL/HOLD signals using Groq's Compound model with confidence scores and reasoning
- 📊 **Interactive Bitcoin Charts**: Real-time BTC price charts with live data from TradingView
- 💰 **Current Bitcoin Price**: Instant access to current BTC price and market data
- � **Technical Analysis**: RSI indicators, support/resistance levels, and market sentiment analysis
- ⚡ **Lightning-Fast Responses**: Powered by Groq's inference technology for near-instantaneous AI analysis
- 🎨 **Clean Light Theme UI**: Professional, accessible interface optimized for financial data visualization
- 🔍 **Detailed Market Analysis**: Comprehensive Bitcoin market insights and trend analysis

## How It Works

BitQuine uses Groq's Compound model to analyze Bitcoin market data and provide intelligent trading recommendations:

1. **Natural Language Query**: Ask questions like "Should I buy Bitcoin?" or "Analyze Bitcoin for me"
2. **AI Analysis**: Groq Compound model processes market indicators (RSI, price trends, volume)
3. **Trading Signal**: Receive BUY/SELL/HOLD recommendation with confidence score
4. **Visual Feedback**: Color-coded cards (green for BUY, red for SELL, yellow for HOLD)
5. **Detailed Reasoning**: Get comprehensive analysis explaining the recommendation

### Example Queries
- "Should I buy Bitcoin?"
- "What is the price of Bitcoin?"
- "Show me a Bitcoin chart"
- "Analyze Bitcoin for me"

## Quickstart

> [!IMPORTANT]
> You can run BitQuine locally using the instructions below.


You will need a Groq API Key to run the application. You can obtain one [here on the Groq console](https://console.groq.com/keys).

To get started locally, you can run the following:

```bash
cp .env.example .env.local
```

Add your Groq API key to .env.local, then run:

```bash
pnpm install
pnpm dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

## Tech Stack

- **AI Model**: Groq Compound (for Bitcoin analysis) + Llama3 70b (for conversation)
- **Framework**: Next.js 14 with App Router
- **AI SDK**: Vercel AI SDK with React Server Components
- **UI**: Tailwind CSS with light theme optimization
- **Charts**: TradingView Widgets
- **Icons**: Lucide React
- **Hosting**: Vercel (recommended)

## Environment Variables

Create a `.env.local` file with:

```bash
GROQ_API_KEY=your_groq_api_key_here
```

Get your Groq API key from [console.groq.com/keys](https://console.groq.com/keys)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

## Credits



**Built by**: [gitsofaryan](https://github.com/gitsofaryan) for Dakar Bitcoin Hackathon
**Original StockBot**: [Github Repository](https://github.com/bklieger-groq/stockbot-on-groq)
**Vercel AI Chatbot**: [Github Repository](https://github.com/vercel/ai-chatbot)

## License

See [LICENSE](LICENSE) for more information.
