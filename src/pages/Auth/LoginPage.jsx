import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert, CircularProgress, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function LoginPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth(); // Pega a função de login e estado do AuthContext

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Se já estiver autenticado, redireciona para o dashboard correto
  React.useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'vendedor') {
        navigate(user.mustReset ? '/reset-password' : '/vendedor/dashboard');
      } else if (user.role === 'diretoria') {
        navigate(user.mustReset ? '/reset-password' : '/diretoria/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      if (result.requireReset) {
        setLoading(false);
        navigate('/reset-password');
      } else {
        // O useEffect acima cuidará do redirecionamento normal,
        // mas vamos desligar o loading aqui também por segurança.
        setLoading(false);
      }
    } else {
      setError(result.error || result.message || 'Falha no login.');
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        width: '100%',
        maxWidth: 400,
        borderRadius: theme.shape.borderRadius * 2,
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 3, textAlign: 'center', color: theme.palette.primary.main, fontWeight: 600 }}>
        Acessar Greatek CRM
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Senha"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            py: 1.5,
            fontSize: '1rem',
            backgroundColor: theme.palette.greatek.greatekBlue, // Usando a cor customizada
            '&:hover': {
                backgroundColor: theme.palette.primary.main, // Azul escuro no hover
            },
          }}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
      </Box>
    </Paper>
  );
}

export default LoginPage;
