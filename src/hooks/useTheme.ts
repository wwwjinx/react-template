import { useThemeStore } from '@/stores/theme'

export function useTheme() {
  const theme = useThemeStore(s => s.theme)
  const setTheme = useThemeStore(s => s.setTheme)
  const toggleTheme = useThemeStore(s => s.toggleTheme)

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return { theme, setTheme, toggleTheme, isDark: theme === 'dark' }
}
