import React from 'react';

export default function ContentSection() {
  return (
    <div id="content" className="py-20 bg-white text-center">
      <h2 className="text-4xl font-bold mb-6">Explore Our Content</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Blogs</h3>
          <p>Read insightful articles and stay updated with the latest trends.</p>
        </div>
        <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Videos</h3>
          <p>Watch engaging video tutorials to learn at your own pace.</p>
        </div>
        <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Resources</h3>
          <p>Access a variety of resources to support your learning journey.</p>
        </div>
      </div>
    </div>
  );
}