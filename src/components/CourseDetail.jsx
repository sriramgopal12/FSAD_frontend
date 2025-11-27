import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debug, setDebug] = useState({}); // For debugging
  
  // For material viewing
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const un = localStorage.getItem('un');
    if (!un) {
      navigate('/login');
      return;
    }
    
    fetchCourseData();
  }, [courseId, navigate]);
  
  const fetchCourseData = async () => {
    // ... existing fetchCourseData code ...
  };
  
  const handleBack = () => {
    navigate('/home');
  };
  
  const handleAccessMaterial = (material) => {
    console.log("Accessing material:", material);
    setSelectedMaterial(material);
    setShowMaterialModal(true);
    
    // In a real application, you might fetch the actual file content here
    // For now, we'll simulate content based on material type
  };
  
  const handleCloseModal = () => {
    setShowMaterialModal(false);
    setSelectedMaterial(null);
  };
  
  const handleDownloadMaterial = (material) => {
    // In a real app, this would trigger a file download
    // For this demo, we'll just show an alert
    alert(`Downloading ${material.title} (${material.type})`);
    
    // For a real implementation, you would create a download link:
    // const link = document.createElement('a');
    // link.href = material.fileUrl;
    // link.download = material.title;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };
  
  // Render simulated content based on material type
  const renderMaterialContent = () => {
    if (!selectedMaterial) return null;
    
    switch(selectedMaterial.type) {
      case 'PDF':
        return (
          <div className="bg-gray-100 p-8 rounded-md text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p className="mb-4 text-gray-600">PDF Viewer would be embedded here in a real application.</p>
            <p className="mb-4 font-medium">"{selectedMaterial.title}"</p>
            <button 
              onClick={() => handleDownloadMaterial(selectedMaterial)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded inline-flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </button>
          </div>
        );
        
      case 'Video':
        return (
          <div className="bg-black rounded-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 flex items-center justify-center bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="p-4 bg-gray-800 text-white">
              <h3 className="text-xl font-medium mb-2">{selectedMaterial.title}</h3>
              <p className="text-gray-300 text-sm mb-4">Video player would be embedded here in a real application.</p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    Play
                  </button>
                  <button 
                    onClick={() => handleDownloadMaterial(selectedMaterial)}
                    className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </button>
                </div>
                <div className="text-sm text-gray-400">
                  Uploaded on {selectedMaterial.uploadDate}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'Code':
        return (
          <div className="bg-gray-900 rounded-md overflow-hidden">
            <div className="flex justify-between items-center p-3 bg-gray-800 text-white">
              <h3 className="font-medium">{selectedMaterial.title}</h3>
              <button 
                onClick={() => handleDownloadMaterial(selectedMaterial)}
                className="text-gray-300 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="text-green-400 font-mono text-sm">
{`// Sample code for ${selectedMaterial.title}
function helloWorld() {
  console.log("Hello, Learning Hub!");
  
  // This is where the actual code content would be displayed
  // In a real application, this would show the actual code content
  // from the material file
  
  return "Welcome to the course!";
}

// Call the function
helloWorld();`}
              </pre>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="bg-white p-8 rounded-md text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-medium mb-2">{selectedMaterial.title}</h3>
            <p className="mb-4 text-gray-600">This is a {selectedMaterial.type} document.</p>
            <button 
              onClick={() => handleDownloadMaterial(selectedMaterial)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded inline-flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
          </div>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">Learning Hub</h1>
          <button
            onClick={handleBack}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded transition duration-200"
          >
            Back to Courses
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading course details...</p>
          </div>
        ) : error ? (
          <div className="space-y-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
            
            {/* Debug Information */}
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Debug Information</h3>
              <pre className="text-xs overflow-auto bg-gray-800 text-white p-3 rounded">
                {JSON.stringify(debug, null, 2)}
              </pre>
            </div>
            
            <button
              onClick={handleBack}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded transition duration-200"
            >
              Return to Course List
            </button>
          </div>
        ) : course ? (
          <>
            {/* Course Header */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 text-white">
                <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{course.category}</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{course.level || 'Beginner'}</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{course.students || 0} students</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Description</h2>
                  <p className="text-gray-600">{course.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Start Learning
                  </button>
                  
                  <button className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-4 py-2 rounded flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                    Save Course
                  </button>
                </div>
              </div>
            </div>
            
            {/* Course Materials Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800">Course Materials</h2>
              </div>
              
              {materials.length > 0 ? (
                <div className="p-6">
                  <div className="divide-y divide-gray-200">
                    {materials.map(material => (
                      <div key={material.id} className="py-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 
                            ${material.type === 'PDF' ? 'bg-red-100 text-red-500' : 
                            material.type === 'Video' ? 'bg-blue-100 text-blue-500' : 
                            material.type === 'Code' ? 'bg-green-100 text-green-500' : 
                            'bg-gray-100 text-gray-500'}`}>
                            {material.type === 'PDF' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            ) : material.type === 'Video' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-800">{material.title}</h3>
                            <p className="text-sm text-gray-500">{material.type} • Uploaded on {material.uploadDate}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleAccessMaterial(material)}
                          className="text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          Access
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500">No materials available for this course yet.</p>
                </div>
              )}
            </div>
            
            {/* Assignments Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800">Assignments</h2>
              </div>
              
              {assignments.length > 0 ? (
                <div className="p-6">
                  <div className="divide-y divide-gray-200">
                    {assignments.map(assignment => (
                      <div key={assignment.id} className="py-4 flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-800">{assignment.title}</h3>
                          <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
                        </div>
                        <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                          View Assignment
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500">No assignments available for this course yet.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <div className="mb-4 text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Course Not Found</h3>
            <p className="text-gray-600 mb-4">The course you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={handleBack}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded transition duration-200"
            >
              Return to Course List
            </button>
          </div>
        )}
      </main>
      
      {/* Material Modal */}
      {showMaterialModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedMaterial?.title}
              </h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              {renderMaterialContent()}
            </div>
            <div className="bg-gray-50 px-4 py-3 border-t flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;