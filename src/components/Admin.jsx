import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(0);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Course management state
  const [courses, setCourses] = useState([
    { id: 1, title: 'Introduction to Web Development', category: 'Development', students: 45, status: 'Active' },
    { id: 2, title: 'Advanced JavaScript', category: 'Development', students: 32, status: 'Active' },
    { id: 3, title: 'Data Science Fundamentals', category: 'Data Science', students: 28, status: 'Active' }
  ]);
  const [newCourse, setNewCourse] = useState({ title: '', category: '', description: '', level: 'Beginner' });
  
  // Materials state
  const [materials, setMaterials] = useState([
    { id: 1, courseId: 1, title: 'HTML Basics', type: 'PDF', uploadDate: '2023-05-01' },
    { id: 2, courseId: 1, title: 'CSS Fundamentals', type: 'Video', uploadDate: '2023-05-02' },
    { id: 3, courseId: 2, title: 'JavaScript Arrays', type: 'Code', uploadDate: '2023-05-03' }
  ]);
  const [newMaterial, setNewMaterial] = useState({ courseId: '', title: '', type: 'PDF', file: null });
  
  // For material viewing
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  
  // Assignments state
  const [assignments, setAssignments] = useState([
    { id: 1, courseId: 1, title: 'Create a Simple Webpage', dueDate: '2023-06-15', submissions: 38 },
    { id: 2, courseId: 2, title: 'Build an Interactive Form', dueDate: '2023-06-20', submissions: 25 }
  ]);
  const [newAssignment, setNewAssignment] = useState({ courseId: '', title: '', description: '', dueDate: '' });
  
  // Student evaluations state
  const [evaluations, setEvaluations] = useState([
    { id: 1, studentName: 'John Doe', courseId: 1, assignmentId: 1, grade: 'A', feedback: 'Excellent work!' },
    { id: 2, studentName: 'Jane Smith', courseId: 1, assignmentId: 1, grade: 'B+', feedback: 'Good effort but needs improvement in CSS' }
  ]);
  const [newEvaluation, setNewEvaluation] = useState({ 
    studentName: '', 
    courseId: '', 
    assignmentId: '', 
    grade: '', 
    feedback: '' 
  });
  
  useEffect(() => {
  // Check if user is logged in and is an admin
  const un = localStorage.getItem('un');
  const userRole = localStorage.getItem('role');
  
  if (!un || userRole !== '1') {
    // If not logged in or not an admin, redirect to login
    navigate('/login');
  } else {
    setUsername(un);
    setRole(parseInt(userRole));
    
    // Load all data on component mount
    const fetchData = async () => {
      try {
        // Try to fetch courses from API
        const coursesResponse = await fetch('http://localhost:8081/api/courses');
        if (coursesResponse.ok) {
          const coursesData = await coursesResponse.json();
          setCourses(coursesData);
          // Also save to localStorage
          localStorage.setItem('courses', JSON.stringify(coursesData));
        } else {
          // If API fails, try loading from localStorage
          const savedCourses = localStorage.getItem('courses');
          if (savedCourses) {
            setCourses(JSON.parse(savedCourses));
          }
        }
        
        // Try to fetch materials from API
        const materialsResponse = await fetch('http://localhost:8081/api/materials');
        if (materialsResponse.ok) {
          const materialsData = await materialsResponse.json();
          setMaterials(materialsData);
          // Also save to localStorage
          localStorage.setItem('materials', JSON.stringify(materialsData));
        } else {
          // If API fails, try loading from localStorage
          const savedMaterials = localStorage.getItem('materials');
          if (savedMaterials) {
            setMaterials(JSON.parse(savedMaterials));
          }
        }
        
        // Try to fetch assignments from API
        const assignmentsResponse = await fetch('http://localhost:8081/api/assignments');
        if (assignmentsResponse.ok) {
          const assignmentsData = await assignmentsResponse.json();
          setAssignments(assignmentsData);
          // Also save to localStorage
          localStorage.setItem('assignments', JSON.stringify(assignmentsData));
        } else {
          // If API fails, try loading from localStorage
          const savedAssignments = localStorage.getItem('assignments');
          if (savedAssignments) {
            setAssignments(JSON.parse(savedAssignments));
          }
        }
        
        // Try to fetch evaluations from API
        const evaluationsResponse = await fetch('http://localhost:8081/api/evaluations');
        if (evaluationsResponse.ok) {
          const evaluationsData = await evaluationsResponse.json();
          setEvaluations(evaluationsData);
          // Also save to localStorage
          localStorage.setItem('evaluations', JSON.stringify(evaluationsData));
        } else {
          // If API fails, try loading from localStorage
          const savedEvaluations = localStorage.getItem('evaluations');
          if (savedEvaluations) {
            setEvaluations(JSON.parse(savedEvaluations));
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        
        // If API calls fail, try loading from localStorage
        const loadFromLocalStorage = (key, setter) => {
          const savedData = localStorage.getItem(key);
          if (savedData) {
            setter(JSON.parse(savedData));
          }
        };
        
        loadFromLocalStorage('courses', setCourses);
        loadFromLocalStorage('materials', setMaterials);
        loadFromLocalStorage('assignments', setAssignments);
        loadFromLocalStorage('evaluations', setEvaluations);
      }
    };
    
    fetchData();
  }
}, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('un');
    localStorage.removeItem('role');
    navigate('/login');
  };

  // Material viewing functions
  const handleViewMaterial = (material) => {
    setSelectedMaterial(material);
    setShowMaterialModal(true);
  };

  const handleCloseModal = () => {
    setShowMaterialModal(false);
    setSelectedMaterial(null);
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
            <p className="text-sm text-gray-500 mb-4">For course: {courses.find(c => c.id === selectedMaterial.courseId)?.title}</p>
            <p className="text-sm text-gray-500">Uploaded on: {selectedMaterial.uploadDate}</p>
          </div>
        );
        
      case 'Video':
        return (
          <div className="bg-black rounded-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 flex items-center justify-center bg-gray-800" style={{aspectRatio: '16/9'}}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="p-4 bg-gray-800 text-white">
              <h3 className="text-xl font-medium mb-2">{selectedMaterial.title}</h3>
              <p className="text-gray-300 text-sm mb-4">
                Video player would be embedded here in a real application.
                <br />
                For course: {courses.find(c => c.id === selectedMaterial.courseId)?.title}
              </p>
              <div className="flex justify-between items-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  Play
                </button>
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
              <div className="text-sm text-gray-400">
                For course: {courses.find(c => c.id === selectedMaterial.courseId)?.title}
              </div>
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
            <div className="p-2 bg-gray-800 text-gray-400 text-xs">
              Uploaded on {selectedMaterial.uploadDate}
            </div>
          </div>
        );
        
      case 'Slides':
        return (
          <div className="bg-white p-8 rounded-md">
            <div className="text-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-yellow-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-medium mb-2">{selectedMaterial.title}</h3>
              <p className="text-gray-600 mb-4">Presentation Slides</p>
            </div>
            
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 mb-4 flex items-center justify-center" style={{height: '300px'}}>
              <p className="text-gray-400 text-center">Slide preview would appear here in a real application</p>
            </div>
            
            <div className="flex justify-between items-center text-sm text-gray-500">
              <div>For course: {courses.find(c => c.id === selectedMaterial.courseId)?.title}</div>
              <div>Uploaded on {selectedMaterial.uploadDate}</div>
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
            <p className="text-sm text-gray-500 mb-4">For course: {courses.find(c => c.id === selectedMaterial.courseId)?.title}</p>
            <p className="text-sm text-gray-500">Uploaded on: {selectedMaterial.uploadDate}</p>
          </div>
        );
    }
  };

  // Update the handleAddCourse function
  const handleAddCourse = async () => {
    if (!newCourse.title || !newCourse.category || !newCourse.description) return;

    const course = {
      title: newCourse.title,
      category: newCourse.category,
      description: newCourse.description,
      level: newCourse.level,
      students: 0,
      status: 'Active'
    };

    try {
      const response = await fetch('http://localhost:8081/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(course)
      });

      if (response.ok) {
        const savedCourse = await response.json();
        const updatedCourses = [...courses, savedCourse];
        setCourses(updatedCourses);
        
        // Also save to localStorage as backup to ensure courses are visible in Home
        localStorage.setItem('courses', JSON.stringify(updatedCourses));
        
        setNewCourse({ title: '', category: '', description: '', level: 'Beginner' });
      } else {
        console.error('Failed to add course');
        
        // If API fails, still update local state and localStorage
        const newCourseWithId = { ...course, id: Date.now() };
        const updatedCourses = [...courses, newCourseWithId];
        setCourses(updatedCourses);
        localStorage.setItem('courses', JSON.stringify(updatedCourses));
        
        setNewCourse({ title: '', category: '', description: '', level: 'Beginner' });
      }
    } catch (error) {
      console.error('Error:', error);
      
      // If API call fails entirely, still update local state and localStorage
      const newCourseWithId = { ...course, id: Date.now() };
      const updatedCourses = [...courses, newCourseWithId];
      setCourses(updatedCourses);
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      
      setNewCourse({ title: '', category: '', description: '', level: 'Beginner' });
    }
  };

  // Also update the useEffect function to load courses
  useEffect(() => {
    // Check if user is logged in and is an admin
    const un = localStorage.getItem('un');
    const userRole = localStorage.getItem('role');
    
    if (!un || userRole !== '1') {
      // If not logged in or not an admin, redirect to login
      navigate('/login');
    } else {
      setUsername(un);
      setRole(parseInt(userRole));
      
      // Load courses on component mount
      const fetchCourses = async () => {
        try {
          const response = await fetch('http://localhost:8081/api/courses');
          if (response.ok) {
            const data = await response.json();
            setCourses(data);
          } else {
            // If API fails, try loading from localStorage
            const savedCourses = localStorage.getItem('courses');
            if (savedCourses) {
              setCourses(JSON.parse(savedCourses));
            }
          }
        } catch (error) {
          console.error('Error fetching courses:', error);
          // If API call fails, try loading from localStorage
          const savedCourses = localStorage.getItem('courses');
          if (savedCourses) {
            setCourses(JSON.parse(savedCourses));
          }
        }
      };
      
      fetchCourses();
    }
  }, [navigate]);

  const handleAddMaterial = async () => {
    if (!newMaterial.title || !newMaterial.courseId) return;

    const material = {
      courseId: parseInt(newMaterial.courseId),
      title: newMaterial.title,
      type: newMaterial.type,
      uploadDate: new Date().toISOString().split('T')[0]
    };

    try {
      const response = await fetch('http://localhost:8081/api/materials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(material)
      });

      if (response.ok) {
        const saved = await response.json();
        const updatedMaterials = [...materials, saved];
        setMaterials(updatedMaterials);
        
        // Save to localStorage as backup
        localStorage.setItem('materials', JSON.stringify(updatedMaterials));
        
        setNewMaterial({ courseId: '', title: '', type: 'PDF', file: null });
      } else {
        console.error('Failed to upload material');
        
        // If API fails, still update local state and localStorage
        const newMaterialWithId = { ...material, id: Date.now() };
        const updatedMaterials = [...materials, newMaterialWithId];
        setMaterials(updatedMaterials);
        localStorage.setItem('materials', JSON.stringify(updatedMaterials));
        
        setNewMaterial({ courseId: '', title: '', type: 'PDF', file: null });
      }
    } catch (error) {
      console.error('Error:', error);
      
      // If API call fails entirely, still update local state and localStorage
      const newMaterialWithId = { ...material, id: Date.now() };
      const updatedMaterials = [...materials, newMaterialWithId];
      setMaterials(updatedMaterials);
      localStorage.setItem('materials', JSON.stringify(updatedMaterials));
      
      setNewMaterial({ courseId: '', title: '', type: 'PDF', file: null });
    }
  };

  // Also add this inside useEffect to load materials on component mount
  useEffect(() => {
    // ...existing code for user authentication...
    
    // Load courses and materials on component mount
    const fetchData = async () => {
      try {
        // Try to fetch courses from API
        const coursesResponse = await fetch('http://localhost:8081/api/courses');
        if (coursesResponse.ok) {
          const coursesData = await coursesResponse.json();
          setCourses(coursesData);
        } else {
          // If API fails, try loading from localStorage
          const savedCourses = localStorage.getItem('courses');
          if (savedCourses) {
            setCourses(JSON.parse(savedCourses));
          }
        }
        
        // Try to fetch materials from API
        const materialsResponse = await fetch('http://localhost:8081/api/materials');
        if (materialsResponse.ok) {
          const materialsData = await materialsResponse.json();
          setMaterials(materialsData);
        } else {
          // If API fails, try loading from localStorage
          const savedMaterials = localStorage.getItem('materials');
          if (savedMaterials) {
            setMaterials(JSON.parse(savedMaterials));
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        
        // If API calls fail, try loading from localStorage
        const savedCourses = localStorage.getItem('courses');
        if (savedCourses) {
          setCourses(JSON.parse(savedCourses));
        }
        
        const savedMaterials = localStorage.getItem('materials');
        if (savedMaterials) {
          setMaterials(JSON.parse(savedMaterials));
        }
      }
    };
    
    fetchData();
  }, [navigate]);


  // Assignment handlers
  // Update handleAddAssignment function to use localStorage
  const handleAddAssignment = async () => {
    if (!newAssignment.title || !newAssignment.courseId) return;
    
    const assignment = {
      id: Date.now(), // Generate a unique ID
      courseId: parseInt(newAssignment.courseId),
      title: newAssignment.title,
      description: newAssignment.description,
      dueDate: newAssignment.dueDate,
      submissions: 0
    };
    
    try {
      const response = await fetch('http://localhost:8081/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(assignment)
      });

      if (response.ok) {
        const savedAssignment = await response.json();
        const updatedAssignments = [...assignments, savedAssignment];
        setAssignments(updatedAssignments);
        
        // Save to localStorage
        localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
        
        setNewAssignment({ courseId: '', title: '', description: '', dueDate: '' });
      } else {
        console.error('Failed to create assignment');
        
        // If API fails, still update local state and localStorage
        const updatedAssignments = [...assignments, assignment];
        setAssignments(updatedAssignments);
        localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
        
        setNewAssignment({ courseId: '', title: '', description: '', dueDate: '' });
      }
    } catch (error) {
      console.error('Error creating assignment:', error);
      
      // If API call fails entirely, still update local state and localStorage
      const updatedAssignments = [...assignments, assignment];
      setAssignments(updatedAssignments);
      localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
      
      setNewAssignment({ courseId: '', title: '', description: '', dueDate: '' });
    }
  };

  // Update handleAddEvaluation function to use localStorage
  const handleAddEvaluation = async () => {
    if (!newEvaluation.studentName || !newEvaluation.courseId || !newEvaluation.assignmentId || !newEvaluation.grade) return;
    
    const evaluation = {
      id: Date.now(), // Generate a unique ID
      studentName: newEvaluation.studentName,
      courseId: parseInt(newEvaluation.courseId),
      assignmentId: parseInt(newEvaluation.assignmentId),
      grade: newEvaluation.grade,
      feedback: newEvaluation.feedback
    };
    
    try {
      const response = await fetch('http://localhost:8081/api/evaluations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(evaluation)
      });

      if (response.ok) {
        const savedEvaluation = await response.json();
        const updatedEvaluations = [...evaluations, savedEvaluation];
        setEvaluations(updatedEvaluations);
        
        // Save to localStorage
        localStorage.setItem('evaluations', JSON.stringify(updatedEvaluations));
        
        setNewEvaluation({ studentName: '', courseId: '', assignmentId: '', grade: '', feedback: '' });
      } else {
        console.error('Failed to submit evaluation');
        
        // If API fails, still update local state and localStorage
        const updatedEvaluations = [...evaluations, evaluation];
        setEvaluations(updatedEvaluations);
        localStorage.setItem('evaluations', JSON.stringify(updatedEvaluations));
        
        setNewEvaluation({ studentName: '', courseId: '', assignmentId: '', grade: '', feedback: '' });
      }
    } catch (error) {
      console.error('Error submitting evaluation:', error);
      
      // If API call fails entirely, still update local state and localStorage
      const updatedEvaluations = [...evaluations, evaluation];
      setEvaluations(updatedEvaluations);
      localStorage.setItem('evaluations', JSON.stringify(updatedEvaluations));
      
      setNewEvaluation({ studentName: '', courseId: '', assignmentId: '', grade: '', feedback: '' });
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin navigation bar */}
      <nav className="bg-gradient-to-r from-purple-600 to-indigo-800 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-white text-xl font-bold">Learning Hub</span>
        </div>
        
        <ul className="flex space-x-6">
          <li>
            <a 
              href="#" 
              className={`text-white hover:text-purple-200 ${activeTab === 'dashboard' ? 'font-bold border-b-2 border-white pb-1' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={`text-white hover:text-purple-200 ${activeTab === 'courses' ? 'font-bold border-b-2 border-white pb-1' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              Courses
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={`text-white hover:text-purple-200 ${activeTab === 'materials' ? 'font-bold border-b-2 border-white pb-1' : ''}`}
              onClick={() => setActiveTab('materials')}
            >
              Materials
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={`text-white hover:text-purple-200 ${activeTab === 'assignments' ? 'font-bold border-b-2 border-white pb-1' : ''}`}
              onClick={() => setActiveTab('assignments')}
            >
              Assignments
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={`text-white hover:text-purple-200 ${activeTab === 'evaluations' ? 'font-bold border-b-2 border-white pb-1' : ''}`}
              onClick={() => setActiveTab('evaluations')}
            >
              Evaluations
            </a>
          </li>
        </ul>
        
        <div className="flex items-center space-x-4">
          <span className="text-white font-medium">Instructor: {username}</span>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>
      
      {/* Content Area */}
      <div className="container mx-auto py-8 px-4">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
            <h1 className="text-3xl font-bold text-center mb-8 text-indigo-800">Instructor Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Dashboard Cards */}
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-gray-500 text-sm uppercase">Total Courses</h3>
                <p className="text-3xl font-semibold text-gray-700">{courses.length}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-gray-500 text-sm uppercase">Materials</h3>
                <p className="text-3xl font-semibold text-gray-700">{materials.length}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                <h3 className="text-gray-500 text-sm uppercase">Assignments</h3>
                <p className="text-3xl font-semibold text-gray-700">{assignments.length}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                <h3 className="text-gray-500 text-sm uppercase">Students</h3>
                <p className="text-3xl font-semibold text-gray-700">
                  {courses.reduce((sum, course) => sum + course.students, 0)}
                </p>
              </div>
            </div>
            
            {/* Recent Activities */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-semibold mb-4 text-indigo-700">Recent Courses</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.slice(0, 3).map(course => (
                      <tr key={course.id}>
                        <td className="py-3 px-4 border-b border-gray-200">{course.title}</td>
                        <td className="py-3 px-4 border-b border-gray-200">{course.category}</td>
                        <td className="py-3 px-4 border-b border-gray-200">{course.students}</td>
                        <td className="py-3 px-4 border-b border-gray-200">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">{course.status}</span>
                        </td>
                        <td className="py-3 px-4 border-b border-gray-200">
                          <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                          <button className="text-red-500 hover:text-red-700">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <>
            <h1 className="text-3xl font-bold mb-8 text-indigo-800">Course Management</h1>
            
            {/* Add Course Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4 text-indigo-700">Add New Course</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter course title"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Development, Design, Business"
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={newCourse.level}
                  onChange={(e) => setNewCourse({...newCourse, level: e.target.value})}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  placeholder="Enter course description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                ></textarea>
              </div>
              
              <button 
                onClick={handleAddCourse}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
              >
                Add Course
              </button>
            </div>
            
            {/* Course List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-indigo-700">Your Courses</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(course => (
                      <tr key={course.id}>
                        <td className="py-3 px-4 border-b border-gray-200">{course.title}</td>
                        <td className="py-3 px-4 border-b border-gray-200">{course.category}</td>
                        <td className="py-3 px-4 border-b border-gray-200">{course.level || 'Beginner'}</td>
                        <td className="py-3 px-4 border-b border-gray-200">{course.students}</td>
                        <td className="py-3 px-4 border-b border-gray-200">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">{course.status}</span>
                        </td>
                        <td className="py-3 px-4 border-b border-gray-200">
                          <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                          <button className="text-red-500 hover:text-red-700">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Materials Tab */}
        {activeTab === 'materials' && (
          <>
            <h1 className="text-3xl font-bold mb-8 text-indigo-800">Course Materials</h1>
            
            {/* Add Material Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4 text-indigo-700">Upload New Material</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Material Title</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter material title"
                    value={newMaterial.title}
                    onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newMaterial.courseId}
                    onChange={(e) => setNewMaterial({...newMaterial, courseId: e.target.value})}
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>{course.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Material Type</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newMaterial.type}
                    onChange={(e) => setNewMaterial({...newMaterial, type: e.target.value})}
                  >
                    <option value="PDF">PDF</option>
                    <option value="Video">Video</option>
                    <option value="Slides">Presentation</option>
                    <option value="Code">Code</option>
                    <option value="Text">Text</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
                  <input 
                    type="file" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => setNewMaterial({...newMaterial, file: e.target.files[0]})}
                  />
                </div>
              </div>
              
              <button 
                onClick={handleAddMaterial}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
              >
                Upload Material
              </button>
            </div>
            
            {/* Materials List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-indigo-700">Uploaded Materials</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map(material => (
                      <tr key={material.id}>
                        <td className="py-3 px-4 border-b border-gray-200">{material.title}</td>
                        <td className="py-3 px-4 border-b border-gray-200">
                          {courses.find(c => c.id === material.courseId)?.title || 'Unknown Course'}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-200">{material.type}</td>
                        <td className="py-3 px-4 border-b border-gray-200">{material.uploadDate}</td>
                        <td className="py-3 px-4 border-b border-gray-200">
                          <button 
                            className="text-blue-500 hover:text-blue-700 mr-2"
                            onClick={() => handleViewMaterial(material)}
                          >
                            View
                          </button>
                          <button className="text-red-500 hover:text-red-700">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <>
            <h1 className="text-3xl font-bold mb-8 text-indigo-800">Assignments</h1>
            
            {/* Add Assignment Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4 text-indigo-700">Create New Assignment</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Title</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter assignment title"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newAssignment.courseId}
                    onChange={(e) => setNewAssignment({...newAssignment, courseId: e.target.value})}
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>{course.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input 
                  type="date" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  placeholder="Enter assignment description and requirements"
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                ></textarea>
              </div>
              
              <button 
                onClick={handleAddAssignment}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
              >
                Create Assignment
              </button>
            </div>
            
            {/* Assignments List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-indigo-700">Created Assignments</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submissions</th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignments.map(assignment => (
                      <tr key={assignment.id}>
                        <td className="py-3 px-4 border-b border-gray-200">{assignment.title}</td>
                        <td className="py-3 px-4 border-b border-gray-200">
                          {courses.find(c => c.id === assignment.courseId)?.title || 'Unknown Course'}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-200">{assignment.dueDate}</td>
                        <td className="py-3 px-4 border-b border-gray-200">{assignment.submissions}</td>
                        <td className="py-3 px-4 border-b border-gray-200">
                          <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                          <button className="text-green-500 hover:text-green-700 mr-2">Grade</button>
                          <button className="text-red-500 hover:text-red-700">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Evaluations Tab */}
        {activeTab === 'evaluations' && (
          <>
            <h1 className="text-3xl font-bold mb-8 text-indigo-800">Student Evaluations</h1>
            
            {/* Add Evaluation Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4 text-indigo-700">Evaluate Student Performance</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter student name"
                    value={newEvaluation.studentName}
                    onChange={(e) => setNewEvaluation({...newEvaluation, studentName: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newEvaluation.courseId}
                    onChange={(e) => setNewEvaluation({...newEvaluation, courseId: e.target.value})}
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>{course.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assignment</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newEvaluation.assignmentId}
                    onChange={(e) => setNewEvaluation({...newEvaluation, assignmentId: e.target.value})}
                  >
                    <option value="">Select Assignment</option>
                    {assignments
                      .filter(a => a.courseId === parseInt(newEvaluation.courseId))
                      .map(assignment => (
                        <option key={assignment.id} value={assignment.id}>{assignment.title}</option>
                      ))
                    }
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newEvaluation.grade}
                    onChange={(e) => setNewEvaluation({...newEvaluation, grade: e.target.value})}
                  >
                    <option value="">Select Grade</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="B-">B-</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="C-">C-</option>
                    <option value="D">D</option>
                    <option value="F">F</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  placeholder="Provide feedback on student's performance"
                  value={newEvaluation.feedback}
                  onChange={(e) => setNewEvaluation({...newEvaluation, feedback: e.target.value})}
                ></textarea>
              </div>
              
              <button 
                onClick={handleAddEvaluation}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
              >
                Submit Evaluation
              </button>
            </div>
            
            {/* Evaluations List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-indigo-700">Student Evaluations</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evaluations.map(evaluation => (
                      <tr key={evaluation.id}>
                        <td className="py-3 px-4 border-b border-gray-200">{evaluation.studentName}</td>
                        <td className="py-3 px-4 border-b border-gray-200">
                          {courses.find(c => c.id === evaluation.courseId)?.title || 'Unknown Course'}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-200">
                          {assignments.find(a => a.id === evaluation.assignmentId)?.title || 'Unknown Assignment'}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-200">
                          <span 
                            className={`px-2 py-1 text-xs rounded-full ${
                              evaluation.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                              evaluation.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                              evaluation.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                              evaluation.grade.startsWith('D') ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}
                          >
                            {evaluation.grade}
                          </span>
                        </td>
                        <td className="py-3 px-4 border-b border-gray-200 truncate max-w-xs">
                          {evaluation.feedback}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-200">
                          <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                          <button className="text-red-500 hover:text-red-700">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

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
}