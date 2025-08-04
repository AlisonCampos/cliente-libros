import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Libros from './pages/Libros';
import Autores from './pages/Autores';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/libros" element={<Libros />} />
        <Route path="/autores" element={<Autores />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;