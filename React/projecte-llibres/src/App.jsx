import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./pages/inicio/Inicio";
import Libro from "./pages/libro/Libro";
import Formulario from "./pages/formulario/Formulario";
import Busqueda from "./pages/busqueda/Busqueda";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/libro/:id" element={<Libro />} />
          <Route path="/agregar" element={<Formulario />} />
          <Route path="/buscar" element={<Busqueda />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
