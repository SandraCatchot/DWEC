import React, { useState } from "react";
import "./FormularioAsignaturas2.css";

export default function FormularioAsignaturas2({ onAdd }) {
  const [nombre, setNombre] = useState("");
  const [horasTotales, setHorasTotales] = useState("");
  const [idioma, setIdioma] = useState("Español");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const nuevaAsignatura = {
      "nombre": nombre,
      "horas totales": parseInt(horasTotales, 10),
      "idioma": idioma,
    };
  
    try {
      // 1. Realizamos la solicitud POST
      const response = await fetch("http://localhost:3000/asignaturas", {
        method: "POST", // Método HTTP para enviar datos
        headers: { "Content-Type": "application/json" }, // Indicamos que enviamos JSON
        body: JSON.stringify(nuevaAsignatura), // Convertimos el objeto en texto JSON
      });
  
      // 2. Verificamos si la respuesta es correcta
      if (!response.ok) {
        throw new Error("No se pudo añadir la asignatura");
      }
  
      // 3. Extraemos los datos devueltos por el servidor
      const asignaturaAgregada = await response.json();
  
      // 4. Actualizamos la lista de asignaturas con onAdd
      onAdd(asignaturaAgregada);
  
      // 5. Reseteamos el formulario
      resetForm();
    } catch (error) {
      console.error("Error al añadir asignatura:", error);
    }
  };

  const resetForm = () => {
    setNombre("");
    setHorasTotales("");
    setIdioma("Español");
  };

  return (
    <form onSubmit={handleSubmit} className="asignatura-form">
      <label>
        <span>Nombre de la Asignatura</span>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </label>
      <label>
        <span>Horas Totales</span>
        <input
          type="number"
          value={horasTotales}
          onChange={(e) => setHorasTotales(e.target.value)}
          required
        />
      </label>
      <label>
        <span>Idioma</span>
        <select value={idioma} onChange={(e) => setIdioma(e.target.value)} required>
          <option value="Español">Español</option>
          <option value="Inglés">Inglés</option>
          <option value="Francés">Francés</option>
          <option value="Alemán">Alemán</option>
        </select>
      </label>
      <button type="submit">Añadir</button>
    </form>
  );
}
