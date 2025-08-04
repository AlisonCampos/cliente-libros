import React, { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import {
  Container, TextField, Button, Typography, Paper, InputAdornment
} from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/libros');
    } catch {
      alert('Credenciales inválidas');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 12 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom align="center">🔐 Iniciar Sesión</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Usuario"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              )
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            Entrar
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
