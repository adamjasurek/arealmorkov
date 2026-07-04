import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import './index.css'
import './styles/admin.css'
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
          className: 'text-sm',
          style: {
            background: '#fff',
            color: '#111827',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 12px rgb(0 0 0 / 10%)',
            borderRadius: '8px',
          },
          success: { iconTheme: { primary: '#2563eb', secondary: '#fff' } },
        }}
      />
    </QueryClientProvider>
  </StrictMode>,
)
