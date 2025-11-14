'use client'

import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { Message } from '@/lib/store'

/**
 * ChatMessage Component
 * Renders individual chat messages with markdown support and citations
 * User messages: right-aligned beige bubble
 * Assistant messages: left-aligned white bubble with amber accent
 */
interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false)

  /**
   * Copy message content to clipboard
   */
  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-xl lg:max-w-2xl ${
          isUser
            ? 'bg-amber-100 text-gray-900 rounded-3xl rounded-tr-lg'
            : 'bg-white border-l-4 border-l-amber-500 rounded-3xl rounded-tl-lg shadow-md'
        } px-6 py-4`}
      >
        {/* Message content with markdown rendering */}
        <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:text-amber-900 prose-a:text-amber-600 prose-code:bg-gray-100 prose-code:text-gray-900 prose-pre:bg-gray-100">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.content}
          </ReactMarkdown>
        </div>

        {/* Citations section */}
        {message.citations && message.citations.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-300 text-sm">
            <p className="font-semibold text-amber-900 mb-2">Sources:</p>
            <ul className="space-y-1">
              {message.citations.map((citation, idx) => (
                <li key={idx} className="text-gray-700">
                  <span className="font-medium">Nelson, {citation.chapter}</span> (p.{' '}
                  {citation.page})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Copy button for assistant messages */}
        {!isUser && (
          <button
            onClick={handleCopy}
            className="mt-3 flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        )}
      </div>
    </motion.div>
  )
}
