import { Link } from "react-router-dom";
import "./List.css";

export default function List({ libros }) {
  return (
    <div className="lista-libros">
      {libros.length === 0 ? (
        <p>No se han encontrado libros.</p>
      ) : (
        libros.map((libro) => (
          <div key={libro.id} className="card">
            {libro.portada && <img src={libro.portada} alt={libro.titulo} className="portada" />}
            <h3>{libro.titulo}</h3>
            <p><strong>Autor:</strong> {libro.autor}</p>
            <p><strong>Publicado:</strong> {libro.fechaPublicacion}</p>
            <Link to={`/libro/${libro.id}`}>📖 Ver más detalles</Link>
          </div>
        ))
      )}
    </div>
  );
}
