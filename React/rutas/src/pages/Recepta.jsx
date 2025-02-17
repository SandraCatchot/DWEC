import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export default function Recepta() {
  const parametres = useParams();
  const { datos: recepta, cargando, error, } = useFetch("http://localhost:3000/receptes/" + parametres.id);
  const historic = useHistory();

  useEffect(()=>{
    if(error) {
        setTimeout(()=> historic.push('/'), 2000);

        // historic.goBack();
    }
  }, [error, historic])

  return (
    <div>
      {cargando && <div>Cargando...</div>}
      {error && <div>{error}</div>}
      {recepta && (
        <div key={recepta.id}>
          <h2>{recepta.nom}</h2>
          <p>{recepta.autor}</p>
          <ul>
            {recepta.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p>{recepta.elaboracio}</p>
        </div>
      )}
    </div>
  );
}
