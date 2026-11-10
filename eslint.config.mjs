import { antfu } from '@antfu/eslint-config'
import eslintPluginTailwindcss from 'eslint-plugin-tailwindcss'

export default antfu({
  ignores: [
    '**/routeTree.gen.ts',
    '**/auto-imports.d.ts',
    '.opencode/**',
  ],
  react: {
    overrides: {
      'antfu/consistent-list-newline': ['error', {
        ArrayExpression: false,
        ArrayPattern: false,
      }],
      'react-refresh/only-export-components': 'off',
    },
  },
  typescript: true,
  stylistic: {
    overrides: {
      'array-element-newline': 'off',
      'style/jsx-self-closing-comp': ['error', {
        component: true,
        html: true,
      }],
    },
  },
}, [
  {
    rules: {
      'unused-imports/no-unused-vars': 'warn',
      'no-console': 'warn',
      // 关闭，可使 对象/数组 自由换行
      'antfu/reasonable-newline': 'off',
    },
  },
  {
    ...eslintPluginTailwindcss.configs.recommended,
    settings: {
      tailwindcss: {
        cssConfigPath: './src/styles/tailwind.css',
      },
    },
    rules: {
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-arbitrary-value': 'off',
      'tailwindcss/no-custom-classname': [
        'warn',
        { whitelist: ['custom\\-*'] },
      ],
      'tailwindcss/no-contradicting-classname': 'warn',
    },
  },
  {
    files: ['pnpm-workspace.yaml'],
    rules: {
      // 只在此文件迁移 onlyBuiltDependencies，不强制套用 antfu 的 pnpm 默认安全项
      'pnpm/yaml-enforce-settings': 'off',
    },
  },
  {
    files: ['**/routeTree.gen.ts'],
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
    },
  },
  {
    files: ['**/tsconfig.json', '**/tsconfig.*.json', 'tsconfig.json', 'tsconfig.*.json'],
    rules: {
      'jsonc/sort-keys': ['error', {
        pathPattern: '^$',
        order: ['compilerOptions', 'include', 'exclude'],
      }],
    },
  },
])
