import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing the icons
import { validateEmail } from '../../utils/Helper';

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp =  async (e) => {
    e.preventDefault();

    if (!username) {
      setError("Please enter a Username.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid Email.");
      return;
    }

    if (!password) {
      setError("Please enter a Password.");
      return;
    }

    if (password!== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const formData = { username, email, password };
     console.log( " the data sent to backend is : ",formData);

    try {
      setError("");
      //  sending the data from the form to the backend 

       const response = await fetch('http://localhost:3000/api/user/signup',{
        method:'POST',
        headers:{ 'Content-type' : 'application/json'},
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log("the data recived from backend is:" , data);

      if(data){
        navigate('/');
      }

      
    } catch (error) {
      setError(error.message);
    }
    
    
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-xs border-black">
        <h2 className="text-center mb-4 text-xl font-semibold text-black">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 mt-2 border focus:outline-none focus:border-blue-500"
            onChange={onChangeUsername}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mt-2 border focus:outline-none focus:border-blue-500"
            onChange={onChangeEmail}
          />
          <div className="relative">
            <input
              type={showPassword? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 mt-2 border focus:outline-none focus:border-blue-500"
              onChange={onChangePassword}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 mt-2 border focus:outline-none focus:border-blue-500"
            onChange={onChangeConfirmPassword}
          />
          <button
            type="submit"
            className="w-full px-4 py-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
          {error && <p className='text-red-600'>{error}</p>}
        </form>
        <div className="mt-4 text-center">
          <span>Already have an account?</span>
          <Link to="/login" className="ml-2 text-blue-500 hover:text-blue-800">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

// Ensure you have the validateEmail function imported or defined somewhere accessible in this file
