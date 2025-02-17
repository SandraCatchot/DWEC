import { useState } from "react";
import "./Searchbar.css";

export default function Searchbar({ onSearch }) {
  const [termino, setTermino] = useState("");

  const manejarCambio = (e) => {
    setTermino(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Buscar un libro, un autor..."
        value={termino}
        onChange={manejarCambio}
      />
    </div>
  );
}
