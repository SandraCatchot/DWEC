import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "./pages/inicio/Inicio";
import Formulario from "./pages/formulario/Formulario";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />       
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/agregar" element={<Formulario />} />
        </Routes> 
      </div>
    </BrowserRouter>
  );
}

export default App
