import "./Carta.css";

export default function Carta({ carta, handleEleccion, girada, deshabilitado, cubierta }) {

  const handleClick = () => {
    if(!deshabilitado) {

      console.log("Tamaño de la imagen clicada:", {
        width: event.target.clientWidth,
        height: event.target.clientHeight,
      });
      
      handleEleccion(carta);
    }    
  }

  return (
    <div className="card">
      <div className={girada ? "flipped" : ""}>
        <img className='front' width={200} height={200} src={carta.src} alt="frontal" />
        <img className="back" src={cubierta} onClick={handleClick} alt="trasera" />
      </div>
    </div>
  );
}
