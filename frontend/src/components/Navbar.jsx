import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleProfilePopup, handleNewNoteClick }) => {
  const [searchItem, setSearchItem] = useState('');


  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the form from submitting
    setSearchItem(e.target.value); // Update the state with the current input value
    console.log("The item search item entered by the user:", searchItem);
  };

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <Link to="/" className="text-xl font-medium text-black py-2">Notes</Link>
        <div className="relative w-full max-w-xs">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            onChange={(e) => setSearchItem(e.target.value)} // Directly update the state on change
          />
          <button 
            type="submit" 
            className="absolute inset-y-0 right-0 flex items-center px-4 py-2 border-l-2 border-gray-300 rounded-r-lg text-sm font-medium text-gray-700 hover:text-gray-800 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
            onClick={handleSearch} // Pass the event handler without calling it
          >
            Search
          </button>
        </div>
        <button onClick={toggleProfilePopup} className="...">
          Profile
        </button>
        <button onClick={handleNewNoteClick} className="...">
          New Note
        </button>
        {/* Other navbar elements */}
    </div>
  );
};

export default Navbar;
