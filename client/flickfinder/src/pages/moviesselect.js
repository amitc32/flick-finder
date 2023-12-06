import React, { useState } from 'react';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './MovieSelect.css';

function MovieSelect() {
  const [modalOpen, setModalOpen] = useState(false);
  const [movieTitle] = useState('Example Movie Title'); // Replace with actual data
  const [movieRating] = useState('4.5/5'); // Replace with actual data
  const navigate = useNavigate(); // Initialize useNavigate

  const handleImageClick = () => {
    setModalOpen(true);
  };

  const handleLike = () => {
    console.log('Like button clicked');
  };

  const handleDislike = () => {
    console.log('Dislike button clicked');
  };

  // Function to handle navigation and log to console
  const goToFindMatches = () => {
    console.log('Navigating from MovieSelect to FindMatches');
    navigate('/FindMatches'); // Use the navigate function
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
        <button onClick={goToFindMatches} className="find-matches-button">
          Find Matches
        </button>
        <button onClick={handleLike} className="like-button">
          Like
        </button>
        {/* Add a button to navigate to FindMatches */}
        
      </div>

      {modalOpen && <Modal setModalOpen={setModalOpen} />}
    </div>
  );
}

export default MovieSelect;
