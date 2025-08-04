import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, Button, TextField, Paper, Grid
} from '@mui/material';
import { Add, Person  } from '@mui/icons-material';
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
      alert("Error al crear autor.");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>🧑‍💼 Autores</Typography>

      <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }} elevation={4}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Nombre"
                fullWidth
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                InputProps={{
                  startAdornment: <Person sx={{ mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Apellido"
                fullWidth
                value={form.apellido}
                onChange={(e) => setForm({ ...form, apellido: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                type="date"
                label="Fecha de Nacimiento"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={form.fechaNacimiento}
                onChange={(e) => setForm({ ...form, fechaNacimiento: e.target.value })}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            startIcon={<Add />}
            sx={{ mt: 2 }}
          >
            Crear Autor
          </Button>
        </form>
      </Paper>

      <Paper elevation={2}>
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
      </Paper>
    </Container>
  );
}
