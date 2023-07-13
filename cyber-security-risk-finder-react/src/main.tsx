import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter as Router } from 'react-router-dom'
import { StateContextProvider } from './context/index.tsx'
import AuthMiddleware from './middleware/auth.middleware.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
})

const getReactQueryDevTools = () =>
  import.meta.env.DEV
    ? <ReactQueryDevtools initialIsOpen={false} />
    : ''

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <StateContextProvider>
          <AuthMiddleware>
            <App />
          </AuthMiddleware>
        </StateContextProvider>
        {getReactQueryDevTools()}
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
)
