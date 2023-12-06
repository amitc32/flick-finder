import React, { useState, useEffect } from 'react';
import './searchFor.css';

// Dummy database records for demonstration purposes
const DATABASE = {
  directors: [
    { id: 1, name: 'Steven Spielberg', movies: /* An array of movies */ },
    /* add more directors and their movies */
  ],
  actors: [
    { id: 2, name: 'Tom Hanks', movies: /* An array of movies */ },
    /* add more actors and their movies */
  ],
  movies: [
    { id: 3, name: 'Forrest Gump', rating: 8.8, photo: 'url-to-photo', details: /* Movie details */ },
    /* add more movies with details */
  ],
  // More entities in database...
};

function SearchFor() {
  const [searchType, setSearchType] = useState('');
  const [selection, setSelection] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Upon type change, fetch and set initial data (from what would be a database)
    if (searchType) {
      setSearchResults(DATABASE[searchType]);
    }
  }, [searchType]);

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setSelection(null); // Reset the selection when changing search type
  };

  const handleSelectionChange = (e) => {
    // Convert the selected value to the appropriate format if needed
    setSelection(e.target.value);
  };

  const handlePhotoClick = (movieDetails) => {
     // Implement a function to show more details when the photo is clicked
     console.log(movieDetails);
  };

  const renderSearchResults = () => {
    if (!selection || !searchType) {
      return null;
    }

    let selectedMovies = DATABASE[searchType].find(item => item.id.toString() === selection)?.movies || [];

    // Create rows of movies for the table
    return selectedMovies.map(movie => (
      <tr key={movie.id}>
        <td>{movie.name}</td>
        <td><img src={movie.photo} alt={movie.name} onClick={() => handlePhotoClick(movie.details)} /></td>
        <td>{movie.rating}</td>
      </tr>
    ));
  };

  return (
    <div>
      <h1>Search for...</h1>
      <select value={searchType} onChange={handleSearchTypeChange}>
        <option value="">Select an option...</option>
        <option value="directors">Director</option>
        <option value="actors">Actor</option>
      </select>
      
      {searchType && (
        <select value={selection} onChange={handleSelectionChange}>
          <option value="">Select a {searchType.slice(0, -1)}</option>
          {searchResults.map(result => (
            <option key={result.id} value={result.id}>{result.name}</option>
          ))}
        </select>
      )}

      {selection && (
        <table>
          <thead>
            <tr>
              <th>Movie Name</th>
              <th>Photo</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {renderSearchResults()}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SearchFor;