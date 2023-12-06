import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';

function SignUp() {
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    if (!regName || !regEmail || !regPassword || !regConfirmPassword) {
      setErrorMessage('Please enter all fields');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:3004/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: regName, email: regEmail, password: regPassword })
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      navigate('/sign-in'); // Redirect to sign-in page
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Sign Up</h2>
        <form onSubmit={handleRegisterSubmit}>
          <input 
            type="text" 
            placeholder="Nickname" 
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
            className="App-input"
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
            className="App-input"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            className="App-input"
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={regConfirmPassword}
            onChange={(e) => setRegConfirmPassword(e.target.value)}
            className="App-input"
          />
          <button type="submit" className="App-button">Sign Up</button>
        </form>
        {errorMessage && <div className="App-error">{errorMessage}</div>}
        <div className="navigation-buttons">
          <button onClick={() => navigate('/')} className="App-button">Back to Main</button>
          <button onClick={() => navigate('/sign-in')} className="App-button">Sign In</button>
        </div>
      </header>
    </div>
  );
}

export default SignUp;
