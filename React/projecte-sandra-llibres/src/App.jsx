import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "./pages/inicio/Inicio";
import Formulario from "./pages/formulario/Formulario";
import Navbar from "./components/Navbar";
import Libro from "./pages/libro/Libro";
import Busqueda from "./pages/busqueda/Busqueda";



import "./App.css";

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />       
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/agregar" element={<Formulario />} />
          <Route path="/buscar" element={<Busqueda />} />
          <Route path="/libro/:id" element={<Libro />} />
          <Route path="*" element={<Inicio />} />
        </Routes> 
      </div>
    </BrowserRouter>
  );
}

export default App
