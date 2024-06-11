// Navbar.jsx
import React from 'react';

const Navbar = ({ toggleProfilePopup }) => {
  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className="text-xl font-medium text-black py-2">Notes</h2>
        <div className="relative w-full max-w-xs">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          />
          <button 
            type="submit" 
            className="absolute inset-y-0 right-0 flex items-center px-4 py-2 border-l-2 border-gray-300 rounded-r-lg text-sm font-medium text-gray-700 hover:text-gray-800 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
            onClick={(e) => e.preventDefault()}
          >
            Search
          </button>
        </div>
        <button onClick={toggleProfilePopup} className="...">
          Profile
        </button>
        {/* Other navbar elements */}
    </div>
  );
};

export default Navbar;
