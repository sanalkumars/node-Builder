// DashBoard.jsx
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import ProfileDetails from '../../components/ProfileDetails';
import { useNavigate } from 'react-router-dom';
import Notes from '../../components/Notes';
import NewNoteForm from '../../components/NewNoteForm'; // Ensure this import matches your file structure
import { useSelector } from 'react-redux';

const DashBoard = () => {
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user.currentUser);
  console.log("current user from redux = ", userData);

  const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);
  

  const toggleProfilePopup = () => {
    setIsProfilePopupVisible(!isProfilePopupVisible);
  };

  return (
    <div className=''>
      <Navbar toggleProfilePopup={toggleProfilePopup} />
      {isProfilePopupVisible && (
        <ProfileDetails 
          onClose={() => setIsProfilePopupVisible(false)} 
          username={userData.username} 
          email={userData.email}
          onLogout={() => {
            console.log('Logging out');
            navigate('/login');
            setIsProfilePopupVisible(false);
          }}
        />
      )}
      <div className='w-full'>
        <Notes />
      </div>

      

    </div>
  );
};

export default DashBoard;
