/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WASABI_ACCESS_KEY_ID: string
  readonly VITE_WASABI_SECRET_ACCESS_KEY: string
  readonly VITE_WASABI_BUCKET: string
  readonly VITE_WASABI_REGION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
