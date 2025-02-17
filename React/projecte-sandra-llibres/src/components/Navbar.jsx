import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-title">
        <h1>🖥️ TECNOLIBROS</h1>
      </NavLink>
      <div>
        <NavLink to="/" className="nav-link">Inicio</NavLink>
        <NavLink to="/agregar" className="nav-link">Añadir libro</NavLink>
        <NavLink to="/buscar" className="nav-link">Buscar libro</NavLink>
      </div>
    </nav>
  );
}
