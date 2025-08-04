import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Libros from './pages/Libros';
import Autores from './pages/Autores';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/libros" element={<PrivateRoute><Libros /></PrivateRoute>} />
        <Route path="/autores" element={<PrivateRoute><Autores /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;