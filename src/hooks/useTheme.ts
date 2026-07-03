import { useEffect } from 'react'

import { useAppStore } from '@/stores/app'

export function useTheme() {
  const theme = useAppStore(s => s.theme)
  const setTheme = useAppStore(s => s.setTheme)
  const toggleTheme = useAppStore(s => s.toggleTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return { theme, setTheme, toggleTheme, isDark: theme === 'dark' }
}
