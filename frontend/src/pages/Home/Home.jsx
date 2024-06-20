
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Home/HomePage.css'; // Create this CSS file for styling

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1 className="site-name">Note_Builder</h1>
        <div className="auth-buttons">
          <button onClick={() => navigate('/login')} className="login-button">Login</button>
          <button onClick={() => navigate('/signup')} className="signup-button">Signup</button>
        </div>
      </header>
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome to Note_Builder</h1>
        <p className="welcome-message">Create your notes for future reference</p>
      </div>
    </div>
  );
};

export default HomePage;
