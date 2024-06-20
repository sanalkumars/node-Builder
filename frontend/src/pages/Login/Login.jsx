import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { validateEmail } from '../../utils/Helper';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = { email, password };

    if (!validateEmail(email)) {
      setError("Please enter a correct Email.");
      return;
    }

    if (!password) {
      setError("Please enter the Password.");
      return;
    }

    try {
      setError(null);
      const res = await fetch('http://localhost:3000/api/user/login', {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('authToken', data.token); // Store token in localStorage
        navigate('/dashboard');
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred during login.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-xs border-black">
        <h2 className="text-center mb-4 text-xl font-semibold text-black">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            className="w-full px-4 py-2 mt-2 border focus:outline-none focus:border-blue-500"
            onChange={onChangeEmail}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              className="w-full px-4 py-2 mt-2 border focus:outline-none focus:border-blue-500"
              onChange={onChangePassword}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
          {error && <p className="text-red-600">{error}</p>}
        </form>
        <div className="mt-4 text-center">
          <span>Not registered yet?</span>
          <Link to="/signup" className="ml-2 text-blue-500 hover:text-blue-800">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
