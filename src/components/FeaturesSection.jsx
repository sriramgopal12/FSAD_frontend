import React from 'react';

export default function FeaturesSection() {
  return (
    <div id="features" className="py-20 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold mb-6">Our Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Interactive Courses</h3>
          <p>Engage with interactive lessons and quizzes to enhance your learning experience.</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Expert Instructors</h3>
          <p>Learn from industry experts who bring real-world experience to the table.</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Community Support</h3>
          <p>Join a community of learners to share knowledge and grow together.</p>
        </div>
      </div>
    </div>
  );
}