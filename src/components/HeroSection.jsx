import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {

  const navigate = useNavigate();

  const handleGetStarted=()=>{
    navigate('/login');
  }

  return (
    <div id="hero" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 text-center mt-12">
      <h1 className="text-5xl font-bold mb-4 mt-2">Welcome to LearningHub</h1>
      <p className="text-lg mb-6">Your one-stop platform for learning and growth.</p>
      <button className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-200" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
}