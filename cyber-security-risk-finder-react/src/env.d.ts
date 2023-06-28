/// <reference types="vite/client" />

interface RouterEnv {
  readonly VITE_HOME_ROUTE: string,
  readonly VITE_LOGIN_ROUTE: string,
}

interface RiskApiEndpointsEnv {
  readonly VITE_API_URL_BASE: string,
  readonly VITE_API_RISKS_ENDPOINT: string,
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string,
  readonly Router: RouterEnv,
  readonly RiskApi: RiskApiEndpointsEnv,
}

interface ImportMeta {
  readonly env: ImportMetaEnv,
}