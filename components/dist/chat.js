'use client';
"use strict";
exports.__esModule = true;
exports.Chat = void 0;
var utils_1 = require("@/lib/utils");
var chat_list_1 = require("@/components/chat-list");
var chat_panel_1 = require("@/components/chat-panel");
var empty_screen_1 = require("@/components/empty-screen");
var use_local_storage_1 = require("@/lib/hooks/use-local-storage");
var react_1 = require("react");
var rsc_1 = require("ai/rsc");
var navigation_1 = require("next/navigation");
var use_scroll_anchor_1 = require("@/lib/hooks/use-scroll-anchor");
var sonner_1 = require("sonner");
var ticker_tape_1 = require("@/components/tradingview/ticker-tape");
var missing_api_key_banner_1 = require("@/components/missing-api-key-banner");
function Chat(_a) {
    var id = _a.id, className = _a.className, session = _a.session, missingKeys = _a.missingKeys;
    var router = navigation_1.useRouter();
    var path = navigation_1.usePathname();
    var _b = react_1.useState(''), input = _b[0], setInput = _b[1];
    var messages = rsc_1.useUIState()[0];
    var aiState = rsc_1.useAIState()[0];
    var _c = use_local_storage_1.useLocalStorage('newChatId', id), _ = _c[0], setNewChatId = _c[1];
    react_1.useEffect(function () {
        if (session === null || session === void 0 ? void 0 : session.user) {
            if (!path.includes('chat') && messages.length === 1) {
                window.history.replaceState({}, '', "/chat/" + id);
            }
        }
    }, [id, path, session === null || session === void 0 ? void 0 : session.user, messages]);
    react_1.useEffect(function () {
        var _a;
        var messagesLength = (_a = aiState.messages) === null || _a === void 0 ? void 0 : _a.length;
        if (messagesLength === 2) {
            router.refresh();
        }
        console.log('Value: ', aiState.messages);
    }, [aiState.messages, router]);
    react_1.useEffect(function () {
        setNewChatId(id);
    });
    react_1.useEffect(function () {
        missingKeys.map(function (key) {
            sonner_1.toast.error("Missing " + key + " environment variable!");
        });
    }, [missingKeys]);
    var _d = use_scroll_anchor_1.useScrollAnchor(), messagesRef = _d.messagesRef, scrollRef = _d.scrollRef, visibilityRef = _d.visibilityRef, isAtBottom = _d.isAtBottom, scrollToBottom = _d.scrollToBottom;
    return (React.createElement("div", { className: "group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]", ref: scrollRef },
        messages.length ? (React.createElement(missing_api_key_banner_1.MissingApiKeyBanner, { missingKeys: missingKeys })) : (React.createElement(ticker_tape_1.TickerTape, null)),
        React.createElement("div", { className: utils_1.cn(messages.length ? 'pb-[200px] pt-4 md:pt-6' : 'pb-[280px] pt-0', className), ref: messagesRef },
            messages.length ? (React.createElement(chat_list_1.ChatList, { messages: messages, isShared: false, session: session })) : (React.createElement(empty_screen_1.EmptyScreen, null)),
            React.createElement("div", { className: "w-full h-px", ref: visibilityRef })),
        React.createElement(chat_panel_1.ChatPanel, { id: id, input: input, setInput: setInput, isAtBottom: isAtBottom, scrollToBottom: scrollToBottom })));
}
exports.Chat = Chat;
