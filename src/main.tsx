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
            background: '#fffcf7',
            color: '#2b2a29',
            border: '1px solid #e8e0d4',
            boxShadow: '0 4px 16px rgb(43 42 41 / 10%)',
            borderRadius: '10px',
          },
          success: { iconTheme: { primary: '#c0843d', secondary: '#fff' } },
        }}
      />
    </QueryClientProvider>
  </StrictMode>,
)
