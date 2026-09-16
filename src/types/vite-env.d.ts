/// <reference types="vite/client" />

interface ViteTypeOptions {
  // Makes ImportMetaEnv strict: unknown keys are type errors.
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_BASE_URL: string
  readonly VITE_LOGIN_URL: string
  readonly VITE_TOKEN_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
