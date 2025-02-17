import { useFirestore } from "../../hooks/useFirestore";
import List from "../../components/List";
import "./Inicio.css";

export default function Inicio() {
  const { datos: libros, cargando, error } = useFirestore("libros");

  return (
    <div className="inicio">
      <h2>📚 Lista de libros</h2>
      {cargando && <p>Cargando libros...</p>}
      {error && <p className="error">{error}</p>}
      <List libros={libros} />
    </div>
  );
}
