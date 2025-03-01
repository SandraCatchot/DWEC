import { useState, useEffect } from "react";
import { collection, addDoc, doc, deleteDoc, onSnapshot, updateDoc } from "firebase/firestore";
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
        setError("ERROR en la carga de datos");
        setCargando(false);
      }
    );

    return () => unsubscribe(); 
  }, [coleccion]);

  const agregarDocumento = async (nuevoDato) => {
    try {
      await addDoc(collection(db, coleccion), nuevoDato);
    } catch (err) {
      setError("ERROR al cargar el documento");
      console.error(err);
    }
  };

  const eliminarDocumento = async (id) => {
    try {
      await deleteDoc(doc(db, coleccion, id));
    } catch (err) {
      setError("ERROR al borrar el documento");
      console.error(err);
    }
  };

  const editarDocumento = async (id,datosActualizados) => {
    try {
      await updateDoc(doc(db, coleccion, id), datosActualizados);
    }catch (err) {
      console.log(err)
    }
  }

  return { datos, cargando, error, agregarDocumento, eliminarDocumento, editarDocumento };
}
