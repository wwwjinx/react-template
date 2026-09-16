import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/')({
  beforeLoad: async ({ location }) => {
    const { user } = useAuthStore.getState()

    if (!user) {
      throw redirect({ to: '/login', search: { redirect: location.href } })
    }
  },
  component: Index,
})

function Index() {
  const logout = useAuthStore(s => s.logout)
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate({ to: '/login' })
  }

  return (
    <div>
      <h1>index home</h1>
      <button type="button" onClick={handleLogout}>
        clear token
      </button>
      <Outlet />
    </div>
  )
}
