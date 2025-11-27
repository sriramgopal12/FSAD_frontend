import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Check if user is logged in
    const un = localStorage.getItem('un');
    if (!un) {
      navigate('/login');
    } else {
      setUsername(un);
      
      // Fetch courses from the API
      fetchCourses();
    }
  }, [navigate]);
  
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8081/api/courses');
      
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      
      const data = await response.json();
      setCourses(data);
      
      // As a fallback, also check localStorage to show any courses added there
      const localCourses = localStorage.getItem('courses');
      if (localCourses) {
        const parsedLocalCourses = JSON.parse(localCourses);
        // Merge API courses with local courses, avoiding duplicates by ID
        const allCourseIds = new Set(data.map(course => course.id));
        const uniqueLocalCourses = parsedLocalCourses.filter(course => !allCourseIds.has(course.id));
        setCourses([...data, ...uniqueLocalCourses]);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses. Please try again later.');
      
      // If API fails, try to load from localStorage as backup
      const localCourses = localStorage.getItem('courses');
      if (localCourses) {
        setCourses(JSON.parse(localCourses));
      } else {
        // If no localStorage data, show default courses as fallback
        setCourses([
          { id: 1, title: 'Introduction to Web Development', category: 'Development', description: 'Learn the basics of HTML, CSS, and JavaScript', level: 'Beginner' },
          { id: 2, title: 'Advanced JavaScript', category: 'Development', description: 'Master modern JavaScript concepts', level: 'Intermediate' },
          { id: 3, title: 'Data Science Fundamentals', category: 'Data Science', description: 'Introduction to data analysis with Python', level: 'Beginner' }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('un');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header/Navigation */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">Learning Hub</h1>
          <div className="flex items-center space-x-4">
            <span>Welcome, {username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Courses Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Courses</h2>
          
          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
              <p className="mt-2 text-gray-600">Loading courses...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-medium">
                        {course.level || 'Beginner'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{course.category}</p>
                    <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{course.students || 0} students</span>
                      <button 
                        onClick={() => navigate(`/course/${course.id}`)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm transition duration-200"
                      >
                        View Course
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-500">No courses available yet. Check back later!</p>
            </div>
          )}
        </section>
        
        {/* My Enrolled Courses Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Enrolled Courses</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
            <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-200">
              Browse Courses
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;