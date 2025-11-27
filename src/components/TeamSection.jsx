import React, { useState } from 'react';

const teamMembers = [
  {
    name: 'John Doe',
    title: 'Software Engineer',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Jane Smith',
    title: 'Product Manager',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Alice Johnson',
    title: 'UI/UX Designer',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Michael Brown',
    title: 'DevOps Engineer',
    image: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
];

export default function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="py-20 bg-gray-100 dark:bg-gray-500 text-center">
      <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">Meet Our Team</h2>
      <div className="relative flex justify-center items-center">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 bg-blue-500 dark:bg-blue-700 text-white p-3 rounded-full shadow-md hover:bg-blue-600 dark:hover:bg-blue-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Faculty Card */}
        <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 w-80 transform transition-transform duration-300 hover:scale-110">
          <img
            src={teamMembers[currentIndex].image}
            alt={teamMembers[currentIndex].name}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{teamMembers[currentIndex].name}</h3>
          <p className="text-gray-600 dark:text-gray-300">{teamMembers[currentIndex].title}</p>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 bg-blue-500 dark:bg-blue-700 text-white p-3 rounded-full shadow-md hover:bg-blue-600 dark:hover:bg-blue-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}