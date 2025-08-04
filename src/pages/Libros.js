import React, { useEffect, useState } from 'react';
import { obtenerLibros, crearLibro } from '../api/libros';
import {
  Container, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, Button, TextField, Paper
} from '@mui/material';

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
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>Lista de Libros</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField label="Título" fullWidth margin="normal" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
          <TextField type="date" fullWidth margin="normal" value={form.fechaPublicacion} onChange={(e) => setForm({ ...form, fechaPublicacion: e.target.value })} />
          <TextField label="Autor ID" fullWidth margin="normal" value={form.autorLibro} onChange={(e) => setForm({ ...form, autorLibro: e.target.value })} />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>Crear Libro</Button>
        </form>
      </Paper>

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
    </Container>
  );
}