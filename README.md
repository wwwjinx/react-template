# React Template

Vite + React + TypeScript SPA starter with [TanStack Router](https://tanstack.com/router), Tailwind CSS, Zustand, and Alova.

## Requirements

- Node.js `^20.19.0 || >=22.12.0` (Vite 8)
- [pnpm](https://pnpm.io/) 10
- Node.js `>=22.12` to run `pnpm test` (Vitest 5)

## Getting Started

```bash
pnpm install
cp .env.example .env
pnpm dev
```

The app runs at http://localhost:3001.

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Start the Vite dev server on port 3001 |
| `pnpm build` | Production build |
| `pnpm preview` | Preview the production build |
| `pnpm test` | Run Vitest |
| `pnpm typecheck` | Type-check with `tsc -b` |
| `pnpm lint` | Lint with ESLint |
| `pnpm lint:fix` | Lint and apply auto-fixes |
| `pnpm generate-routes` | Regenerate TanStack Router files |

## Environment

Copy `.env.example` to `.env`. Variables are Vite-prefixed and contain no secrets:

- `VITE_APP_TITLE` — document title helper
- `VITE_BASE_URL` — API prefix (also used as the dev-server proxy path)
- `VITE_LOGIN_URL` — login route used by the request helper
- `VITE_TOKEN_KEY` — `sessionStorage` key for the auth token

## Routing

File-based routes live in `src/pages`. TanStack Router generates `src/routeTree.gen.ts`.

```tsx
import { Link } from '@tanstack/react-router'

<Link to="/login">Login</Link>
```

The root layout is `src/pages/__root.tsx`.

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) v4 (`src/styles/tailwind.css`).

To remove Tailwind:

1. Drop the Tailwind import from `src/styles/styles.css`
2. Remove `tailwindcss()` from `vite.config.ts`
3. Uninstall `@tailwindcss/vite`, `tailwindcss`, and related plugins

## Testing

[Vitest](https://vitest.dev/) is configured in `vite.config.ts`. Add tests next to source files (`*.test.ts`) and run `pnpm test`.

## Learn More

- [Vite](https://vite.dev/)
- [TanStack Router](https://tanstack.com/router)
- [Tailwind CSS](https://tailwindcss.com/)
