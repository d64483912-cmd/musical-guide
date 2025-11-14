'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Clock, Settings, User } from 'lucide-react'
import { useAppStore } from '@/lib/store'

/**
 * FooterMenubar Component
 * Fixed footer navigation with four persistent tabs
 * Replaces traditional sidebar with mobile-friendly bottom navigation
 */
export function FooterMenubar() {
  const { activeTab, setActiveTab } = useAppStore()

  const tabs = [
    { id: 'chat' as const, label: 'Chat', icon: MessageCircle },
    { id: 'history' as const, label: 'History', icon: Clock },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ]

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl"
    >
      <div className="flex items-center justify-around max-w-4xl mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex flex-col items-center justify-center py-4 px-3 relative group transition-colors duration-200"
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              {/* Icon */}
              <Icon
                className={`w-6 h-6 transition-colors duration-200 ${
                  isActive ? 'text-amber-600' : 'text-gray-600 group-hover:text-gray-900'
                }`}
              />

              {/* Label */}
              <span
                className={`text-xs mt-1 font-medium transition-colors duration-200 ${
                  isActive ? 'text-amber-600' : 'text-gray-600 group-hover:text-gray-900'
                }`}
              >
                {tab.label}
              </span>

              {/* Tooltip on hover */}
              <div className="absolute bottom-full mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {tab.label}
              </div>
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
