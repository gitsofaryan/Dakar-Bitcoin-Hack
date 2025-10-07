import * as React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconShare } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'
import { useAIState, useActions, useUIState } from 'ai/rsc'
import type { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { UserMessage } from './stocks/message'

export interface ChatPanelProps {
  id?: string
  title?: string
  input: string
  setInput: (value: string) => void
  isAtBottom: boolean
  scrollToBottom: () => void
}

export function ChatPanel({
  id,
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom
}: ChatPanelProps) {
  const [aiState] = useAIState()
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()

  const exampleMessages = [
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
  ]

  interface ExampleMessage {
    heading: string
    subheading: string
    message: string
    icon: string
    gradient: string
  }

  const [randExamples, setRandExamples] = useState<ExampleMessage[]>([])

  useEffect(() => {
    setRandExamples(exampleMessages) // Show all 4 Bitcoin cards
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-transparent via-white/90 to-white duration-300 ease-in-out animate-in peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className="mx-auto sm:max-w-2xl sm:px-4 pt-8 pb-4">
        <div className="mb-4 grid grid-cols-2 gap-4 px-4 sm:px-0">
          {messages.length === 0 &&
            randExamples.map((example) => (
              <div
                key={example.heading}
                className="group cursor-pointer rounded-xl border border-gray-200 
                    bg-white hover:bg-gray-50
                    hover:border-gray-300 hover:shadow-md
                    transition-all duration-200
                    p-5"
                onClick={async () => {
                  setMessages((currentMessages: any) => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: <UserMessage>{example.message}</UserMessage>
                    }
                  ])

                  const responseMessage = await submitUserMessage(
                    example.message
                  )
                  setMessages((currentMessages: any) => [
                    ...currentMessages,
                    responseMessage
                  ])
                }}
              >
                <div className="flex items-start gap-3.5">
                  <div className="text-2xl shrink-0">{example.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 mb-1.5 group-hover:text-gray-700 transition-colors leading-tight">
                      {example.heading}
                    </div>
                    <div className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors leading-relaxed">
                      {example.subheading}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="space-y-3 border-t border-gray-200 bg-white/95 backdrop-blur-sm px-4 py-3 shadow-lg sm:border sm:py-4">
          <PromptForm input={input} setInput={setInput} />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  )
}
