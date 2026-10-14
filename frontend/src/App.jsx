import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import StudentProfile from './components/StudentProfile';
import StudentModal from './components/StudentModal';
import SkillModal from './components/SkillModal';
import InternshipModal from './components/InternshipModal';
import CertificationModal from './components/CertificationModal';
import ProjectModal from './components/ProjectModal';
import { api } from './services/api';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'students' | 'profile'
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Modal visibility states
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [statsData, studentsData] = await Promise.all([
        api.getStats().catch(err => {
          console.warn('Could not load stats:', err);
          return null;
        }),
        api.getStudents().catch(err => {
          console.warn('Could not load students:', err);
          return [];
        }),
      ]);

      setStats(statsData);
      setStudents(studentsData || []);
    } catch (error) {
      showToast('Error connecting to backend API: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const refreshStudentProfile = async (studentId) => {
    try {
      const updated = await api.getStudentById(studentId);
      setSelectedStudent(updated);
      // update in students list as well
      setStudents(prev => prev.map(s => s.id === studentId ? updated : s));
      // update stats
      api.getStats().then(setStats).catch(() => {});
    } catch (error) {
      showToast('Failed to refresh student profile: ' + error.message, 'error');
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // --- Student Actions ---
  const handleOpenAddStudent = () => {
    setStudentToEdit(null);
    setIsStudentModalOpen(true);
  };

  const handleOpenEditStudent = (student) => {
    setStudentToEdit(student);
    setIsStudentModalOpen(true);
  };

  const handleSaveStudent = async (studentData) => {
    try {
      if (studentToEdit) {
        const updated = await api.updateStudent(studentToEdit.id, studentData);
        showToast(`Student ${updated.name} updated successfully!`);
        if (selectedStudent && selectedStudent.id === studentToEdit.id) {
          setSelectedStudent(updated);
        }
      } else {
        const created = await api.createStudent(studentData);
        showToast(`Student ${created.name} enrolled successfully!`);
      }
      setIsStudentModalOpen(false);
      loadInitialData();
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleDeleteStudent = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete student "${name}"? This action cannot be undone.`)) {
      return;
    }
    try {
      await api.deleteStudent(id);
      showToast(`Student "${name}" deleted successfully.`);
      if (selectedStudent && selectedStudent.id === id) {
        setSelectedStudent(null);
        setActiveTab('students');
      }
      loadInitialData();
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setActiveTab('profile');
    // Ensure fresh profile details
    refreshStudentProfile(student.id);
  };

  // --- Skill Actions ---
  const handleAddSkill = async (skillData) => {
    if (!selectedStudent) return;
    try {
      await api.addSkill(selectedStudent.id, skillData);
      showToast(`Skill "${skillData.skillName}" added!`);
      setIsSkillModalOpen(false);
      refreshStudentProfile(selectedStudent.id);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleDeleteSkill = async (skillId) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await api.deleteSkill(skillId);
      showToast('Skill deleted.');
      refreshStudentProfile(selectedStudent.id);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  // --- Internship Actions ---
  const handleAddInternship = async (data) => {
    if (!selectedStudent) return;
    try {
      await api.addInternship(selectedStudent.id, data);
      showToast(`Internship at "${data.companyName}" added!`);
      setIsInternshipModalOpen(false);
      refreshStudentProfile(selectedStudent.id);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleDeleteInternship = async (internshipId) => {
    if (!window.confirm('Delete this internship record?')) return;
    try {
      await api.deleteInternship(internshipId);
      showToast('Internship record removed.');
      refreshStudentProfile(selectedStudent.id);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  // --- Certification Actions ---
  const handleAddCertification = async (data) => {
    if (!selectedStudent) return;
    try {
      await api.addCertification(selectedStudent.id, data);
      showToast(`Certification "${data.title}" added!`);
      setIsCertModalOpen(false);
      refreshStudentProfile(selectedStudent.id);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleDeleteCertification = async (certId) => {
    if (!window.confirm('Delete this certification record?')) return;
    try {
      await api.deleteCertification(certId);
      showToast('Certification removed.');
      refreshStudentProfile(selectedStudent.id);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  // --- Project Actions ---
  const handleAddProject = async (data) => {
    if (!selectedStudent) return;
    try {
      await api.addProject(selectedStudent.id, data);
      showToast(`Project "${data.title}" recorded!`);
      setIsProjectModalOpen(false);
      refreshStudentProfile(selectedStudent.id);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Delete this project record?')) return;
    try {
      await api.deleteProject(projectId);
      showToast('Project removed.');
      refreshStudentProfile(selectedStudent.id);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAddStudent={handleOpenAddStudent}
        studentCount={students.length}
      />

      <main className="main-content">
        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray-500)' }}>
            Loading student records & analytics...
          </div>
        )}

        {!loading && activeTab === 'dashboard' && (
          <Dashboard
            stats={stats}
            students={students}
            onSelectStudent={handleSelectStudent}
            onViewAllStudents={() => setActiveTab('students')}
          />
        )}

        {!loading && activeTab === 'students' && (
          <StudentList
            students={students}
            onSelectStudent={handleSelectStudent}
            onAddStudent={handleOpenAddStudent}
            onEditStudent={handleOpenEditStudent}
            onDeleteStudent={handleDeleteStudent}
          />
        )}

        {!loading && activeTab === 'profile' && selectedStudent && (
          <StudentProfile
            student={selectedStudent}
            onBack={() => setActiveTab('students')}
            onEditStudent={handleOpenEditStudent}
            onOpenSkillModal={() => setIsSkillModalOpen(true)}
            onDeleteSkill={handleDeleteSkill}
            onOpenInternshipModal={() => setIsInternshipModalOpen(true)}
            onDeleteInternship={handleDeleteInternship}
            onOpenCertModal={() => setIsCertModalOpen(true)}
            onDeleteCert={handleDeleteCertification}
            onOpenProjectModal={() => setIsProjectModalOpen(true)}
            onDeleteProject={handleDeleteProject}
          />
        )}
      </main>

      {/* Modals */}
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        onSubmit={handleSaveStudent}
        studentToEdit={studentToEdit}
      />

      <SkillModal
        isOpen={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
        onSubmit={handleAddSkill}
      />

      <InternshipModal
        isOpen={isInternshipModalOpen}
        onClose={() => setIsInternshipModalOpen(false)}
        onSubmit={handleAddInternship}
      />

      <CertificationModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        onSubmit={handleAddCertification}
      />

      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSubmit={handleAddProject}
      />

      {/* Floating Toast Notification */}
      {toast && (
        <div className="toast-container no-print">
          <div className={`toast ${toast.type}`}>
            {toast.type === 'error' ? (
              <AlertCircle size={20} color="var(--danger)" />
            ) : (
              <CheckCircle2 size={20} color="var(--success)" />
            )}
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
