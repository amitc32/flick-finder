import React, { useState, useEffect } from 'react';
import './searchFor.css';
import Modal from './Modal2'; // Make sure this path is correct
import { Link } from 'react-router-dom';

function SearchFor() {
  const [searchType, setSearchType] = useState('');
  const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMovieDetails, setCurrentMovieDetails] = useState([]);

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);

    // Make an API request to fetch data from the server
    fetch(`http://localhost:3004/api/flickfinder/${e.target.value}`) // Adjust the endpoint to match your server's routes
      .then((response) => response.json())
      .then((data) => {
        let options;
        if (e.target.value === 'directors') {
          // Map over the data if the search type is directors
          options = data.map(item => item.movieDirector);
        } else if (e.target.value === 'actors') {
          // Map over the data if the search type is actors
          options = data.map(item => item.actorName);
        }
        setSecondDropdownOptions(options);
        setCurrentMovieDetails([]); // Reset movie details when changing search type  
      })

      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleSecondDropdownChange = (e) => {
    const selectedDirector = e.target.value;
    setSelectedOption(selectedDirector);
  
    if (searchType === 'directors') {
      // Assuming you have an API endpoint that returns movies for a given director
      fetch(`http://your-api-endpoint/movies/director/${selectedDirector}`)
        .then(response => response.json())
        .then(data => {
          setCurrentMovieDetails(data); // Assuming the API returns an array of movies
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    } else if (searchType === 'actors') {
      // details = mockData.movies.filter(movie =>
      //   movie.actors.includes(selection)
      // );
    }
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