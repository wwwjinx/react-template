import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface AppState {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light'
  }
  const stored = localStorage.getItem('app-storage')
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      if (parsed?.state?.theme) {
        return parsed.state.theme
      }
    }
    catch { /* ignore */ }
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: getPreferredTheme(),
      setTheme: theme => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
    }),
    { name: 'app-storage' },
  ),
)
