import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        p: 3,
      }}
    >
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
          Greatek - Dashboard CRM
        </Typography>
        <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>
          Análise de Leads por IA Gemini
        </Typography>
      </Box>
      <Outlet />
    </Box>
  );
}

export default AuthLayout;
