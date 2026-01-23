import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AppProvider } from './contexts/AppContext.jsx'
import ErrorBoundary from "./libs/ErrorBoundary"


export const AppWrapper = () => {
  const queryClient = new QueryClient();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <App />
        </AppProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
