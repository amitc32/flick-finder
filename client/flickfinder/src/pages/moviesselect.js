import React, { useState } from 'react';
import Modal from './Modal'; // You'll need to create this component
import './MovieSelect.css'; // You'll need to create this CSS file

function MovieSelect() {
  const [modalOpen, setModalOpen] = useState(false);
  const [movieTitle] = useState('Example Movie Title'); // Replace with actual data
  const [movieRating] = useState('4.5/5'); // Replace with actual data

  const handleImageClick = () => {
    // Function to handle the movie image click
    setModalOpen(true);
  };

  const handleLike = () => {
    console.log('Like button clicked');
  };

  const handleDislike = () => {
    console.log('Dislike button clicked');
  };

  return (
    <div className="movie-select-container">
      <h1>{movieTitle}</h1>
      <img
        src="https://yt3.googleusercontent.com/ytc/APkrFKbT0flcfaf6uCR2CxNXdcV7xWDpGUtD27uuSkbH=s900-c-k-c0x00ffffff-no-rj"
        alt="Movie"
        onClick={handleImageClick}
        className="movie-image"
      />
      <div className="review-rating">{movieRating}</div>
      <div className="buttons-container">
        <button onClick={handleDislike} className="dislike-button">
          Dislike
        </button>
        <button onClick={handleLike} className="like-button">
          Like
        </button>
      </div>

      {/* Modal for more movie information */}
      {modalOpen && <Modal setModalOpen={setModalOpen} />}
    </div>
  );
}

export default MovieSelect;
