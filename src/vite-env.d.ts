/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DB_HOST: string;
  readonly VITE_DB_PORT: number;
  readonly VITE_DB_USER: string;
  readonly VITE_DB_PASSWORD: string;
  readonly VITE_DB_DATABASE: string;
  readonly VITE_APP_DEFAULT_CITY: string;
  readonly VITE_APP_DEFAULT_STATE: string;
  readonly VITE_APP_DEFAULT_NOTIFIERID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
