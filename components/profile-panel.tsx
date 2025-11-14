'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Download, LogOut } from 'lucide-react'

/**
 * ProfilePanel Component
 * Displays user profile information and account actions
 */
export function ProfilePanel() {
  /**
   * Export chat history as JSON
   */
  const handleExportData = () => {
    // In a real app, this would export user's chat history
    const data = {
      exportDate: new Date().toISOString(),
      version: '1.0',
      message: 'Chat history export functionality would be implemented here',
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `nelson-gpt-export-${Date.now()}.json`
    a.click()
  }

  /**
   * Sign out user
   */
  const handleSignOut = () => {
    // In a real app, this would handle authentication logout
    alert('Sign out functionality would be implemented here')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex-1 overflow-y-auto px-6 py-8 pb-24"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Profile</h2>

      <div className="space-y-6 max-w-md">
        {/* User Info Card */}
        <div className="p-6 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">N</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Guest User</h3>
              <p className="text-sm text-gray-600">Anonymous session</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-600">
                <strong>Status:</strong> Not signed in
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                <strong>Session:</strong> Local storage
              </p>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Account</h3>
          <div className="space-y-2">
            <Button
              onClick={handleExportData}
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <Download className="w-4 h-4" />
              Export Chat History
            </Button>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Usage Stats */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage</h3>
          <div className="p-4 bg-white rounded-lg border border-gray-200 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Conversations:</span>
              <span className="font-semibold text-gray-900">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Messages:</span>
              <span className="font-semibold text-gray-900">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Storage Used:</span>
              <span className="font-semibold text-gray-900">0 KB</span>
            </div>
          </div>
        </div>

        {/* Help & Support */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Help & Support</h3>
          <div className="space-y-2 text-sm">
            <a
              href="#"
              className="block p-3 bg-white rounded-lg border border-gray-200 text-amber-600 hover:bg-amber-50 transition-colors"
            >
              📖 Documentation
            </a>
            <a
              href="#"
              className="block p-3 bg-white rounded-lg border border-gray-200 text-amber-600 hover:bg-amber-50 transition-colors"
            >
              ❓ FAQ
            </a>
            <a
              href="#"
              className="block p-3 bg-white rounded-lg border border-gray-200 text-amber-600 hover:bg-amber-50 transition-colors"
            >
              📧 Contact Support
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
