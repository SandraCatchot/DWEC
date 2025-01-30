import React from 'react';
import './Modal.css';

export default function Modal({ children, handleClose }) {

  // Evita que el clic dentro de "modal-content" cierre el modal
  function handleContentClick(e) {
    e.stopPropagation();
  }

  return (
    <div className="modal" onClick={handleClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <button className="close" onClick={handleClose}>X</button>
        {children}
      </div>
    </div>
  );
}
