import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import List from "../../components/List";
import Searchbar from "../../components/Searchbar";
import "./Busqueda.css";

export default function Busqueda () {

    const {datos: libros} = useFirestore("libros");
    const [letras, setLetras] = useState("");

    const librosFiltrados = libros.filter(libro =>
        libro.titulo.toLowerCase().includes(letras.toLowerCase()) ||
        libro.autor.toLowerCase().includes(letras.toLowerCase())
    );

    return (
        <div className="busqueda">
            <h2>Busca el libro o el autor que quieras</h2>
            <Searchbar onSearch={setLetras}/>
            <List libros={librosFiltrados}/>
        </div>
    )
}
