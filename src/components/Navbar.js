import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Slide } from '@mui/material';
import { Book, People, Login } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const hideOnLogin = location.pathname === '/';

  return (
    <Slide direction="down" in={!hideOnLogin}>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/libros')}>
            Biblioteca
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" startIcon={<Book />} onClick={() => navigate('/libros')}>
              Libros
            </Button>
            <Button color="inherit" startIcon={<People />} onClick={() => navigate('/autores')}>
              Autores
            </Button>
            <Button color="inherit" startIcon={<Login />} onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('refreshToken'); navigate('/'); window.location.reload(); }}>
              Salir
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
