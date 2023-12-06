import React from 'react';
import './Modal.css'; // Make sure this CSS file contains the updated styles

function Modal({ setModalOpen }) {
  // Sample data for movieDetails
  const movieDetails = {
    title: "Inception",
    rating: 4.8,
    summary: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO."
    // Add more details as needed
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-content">
          <button onClick={() => setModalOpen(false)} className="close-button">X</button>
          <div className="movie-information">
            <h1>More Movie Information</h1>
            <h2>{movieDetails.title}</h2>
            <p><strong>Rating:</strong> {movieDetails.rating} / 5</p>
            <p><strong>Summary:</strong> {movieDetails.summary}</p>
            {/* You can include more details here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
