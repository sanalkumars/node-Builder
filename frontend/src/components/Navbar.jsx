import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearUser } from '../redux/user/userSlice';

const Navbar = ({ toggleProfilePopup }) => {
  const [searchItem, setSearchItem] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the form from submitting
    setSearchItem(e.target.value); // Update the state with the current input value
    console.log("The item search item entered by the user:", searchItem);
  };

  const handleLogout = async () => {
    console.log("logout success...");


    try {
      // http://localhost:3000 testing wheather the code will work without this 

      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(clearUser());
        localStorage.removeItem('authToken');
        navigate('/');
      }
    } catch (error) {

    }
  }

  return (
    <div className='bg-cyan-800 flex flex-col md:flex-row items-center justify-between px-6 py-2 drop-shadow text-white'>
    <Link to="/" className="text-xl font-medium text-white py-2">Note_Builder</Link>

    <div className="relative w-full max-w-xs flex items-center mt-2 md:mt-0">
      <input
        type="text"
        placeholder="Search..."
        className="w-full border-2 border-gray-500 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none hover:border-orange-200"
        onChange={(e) => setSearchItem(e.target.value)}
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center px-4 py-2 border-l-2 border-gray-500 rounded-r-lg text-sm font-medium text-gray-700 bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 hover:text-gray-800 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>

    <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0">
      <button onClick={toggleProfilePopup} className="relative inline-flex items-center justify-center p-0.5 mb-2 md:mb-0 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-cyan-700 rounded-md group-hover:bg-opacity-0">
          Profile
        </span>
      </button>

      <button onClick={handleLogout} className="relative inline-flex items-center justify-center p-0.5 mb-2 md:mb-0 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-cyan-700 rounded-md group-hover:bg-opacity-0">
          LogOut
        </span>
      </button>

      <button className="relative inline-flex items-center justify-center p-0.5 mb-2 md:mb-0 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
        <Link to='/note' className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-cyan-700 rounded-md group-hover:bg-opacity-0">
          NewNote
        </Link>
      </button>
    </div>
  </div>
  );
};

export default Navbar;
