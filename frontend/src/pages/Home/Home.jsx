// HomePage.jsx
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import ProfileDetails from '../../components/ProfileDetails';
import { useNavigate } from 'react-router-dom';
import Notes from '../../components/Notes';
import NewNoteForm from '../../components/NewNoteForm'; // Ensure this import matches your file structure

const HomePage = () => {
  const navigate = useNavigate();
  const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);
  const [isNewNoteFormVisible, setIsNewNoteFormVisible] = useState(false);

  const toggleProfilePopup = () => {
    setIsProfilePopupVisible(!isProfilePopupVisible);
  };

  const handleNewNoteClick = () => {
    setIsNewNoteFormVisible(true);
  };

  const handleCreateNote = (newNote) => {
    // Here you would typically update your application's state with the new note
    console.log('Created note:', newNote);
    setIsNewNoteFormVisible(false); // Close the form after submission
  };

  return (
    <div>
      <Navbar toggleProfilePopup={toggleProfilePopup} handleNewNoteClick={handleNewNoteClick} />
      {isProfilePopupVisible && (
        <ProfileDetails 
          onClose={() => setIsProfilePopupVisible(false)} 
          username="JohnDoe" // Placeholder, replace with actual user data
          email="john.doe@example.com" // Placeholder, replace with actual user data
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

export default HomePage;
