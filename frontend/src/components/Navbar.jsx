import React from 'react';
import { GraduationCap, LayoutDashboard, Users, UserPlus } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onAddStudent, studentCount }) {
  return (
    <header className="navbar no-print">
      <div className="nav-container">
        <a href="#" className="nav-brand" onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}>
          <GraduationCap size={28} />
          <span>StudentHub</span>
        </a>

        <div className="nav-links">
          <button 
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          <button 
            className={`nav-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            <Users size={18} />
            <span>Students Directory</span>
            {studentCount > 0 && (
              <span className="nav-badge">{studentCount}</span>
            )}
          </button>

          <button 
            className="btn btn-primary"
            onClick={onAddStudent}
            style={{ marginLeft: '0.5rem' }}
          >
            <UserPlus size={16} />
            <span>New Student</span>
          </button>
        </div>
      </div>
    </header>
  );
}
