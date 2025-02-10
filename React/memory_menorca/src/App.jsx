import { useEffect, useState } from "react";
import "./App.css";
import Carta from "./components/Carta";

function App() {
  const [cartas, setCartas] = useState([]);
  const [eleccion1, setEleccion1] = useState(null);
  const [eleccion2, setEleccion2] = useState(null);
  const [deshabilitado, setDeshabilitado] = useState(false);
  const [turnos, setTurnos] = useState(0);
  const [temaSeleccionado, setTemaSeleccionado] = useState("menorca");
  const [cubierta, setCubierta] = useState("/images/cubiertaMenorca.jpg");

  const imagenesMenorca = [
    { src: "/images/1.jpg", emparejada: false },
    { src: "/images/2.jpg", emparejada: false },
    { src: "/images/3.jpg", emparejada: false },
    { src: "/images/4.jpg", emparejada: false },
    { src: "/images/5.jpg", emparejada: false },
    { src: "/images/6.jpg", emparejada: false },
  ];

  const imagenesBolaDrac = [
    { src: "/images_bola/1.jpg", emparejada: false },
    { src: "/images_bola/2.jpg", emparejada: false },
    { src: "/images_bola/3.jpg", emparejada: false },
    { src: "/images_bola/4.jpg", emparejada: false },
    { src: "/images_bola/5.jpg", emparejada: false },
    { src: "/images_bola/6.jpg", emparejada: false },
  ];

  const mezclaCartas = () => {
    let conjuntoImagenes = [];
    let nuevaCubierta = "";

    if (temaSeleccionado === "menorca") {
      conjuntoImagenes = imagenesMenorca;
      nuevaCubierta = "/images/cubiertaMenorca.jpg";
    } else {
      conjuntoImagenes = imagenesBolaDrac;
      nuevaCubierta = "/images_bola/cubiertaBola.jpg";
    }

    const cartasMezcladas = [...conjuntoImagenes, ...conjuntoImagenes]
      .sort(() => Math.random() - 0.5)
      .map((carta) => ({ ...carta, id: Math.random() }));

    setCubierta(nuevaCubierta);
    setCartas(cartasMezcladas);
    setEleccion1(null);
    setEleccion2(null);
    setTurnos(0);
  };

  const handleEleccion = (carta) => {
    if (eleccion1 && carta.id === eleccion1.id) return;

    eleccion1 ? setEleccion2(carta) : setEleccion1(carta);
  };

  useEffect(() => {
    if (eleccion1 && eleccion2) {
      setDeshabilitado(true);

      if (eleccion1.src === eleccion2.src) {
        setCartas((cartasPrevias) =>
          cartasPrevias.map((carta) =>
            carta.src === eleccion1.src ? { ...carta, emparejada: true } : carta
          )
        );
        reseteaTurno();
      } else {
        setTimeout(() => {
          reseteaTurno();
        }, 1000);
      }
    }
  }, [eleccion1, eleccion2]);

  useEffect(() => {
    mezclaCartas();
  }, [temaSeleccionado]);

  const reseteaTurno = () => {
    setEleccion1(null);
    setEleccion2(null);
    setDeshabilitado(false);
    setTurnos((turnosPrevios) => turnosPrevios + 1);
  };

  const handleCambioTema = (e) => {
    setTemaSeleccionado(e.target.value);
  };

  return (
    <div className="App">
      <h1>Joc de Memòria</h1>
      <div className="container-menu">
        <div className="container-select">
          <label>Elige un tema: </label>
          <select value={temaSeleccionado} onChange={handleCambioTema}>
            <option value="menorca">Menorca</option>
            <option value="bola">Bola de Drac</option>
          </select>
        </div>
        <div>
          <button onClick={mezclaCartas}>Mezclar Cartas</button>
        </div>
      </div>

      <div className="card-grid">
        {cartas.map((carta) => (
          <Carta
            key={carta.id}
            carta={carta}
            handleEleccion={handleEleccion}
            girada={
              carta === eleccion1 || carta === eleccion2 || carta.emparejada
            }
            deshabilitado={deshabilitado}
            cubierta={cubierta}
          />
        ))}
      </div>

      <p>Turnos: {turnos}</p>
    </div>
  );
}

export default App;
