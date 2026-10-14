// API Client for Student Management System
// Seamlessly connects to localhost:8080 in local dev, and Render backend when deployed on Netlify
const API_BASE = import.meta.env.VITE_API_BASE_URL || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:8080' 
    : 'https://student-management-system-yhm5.onrender.com');

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      let errorMsg = `HTTP Error ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.message) errorMsg = errorData.message;
      } catch (e) {
        // fallback to status text
      }
      throw new Error(errorMsg);
    }
    
    // Check if response has content to parse
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error(`API Error on [${options.method || 'GET'} ${url}]:`, error);
    throw error;
  }
}

export const api = {
  // Dashboard
  getStats: () => request('/api/dashboard/stats'),

  // Students
  getStudents: () => request('/api/students'),
  getStudentById: (id) => request(`/api/students/${id}`),
  createStudent: (studentData) => request('/api/students', {
    method: 'POST',
    body: JSON.stringify(studentData),
  }),
  updateStudent: (id, studentData) => request(`/api/students/${id}`, {
    method: 'PUT',
    body: JSON.stringify(studentData),
  }),
  deleteStudent: (id) => request(`/api/students/${id}`, {
    method: 'DELETE',
  }),

  // Skills
  addSkill: (studentId, skillData) => request(`/api/skills/student/${studentId}`, {
    method: 'POST',
    body: JSON.stringify(skillData),
  }),
  deleteSkill: (skillId) => request(`/api/skills/${skillId}`, {
    method: 'DELETE',
  }),

  // Internships
  addInternship: (studentId, internshipData) => request(`/api/internships/student/${studentId}`, {
    method: 'POST',
    body: JSON.stringify(internshipData),
  }),
  deleteInternship: (internshipId) => request(`/api/internships/${internshipId}`, {
    method: 'DELETE',
  }),

  // Certifications
  addCertification: (studentId, certData) => request(`/api/certifications/student/${studentId}`, {
    method: 'POST',
    body: JSON.stringify(certData),
  }),
  deleteCertification: (certId) => request(`/api/certifications/${certId}`, {
    method: 'DELETE',
  }),

  // Projects
  addProject: (studentId, projectData) => request(`/api/projects/student/${studentId}`, {
    method: 'POST',
    body: JSON.stringify(projectData),
  }),
  deleteProject: (projectId) => request(`/api/projects/${projectId}`, {
    method: 'DELETE',
  }),
};
