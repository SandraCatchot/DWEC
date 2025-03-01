import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { useFirestore } from "../../hooks/useFirestore";
import "./Libro.css";

export default function Libro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { eliminarDocumento, editarDocumento } = useFirestore("libros");

  // Estado para mostrar u ocultar el formulario de edición
  const [mostrarFormularioEdicion, setMostrarFormularioEdicion] = useState(false);

  // Estado para el libro y edición
  const [libro, setLibro] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [tituloEditado, setTituloEditado] = useState("");
  const [autorEditado, setAutorEditado] = useState("");
  const [fechaEditada, setFechaEditada] = useState("");
  const [descripcionEditada, setDescripcionEditada] = useState("");

  useEffect(() => {
    const obtenerLibro = async () => {
      try {
        const docRef = doc(db, "libros", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setLibro(data);

          setTituloEditado(data.titulo || "");
          setAutorEditado(data.autor || "");
          setFechaEditada(data.fechaPublicacion || "");
          setDescripcionEditada(data.descripcion || "");

        } else {
          setError("Este libro no está en nuestra base de datos.");
        }
      } catch (err) {
        setError("ERROR al cargar el libro");
      } finally {
        setCargando(false);
      }
    };

    obtenerLibro();
  }, [id]);

  const manejarEliminar = async () => {
    const confirmacion = window.confirm(
      "¿Seguro que quieres eliminar este libro?"
    );
    if (confirmacion) {
      await eliminarDocumento(id);
      navigate("/");
    }
  };

  const manejarEditar = async () => {
    try {
      await editarDocumento(id, {
        titulo: tituloEditado,
        autor: autorEditado,
        fechaPublicacion: fechaEditada,
        descripcion: descripcionEditada
      });
      navigate("/");
    } catch (error) {
      console.log("Error al editar:", error);
    }
  };

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="libro-detalle">
      <h2>{libro.titulo}</h2>
      {libro.portada && (
        <img
          src={libro.portada}
          alt={libro.titulo}
          className="portada-detalle"
        />
      )}
      <p>
        <strong>Autor:</strong> {libro.autor}
      </p>
      <p>
        <strong>Publicado:</strong> {libro.fechaPublicacion}
      </p>
      <p>
        <strong>Descripción:</strong> {libro.descripcion}
      </p>

      <button className="eliminar-btn" onClick={manejarEliminar}>
        ❌ Eliminar libro
      </button>
      {" "}
      <button onClick={() => setMostrarFormularioEdicion(true)}>
        ✏️ Editar libro
      </button>

      {mostrarFormularioEdicion && (
        <div className="form-editar">
          <h3>Editar libro</h3>
          <label>
            Título:
            <input
              type="text"
              value={tituloEditado}
              onChange={(e) => setTituloEditado(e.target.value)}
            />
          </label>
          <label>
            Autor:
            <input
              type="text"
              value={autorEditado}
              onChange={(e) => setAutorEditado(e.target.value)}
            />
          </label>
          <label>
            Fecha de publicación:
            <input
              type="date"
              value={fechaEditada}
              onChange={(e) => setFechaEditada(e.target.value)}
            />
          </label>
          <label>
            Descripción:
            <input
              type="text"
              id="textarea"
              value={descripcionEditada}
              onChange={(e) => setDescripcionEditada(e.target.value)}
            />
          </label>

          <button onClick={manejarEditar}>Guardar cambios</button>
          <button onClick={() => setMostrarFormularioEdicion(false)}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
