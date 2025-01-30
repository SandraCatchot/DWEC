import { useState, useEffect } from "react";

export function useFetch(url, actualizar) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDatos() {
      setCargando(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        setDatos(json);
        setError(null);
      } catch (err) {
        setError('No se pudieron obtener los datos...');
        console.log(err);
      } finally {
        setCargando(false);
      }
    }
    fetchDatos();
  }, [url, actualizar]);

  return { datos, cargando, error };
}
