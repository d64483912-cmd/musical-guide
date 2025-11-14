'use client'

import { motion } from 'framer-motion'
import { Trash2, Edit2, Pin } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { useState } from 'react'

/**
 * HistoryPanel Component
 * Displays past chat sessions with options to rename, pin, or delete
 */
export function HistoryPanel() {
  const { sessions, currentSessionId, setCurrentSession, deleteSession, renameSession } = useAppStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  /**
   * Start editing session title
   */
  const startEdit = (id: string, currentTitle: string) => {
    setEditingId(id)
    setEditText(currentTitle)
  }

  /**
   * Save edited session title
   */
  const saveEdit = (id: string) => {
    if (editText.trim()) {
      renameSession(id, editText)
    }
    setEditingId(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex-1 overflow-y-auto px-6 py-8 pb-24"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Chat History</h2>

      {sessions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No chat history yet</p>
          <p className="text-gray-400 text-sm mt-2">Start a new conversation to begin</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer group ${
                currentSessionId === session.id
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-gray-200 bg-white hover:border-amber-300'
              }`}
              onClick={() => setCurrentSession(session.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  {editingId === session.id ? (
                    <input
                      autoFocus
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={() => saveEdit(session.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit(session.id)
                        if (e.key === 'Escape') setEditingId(null)
                      }}
                      className="w-full px-2 py-1 border border-amber-500 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <>
                      <h3 className="font-semibold text-gray-900 truncate">
                        {session.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {session.messages.length} messages •{' '}
                        {new Date(session.updatedAt).toLocaleDateString()}
                      </p>
                    </>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      startEdit(session.id, session.title)
                    }}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="Rename"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="Pin"
                  >
                    <Pin className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteSession(session.id)
                    }}
                    className="p-1 hover:bg-red-100 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
