import React from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

function LoadingSpinner({ message = 'Carregando...' }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh', // Para centralizar o spinner na tela
        color: theme.palette.primary.main,
      }}
    >
      <CircularProgress sx={{ mb: 2 }} size={50} />
      <Typography variant="h6">{message}</Typography>
    </Box>
  );
}

export default LoadingSpinner;
