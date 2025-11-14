'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'
import { useAppStore } from '@/lib/store'

/**
 * WelcomeScreen Component
 * Displays hero input box with mode toggle and send button
 * Transitions to chat interface on message submission
 */
export function WelcomeScreen() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<'academic' | 'clinical'>('academic')
  const { createSession, setMode: setStoreMode } = useAppStore()

  /**
   * Handle message submission
   * Creates new session and transitions to chat
   */
  const handleSubmit = () => {
    if (input.trim()) {
      setStoreMode(mode)
      createSession(input.substring(0, 50) + (input.length > 50 ? '...' : ''))
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 flex flex-col items-center justify-center px-4"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-2">
          Nelson-GPT
        </h1>
        <p className="text-amber-700 text-lg">
          Pediatric Knowledge at Your Fingertips
        </p>
      </motion.div>

      {/* Hero Input Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-6 space-y-4">
          {/* Mode Toggle */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setMode('academic')}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                mode === 'academic'
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Academic
            </button>
            <button
              onClick={() => setMode('clinical')}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                mode === 'clinical'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Clinical
            </button>
          </div>

          {/* Input Area */}
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Nelson-GPT anything about pediatric conditions, guidelines, or treatments…"
            className="min-h-24 resize-none border-0 focus:ring-0 text-base placeholder:text-gray-400"
          />

          {/* Send Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!input.trim()}
              className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Footer Info */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-12 text-center text-sm text-amber-600 max-w-md"
      >
        <strong>Academic Mode:</strong> Textbook-style explanations with detailed
        evidence
        <br />
        <strong>Clinical Mode:</strong> Practical diagnostic and treatment
        approaches
      </motion.p>
    </motion.div>
  )
}
