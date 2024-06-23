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
  const [isNewNoteFormVisible, setIsNewNoteFormVisible] = useState(false);

  const toggleProfilePopup = () => {
    setIsProfilePopupVisible(!isProfilePopupVisible);
  };

  const handleNewNoteClick = () => {
    setIsNewNoteFormVisible(true);
  };

  const handleCreateNote = (newNote) => {

    //  here we send the data to the backend for newnote
    // Here you would typically update your application's state with the new note
    console.log('Created note:', newNote);
    setIsNewNoteFormVisible(false); // Close the form after submission
  };

  return (
    <div className=''>
      <Navbar toggleProfilePopup={toggleProfilePopup} handleNewNoteClick={handleNewNoteClick} />
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
      {isNewNoteFormVisible && (
        <NewNoteForm onCreateNote={handleCreateNote} />
      )}
      <Notes />

    </div>
  );
};

export default DashBoard;
