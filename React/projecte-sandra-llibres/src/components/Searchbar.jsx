import {useState} from "react";
import "./Searchbar.css";

export default function Searchbar({onSearch}) {
    const [letras, setLetras] = useState("");

    const cambioLetras = (e) => {
        setLetras(e.target.value);
        onSearch(e.target.value);
    }

    return (
        <div className="searchbar">
            <input type="text" placeholder="Buscar un libro o autor..." value={letras} onChange={cambioLetras} />
        </div>
    );
}