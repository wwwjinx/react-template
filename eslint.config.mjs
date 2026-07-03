import { antfu } from '@antfu/eslint-config'

export default antfu({
  react: {
    overrides: {
      'antfu/consistent-list-newline': ['error', {
        ArrayExpression: false,
        ArrayPattern: false,
      }],
    },
  },
  typescript: true,
  stylistic: {
    overrides: {
      'array-element-newline': 'off',
    },
  },
}, [{
  rules: {
    'unused-imports/no-unused-vars': 'warn',
    'no-console': 'warn',
  },
}, {
  files: ['**/*.js[x]'],
  plugins: ['eslint-plugin-react-hooks'],
},
{
  files: ['**/tsconfig.json', '**/tsconfig.*.json', 'tsconfig.json', 'tsconfig.*.json'],
  rules: {
    'jsonc/sort-keys': ['error', {
      pathPattern: '^$',
      order: ['compilerOptions', 'include', 'exclude'],
    }],
  },
}])
