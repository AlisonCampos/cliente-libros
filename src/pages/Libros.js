import React, { useEffect, useState } from 'react';
import { obtenerLibros, crearLibro } from '../api/libros';
import {
  Container, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, Button, TextField, Paper, Grid
} from '@mui/material';
import {  Add } from '@mui/icons-material';

export default function Libros() {
  const [libros, setLibros] = useState([]);
  const [form, setForm] = useState({ titulo: '', fechaPublicacion: '', autorLibro: '' });

  useEffect(() => {
    fetchLibros();
  }, []);

  const fetchLibros = async () => {
    const res = await obtenerLibros();
    setLibros(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await crearLibro(form);
    setForm({ titulo: '', fechaPublicacion: '', autorLibro: '' });
    fetchLibros();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>📚 Libros</Typography>

      <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }} elevation={4}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Título"
                fullWidth
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Fecha Publicación"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.fechaPublicacion}
                onChange={(e) => setForm({ ...form, fechaPublicacion: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Autor ID"
                fullWidth
                value={form.autorLibro}
                onChange={(e) => setForm({ ...form, autorLibro: e.target.value })}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            startIcon={<Add />}
            sx={{ mt: 2 }}
          >
            Crear Libro
          </Button>
        </form>
      </Paper>

      <Paper elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Fecha Publicación</TableCell>
              <TableCell>Autor ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {libros.map((libro) => (
              <TableRow key={libro.libreriaMateriaId}>
                <TableCell>{libro.titulo}</TableCell>
                <TableCell>{libro.fechaPublicacion?.split('T')[0]}</TableCell>
                <TableCell>{libro.autorLibro}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
