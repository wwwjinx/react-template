import type { MouseEvent } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark'

export interface ThemeState {
  theme: Theme
}

export interface ThemeAction {
  setTheme: (theme: Theme) => void
  toggleTheme: (event: MouseEvent) => void
}

export const THEME_STORAGE_KEY = 'theme-storage'

function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light'
  }
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
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

const isAppearanceTransition
  = typeof document !== 'undefined'
    // @ts-expect-error: Transition API
    && document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const useThemeStore = create<ThemeState & ThemeAction>()(
  persist(
    (set, get) => {
      const initTheme = getPreferredTheme()
      document.documentElement.dataset.theme = initTheme

      return {
        theme: initTheme,
        setTheme: theme => set({ theme }),
        toggleTheme: (event) => {
          console.log('toggleTheme', get().theme)

          const isDark = get().theme === 'dark'

          if (!isAppearanceTransition || !event) {
            set({ theme: isDark ? 'light' : 'dark' })
            return
          }

          const x = event.clientX
          const y = event.clientY
          // 返回其参数平方和的平方根。
          const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y),
          )

          // startViewTransition 开始新的单页（SPA）视图过渡并返回一个表示它的 transition 对象
          const transition = document.startViewTransition(() => {
            const newTheme = isDark ? 'light' : 'dark'
            set({ theme: newTheme })
            document.documentElement.dataset.theme = newTheme
          })

          transition.ready.then(() => {
            const clipPath = [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ]
            console.log('animate', isDark)

            document.documentElement.animate(
              {
                clipPath: isDark ? clipPath.toReversed() : clipPath,
              },
              {
                duration: 10000,
                easing: 'ease-in',
                pseudoElement: isDark
                  ? '::view-transition-old(root)'
                  : '::view-transition-new(root)',
              },
            )
          })
        },
      }
    },
    { name: THEME_STORAGE_KEY },
  ),
)
