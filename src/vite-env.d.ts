/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DB_HOST: string;
  readonly DB_PORT: number;
  readonly DB_USER: string;
  readonly DB_PASSWORD: string;
  readonly DB_DATABASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
