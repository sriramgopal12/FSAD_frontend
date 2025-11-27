import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiService } from '../services/apiService.js';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    apiService.auth
      .login({ username, password })
      .then((res) => {
        if (res.data.role !== 0) {
          localStorage.setItem('un', res.data.username);
          localStorage.setItem('role', res.data.role);
          if (res.data.role === 1) {
            navigate('/admin');
          } else if (res.data.role === 2) {
            navigate('/home');
          }
        } else {
          alert('Invalid role or credentials');
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
        alert('Login failed. Check console for details.');
      });
  };

  return (
    <div className="bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 h-screen flex flex-col items-center justify-center">
      {/* Back to Home button */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-5 left-5 flex items-center bg-white bg-opacity-80 px-3 py-2 rounded-lg text-indigo-700 hover:bg-opacity-100 transition-all shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Home
      </button>
      
      <div className="login p-10 shadow-lg w-1/3 h-auto bg-teal-50 rounded-xl">
        <div className="text-center mt-5 mb-10 text-2xl font-bold transition duration-3s ease-in-out animate-bounce">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
            Login
          </h1>
        </div>

        <form className="flex flex-col items-center space-y-4" onSubmit={handleLogin}>
          <div className="flex items-center justify-between w-full mr-8">
            <label className="font-sans w-1/3 ml-5 text-right pr-4">Username:</label>
            <input
              className="peer border-2 rounded-md w-1/2 mr-10 pl-2 h-10 focus:outline-none focus:ring-2 hover:border-cyan-600 focus:ring-blue-500 focus:border-blue-500 peer-valid:border-green-500"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between w-full mr-8">
            <label className="font-sans w-1/3 ml-5 text-right pr-4">Password:</label>
            <input
              className="peer border-2 rounded-md w-1/2 mr-10 pl-2 h-10 focus:outline-none focus:ring-2 hover:border-cyan-600 focus:ring-blue-500 focus:border-blue-500 peer-valid:border-green-500"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <a href="#" className="mt-2 text-blue-500 hover:font-semibold">
            Forget password?
          </a>
          <button
            className="text-white bg-blue-500 transition delay-100 duration-200 ease-in-out hover:scale-110 hover:bg-blue-700 h-10 w-24 rounded-full shadow-md cursor-pointer mt-5"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}