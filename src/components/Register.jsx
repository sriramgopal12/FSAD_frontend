import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService.js';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(2); // Default to User
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    apiService.auth
      .register({
        username,
        password,
        role,
      })
      .then((res) => {
        alert(res.data);
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        alert('Registration failed.');
      });
  };

  return (
    <div
      className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-cyan-600 via-teal-400 to-indigo-600"
      style={{
        backgroundSize: '200% 200%',
        animation: 'gradientAnimation 6s ease infinite',
      }}
    >
      <style>
        {`
          @keyframes gradientAnimation {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
      <button
        onClick={() => navigate('/')}
        className="absolute top-5 left-5 flex items-center bg-white bg-opacity-80 px-3 py-2 rounded-lg text-indigo-700 hover:bg-opacity-100 transition-all shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Home
      </button>
      <div className="register p-10 shadow-lg w-1/3 h-auto bg-teal-50 rounded-xl">
        <div className="text-center mt-5 mb-10 text-2xl font-bold transition duration-3s ease-in-out animate-bounce">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
            Register
          </h1>
        </div>

        <form className="flex flex-col items-center space-y-4" onSubmit={handleRegister}>
          <div className="flex items-center justify-between w-full">
            <label className="font-sans w-1/3 text-right ml-8 pr-4">Username:</label>
            <input
              className="peer border-2 rounded-md w-1/2 mr-8 pl-2 h-10 focus:outline-none focus:ring-2 hover:border-cyan-600 focus:ring-blue-500 focus:border-blue-500 peer-valid:border-green-500"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <label className="font-sans w-1/3 text-right ml-8 pr-4">Password:</label>
            <input
              className="peer border-2 rounded-md w-1/2 mr-8 pl-2 h-10 focus:outline-none focus:ring-2 hover:border-cyan-600 focus:ring-blue-500 focus:border-blue-500 peer-valid:border-green-500"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <label className="font-sans w-1/3 text-right ml-8 pr-4">Role:</label>
            <select
              className="border-2 rounded-md w-1/2 mr-8 pl-2 h-10 focus:outline-none"
              value={role}
              onChange={(e) => setRole(Number(e.target.value))}
              required
            >
              <option value={1}>Admin</option>
              <option value={2}>User</option>
            </select>
          </div>
          <button
            className="text-white bg-blue-500 transition delay-50 duration-300 ease-in-out hover:scale-110 hover:bg-blue-700 h-10 w-24 rounded-full shadow-md cursor-pointer mt-5"
            type="submit"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
