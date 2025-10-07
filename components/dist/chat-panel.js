"use strict";
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
exports.ChatPanel = void 0;
var React = require("react");
var react_1 = require("react");
var prompt_form_1 = require("@/components/prompt-form");
var button_scroll_to_bottom_1 = require("@/components/button-scroll-to-bottom");
var footer_1 = require("@/components/footer");
var rsc_1 = require("ai/rsc");
var nanoid_1 = require("nanoid");
var message_1 = require("./stocks/message");
function ChatPanel(_a) {
    var _this = this;
    var id = _a.id, title = _a.title, input = _a.input, setInput = _a.setInput, isAtBottom = _a.isAtBottom, scrollToBottom = _a.scrollToBottom;
    var aiState = rsc_1.useAIState()[0];
    var _b = rsc_1.useUIState(), messages = _b[0], setMessages = _b[1];
    var submitUserMessage = rsc_1.useActions().submitUserMessage;
    var exampleMessages = [
        {
            heading: '₿ Should I buy Bitcoin?',
            subheading: 'Get AI trading recommendation',
            message: 'Should I buy Bitcoin?',
            icon: '₿',
            gradient: 'from-orange-500/10 to-amber-500/10'
        },
        {
            heading: '🪙 Bitcoin Price',
            subheading: 'Check current BTC price',
            message: 'What is the price of Bitcoin?',
            icon: '🪙',
            gradient: 'from-yellow-500/10 to-orange-500/10'
        },
        {
            heading: '� Bitcoin Chart',
            subheading: 'View BTC price chart',
            message: 'Show me a Bitcoin chart',
            icon: '�',
            gradient: 'from-blue-500/10 to-cyan-500/10'
        },
        {
            heading: '� BTC Analysis',
            subheading: 'Detailed market analysis',
            message: 'Analyze Bitcoin for me',
            icon: '�',
            gradient: 'from-green-500/10 to-emerald-500/10'
        }
    ];
    var _c = react_1.useState([]), randExamples = _c[0], setRandExamples = _c[1];
    react_1.useEffect(function () {
        setRandExamples(exampleMessages); // Show all 4 Bitcoin cards
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (React.createElement("div", { className: "fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-transparent via-white/90 to-white duration-300 ease-in-out animate-in peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]" },
        React.createElement(button_scroll_to_bottom_1.ButtonScrollToBottom, { isAtBottom: isAtBottom, scrollToBottom: scrollToBottom }),
        React.createElement("div", { className: "mx-auto sm:max-w-2xl sm:px-4 pt-8 pb-4" },
            React.createElement("div", { className: "mb-4 grid grid-cols-2 gap-4 px-4 sm:px-0" }, messages.length === 0 &&
                randExamples.map(function (example) { return (React.createElement("div", { key: example.heading, className: "group cursor-pointer rounded-xl border border-gray-200 \r\n                    bg-white hover:bg-gray-50\r\n                    hover:border-gray-300 hover:shadow-md\r\n                    transition-all duration-200\r\n                    p-5", onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                        var responseMessage;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    setMessages(function (currentMessages) { return __spreadArrays(currentMessages, [
                                        {
                                            id: nanoid_1.nanoid(),
                                            display: React.createElement(message_1.UserMessage, null, example.message)
                                        }
                                    ]); });
                                    return [4 /*yield*/, submitUserMessage(example.message)];
                                case 1:
                                    responseMessage = _a.sent();
                                    setMessages(function (currentMessages) { return __spreadArrays(currentMessages, [
                                        responseMessage
                                    ]); });
                                    return [2 /*return*/];
                            }
                        });
                    }); } },
                    React.createElement("div", { className: "flex items-start gap-3.5" },
                        React.createElement("div", { className: "text-2xl shrink-0" }, example.icon),
                        React.createElement("div", { className: "flex-1 min-w-0" },
                            React.createElement("div", { className: "text-sm font-semibold text-gray-900 mb-1.5 group-hover:text-gray-700 transition-colors leading-tight" }, example.heading),
                            React.createElement("div", { className: "text-xs text-gray-500 group-hover:text-gray-600 transition-colors leading-relaxed" }, example.subheading))))); })),
            React.createElement("div", { className: "space-y-3 border-t border-gray-200 bg-white/95 backdrop-blur-sm px-4 py-3 shadow-lg sm:border sm:py-4" },
                React.createElement(prompt_form_1.PromptForm, { input: input, setInput: setInput }),
                React.createElement(footer_1.FooterText, { className: "hidden sm:block" })))));
}
exports.ChatPanel = ChatPanel;
