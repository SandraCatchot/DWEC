import { useState } from 'react';
import './App.css';

import AsignaturaForm from './components/AsignaturaForm';
import AsignaturasLista from './components/AsignaturasLista';
import Modal from './components/Modal';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [actualizar, setActualizar] = useState(false);

  function handleOpenForm() {
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
  }

  return (
    <div className="App">
      <button onClick={handleOpenForm}>Añadir Asignatura</button>

      <AsignaturasLista actualizar={actualizar} />

      {showForm && (
        <Modal handleClose={handleCloseForm}>
          <AsignaturaForm setActualizar={setActualizar} />
        </Modal>
      )}
    </div>
  );
}

export default App;
