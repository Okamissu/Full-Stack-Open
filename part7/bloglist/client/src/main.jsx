import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import NotificationProvider from './contexts/NotificationProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserProvider from './contexts/UserProvider'

const root = createRoot(document.getElementById('root'))
const queryClient = new QueryClient()

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NotificationProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </NotificationProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
