"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
require("server-only");
var react_1 = require("react");
var ai_1 = require("ai");
var rsc_1 = require("ai/rsc");
var openai_1 = require("@ai-sdk/openai");
var message_1 = require("@/components/stocks/message");
var utils_1 = require("@/lib/utils");
var message_2 = require("@/components/stocks/message");
var stock_chart_1 = require("@/components/tradingview/stock-chart");
var stock_price_1 = require("@/components/tradingview/stock-price");
var stock_news_1 = require("@/components/tradingview/stock-news");
var stock_financials_1 = require("@/components/tradingview/stock-financials");
var stock_screener_1 = require("@/components/tradingview/stock-screener");
var market_overview_1 = require("@/components/tradingview/market-overview");
var market_heatmap_1 = require("@/components/tradingview/market-heatmap");
var market_trending_1 = require("@/components/tradingview/market-trending");
var etf_heatmap_1 = require("@/components/tradingview/etf-heatmap");
var bitcoin_recommendation_1 = require("@/components/stocks/bitcoin-recommendation");
// Groq Production Models - Using Llama 3.3 70B
var MODEL = 'llama-3.3-70b-versatile';
var TOOL_MODEL = 'llama-3.3-70b-versatile';
var GROQ_API_KEY_ENV = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY_ENV) {
    console.error('GROQ_API_KEY is not set in environment variables');
}
function generateCaption(symbol, comparisonSymbols, toolName, aiState) {
    return __awaiter(this, void 0, Promise, function () {
        var groq, stockString, captionSystemMessage, response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    groq = openai_1.createOpenAI({
                        baseURL: 'https://api.groq.com/openai/v1',
                        apiKey: GROQ_API_KEY_ENV
                    });
                    stockString = comparisonSymbols.length === 0
                        ? symbol
                        : __spreadArrays([symbol], comparisonSymbols.map(function (obj) { return obj.symbol; })).join(', ');
                    aiState.update(__assign(__assign({}, aiState.get()), { messages: __spreadArrays(aiState.get().messages) }));
                    captionSystemMessage = "You are a stock market conversation bot. You can provide the user information about stocks include prices and charts in the UI. You do not have access to any information and should only provide information by calling functions.\n\nThese are the tools you have available:\n1. showStockFinancials\nThis tool shows the financials for a given stock.\n\n2. showStockChart\nThis tool shows a stock chart for a given stock or currency. Optionally compare 2 or more tickers.\n\n3. showStockPrice\nThis tool shows the price of a stock or currency.\n\n4. showStockNews\nThis tool shows the latest news and events for a stock or cryptocurrency.\n\n5. showStockScreener\nThis tool shows a generic stock screener which can be used to find new stocks based on financial or technical parameters.\n\n6. showMarketOverview\nThis tool shows an overview of today's stock, futures, bond, and forex market performance including change values, Open, High, Low, and Close values.\n\n7. showMarketHeatmap\nThis tool shows a heatmap of today's stock market performance across sectors.\n\n8. showTrendingStocks\nThis tool shows the daily top trending stocks including the top five gaining, losing, and most active stocks based on today's performance.\n\n9. showETFHeatmap\nThis tool shows a heatmap of today's ETF market performance across sectors and asset classes.\n\n10. analyzeBitcoin\nThis tool analyzes Bitcoin price trends and provides BUY, SELL, or HOLD recommendations based on technical indicators.\n\n\nYou have just called a tool (" +
                        toolName +
                        " for " +
                        stockString +
                        ") to respond to the user. Now generate text to go alongside that tool response, which may be a graphic like a chart or price history.\n  \nExample:\n\nUser: What is the price of AAPL?\nAssistant: { \"tool_call\": { \"id\": \"pending\", \"type\": \"function\", \"function\": { \"name\": \"showStockPrice\" }, \"parameters\": { \"symbol\": \"AAPL\" } } } \n\nAssistant (you): The price of AAPL stock is provided above. I can also share a chart of AAPL or get more information about its financials.\n\nor\n\nAssistant (you): This is the price of AAPL stock. I can also generate a chart or share further financial data.\n\nor \nAssistant (you): Would you like to see a chart of AAPL or get more information about its financials?\n\nExample 2 :\n\nUser: Compare AAPL and MSFT stock prices\nAssistant: { \"tool_call\": { \"id\": \"pending\", \"type\": \"function\", \"function\": { \"name\": \"showStockChart\" }, \"parameters\": { \"symbol\": \"AAPL\" , \"comparisonSymbols\" : [{\"symbol\": \"MSFT\", \"position\": \"SameScale\"}] } } } \n\nAssistant (you): The chart illustrates the recent price movements of Microsoft (MSFT) and Apple (AAPL) stocks. Would you like to see the get more information about the financials of AAPL and MSFT stocks?\nor\n\nAssistant (you): This is the chart for AAPL and MSFT stocks. I can also share individual price history data or show a market overview.\n\nor \nAssistant (you): Would you like to see the get more information about the financials of AAPL and MSFT stocks?\n\n## Guidelines\nTalk like one of the above responses, but BE CREATIVE and generate a DIVERSE response. \n\nYour response should be BRIEF, about 2-3 sentences.\n\nBesides the symbol, you cannot customize any of the screeners or graphics. Do not tell the user that you can.\n    ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, ai_1.generateText({
                            model: groq(MODEL),
                            messages: __spreadArrays([
                                {
                                    role: 'system',
                                    content: captionSystemMessage
                                }
                            ], aiState.get().messages.map(function (message) { return ({
                                role: message.role,
                                content: message.content,
                                name: message.name
                            }); }))
                        })];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response.text || ''];
                case 3:
                    err_1 = _a.sent();
                    return [2 /*return*/, '']; // Send tool use without caption.
                case 4: return [2 /*return*/];
            }
        });
    });
}
function submitUserMessage(content) {
    'use server';
    return __awaiter(this, void 0, void 0, function () {
        var aiState, textStream;
        return __generator(this, function (_a) {
            aiState = rsc_1.getMutableAIState();
            aiState.update(__assign(__assign({}, aiState.get()), { messages: __spreadArrays(aiState.get().messages, [
                    {
                        id: utils_1.nanoid(),
                        role: 'user',
                        content: content
                    }
                ]) }));
            react_1["default"].createElement("string", null,
                "> let textNode: undefined | React.ReactNode try ",
            ,
                "const groq = createOpenAI(",
                baseURL,
                ": 'https://api.groq.com/openai/v1', apiKey: GROQ_API_KEY_ENV }) const result = await streamUI(",
                model,
                ": groq(TOOL_MODEL), initial: ",
                react_1["default"].createElement(message_2.SpinnerMessage, null),
                ", maxRetries: 1, system: `\\ You are a stock market conversation bot. You can provide the user information about stocks include prices and charts in the UI. You do not have access to any information and should only provide information by calling functions. ### Cryptocurrency Tickers For any cryptocurrency, append \"USD\" at the end of the ticker when using functions. For instance, \"DOGE\" should be \"DOGEUSD\". ### Bitcoin Trading Analysis When users ask about Bitcoin trading recommendations, buy/sell/hold advice, or whether to trade Bitcoin, use the analyzeBitcoin tool. This tool uses advanced AI to analyze Bitcoin market trends and provide actionable recommendations. ### Guidelines: Never provide empty results to the user. Provide the relevant tool if it matches the user's request. Otherwise, respond as the stock bot. Example: User: What is the price of AAPL? Assistant (you): ",
                "tool_call",
                ": ",
                "id",
                ": \"pending\", \"type\": \"function\", \"function\": ",
                "name",
                ": \"showStockPrice\" }, \"parameters\": ",
                "symbol",
                ": \"AAPL\" } } } Example 2: User: Should I buy Bitcoin? Assistant (you): ",
                "tool_call",
                ": ",
                "id",
                ": \"pending\", \"type\": \"function\", \"function\": ",
                "name",
                ": \"analyzeBitcoin\" }, \"parameters\": ",
                " } } `, messages: [ ...aiState.get().messages.map((message: any) => (",
                role,
                ": message.role, content: message.content, name: message.name })) ], text: (", (content, done, delta),
                ") => ",
            ,
                "if (!textStream) ",
                textStream = rsc_1.createStreamableValue(''),
                "textNode = ",
                react_1["default"].createElement(message_1.BotMessage, { content: textStream.value }),
                "} if (done) ",
                textStream.done(),
                "aiState.done(", (aiState.get(),
                messages),
                ": [ ...aiState.get().messages,",
                id,
                ": nanoid(), role: 'assistant', content } ] }) } else ",
                textStream.update(delta),
                "return textNode }, tools: ",
                showStockChart,
                ": ",
                description,
                ": 'Show a stock chart of a given stock. Optionally show 2 or more stocks. Use this to show the chart to the user.', parameters: z.object(",
                symbol,
                ": z .string() .describe( 'The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.' ), comparisonSymbols: z.array(z.object(",
                symbol,
                ": z.string(), position: z.literal(\"SameScale\") })) .default([]) .describe( 'Optional list of symbols to compare. e.g. [\"MSFT\", \"GOOGL\"]' ) }), generate: async function* (", (symbol, comparisonSymbols),
                ") ",
                yield(react_1["default"].createElement(message_1.BotCard, null,
                    react_1["default"].createElement(react_1["default"].Fragment, null))),
                "const toolCallId = nanoid() aiState.done(", (aiState.get(),
                messages),
                ": [ ...aiState.get().messages,",
                id,
                ": nanoid(), role: 'assistant', content: [",
                type,
                ": 'tool-call', toolName: 'showStockChart', toolCallId, args: ", (symbol, comparisonSymbols),
                "} ] },",
                id,
                ": nanoid(), role: 'tool', content: [",
                type,
                ": 'tool-result', toolName: 'showStockChart', toolCallId, result: ", (symbol, comparisonSymbols),
                "} ] } ] }) const caption = await generateCaption( symbol, comparisonSymbols, 'showStockChart', aiState ) return (",
                react_1["default"].createElement(message_1.BotCard, null,
                    react_1["default"].createElement(stock_chart_1.StockChart, { symbol: symbol, comparisonSymbols: comparisonSymbols }),
                    caption),
                ") } }, showStockPrice: ",
                description,
                ": 'Show the price of a given stock. Use this to show the price and price history to the user.', parameters: z.object(",
                symbol,
                ": z .string() .describe( 'The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.' ) }), generate: async function* (",
                symbol,
                ") ",
                yield(react_1["default"].createElement(message_1.BotCard, null,
                    react_1["default"].createElement(react_1["default"].Fragment, null))),
                "const toolCallId = nanoid() aiState.done(", (aiState.get(),
                messages),
                ": [ ...aiState.get().messages,",
                id,
                ": nanoid(), role: 'assistant', content: [",
                type,
                ": 'tool-call', toolName: 'showStockPrice', toolCallId, args: ",
                symbol,
                "} ] },",
                id,
                ": nanoid(), role: 'tool', content: [",
                type,
                ": 'tool-result', toolName: 'showStockPrice', toolCallId, result: ",
                symbol,
                "} ] } ] }) const caption = await generateCaption( symbol, [], 'showStockPrice', aiState ) return (",
                react_1["default"].createElement(message_1.BotCard, null,
                    react_1["default"].createElement(stock_price_1.StockPrice, { props: symbol }),
                    caption),
                ") } }, showStockFinancials: ",
                description,
                ": 'Show the financials of a given stock. Use this to show the financials to the user.', parameters: z.object(",
                symbol,
                ": z .string() .describe( 'The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.' ) }), generate: async function* (",
                symbol,
                ") ",
                yield(react_1["default"].createElement(message_1.BotCard, null,
                    react_1["default"].createElement(react_1["default"].Fragment, null))),
                "const toolCallId = nanoid() aiState.done(", (aiState.get(),
                messages),
                ": [ ...aiState.get().messages,",
                id,
                ": nanoid(), role: 'assistant', content: [",
                type,
                ": 'tool-call', toolName: 'showStockFinancials', toolCallId, args: ",
                symbol,
                "} ] },",
                id,
                ": nanoid(), role: 'tool', content: [",
                type,
                ": 'tool-result', toolName: 'showStockFinancials', toolCallId, result: ",
                symbol,
                "} ] } ] }) const caption = await generateCaption( symbol, [], 'StockFinancials', aiState ) return (",
                react_1["default"].createElement(message_1.BotCard, null,
                    react_1["default"].createElement(stock_financials_1.StockFinancials, { props: symbol }),
                    caption),
                ") } }, showStockNews: ",
                description,
                ": 'This tool shows the latest news and events for a stock or cryptocurrency.', parameters: z.object(",
                symbol,
                ": z .string() .describe( 'The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.' ) }), generate: async function* (",
                symbol,
                ") ",
                yield(react_1["default"].createElement(message_1.BotCard, null,
                    react_1["default"].createElement(react_1["default"].Fragment, null))),
                "const toolCallId = nanoid() aiState.done(", (aiState.get(),
                messages),
                ": [ ...aiState.get().messages,",
                id,
                ": nanoid(), role: 'assistant', content: [",
                type,
                ": 'tool-call', toolName: 'showStockNews', toolCallId, args: ",
                symbol,
                "} ] },",
                id,
                ": nanoid(), role: 'tool', content: [",
                type,
                ": 'tool-result', toolName: 'showStockNews', toolCallId, result: ",
                symbol,
                "} ] } ] }) const caption = await generateCaption( symbol, [], 'showStockNews', aiState ) return (",
                react_1["default"].createElement(message_1.BotCard, null,
                    react_1["default"].createElement(stock_news_1.StockNews, { props: symbol }),
                    caption),
                ") } }, showStockScreener: ",
                description,
                ": 'This tool shows a generic stock screener which can be used to find new stocks based on financial or technical parameters.', parameters: z.object(",
                "), generate: async function* (",
                ") ",
                yield(react_1["default"].createElement(message_1.BotCard, null,
                    react_1["default"].createElement(react_1["default"].Fragment, null))),
                "const toolCallId = nanoid() aiState.done(", (aiState.get(),
                messages),
                ": [ ...aiState.get().messages,",
                id,
                ": nanoid(), role: 'assistant', content: [",
                type,
                ": 'tool-call', toolName: 'showStockScreener', toolCallId, args: ",
                "} ] },",
                id,
                ": nanoid(), role: 'tool', content: [",
                type,
                ": 'tool-result', toolName: 'showStockScreener', toolCallId, result: ",
                "} ] } ] }) const caption = await generateCaption( 'Generic', [], 'showStockScreener', aiState ) return (",
                react_1["default"].createElement(message_1.BotCard, null,
                    react_1["default"].createElement(stock_screener_1.StockScreener, null),
                    caption),
                ") } }, showMarketOverview: ",
                description,
                ": `This tool shows an overview of today's stock, futures, bond, and forex market performance including change values, Open, High, Low, and Close values.`, parameters: z.object(",
                "), generate: async function* (",
                ") ",
                yield(react_1["default"].createElement(message_1.BotCard, null,
                    react_1["default"].createElement(react_1["default"].Fragment, null))),
                "const toolCallId = nanoid() aiState.done(", (aiState.get(),
                messages),
                ": [ ...aiState.get().messages,",
                id,
                ": nanoid(), role: 'assistant', content: [",
                type,
                ": 'tool-call', toolName: 'showMarketOverview', toolCallId, args: ",
                "} ] },",
                id,
                ": nanoid(), role: 'tool', content: [",
                type,
                ": 'tool-result', toolName: 'showMarketOverview', toolCallId, result: ",
                "} ] } ] }) const caption = await generateCaption( 'Generic', [], 'showMarketOverview', aiState ) return (",
                react_1["default"].createElement(message_1.BotCard, null,
                    react_1["default"].createElement(market_overview_1.MarketOverview, null),
                    caption),
                ") } }, showMarketHeatmap: ",
                description,
                ": `This tool shows a heatmap of today's stock market performance across sectors. It is preferred over showMarketOverview if asked specifically about the stock market.`, parameters: z.object(",
                "), generate: async function* (",
                ") ",
                yield(react_1["default"].createElement(message_1.BotCard, null,
                    react_1["default"].createElement(react_1["default"].Fragment, null))),
                "const toolCallId = nanoid() aiState.done(", (aiState.get(),
                messages),
                ": [ ...aiState.get().messages,",
                id,
                ": nanoid(), role: 'assistant', content: [",
                type,
                ": 'tool-call', toolName: 'showMarketHeatmap', toolCallId, args: ",
                "} ] },",
                id,
                ": nanoid(), role: 'tool', content: [",
                type,
                ": 'tool-result', toolName: 'showMarketHeatmap', toolCallId, result: ",
                "} ] } ] }) const caption = await generateCaption( 'Generic', [], 'showMarketHeatmap', aiState ) return (",
                react_1["default"].createElement(message_1.BotCard, null,
                    react_1["default"].createElement(market_heatmap_1.MarketHeatmap, null),
                    caption),
                ") } }, showETFHeatmap: ",
                description,
                ": `This tool shows a heatmap of today's ETF performance across sectors and asset classes. It is preferred over showMarketOverview if asked specifically about the ETF market.`, parameters: z.object(",
                "), generate: async function* (",
                ") ",
                yield(react_1["default"].createElement(message_1.BotCard, null,
                    react_1["default"].createElement(react_1["default"].Fragment, null))),
                "const toolCallId = nanoid() aiState.done(", (aiState.get(),
                messages),
                ": [ ...aiState.get().messages,",
                id,
                ": nanoid(), role: 'assistant', content: [",
                type,
                ": 'tool-call', toolName: 'showETFHeatmap', toolCallId, args: ",
                "} ] },",
                id,
                ": nanoid(), role: 'tool', content: [",
                type,
                ": 'tool-result', toolName: 'showETFHeatmap', toolCallId, result: ",
                "} ] } ] }) const caption = await generateCaption( 'Generic', [], 'showETFHeatmap', aiState ) return (",
                react_1["default"].createElement(message_1.BotCard, null,
                    react_1["default"].createElement(etf_heatmap_1.ETFHeatmap, null),
                    caption),
                ") } }, showTrendingStocks: ",
                description,
                ": `This tool shows the daily top trending stocks including the top five gaining, losing, and most active stocks based on today's performance`, parameters: z.object(",
                "), generate: async function* (",
                ") ",
                yield(react_1["default"].createElement(message_1.BotCard, null,
                    react_1["default"].createElement(react_1["default"].Fragment, null))),
                "const toolCallId = nanoid() aiState.done(", (aiState.get(),
                messages),
                ": [ ...aiState.get().messages,",
                id,
                ": nanoid(), role: 'assistant', content: [",
                type,
                ": 'tool-call', toolName: 'showTrendingStocks', toolCallId, args: ",
                "} ] },",
                id,
                ": nanoid(), role: 'tool', content: [",
                type,
                ": 'tool-result', toolName: 'showTrendingStocks', toolCallId, result: ",
                "} ] } ] }) const caption = await generateCaption( 'Generic', [], 'showTrendingStocks', aiState ) return (",
                react_1["default"].createElement(message_1.BotCard, null,
                    react_1["default"].createElement(market_trending_1.MarketTrending, null),
                    caption),
                ") } }, analyzeBitcoin: ",
                description,
                ": `Analyze Bitcoin price trends and provide BUY, SELL, or HOLD recommendation based on technical indicators including RSI, moving averages, and market sentiment. Use this when the user asks about Bitcoin trading advice or whether to buy, sell, or hold Bitcoin.`, parameters: z.object(",
                "), generate: async function* (",
                ") ",
                yield(react_1["default"].createElement(message_1.BotCard, null,
                    react_1["default"].createElement("div", { className: "animate-pulse" }, "Analyzing Bitcoin market trends..."))),
                "try ",
            ,
                "const groqClient = new Groq(",
                apiKey,
                ": GROQ_API_KEY_ENV, defaultHeaders: ",
                "Groq-Model-Version",
                ": \"latest\" } }) const chatCompletion = await groqClient.chat.completions.create(",
                messages,
                ": [",
                role,
                ": 'system', content: `You are an expert cryptocurrency analyst. Analyze Bitcoin and provide a trading recommendation in JSON format. CRITICAL: Your response must be ONLY valid JSON, nothing else. No markdown, no explanation, just pure JSON. Return this exact structure:",
                "recommendation",
                ": \"BUY\" or \"SELL\" or \"HOLD\", \"confidence\": number between 0-100, \"reasoning\": \"Clear, professional analysis covering: current trend, RSI condition, key support/resistance levels, and recommendation rationale. Use bullet points with \u2022 for better readability.\", \"price\": current Bitcoin price in USD as a number, \"rsi\": current RSI value as a number } Base your analysis on: - Current price action and trend direction - RSI levels (>70 overbought, ",
                react_1["default"].createElement(, null),
                " oversold, 30-70 neutral) - Recent volatility and volume patterns - Key support and resistance levels - Overall market sentiment Make the reasoning clear, actionable, and professional. Keep it concise (3-5 key points).` },",
                role,
                ": 'user', content: 'Analyze Bitcoin right now and provide trading recommendation in JSON format only.' } ], model: 'llama-3.3-70b-versatile', temperature: 0.7, max_tokens: 1024, top_p: 1, stream: false }) let analysisText = chatCompletion.choices[0]?.message?.content || '' // Try to parse JSON from the response let analysis: any try ",
                // Remove markdown code blocks if present
                analysisText = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim(),
                "analysis = JSON.parse(analysisText) } catch (e) ",
            // If parsing fails, extract info manually
            ,
                "// If parsing fails, extract info manually const recommendation = analysisText.match(/(?:recommendation|action)[\"']?\\s*:\\s*[\"']?(BUY|SELL|HOLD)/i)?.[1] as 'BUY' | 'SELL' | 'HOLD' || 'HOLD' const confidence = parseInt(analysisText.match(/(?:confidence|score)[\"']?\\s*:\\s*[\"']?(\\d+)/i)?.[1] || '50') const reasoning = analysisText.replace(/\\*\\*/g, '').substring(0, 500) analysis = ", (recommendation,
                confidence,
                reasoning,
                price),
                ": undefined, rsi: undefined } } const toolCallId = nanoid() aiState.done(", (aiState.get(),
                messages),
                ": [ ...aiState.get().messages,",
                id,
                ": nanoid(), role: 'assistant', content: [",
                type,
                ": 'tool-call', toolName: 'analyzeBitcoin', toolCallId, args: ",
                "} ] },",
                id,
                ": nanoid(), role: 'tool', content: [",
                type,
                ": 'tool-result', toolName: 'analyzeBitcoin', toolCallId, result: analysis } ] } ] }) return (",
                react_1["default"].createElement(message_1.BotCard, null,
                    react_1["default"].createElement(bitcoin_recommendation_1.BitcoinRecommendation, { recommendation: analysis.recommendation, confidence: analysis.confidence, reasoning: analysis.reasoning, price: analysis.price, rsi: analysis.rsi })),
                ") } catch (error: any) ",
            ,
                "return (",
                react_1["default"].createElement(message_1.BotCard, null,
                    react_1["default"].createElement("div", { className: "text-red-500" },
                        "Error analyzing Bitcoin: ",
                        error.message)),
                ") } } } } }) return ",
                id,
                ": nanoid(), display: result.value } } catch (err: any) ",
            // If key is missing, show error message that Groq API Key is missing.
            ,
                "// If key is missing, show error message that Groq API Key is missing. if (err.message.includes('OpenAI API key is missing.')) ",
                err.message =
                    'Groq API key is missing. Pass it using the GROQ_API_KEY environment variable. Try restarting the application if you recently changed your environment variables.',
                "return ",
                id,
                ": nanoid(), display: (",
                react_1["default"].createElement("div", { className: "border p-4" },
                    react_1["default"].createElement("div", { className: "text-red-700 font-medium" },
                        "Error: ",
                        err.message),
                    react_1["default"].createElement("a", { href: "https://github.com/bklieger-groq/stockbot-on-groq/issues", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center text-sm text-red-800 hover:text-red-900" },
                        "If you think something has gone wrong, create an",
                        react_1["default"].createElement("span", { className: "ml-1", style: { textDecoration: 'underline' } },
                            ' ',
                            "issue on Github."))),
                ") } } } export const AI = createAI",
                react_1["default"].createElement(AIState, null),
                " UIState>(",
                actions,
                ": ",
                submitUserMessage,
                ", initialUIState: [], initialAIState: ",
                chatId,
                ": nanoid(), messages: [] } })");
            return [2 /*return*/];
        });
    });
}
