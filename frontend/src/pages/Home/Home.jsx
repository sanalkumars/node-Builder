// HomePage.jsx
import React, { useState  } from 'react';
import Navbar from '../../components/Navbar';
import ProfileDetails from '../../components/ProfileDetails';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);

  const toggleProfilePopup = () => {
    setIsProfilePopupVisible(!isProfilePopupVisible);
  };

  return (
    <div>
      <Navbar toggleProfilePopup={toggleProfilePopup} />
      {isProfilePopupVisible && (
        <ProfileDetails 
          onClose={() => setIsProfilePopupVisible(false)} 
          username="JohnDoe" // Placeholder, replace with actual user data
          email="john.doe@example.com" // Placeholder, replace with actual user data
          onLogout={() => {
            // Handle logout logic here
            console.log('Logging out');
            navigate('/login');
            
            setIsProfilePopupVisible(false);
          }}
        />
      )}
    </div>
  );
};

export default HomePage;
