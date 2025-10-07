"use strict";
exports.__esModule = true;
exports.viewport = exports.metadata = void 0;
var sans_1 = require("geist/font/sans");
var mono_1 = require("geist/font/mono");
require("@/app/globals.css");
var utils_1 = require("@/lib/utils");
// import { ThemeToggle } from '@/components/theme-toggle'
var providers_1 = require("@/components/providers");
var header_1 = require("@/components/header");
var sonner_1 = require("@/components/ui/sonner");
exports.metadata = {
    metadataBase: process.env.VERCEL_URL
        ? new URL("https://" + process.env.VERCEL_URL)
        : undefined,
    title: {
        "default": 'StockBot powered by Groq',
        template: "%s - StockBot powered by Groq"
    },
    description: 'Lightning Fast AI Chatbot that Responds With Live Interactive Stock Charts, Financials, News, Screeners, and More.',
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png'
    }
};
exports.viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' }
    ]
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en", suppressHydrationWarning: true },
        React.createElement("body", { className: utils_1.cn('font-sans antialiased', sans_1.GeistSans.variable, mono_1.GeistMono.variable) },
            React.createElement(sonner_1.Toaster, { position: "top-center" }),
            React.createElement(providers_1.Providers, { attribute: "class", defaultTheme: "light", enableSystem: false, disableTransitionOnChange: true, forcedTheme: "light" },
                React.createElement("div", { className: "flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" },
                    React.createElement(header_1.Header, null),
                    React.createElement("main", { className: "flex flex-col flex-1" }, children))))));
}
exports["default"] = RootLayout;
