// src/components/FindMatches.js
import React, { useState, useEffect } from 'react';
import './FindMatches.css';


function FindMatches() {
  const [username1, setUsername1] = useState('');
  const [username2, setUsername2] = useState('');
  const [user1MovieIds, setUser1MovieIds] = useState([]);
  const [user2MovieIds, setUser2MovieIds] = useState([]);
  const [matchingMovieIds, setMatchingMovieIds] = useState([]);
  const [matchingMovies, setMatchingMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const findMatchingMovies = async (user1, user2) => {
    try {
      console.log("user1: "+user1);
      console.log("user2: "+user2);
      // Make API requests to your Express.js server with user1 and user2 usernames
      const response1 = await fetch(`http://localhost:3004/api/flickfinder/${user1}/liked`);
      const response2 = await fetch(`http://localhost:3004/api/flickfinder/${user2}/liked`);
      

      if (!response1.ok || !response2.ok) {
        throw new Error('Failed to fetch data from the server');
      }

      const data1 = await response1.json();
      const data2 = await response2.json();
      console.log("data1: "+data1 );
      console.log("data2: "+data2 );

      // Extract MovieIds from the API responses
      const movieIds1 = data1.map((item) => item.MovieId);
      const movieIds2 = data2.map((item) => item.MovieId);

      // Find matching MovieIds (exact match)
      const matchingIds = movieIds1.filter((id) => movieIds2.includes(id));

      // Update user1MovieIds and user2MovieIds state
      setUser1MovieIds(movieIds1);
      setUser2MovieIds(movieIds2);

      // Update matchingMovieIds state with the matching IDs
      setMatchingMovieIds(matchingIds);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchMatchingMovieDetails = async () => {
      try {
        const fetchPromises = matchingMovieIds.map(movieId =>
          fetch(`http://localhost:3004/api/flickfinder/${movieId}/movie`).then(response => {
            if (response.ok) return response.json();
            throw new Error(`Failed to fetch details for movie ID: ${movieId}`);
          })
        );
  
        const moviesDetailsResponses = await Promise.all(fetchPromises);
        const moviesDetails = moviesDetailsResponses.map(response => response[0]);
        setMatchingMovies(moviesDetails);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        // Handle how this error is presented to the user
      }
    };
  
    if (matchingMovieIds.length > 0) {
      fetchMatchingMovieDetails();
    }
  }, [matchingMovieIds]);
  

  const navigateToNextMovie = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % matchingMovies.length);
  };

  const navigateToPreviousMovie = () => {
    setCurrentMovieIndex((prevIndex) =>
      prevIndex === 0 ? matchingMovies.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <div>
        <label>Your Username:</label>
        <input
          type="text"
          value={username1}
          onChange={(e) => setUsername1(e.target.value)}
          placeholder="Enter your username"
        />
      </div>
      <div>
        <label>Username of Partner:</label>
        <input
          type="text"
          value={username2}
          onChange={(e) => setUsername2(e.target.value)}
          placeholder="Enter partner's username"
        />
      </div>
      <button onClick={() => findMatchingMovies(username1, username2)}>Find Matches</button>

      {matchingMovies.length > 0 && (
        <div>
          <h2>{matchingMovies[currentMovieIndex].movieName}</h2>
          <img
            src={matchingMovies[currentMovieIndex].coverImage}
            alt={matchingMovies[currentMovieIndex].movieName}
          />
          <button onClick={navigateToPreviousMovie}>Previous</button>
          <button onClick={navigateToNextMovie}>Next</button>
        </div>
      )}

    </div>
  );
}

export default FindMatches;
