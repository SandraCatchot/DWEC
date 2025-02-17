import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig"; 

export function useFirestore(coleccion) {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCargando(true);
    const ref = collection(db, coleccion);
    
    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        let resultados = [];
        snapshot.docs.forEach((doc) => {
          resultados.push({ id: doc.id, ...doc.data() });
        });
        setDatos(resultados);
        setCargando(false);
      },
      (err) => {
        setError("S'ha produït un error de càrrega de dades");
        console.error(err);
        setCargando(false);
      }
    );

    return () => unsubscribe(); 
  }, [coleccion]);

  const agregarDocumento = async (nuevoDato) => {
    try {
      await addDoc(collection(db, coleccion), nuevoDato);
    } catch (err) {
      setError("S'ha produit un error en afegir el document");
      console.error(err);
    }
  };

  const eliminarDocumento = async (id) => {
    try {
      await deleteDoc(doc(db, coleccion, id));
    } catch (err) {
      setError("S'ha produit un error al esborrar el document");
      console.error(err);
    }
  };

  return { datos, cargando, error, agregarDocumento, eliminarDocumento };
}
