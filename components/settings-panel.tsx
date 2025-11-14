'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

/**
 * SettingsPanel Component
 * Allows users to customize theme, font size, AI style, and disclaimers
 */
export function SettingsPanel() {
  const { theme, setTheme, fontSize, setFontSize } = useAppStore()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex-1 overflow-y-auto px-6 py-8 pb-24"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Settings</h2>

      <div className="space-y-8 max-w-md">
        {/* Theme Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
              <Label htmlFor="theme" className="font-medium text-gray-700">
                Dark Mode
              </Label>
              <Switch
                id="theme"
                checked={theme === 'dark'}
                onCheckedChange={(checked) =>
                  setTheme(checked ? 'dark' : 'light')
                }
              />
            </div>

            {/* Font Size */}
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <Label className="font-medium text-gray-700 block mb-3">
                Font Size
              </Label>
              <div className="flex gap-2">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      fontSize === size
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Behavior Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Behavior</h3>
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>Academic Mode:</strong> Detailed textbook-style explanations
                with comprehensive evidence and citations
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>Clinical Mode:</strong> Practical diagnostic and treatment
                approaches focused on clinical decision-making
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Legal</h3>
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-900">
              <strong>⚠️ Medical Disclaimer:</strong> Nelson-GPT provides educational
              information only and should not replace professional medical advice.
              Always consult qualified healthcare providers for clinical decisions.
            </p>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <strong>Nelson-GPT v1.0</strong>
            </p>
            <p>
              Pediatric Knowledge Assistant powered by Nelson Textbook of Pediatrics
            </p>
            <p>
              Built with Next.js, Mistral API, and Supabase pgvector for semantic
              search
            </p>
            <p className="text-xs text-gray-500 mt-4">
              © 2025 Nelson-GPT. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
