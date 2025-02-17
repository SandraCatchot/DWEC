import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { useFirestore } from "../../hooks/useFirestore";
import "./Libro.css";

export default function Libro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { eliminarDocumento } = useFirestore("libros");

  const [libro, setLibro] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerLibro = async () => {
      try {
        const docRef = doc(db, "libros", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setLibro(docSnap.data());
        } else {
          setError("No s'ha trobat el llibre");
        }
      } catch (err) {
        setError("S'ha produït un error intentant carregar el llibre");
      } finally {
        setCargando(false);
      }
    };

    obtenerLibro();
  }, [id]);

  const manejarEliminar = async () => {
    const confirmacion = window.confirm("Estàs segur que desitges esborrar aquest llibre?");
    if (confirmacion) {
      await eliminarDocumento(id);
      navigate("/"); 
    }
  };

  if (cargando) return <p>Carregant...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="libro-detalle">
      <h2>{libro.titulo}</h2>
      {libro.portada && <img src={libro.portada} alt={libro.titulo} className="portada-detalle" />}
      <p><strong>Autor:</strong> {libro.autor}</p>
      <p><strong>Publicat:</strong> {libro.fechaPublicacion}</p>
      <p><strong>Descripció:</strong> {libro.descripcion}</p>
      <button className="eliminar-btn" onClick={manejarEliminar}>❌ Esborrar llibre</button>
    </div>
  );
}
