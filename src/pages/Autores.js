import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, Button, TextField, Paper
} from '@mui/material';
import { obtenerAutores, crearAutor } from '../api/autores';

export default function Autores() {
  const [autores, setAutores] = useState([]);
  const [form, setForm] = useState({ nombre: '', apellido: '', fechaNacimiento: '' });

  useEffect(() => {
    fetchAutores();
  }, []);

  const fetchAutores = async () => {
    const res = await obtenerAutores();
    setAutores(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        nombre: form.nombre,
        apellido: form.apellido,
        fechaNacimiento: form.fechaNacimiento || null,
      };
      await crearAutor(payload);
      setForm({ nombre: '', apellido: '', fechaNacimiento: '' });
      fetchAutores();
    } catch (error) {
      console.error("Error al crear autor:", error.response?.data || error.message);
      alert("Ocurrió un error al crear el autor. Revisa los datos.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>Lista de Autores</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField label="Nombre" fullWidth margin="normal" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
          <TextField label="Apellido" fullWidth margin="normal" value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} />
          <TextField type="date" fullWidth margin="normal" value={form.fechaNacimiento} onChange={(e) => setForm({ ...form, fechaNacimiento: e.target.value })} />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>Crear Autor</Button>
        </form>
      </Paper>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Fecha de Nacimiento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {autores.map((autor) => (
            <TableRow key={autor.autorLibroId}>
              <TableCell>{autor.nombre}</TableCell>
              <TableCell>{autor.apellido}</TableCell>
              <TableCell>{autor.fechaNacimiento?.split('T')[0]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
