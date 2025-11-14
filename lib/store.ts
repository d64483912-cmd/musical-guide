import { create } from 'zustand'

/**
 * Message type for chat history
 * Stores individual messages with metadata
 */
export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  citations?: Array<{
    chapter: string
    page: number
    text: string
  }>
  timestamp: Date
}

/**
 * Chat session type
 * Represents a complete conversation thread
 */
export interface ChatSession {
  id: string
  title: string
  messages: Message[]
  mode: 'academic' | 'clinical'
  createdAt: Date
  updatedAt: Date
}

/**
 * Application state store using Zustand
 * Manages chat sessions, current chat, UI state, and settings
 */
interface AppStore {
  // Chat state
  sessions: ChatSession[]
  currentSessionId: string | null
  isLoading: boolean
  
  // UI state
  showWelcome: boolean
  currentMode: 'academic' | 'clinical'
  activeTab: 'chat' | 'history' | 'settings' | 'profile'
  
  // Settings
  theme: 'light' | 'dark'
  fontSize: 'small' | 'medium' | 'large'
  showDisclaimer: boolean
  
  // Actions
  createSession: (title: string) => void
  setCurrentSession: (sessionId: string) => void
  addMessage: (message: Message) => void
  setLoading: (loading: boolean) => void
  setShowWelcome: (show: boolean) => void
  setMode: (mode: 'academic' | 'clinical') => void
  setActiveTab: (tab: 'chat' | 'history' | 'settings' | 'profile') => void
  setTheme: (theme: 'light' | 'dark') => void
  setFontSize: (size: 'small' | 'medium' | 'large') => void
  deleteSession: (sessionId: string) => void
  renameSession: (sessionId: string, newTitle: string) => void
}

/**
 * Zustand store for global application state
 * Persists to localStorage for offline support
 */
export const useAppStore = create<AppStore>((set, get) => ({
  // Initial state
  sessions: [],
  currentSessionId: null,
  isLoading: false,
  showWelcome: true,
  currentMode: 'academic',
  activeTab: 'chat',
  theme: 'light',
  fontSize: 'medium',
  showDisclaimer: true,

  // Create a new chat session
  createSession: (title: string) => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title,
      messages: [],
      mode: get().currentMode,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    set((state) => ({
      sessions: [newSession, ...state.sessions],
      currentSessionId: newSession.id,
      showWelcome: false,
    }))
  },

  // Set the current active session
  setCurrentSession: (sessionId: string) => {
    set({ currentSessionId: sessionId })
  },

  // Add a message to the current session
  addMessage: (message: Message) => {
    set((state) => {
      if (!state.currentSessionId) return state
      return {
        sessions: state.sessions.map((session) =>
          session.id === state.currentSessionId
            ? {
                ...session,
                messages: [...session.messages, message],
                updatedAt: new Date(),
              }
            : session
        ),
      }
    })
  },

  // Set loading state for streaming responses
  setLoading: (loading: boolean) => {
    set({ isLoading: loading })
  },

  // Show/hide welcome screen
  setShowWelcome: (show: boolean) => {
    set({ showWelcome: show })
  },

  // Set academic or clinical mode
  setMode: (mode: 'academic' | 'clinical') => {
    set({ currentMode: mode })
  },

  // Set active tab in footer menu
  setActiveTab: (tab: 'chat' | 'history' | 'settings' | 'profile') => {
    set({ activeTab: tab })
  },

  // Set theme (light/dark)
  setTheme: (theme: 'light' | 'dark') => {
    set({ theme })
  },

  // Set font size
  setFontSize: (size: 'small' | 'medium' | 'large') => {
    set({ fontSize: size })
  },

  // Delete a session
  deleteSession: (sessionId: string) => {
    set((state) => ({
      sessions: state.sessions.filter((s) => s.id !== sessionId),
      currentSessionId:
        state.currentSessionId === sessionId ? null : state.currentSessionId,
    }))
  },

  // Rename a session
  renameSession: (sessionId: string, newTitle: string) => {
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === sessionId
          ? { ...session, title: newTitle, updatedAt: new Date() }
          : session
      ),
    }))
  },
}))
