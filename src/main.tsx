import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: 'font-sans text-sm',
          style: {
            background: '#fefefe',
            color: '#2b2a29',
            border: '2px solid #2b2a29',
            boxShadow: '4px 4px 0 #2b2a29',
          },
          success: { iconTheme: { primary: '#c9a227', secondary: '#2b2a29' } },
        }}
      />
    </QueryClientProvider>
  </StrictMode>,
)
