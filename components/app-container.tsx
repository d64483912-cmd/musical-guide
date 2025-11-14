'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SplashScreen } from './splash-screen'
import { WelcomeScreen } from './welcome-screen'
import { ChatInterface } from './chat-interface'
import { FooterMenubar } from './footer-menubar'
import { HistoryPanel } from './history-panel'
import { SettingsPanel } from './settings-panel'
import { ProfilePanel } from './profile-panel'
import { useAppStore } from '@/lib/store'

/**
 * AppContainer Component
 * Main application wrapper that manages all screens and transitions
 * Handles splash screen → welcome screen → chat interface flow
 */
export function AppContainer() {
  const [showSplash, setShowSplash] = useState(true)
  const { showWelcome, currentSessionId, activeTab } = useAppStore()

  /**
   * Hide splash screen after animation completes
   */
  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  // Determine which screen to show
  const isInChat = !showWelcome && currentSessionId
  const showFooter = !showWelcome

  return (
    <div className="h-screen w-screen overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        {/* Splash Screen */}
        {showSplash && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}

        {/* Welcome Screen */}
        {!showSplash && showWelcome && (
          <WelcomeScreen key="welcome" />
        )}

        {/* Chat Interface */}
        {!showSplash && !showWelcome && isInChat && (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full flex flex-col"
          >
            {/* Render active tab content */}
            {activeTab === 'chat' && <ChatInterface />}
            {activeTab === 'history' && <HistoryPanel />}
            {activeTab === 'settings' && <SettingsPanel />}
            {activeTab === 'profile' && <ProfilePanel />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Menubar - shown after welcome screen */}
      {showFooter && (
        <div className="fixed bottom-0 left-0 right-0 z-40">
          <FooterMenubar />
        </div>
      )}
    </div>
  )
}
