import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import "./Formulario.css";

export default function Formulario() {
  const { agregarDocumento } = useFirestore("libros");
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaPublicacion, setFechaPublicacion] = useState("");
  const [portadaBase64, setPortadaBase64] = useState(null);
  const [error, setError] = useState(null);

    const manejarCambioImagen = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onloadend = () => {
        setPortadaBase64(reader.result);
      };
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!titulo || !autor || !descripcion || !fechaPublicacion || !portadaBase64) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    await agregarDocumento({
      titulo,
      autor,
      descripcion,
      fechaPublicacion,
      portada: portadaBase64, 
    });

    navigate("/");
  };

  return (
    <div className="formulario">
      <h2>📖 Añadir un libro</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={manejarEnvio}>
        <label>
          <span>Título:</span>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </label>

        <label>
          <span>Autor:</span>
          <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} />
        </label>

        <label>
          <span>Descripción:</span>
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
        </label>

        <label>
          <span>Fecha de publicación:</span>
          <input type="date" value={fechaPublicacion} onChange={(e) => setFechaPublicacion(e.target.value)} />
        </label>

        <label>
          <span>Imagen de la portada:</span>
          <input type="file" accept="image/*" onChange={manejarCambioImagen} />
        </label>

        {portadaBase64 && (
          <div className="vistaPrevia">
            <p>Vista previa:</p>
            <img src={portadaBase64} alt="Vista previa" />
          </div>
        )}

        <button type="submit">Añadir libro</button>
      </form>
    </div>
  );
}
