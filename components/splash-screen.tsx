'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * SplashScreen Component
 * Displays animated intro with typing effect and fade transition
 * Duration: 2-3 seconds before transitioning to welcome screen
 */
interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [displayText, setDisplayText] = useState('')
  const fullText = 'Nelson-GPT'

  // Typing animation effect
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        // Wait 1.5 seconds after typing completes, then fade out
        setTimeout(onComplete, 1500)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-50 flex flex-col items-center justify-center z-50"
    >
      {/* Main title with typing animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-4 tracking-tight">
          {displayText}
          {displayText.length < fullText.length && (
            <span className="animate-pulse">|</span>
          )}
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-lg text-amber-700 font-medium mb-8"
      >
        Trusted Pediatric AI
      </motion.p>

      {/* Footer tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-sm text-amber-600 text-center max-w-md px-4"
      >
        Pediatric Knowledge at Your Fingertips — Powered by Nelson Textbook of
        Pediatrics
      </motion.p>

      {/* Loading indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-12 flex gap-2"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-2 h-2 bg-amber-500 rounded-full"
          />
        ))}
      </motion.div>
    </motion.div>
  )
}
