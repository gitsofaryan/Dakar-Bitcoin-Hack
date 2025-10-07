'use client';
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
exports.PromptForm = void 0;
var React = require("react");
var react_textarea_autosize_1 = require("react-textarea-autosize");
var rsc_1 = require("ai/rsc");
var message_1 = require("./stocks/message");
var button_1 = require("@/components/ui/button");
var icons_1 = require("@/components/ui/icons");
var tooltip_1 = require("@/components/ui/tooltip");
var use_enter_submit_1 = require("@/lib/hooks/use-enter-submit");
var nanoid_1 = require("nanoid");
var navigation_1 = require("next/navigation");
var use_local_storage_1 = require("@/lib/hooks/use-local-storage");
function PromptForm(_a) {
    var _this = this;
    var input = _a.input, setInput = _a.setInput;
    var router = navigation_1.useRouter();
    var _b = use_enter_submit_1.useEnterSubmit(), formRef = _b.formRef, onKeyDown = _b.onKeyDown;
    var inputRef = React.useRef(null);
    var submitUserMessage = rsc_1.useActions().submitUserMessage;
    var _c = rsc_1.useUIState(), _ = _c[0], setMessages = _c[1];
    var _d = use_local_storage_1.useLocalStorage('groqKey', ''), apiKey = _d[0], setApiKey = _d[1];
    React.useEffect(function () {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);
    return (React.createElement("form", { ref: formRef, onSubmit: function (e) { return __awaiter(_this, void 0, void 0, function () {
            var value, responseMessage;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        e.preventDefault();
                        // Blur focus on mobile
                        if (window.innerWidth < 600) {
                            (_a = e.target['message']) === null || _a === void 0 ? void 0 : _a.blur();
                        }
                        value = input.trim();
                        setInput('');
                        if (!value)
                            return [2 /*return*/];
                        // Optimistically add user message UI
                        setMessages(function (currentMessages) { return __spreadArrays(currentMessages, [
                            {
                                id: nanoid_1.nanoid(),
                                display: React.createElement(message_1.UserMessage, null, value)
                            }
                        ]); });
                        return [4 /*yield*/, submitUserMessage(value, apiKey)];
                    case 1:
                        responseMessage = _b.sent();
                        setMessages(function (currentMessages) { return __spreadArrays(currentMessages, [responseMessage]); });
                        return [2 /*return*/];
                }
            });
        }); } },
        React.createElement("div", { className: "relative flex max-h-60 w-full grow flex-col overflow-hidden bg-white px-8 sm:rounded-xl sm:border sm:px-12 border-gray-200 shadow-sm" },
            React.createElement(tooltip_1.Tooltip, null,
                React.createElement(tooltip_1.TooltipTrigger, { asChild: true },
                    React.createElement(button_1.Button, { variant: "outline", size: "icon", className: "absolute left-0 top-[14px] size-8 rounded-full bg-white border-gray-200 hover:bg-gray-50 p-0 sm:left-4", onClick: function () {
                            router.push('/new');
                        } },
                        React.createElement(icons_1.IconPlus, null),
                        React.createElement("span", { className: "sr-only" }, "New Chat"))),
                React.createElement(tooltip_1.TooltipContent, null, "New Chat")),
            React.createElement(react_textarea_autosize_1["default"], { ref: inputRef, tabIndex: 0, onKeyDown: onKeyDown, placeholder: "Send a message.", className: "min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm text-gray-900 placeholder:text-gray-400", autoFocus: true, spellCheck: false, autoComplete: "off", autoCorrect: "off", name: "message", rows: 1, value: input, onChange: function (e) { return setInput(e.target.value); } }),
            React.createElement("div", { className: "absolute right-0 top-[13px] sm:right-4" },
                React.createElement(tooltip_1.Tooltip, null,
                    React.createElement(tooltip_1.TooltipTrigger, { asChild: true },
                        React.createElement(button_1.Button, { type: "submit", size: "icon", disabled: input === '', className: "bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50" },
                            React.createElement("div", { className: "rotate-180" },
                                React.createElement(icons_1.IconArrowDown, null)),
                            React.createElement("span", { className: "sr-only" }, "Send message"))),
                    React.createElement(tooltip_1.TooltipContent, null, "Send message"))))));
}
exports.PromptForm = PromptForm;
