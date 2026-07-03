import { createFileRoute, redirect } from '@tanstack/react-router'

import { useTheme } from '@/hooks/useTheme'

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const { user } = useAuthStore.getState()
    if (user) {
      throw redirect({ to: '/' })
    }
  },
  component: LoginPage,
})

const isDev = import.meta.env.DEV
function LoginPage() {
  const login = useAuthStore(s => s.login)
  const [username, setUsername] = useState(isDev ? 'admin' : '')
  const [password, setPassword] = useState(isDev ? 'admin123' : '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { toggleTheme, isDark } = useTheme()

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await login(username, password)
      console.log(res)
    }
    catch (err) {
      setError((err as Error).message)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-(--bg-page) px-4 transition-[background]">
      <button
        type="button"
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 flex size-9 items-center justify-center rounded-full border border-(--border) bg-(--bg-card) text-(--text-muted) transition-all hover:text-(--text-main)"
        aria-label={isDark ? '切换浅色模式' : '切换深色模式'}
      >
        <span className={`size-5 ${isDark ? 'iconify-[mdi--weather-sunny]' : 'iconify-[mdi--weather-night]'}`} />
      </button>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[420px] rounded-2xl border border-(--border) bg-(--bg-card) p-8 shadow-(--shadow) transition-[background,border,box-shadow]"
      >
        <div className="flex flex-col items-center">
          <img
            src="/yugutou_logo.png"
            alt="鱼骨头"
            className="size-14 bg-white object-contain"
          />
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-(--text-main)">
            鱼骨头
          </h1>
          <p className="mt-1 text-sm text-(--text-muted)">
            欢迎回来
          </p>
        </div>

        <div className="mt-10 space-y-5">
          <div className="relative">
            <span className="absolute top-1/2 left-3 iconify-[mdi--account-outline] size-5 -translate-y-1/2 text-(--text-muted)" />
            <input
              type="text"
              placeholder="用户名"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="h-11 w-full rounded-lg border border-(--border) bg-(--input-bg) py-2 pr-3 pl-10 text-[15px] text-(--text-main) transition-[border-color] outline-none placeholder:text-(--text-muted) focus:border-(--input-focus)"
            />
          </div>

          <div className="relative">
            <span className="absolute top-1/2 left-3 iconify-[mdi--lock-outline] size-5 -translate-y-1/2 text-(--text-muted)" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="密码"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="h-11 w-full rounded-lg border border-(--border) bg-(--input-bg) py-2 pr-10 pl-10 text-[15px] text-(--text-main) transition-[border-color] outline-none placeholder:text-(--text-muted) focus:border-(--input-focus)"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-(--text-muted) transition-colors hover:text-(--text-main)"
              aria-label={showPassword ? '隐藏密码' : '显示密码'}
            >
              <span className={`size-5 ${showPassword ? 'iconify-[mdi--eye-off]' : 'iconify-[mdi--eye]'}`} />
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-5 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-500">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex h-11 w-full items-center justify-center rounded-lg bg-(--primary-btn-bg) px-4 text-[15px] font-medium text-(--primary-btn-text) transition-all hover:brightness-125 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
        >
          {loading ? '登录中…' : '登录'}
        </button>
      </form>
    </main>
  )
}
