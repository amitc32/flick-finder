import React, { useState, useEffect } from 'react';
import './searchFor.css';
import Modal from './Modal2'; // Make sure this path is correct

// Mock data for demonstration
const mockData = {
  directors: ['Steven Spielberg', 'Christopher Nolan'],
  actors: ['Tom Hanks', 'Leonardo DiCaprio'],
  movies: [
    { name: 'Inception', director: 'Christopher Nolan', actors: ['Leonardo DiCaprio'], photo: 'https://static.wikia.nocookie.net/unanything/images/a/a2/TheGummyBear.png/revision/latest?cb=20230920192229', rating: '8.8', details: 'Inception details...' },
    { name: 'Catch Me If You Can', director: 'Steven Spielberg', actors: ['Leonardo DiCaprio', 'Tom Hanks'], photo: 'https://static.wikia.nocookie.net/unanything/images/a/a2/TheGummyBear.png/revision/latest?cb=20230920192229', rating: '8.1', details: 'Catch Me If You Can details...' },
    // Add more movie objects as needed for your mock data...
  ]
};

function SearchFor() {
  const [searchType, setSearchType] = useState('');
  const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMovieDetails, setCurrentMovieDetails] = useState([]);

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    // Set the options for the second dropdown based on the first selection
    setSecondDropdownOptions(mockData[e.target.value] || []);
    setCurrentMovieDetails([]); // Reset movie details when changing search type
  };

  const handleSecondDropdownChange = (e) => {
    const selection = e.target.value;
    setSelectedOption(selection);

    // Filter the details by checking if the corresponding property is a string or array
    let details;
    if (searchType === 'directors') {
      details = mockData.movies.filter(movie =>
        movie.director === selection
      );
    } else if (searchType === 'actors') {
      details = mockData.movies.filter(movie =>
        movie.actors.includes(selection)
      );
    }
  
    setCurrentMovieDetails(details);
};

  const showMovieDetails = (movie) => {
    setCurrentMovieDetails([movie]); // Wrap movie in an array to ensure it is the correct type
    setModalOpen(true); // Open the modal
  };

  return (
    <div>
      <h1>Search for...</h1>
      <select value={searchType} onChange={handleSearchTypeChange}>
        <option value="">Select type...</option>
        <option value="directors">Director</option>
        <option value="actors">Actor</option>
      </select>

      {searchType && (
        <select value={selectedOption} onChange={handleSecondDropdownChange}>
          <option value="">Select {searchType.slice(0, -1)}</option>
          {secondDropdownOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      )}

      {currentMovieDetails && (
        <table>
          <thead>
            <tr>
              <th>Movie Name</th>
              <th>Photo</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {currentMovieDetails.map((movie, index) => (
              <tr key={index}>
                <td>{movie.name}</td>
                <td><img src={movie.photo} alt={movie.name} onClick={() => showMovieDetails(movie)} /></td>
                <td>{movie.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    {modalOpen && (
        <Modal
          setModalOpen={setModalOpen}
          movieDetails={currentMovieDetails[0]} // Pass the first (and in this case, only) movie object to the Modal
        />
      )}
    </div>
  );
}

export default SearchFor;