import "./App.css";
import { useState } from "react";

function App() {
  const [mostrarEventos, setmostrarEventos] = useState(true);

  const [eventos, setEventos] = useState([
    { titulo: "examen dwec", id: 1 },
    { titulo: "concurso programame", id: 2 },
    { titulo: "fiesta de sant antoni", id: 3 },
  ]);

  console.log(mostrarEventos);

  const handleClick = (id) => {
    setEventos((eventosPrevios) =>
      eventosPrevios.filter((evento) => id !== evento.id)
    );
  };

  return (
    <div className="App">
      { mostrarEventos && (
        <div>
        <button onClick={()=>setmostrarEventos(false)}>Ocultar eventos</button>
      </div>
      )}

      { !mostrarEventos && (
        <div>
        <button onClick={()=>setmostrarEventos(true)}>Mostrar eventos</button>
      </div>
      )}
      {mostrarEventos && eventos.map((evento, index) => (
        <div key={evento.id}>
          <h2>
            {index} - {evento.titulo}
          </h2>
          <button onClick={() => handleClick(evento.id)}>
            Eliminar evento
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
