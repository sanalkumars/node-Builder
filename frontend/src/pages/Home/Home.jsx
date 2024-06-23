import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Home/HomePage.css'; // Create this CSS file for styling
import { useSelector } from 'react-redux';

const HomePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1 className="site-name">Note_Builder</h1>
        <div className="auth-buttons">
          {user ? (
            <button onClick={() => navigate('/dashboard')} className="dashboard-button">Dashboard</button>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="login-button">Login</button>
              <button onClick={() => navigate('/signup')} className="signup-button">Signup</button>
            </>
          )}
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
