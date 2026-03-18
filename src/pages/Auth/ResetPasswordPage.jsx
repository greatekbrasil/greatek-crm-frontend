import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert, CircularProgress, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function ResetPasswordPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, resetPassword, logout } = useAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    const result = await resetPassword(password);

    if (result.success) {
      // Redireciona para o dashboard com base no cargo
      if (user.role === 'vendedor') {
        navigate('/vendedor/dashboard');
      } else {
        navigate('/diretoria/dashboard');
      }
    } else {
      setError(result.message || 'Falha ao redefinir senha.');
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      backgroundColor: 'background.default'
    }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 4,
          backgroundColor: 'background.paper',
          border: '1px solid rgba(0, 129, 204, 0.1)',
        }}
      >
        <Typography variant="h5" component="h2" sx={{ mb: 1, textAlign: 'center', color: 'primary.main', fontWeight: 700 }}>
          Primeiro Acesso
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
          Para sua segurança, defina uma nova senha para sua conta **{user?.email}**.
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
            name="password"
            label="Nova Senha"
            type="password"
            id="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirme a Nova Senha"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{
              py: 1.5,
              fontWeight: 'bold',
            }}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading ? 'Redefinindo...' : 'Atualizar Senha e Entrar'}
          </Button>
          
          <Button
            fullWidth
            variant="text"
            onClick={logout}
            sx={{ mt: 2, color: 'text.secondary' }}
          >
            Cancelar e Sair
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default ResetPasswordPage;
