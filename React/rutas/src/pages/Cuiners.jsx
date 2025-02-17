
import {useLocation} from 'react-router-dom';

export default function Cuiners() {

  const query = useLocation().search;
  console.log(query)

  const parametres = new URLSearchParams(query);
  // console.log(parametres)
  const nom = parametres.get("nom");
  const restaurant = parametres.get("restaurant");
  console.log("nom: ", nom);
  console.log("restaurant:", restaurant);

  return (
    <div>
      <h2>Cuiners</h2>
      <p>Nom: {nom}</p>
    </div>
  )
}
