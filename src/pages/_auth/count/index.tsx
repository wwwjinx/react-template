import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/count/')({
  component: Home,
})

function Home() {
  const count = useCountStore(s => s.count)
  const increment = useCountStore(s => s.increment)

  return (
    <button
      type="button"
      onClick={increment}
    >
      Add 1 to
      {' '}
      {count}
      ?
    </button>
  )
}
