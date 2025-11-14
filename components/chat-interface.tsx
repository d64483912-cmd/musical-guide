'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send, Loader2, RotateCcw, Square } from 'lucide-react'
import { ChatMessage } from './chat-message'
import { useAppStore, Message } from '@/lib/store'

/**
 * ChatInterface Component
 * Main chat screen with message display, input dock, and streaming support
 * Displays all messages from current session with real-time streaming
 */
export function ChatInterface() {
  const {
    sessions,
    currentSessionId,
    isLoading,
    setLoading,
    addMessage,
    currentMode,
    setMode,
  } = useAppStore()

  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get current session
  const currentSession = sessions.find((s) => s.id === currentSessionId)

  /**
   * Auto-scroll to bottom when new messages arrive
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentSession?.messages])

  /**
   * Handle message submission
   * Sends message to API and streams response
   */
  const handleSubmit = async () => {
    if (!input.trim() || !currentSession) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }
    addMessage(userMessage)
    setInput('')
    setLoading(true)
    setIsStreaming(true)

    try {
      // Call API endpoint for streaming response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          mode: currentMode,
          sessionId: currentSessionId,
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      // Stream response text
      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      let assistantContent = ''
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        citations: [],
      }

      // Read streaming chunks
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = new TextDecoder().decode(value)
        assistantContent += chunk
        assistantMessage.content = assistantContent

        // Update message in real-time
        addMessage(assistantMessage)
      }
    } catch (error) {
      console.error('Chat error:', error)
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content:
          'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
      }
      addMessage(errorMessage)
    } finally {
      setLoading(false)
      setIsStreaming(false)
    }
  }

  /**
   * Handle Enter key submission (Shift+Enter for new line)
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  if (!currentSession) return null

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {currentSession.title}
          </h2>
          <p className="text-sm text-gray-600">
            {currentMode === 'academic' ? 'Academic Mode' : 'Clinical Mode'}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <RotateCcw className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-xl">⋮</span>
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-4">
        {currentSession.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-gray-500 text-lg mb-2">
                Start a conversation about pediatric topics
              </p>
              <p className="text-gray-400 text-sm">
                Ask about conditions, guidelines, treatments, or clinical
                approaches
              </p>
            </div>
          </div>
        ) : (
          <>
            {currentSession.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isStreaming && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-2 text-gray-600"
              >
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Nelson-GPT is thinking…</span>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Dock */}
      <div className="border-t border-gray-200 bg-white/80 backdrop-blur-sm px-6 py-4 space-y-3">
        {/* Mode Toggle */}
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setMode('academic')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
              currentMode === 'academic'
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Academic
          </button>
          <button
            onClick={() => setMode('clinical')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
              currentMode === 'clinical'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Clinical
          </button>
        </div>

        {/* Input Area */}
        <div className="flex gap-3 items-end">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a follow-up question…"
            className="flex-1 resize-none border-gray-300 focus:ring-amber-500 focus:border-amber-500 rounded-xl"
            rows={2}
            disabled={isLoading}
          />
          <div className="flex gap-2">
            {isStreaming && (
              <Button
                onClick={() => setIsStreaming(false)}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <Square className="w-5 h-5" />
              </Button>
            )}
            <Button
              onClick={handleSubmit}
              disabled={!input.trim() || isLoading}
              className="rounded-full bg-amber-500 hover:bg-amber-600 text-white"
              size="icon"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
