/// <reference types="vite/client" />

interface RouterEnv {
  readonly VITE_HOME_ROUTE: string,
  readonly VITE_LOGIN_ROUTE: string,
}
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string,
  readonly Router: RouterEnv,
}

interface ImportMeta {
  readonly env: ImportMetaEnv,
}