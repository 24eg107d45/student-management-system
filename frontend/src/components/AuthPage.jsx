import React, { useState } from 'react';
import { GraduationCap, ShieldCheck, UserCheck, Lock, Mail, User, BookOpen, KeyRound, ArrowRight, Zap } from 'lucide-react';

export default function AuthPage({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState('admin'); // 'admin' | 'student'

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    identifier: '', // Roll Number or Email or Admin ID
    email: '',
    department: 'CSE',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (!formData.name || !formData.email) {
        setError('Please fill in all required fields.');
        return;
      }

      const newUser = {
        name: formData.name,
        email: formData.email,
        role: role,
        department: formData.department,
        identifier: formData.identifier || formData.email.split('@')[0],
      };

      onLogin(newUser);
    } else {
      // Login
      if (!formData.identifier || !formData.password) {
        setError('Please enter your credentials.');
        return;
      }

      const user = {
        name: role === 'admin' ? 'Faculty Admin' : (formData.identifier.toUpperCase()),
        email: formData.identifier.includes('@') ? formData.identifier : `${formData.identifier.toLowerCase()}@college.edu`,
        role: role,
        identifier: formData.identifier,
      };

      onLogin(user);
    }
  };

  // 1-Click Quick Demo for viva/college evaluations
  const handleQuickDemo = (demoRole) => {
    if (demoRole === 'admin') {
      onLogin({
        name: 'Dr. Suresh Kumar (HOD)',
        email: 'admin.hod@college.edu',
        role: 'admin',
        department: 'CSE',
        identifier: 'FACULTY-01',
      });
    } else {
      onLogin({
        name: 'Rahul Sharma',
        email: '24eg107d45@college.edu',
        role: 'student',
        department: 'CSE',
        identifier: '24EG107D45',
      });
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-ambient-glow" />

      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo-box">
            <GraduationCap size={32} />
          </div>
          <h1 className="auth-title">StudentHub Portal</h1>
          <p className="auth-subtitle">
            Student Skill & Internship Management System
          </p>
        </div>

        {/* Tab switch: Sign In vs Create Account */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${!isSignUp ? 'active' : ''}`}
            onClick={() => { setIsSignUp(false); setError(''); }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${isSignUp ? 'active' : ''}`}
            onClick={() => { setIsSignUp(true); setError(''); }}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="auth-body">
          {/* Role selector */}
          <div className="role-selector">
            <div
              className={`role-card ${role === 'admin' ? 'active' : ''}`}
              onClick={() => setRole('admin')}
            >
              <ShieldCheck size={18} color={role === 'admin' ? 'var(--primary)' : '#64748b'} />
              <span>Faculty / Admin</span>
            </div>
            <div
              className={`role-card ${role === 'student' ? 'active' : ''}`}
              onClick={() => setRole('student')}
            >
              <UserCheck size={18} color={role === 'student' ? 'var(--primary)' : '#64748b'} />
              <span>Student</span>
            </div>
          </div>

          {error && (
            <div style={{ background: '#fef2f2', color: '#dc2626', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.84rem', marginBottom: '1rem', border: '1px solid #fecaca' }}>
              {error}
            </div>
          )}

          {isSignUp && (
            <>
              <div className="form-group">
                <label>Full Name *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="name"
                    required
                    className="form-input"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>{role === 'admin' ? 'Faculty ID' : 'Roll Number'} *</label>
                <input
                  type="text"
                  name="identifier"
                  required
                  className="form-input"
                  placeholder={role === 'admin' ? 'e.g. FACULTY-CSE-09' : 'e.g. 24EG107D45'}
                  value={formData.identifier}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>College Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="form-input"
                  placeholder="student@college.edu"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Department</label>
                <select
                  name="department"
                  className="form-select"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="CSE">Computer Science & Engineering (CSE)</option>
                  <option value="AIML">Artificial Intelligence & ML (AIML)</option>
                  <option value="IT">Information Technology (IT)</option>
                  <option value="ECE">Electronics & Communication (ECE)</option>
                  <option value="EEE">Electrical & Electronics (EEE)</option>
                  <option value="MECH">Mechanical Engineering</option>
                  <option value="CIVIL">Civil Engineering</option>
                </select>
              </div>
            </>
          )}

          {!isSignUp && (
            <div className="form-group">
              <label>{role === 'admin' ? 'Faculty ID / Admin Email' : 'Roll Number / Email'} *</label>
              <input
                type="text"
                name="identifier"
                required
                className="form-input"
                placeholder={role === 'admin' ? 'admin@college.edu or FACULTY-01' : '24EG107D45 or email'}
                value={formData.identifier}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              required
              className="form-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {isSignUp && (
            <div className="form-group">
              <label>Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                required
                className="form-input"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '0.8rem' }}>
            <span>{isSignUp ? 'Create My Account' : 'Sign In to Portal'}</span>
            <ArrowRight size={16} />
          </button>

          {/* Quick Demo Login Shortcut Buttons */}
          <div className="quick-demo-section">
            <div className="demo-title">
              <Zap size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
              Quick Demo Access (1-Click Viva Test)
            </div>
            <div className="demo-btn-group">
              <button
                type="button"
                className="demo-btn admin"
                onClick={() => handleQuickDemo('admin')}
              >
                <ShieldCheck size={15} />
                <span>Faculty / Admin</span>
              </button>
              <button
                type="button"
                className="demo-btn student"
                onClick={() => handleQuickDemo('student')}
              >
                <UserCheck size={15} />
                <span>Student Demo</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
