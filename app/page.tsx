'use client'

import { AppContainer } from '@/components/app-container'

/**
 * Home Page Component
 * Main entry point for Nelson-GPT application
 * Renders the app container which manages all screens and transitions
 */
export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden">
      <AppContainer />
    </main>
  )
}
