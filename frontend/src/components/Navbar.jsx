import React from 'react';
import { GraduationCap, LayoutDashboard, Users, UserPlus, LogOut, ShieldCheck, UserCheck } from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onAddStudent, 
  studentCount, 
  currentUser, 
  onLogout 
}) {
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <header className="navbar no-print">
      <div className="nav-container">
        {/* Brand */}
        <a href="#" className="nav-brand" onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}>
          <div className="brand-icon-box">
            <GraduationCap size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-title">StudentHub</span>
            <span className="brand-subtitle">Skill & Career Matrix</span>
          </div>
        </a>

        {/* Navigation Tabs */}
        <div className="nav-links">
          <button 
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={17} />
            <span>Dashboard</span>
          </button>

          <button 
            className={`nav-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            <Users size={17} />
            <span>Students Directory</span>
            {studentCount > 0 && (
              <span className="nav-badge">{studentCount}</span>
            )}
          </button>

          {isAdmin && (
            <button 
              className="btn btn-primary"
              onClick={onAddStudent}
              style={{ marginLeft: '0.25rem' }}
            >
              <UserPlus size={16} />
              <span>Enroll Student</span>
            </button>
          )}

          {/* User profile & Logout */}
          {currentUser && (
            <div className="user-menu">
              <div className="user-avatar-circle">
                {getInitials(currentUser.name)}
              </div>
              <div className="user-details">
                <span className="user-name">{currentUser.name}</span>
                <span className={`user-role-badge ${currentUser.role || 'student'}`}>
                  {currentUser.role === 'admin' ? 'Faculty Admin' : 'Student'}
                </span>
              </div>
              <button
                className="btn btn-secondary btn-icon"
                onClick={onLogout}
                title="Logout"
                style={{ marginLeft: '0.4rem', border: 'none', background: '#f1f5f9' }}
              >
                <LogOut size={16} color="#64748b" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
