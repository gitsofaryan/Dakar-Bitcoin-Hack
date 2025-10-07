'use client'

import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Minus, Activity, DollarSign } from 'lucide-react'

interface BitcoinRecommendationProps {
    recommendation: 'BUY' | 'SELL' | 'HOLD'
    confidence: number
    reasoning: string
    price?: number
    rsi?: number
}

export function BitcoinRecommendation({
    recommendation,
    confidence,
    reasoning,
    price,
    rsi
}: BitcoinRecommendationProps) {
    const getRecommendationStyles = () => {
        switch (recommendation) {
            case 'BUY':
                return {
                    badge: 'bg-emerald-600 hover:bg-emerald-700 border-emerald-500 text-white',
                    icon: TrendingUp,
                    gradient: 'from-emerald-50 to-green-50',
                    border: 'border-emerald-200',
                    bg: 'bg-white'
                }
            case 'SELL':
                return {
                    badge: 'bg-red-600 hover:bg-red-700 border-red-500 text-white',
                    icon: TrendingDown,
                    gradient: 'from-red-50 to-pink-50',
                    border: 'border-red-200',
                    bg: 'bg-white'
                }
            case 'HOLD':
                return {
                    badge: 'bg-amber-600 hover:bg-amber-700 border-amber-500 text-white',
                    icon: Minus,
                    gradient: 'from-amber-50 to-yellow-50',
                    border: 'border-amber-200',
                    bg: 'bg-white'
                }
            default:
                return {
                    badge: 'bg-gray-600 hover:bg-gray-700 border-gray-500 text-white',
                    icon: Minus,
                    gradient: 'from-gray-50 to-gray-100',
                    border: 'border-gray-200',
                    bg: 'bg-white'
                }
        }
    }

    const getConfidenceColor = () => {
        if (confidence >= 80) return 'text-emerald-600'
        if (confidence >= 60) return 'text-amber-600'
        return 'text-red-600'
    }

    const getConfidenceBar = () => {
        if (confidence >= 80) return 'bg-emerald-500'
        if (confidence >= 60) return 'bg-amber-500'
        return 'bg-red-500'
    }

    const getRSIColor = () => {
        if (!rsi) return 'text-gray-500'
        if (rsi >= 70) return 'text-red-600'
        if (rsi <= 30) return 'text-emerald-600'
        return 'text-amber-600'
    }

    const styles = getRecommendationStyles()
    const Icon = styles.icon

    // Format the reasoning text to remove excessive asterisks and clean up formatting
    const formattedReasoning = reasoning
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/^-\s+/gm, '• ')
        .trim()

    return (
        <div className={`rounded-xl border ${styles.border} bg-gradient-to-br ${styles.gradient} shadow-lg overflow-hidden`}>
            {/* Header */}
            <div className="p-6 pb-4 bg-white/50">
                <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-orange-100 border border-orange-200">
                            <svg className="size-6 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Bitcoin Analysis</h3>
                            <p className="text-sm text-gray-600">AI-Powered Trading Signal</p>
                        </div>
                    </div>
                    <Badge className={`${styles.badge} px-4 py-2 text-base font-bold border shadow-lg flex items-center gap-2`}>
                        <Icon className="size-4" />
                        {recommendation}
                    </Badge>
                </div>

                {/* Confidence Score */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Confidence Level</span>
                        <span className={`text-3xl font-bold ${getConfidenceColor()}`}>
                            {confidence}%
                        </span>
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className={`h-full ${getConfidenceBar()} rounded-full transition-all duration-500 ease-out`}
                            style={{ width: `${confidence}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            {(price || rsi) && (
                <div className="grid grid-cols-2 gap-4 px-6 pb-4">
                    {price && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-1">
                                <DollarSign className="size-4 text-gray-500" />
                                <span className="text-xs font-medium text-gray-600">Current Price</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">
                                ${price.toLocaleString()}
                            </span>
                        </div>
                    )}

                    {rsi && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-1">
                                <Activity className="size-4 text-gray-500" />
                                <span className="text-xs font-medium text-gray-600">RSI Indicator</span>
                            </div>
                            <span className={`text-xl font-bold ${getRSIColor()}`}>
                                {rsi}
                            </span>
                        </div>
                    )}
                </div>
            )}

            {/* Analysis Section */}
            <div className="px-6 pb-6 pt-2">
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-blue-500"></span>
                        Market Analysis
                    </h4>
                    <div className="text-sm text-gray-700 leading-relaxed space-y-2">
                        {formattedReasoning.split('\n\n').map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-4">
                <p className="text-xs text-gray-500 text-center">
                    ⚠️ This is AI-generated analysis. Always do your own research before making investment decisions.
                </p>
            </div>
        </div>
    )
}
