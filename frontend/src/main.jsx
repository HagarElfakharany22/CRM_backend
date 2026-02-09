import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import TaskProvider from './context/TaskContext.jsx'
import BoardContextProvider from './context/BoardContext.jsx'
import ListContextProvider from './context/ListContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BoardContextProvider>
        <TaskProvider>
          <ListContextProvider>
            <BrowserRouter>
              <QueryClientProvider client={queryClient}>
                <App />
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  closeOnClick
                  pauseOnHover
                  draggable
                  theme="light"
                />
              </QueryClientProvider>
            </BrowserRouter>
          </ListContextProvider>
        </TaskProvider>
      </BoardContextProvider>
    </AuthProvider>

  </StrictMode>
)
