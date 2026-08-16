import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './components/ui/ErrorBoundary.jsx';
import { GlobalThemeProvider } from './components/ui/GlobalContext.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <GlobalThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GlobalThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
