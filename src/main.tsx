import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { QueryClientProvider } from '@tanstack/react-query'
import { theme } from './theme/theme'
import { queryClient } from './lib/queryClient'
import './styles/variables.css'
import './index.css'
import App from './App.tsx'

async function enableMocking() {
  if (import.meta.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser')
    return worker.start({
      onUnhandledRequest: 'bypass'
    })
  }
}

const mount = () => {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    throw new Error('Failed to find the root element');
  }

  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            <App />
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

enableMocking()
  .then(mount)
  .catch((error) => {
    console.error('Failed to start the application:', error);
  });
