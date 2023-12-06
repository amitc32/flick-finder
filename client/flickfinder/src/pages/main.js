import React from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';

function Main() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <h2>Welcome to FlickFinder</h2>
        <div className="navigation-buttons">
          <button onClick={() => navigate('/sign-in')} className="App-button">Sign In</button>
          <button onClick={() => navigate('/sign-up')} className="App-button">Sign Up</button>
        </div>
      </header>
    </div>
  );
}

export default Main;
