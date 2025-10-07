'use client';
"use strict";
exports.__esModule = true;
exports.ETFHeatmap = void 0;
var react_1 = require("react");
function ETFHeatmap(_a) {
    var container = react_1.useRef(null);
    react_1.useEffect(function () {
        if (!container.current)
            return;
        var script = document.createElement('script');
        script.src =
            'https://s3.tradingview.com/external-embedding/embed-widget-etf-heatmap.js';
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = JSON.stringify({
            dataSource: 'AllUSEtf',
            blockSize: 'aum',
            blockColor: 'change',
            grouping: 'asset_class',
            locale: 'en',
            symbolUrl: '',
            colorTheme: 'light',
            hasTopBar: true,
            isDataSetEnabled: true,
            isZoomEnabled: true,
            hasSymbolTooltip: true,
            isMonoSize: false,
            width: '100%',
            height: '100%'
        });
        container.current.appendChild(script);
        return function () {
            if (container.current) {
                container.current.removeChild(script);
            }
        };
    }, []);
    return (react_1["default"].createElement("div", { style: { height: '200px' } },
        react_1["default"].createElement("div", { className: "tradingview-widget-container", ref: container, style: { height: '80%', width: '100%' } },
            react_1["default"].createElement("div", { className: "tradingview-widget-container__widget", style: { height: 'calc(100% - 40px)', width: '100%' } }),
            react_1["default"].createElement("div", { className: "tradingview-widget-copyright" },
                react_1["default"].createElement("a", { href: "https://www.tradingview.com/", rel: "noopener nofollow", target: "_blank" },
                    react_1["default"].createElement("span", { className: "" }, "Track all markets on TradingView"))))));
}
exports.ETFHeatmap = ETFHeatmap;
exports["default"] = react_1.memo(ETFHeatmap);
