import { Link } from "react-router-dom";
import "./List.css";

export default function List({ libros }) {
  return (
    <div className="lista-libros">
      {libros.length === 0 ? (
        <p>No se han encontrado libros.</p>
      ) : ( //Si hay libros, mostramos cada libro filtrado por id con imagen portada, titulo link al libro, autor y fecha de publicación
        libros.map((libro) => (
          <div key={libro.id} className="card">
            {libro.portada && <img src={libro.portada} alt={libro.titulo} className="portada" />}
            <Link to={`/libro/${libro.id}`}><h3>{libro.titulo}</h3></Link>
            <p><strong>Autor:</strong> {libro.autor}</p>
            <p><strong>Fecha de publicación:</strong> {libro.fechaPublicacion}</p>            
          </div>
        ))
      )}
    </div>
  );
}
