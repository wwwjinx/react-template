import babel from '@rolldown/plugin-babel'
import Tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.')
  const baseURL = env.VITE_BASE_URL || '/api'

  return {
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [
      devtools(),
      Tailwindcss(),
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        routesDirectory: './src/pages',
      }),
      AutoImport({
        imports: [
          'react',
          {
            from: '@tanstack/react-router',
            imports: ['useNavigate', 'useMatch', 'useRouter', 'useSearch', 'useParams'],
          },
        ],
        include: [
          /\.[tj]sx?(?:\?.*)?$/,
        ],
        dirs: ['./src/stores', './src/utils/**', './src/hooks', './src/components'],
        dts: './src/types/auto-imports.d.ts',
      }),
      react(),
      babel({ presets: [reactCompilerPreset()] }),
    ],
    server: {
      proxy: {
        [baseURL]: {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: path =>
            path.replace(new RegExp(`^${baseURL}`), baseURL),
        },
      },
    },
    test: {
      environment: 'jsdom',
      passWithNoTests: true,
    },
  }
})
