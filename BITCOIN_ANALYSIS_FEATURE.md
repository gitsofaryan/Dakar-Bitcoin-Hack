# Bitcoin Trading Analysis Feature

## Overview
This feature adds Bitcoin trading recommendations (BUY/SELL/HOLD) to your stockbot using the Groq Compound model.

## What Was Added

### 1. New Component: `bitcoin-recommendation.tsx`
Location: `components/stocks/bitcoin-recommendation.tsx`

A React component that displays:
- Trading recommendation (BUY/SELL/HOLD) with color-coded badges
- Confidence score (0-100)
- Current Bitcoin price
- RSI (Relative Strength Index)
- Detailed reasoning for the recommendation

### 2. New Tool: `analyzeBitcoin`
Location: `lib/chat/actions.tsx`

A new AI tool that:
- Uses the **Groq Compound model** (`groq/compound`) directly via `groq-sdk`
- Analyzes Bitcoin market trends using technical indicators
- Provides actionable BUY/SELL/HOLD recommendations
- Returns confidence scores and detailed reasoning

### 3. Updated System Prompts
Both the main system prompt and caption system prompts now include the `analyzeBitcoin` tool in the available tools list.

## How to Use

### User Queries That Trigger the Tool:
- "Should I buy Bitcoin?"
- "Is it a good time to sell Bitcoin?"
- "Give me Bitcoin trading advice"
- "Should I hold or sell Bitcoin?"
- "Analyze Bitcoin for me"
- "What's the Bitcoin recommendation?"

### Example Response:
The bot will show a card with:
```
Bitcoin Trading Analysis
[HOLD Badge - Yellow]

Confidence Score: 70%

Current Price: $124,000
RSI: 71

Analysis:
The market is in an overall bullish trend, but the overbought RSI 
and contradictory Hull-MA signal indicate that the next short-term 
move could be a pull-back or sideways consolidation...
```

## Technical Details

### Groq Compound Model Configuration
```typescript
const groqClient = new Groq({
  apiKey: GROQ_API_KEY_ENV,
  defaultHeaders: {
    "Groq-Model-Version": "latest"
  }
});

const chatCompletion = await groqClient.chat.completions.create({
  model: 'groq/compound',
  temperature: 1,
  max_tokens: 1024,
  top_p: 1,
  stream: false,
  messages: [...]
});
```

### Dependencies Added
- `groq-sdk` version 0.33.0 (installed via pnpm)

### Environment Variables Required
- `GROQ_API_KEY` - Your Groq API key (already configured in your project)

## Files Modified
1. `lib/chat/actions.tsx` - Added tool and updated prompts
2. `components/stocks/bitcoin-recommendation.tsx` - New component
3. `package.json` - Added `groq-sdk` dependency

## Key Features
✅ Real-time Bitcoin analysis using Groq Compound AI model  
✅ Visual representation with color-coded recommendations  
✅ Confidence scoring for transparency  
✅ Technical indicators (RSI, price, moving averages)  
✅ Detailed reasoning for each recommendation  
✅ Seamless integration with existing stockbot tools  

## Next Steps
1. Test the feature by asking "Should I buy Bitcoin?" in your chat
2. Customize the analysis prompt if you want different technical indicators
3. Consider adding similar tools for other cryptocurrencies (ETH, SOL, etc.)
4. Add historical tracking of recommendations

## Customization Options

### To analyze other cryptocurrencies:
Modify the tool to accept a parameter for different crypto symbols:
```typescript
parameters: z.object({
  symbol: z.string().default('BTCUSD')
})
```

### To adjust the AI analysis prompt:
Edit the system message in the `analyzeBitcoin` tool to include different technical indicators or analysis methods.

### To change recommendation thresholds:
Modify the confidence score color coding in `bitcoin-recommendation.tsx`:
```typescript
const getConfidenceColor = () => {
  if (confidence >= 80) return 'text-green-600'  // High confidence
  if (confidence >= 60) return 'text-yellow-600' // Medium confidence
  return 'text-red-600'                          // Low confidence
}
```
