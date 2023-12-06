import React from 'react';
import './Modal.css'; // You'll need to create this CSS file

function Modal({ setModalOpen }) {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <button onClick={() => setModalOpen(false)} className="close-button">X</button>
        <h1>More Movie Information</h1>
        {/* You can include more details here */}
        <p>This is where you will include additional information about the movie.</p>
      </div>
    </div>
  );
}

export default Modal;
