/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly PUBLIC_BASE_URL: string;
  readonly JWT_SECRET_KEY: string;
  readonly ENCRYPTION_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}