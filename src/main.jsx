import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Reseta o CSS padrão do navegador
import theme from './theme/index.js'; // Importa o tema que acabamos de criar

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Aplica um reset de CSS para consistência */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
