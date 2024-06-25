import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Home/HomePage.css'; // Create this CSS file for styling
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';

const HomePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1 className="site-name">Note_Builder</h1>
        <div className="auth-buttons">
          {user ? (

            <button onClick={() => navigate('/dashboard')} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-200 rounded-md group-hover:bg-opacity-0 text-gray-900">
                Dashboard
              </span>
            </button>
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
      <Footer />
    </div>
  );
};

export default HomePage;
