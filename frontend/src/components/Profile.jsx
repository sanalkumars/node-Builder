// Profile.js
import React from 'react';

const Profile = ({ onClick }) => {
  return (
    <button onClick={onClick} className="focus:outline-none">
      Profile
    </button>
  );
};

export default Profile;
