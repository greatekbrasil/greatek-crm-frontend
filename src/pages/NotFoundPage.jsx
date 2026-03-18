import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

function NotFoundPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        textAlign: 'center',
        p: 3,
      }}
    >
      <QuestionMarkIcon sx={{ fontSize: 100, color: theme.palette.text.secondary, mb: 3 }} />
      <Typography variant="h3" component="h1" sx={{ color: theme.palette.primary.main, mb: 2 }}>
        Página Não Encontrada
      </Typography>
      <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
        A URL que você tentou acessar não existe.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')} sx={{ backgroundColor: theme.palette.greatek.greatekBlue }}>
        Voltar para a Página Inicial
      </Button>
    </Box>
  );
}

export default NotFoundPage;
