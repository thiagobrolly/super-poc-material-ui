import { BrowserRouter } from 'react-router-dom';
import { RoutesApp } from './routes';
import { AuthProvider } from './contexts/auth';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <ToastContainer autoClose={3000} />
          <RoutesApp />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
