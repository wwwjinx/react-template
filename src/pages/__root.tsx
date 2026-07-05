import { TanStackDevtools } from '@tanstack/react-devtools'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: RootErrorComponent,
})

function RootComponent() {
  const router = useRouter()
  useTheme()

  return (
    <>
      <Outlet />
      <TanStackDevtools

        config={{
          sourceAction: 'copy-path',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel router={router} />,
          },
        ]}
      />
    </>
  )
}

function RootErrorComponent(...args: any[]) {
  return (
    <div className="p-0.5">
      <h1>Root Error</h1>
      <p>Something went wrong at the root level.</p>
      {
        args.map((arg, index) => (
          <pre key={index}>{JSON.stringify(arg)}</pre>
        ))
      }
    </div>
  )
}
