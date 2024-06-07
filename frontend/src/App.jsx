import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/Home';
import LoginPage from './pages/Login/Login';
import SignupPage from './pages/SignUp/Signup';
import Dashboard from './pages/Dashboard/Dashboard';


const routes =(
  <Router>
  <Routes>
    <Route path="/" exact element={<HomePage />} />
    <Route path="/login" exact element={<LoginPage />} />
    <Route path="/signup" exact element={<SignupPage />} />
    <Route path="/dashboard" exact element={<Dashboard />} /> 
  </Routes>
</Router>
);

const App = () => {
  return (
   <div className=""> { routes } </div>
  );
};

export default App;
