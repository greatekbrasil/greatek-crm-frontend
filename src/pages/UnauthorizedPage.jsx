import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

function UnauthorizedPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh', // Ajuste para ficar centralizado com o AuthLayout
        textAlign: 'center',
        p: 3,
      }}
    >
      <DoNotDisturbAltIcon sx={{ fontSize: 100, color: theme.palette.error.main, mb: 3 }} />
      <Typography variant="h3" component="h1" sx={{ color: theme.palette.primary.main, mb: 2 }}>
        Acesso Não Autorizado
      </Typography>
      <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
        Você não tem permissão para acessar esta página.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/login')} sx={{ backgroundColor: theme.palette.greatek.greatekBlue }}>
        Voltar para o Login
      </Button>
    </Box>
  );
}

export default UnauthorizedPage;
