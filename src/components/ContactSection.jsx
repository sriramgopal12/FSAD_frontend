import React from 'react';

export default function ContactSection() {
  return (
    <div id="contact" className="py-20 bg-gray-800 text-white text-center">
      <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
      <form className="max-w-3xl mx-auto">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Your Message"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
            rows="4"
          ></textarea>
        </div>
        <button className="bg-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-blue-600">
          Send Message
        </button>
      </form>
    </div>
  );
}