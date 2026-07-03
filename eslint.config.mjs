import { antfu } from '@antfu/eslint-config'

export default antfu({
  react: true,
  typescript: true,

}, {
  files: ['**/*.js[x]'],
  plugins: ['eslint-plugin-react-hooks'],
})
