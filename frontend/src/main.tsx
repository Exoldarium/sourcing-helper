import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { NotificationContextProvider } from './contexts/Notification/NotificationProvider.tsx';
import { GlobalStyles } from './GlobalStyles.tsx';
// import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NotificationContextProvider>
          <GlobalStyles />
          <App />
        </NotificationContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
