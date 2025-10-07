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
exports.__esModule = true;
exports.Header = void 0;
var React = require("react");
var link_1 = require("next/link");
var utils_1 = require("@/lib/utils");
var button_1 = require("@/components/ui/button");
var icons_1 = require("@/components/ui/icons");
function UserOrLogin() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "flex items-center font-semibold" },
                        React.createElement(link_1["default"], { href: "/new", className: "hover:opacity-80 transition-opacity" }, "BitQuine"),
                        React.createElement(icons_1.IconSeparator, { className: "size-6 text-muted-foreground/50" }),
                        React.createElement(link_1["default"], { href: "/new", className: utils_1.cn(button_1.buttonVariants({ variant: 'ghost' })), style: { borderRadius: 0, color: '#F55036', padding: '4px' } },
                            React.createElement("span", { className: "flex" }, "Start New Chat")))))];
        });
    });
}
function Header() {
    return (React.createElement("header", { className: "sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl" },
        React.createElement("div", { className: "flex items-center" },
            React.createElement(React.Suspense, { fallback: React.createElement("div", { className: "flex-1 overflow-auto" }) },
                React.createElement(UserOrLogin, null))),
        React.createElement("div", { className: "flex items-center justify-end space-x-2" },
            React.createElement("a", { target: "_blank", href: "https://github.com/gitsofaryan", rel: "noopener noreferrer", className: utils_1.cn(button_1.buttonVariants({ variant: 'outline' })), style: { borderRadius: 0 } },
                React.createElement(icons_1.IconGitHub, null),
                React.createElement("span", { className: "hidden ml-2 md:flex" }, "GitHub")))));
}
exports.Header = Header;
