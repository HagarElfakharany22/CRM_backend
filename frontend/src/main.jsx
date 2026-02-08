import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import TaskProvider from './context/TaskContext.jsx'
import BoardContextProvider from './context/BoardContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
 <StrictMode>
    <AuthProvider>
      <BoardContextProvider>
        <TaskProvider>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </BrowserRouter>
        </TaskProvider>
      </BoardContextProvider>
    </AuthProvider>
  </StrictMode>
)
