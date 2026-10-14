import React from 'react';
import { Users, Award, Briefcase, FileCheck, Code2, ArrowRight, Sparkles, Building2, UserPlus } from 'lucide-react';

export default function Dashboard({ stats, students, onSelectStudent, onViewAllStudents, onAddStudent, currentUser }) {
  const departmentData = stats?.departmentDistribution || {};
  const isAdmin = currentUser?.role === 'admin';

  return (
    <div>
      {/* Hero Welcome Banner */}
      <div className="hero-banner">
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.12)', padding: '0.3rem 0.85rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem', backdropFilter: 'blur(8px)' }}>
            <Sparkles size={14} color="#38bdf8" />
            <span>Academic Year 2026-2027 Portal</span>
          </div>

          <h1 className="hero-title">
            Welcome back, <span>{currentUser?.name || 'Academic Administrator'}</span>
          </h1>
          <p className="hero-subtitle">
            Track student skill progressions, corporate internships, global certifications, and generate verified placement bio-data in real time.
          </p>

          <div style={{ display: 'flex', gap: '0.85rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={onViewAllStudents} style={{ background: 'white', color: 'var(--primary)', boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}>
              <Users size={16} />
              <span>Browse All Students</span>
            </button>
            {isAdmin && (
              <button className="btn" onClick={onAddStudent} style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)' }}>
                <UserPlus size={16} />
                <span>Enroll New Student</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon indigo">
            <Users size={26} />
          </div>
          <div className="stat-info">
            <div className="stat-label">Total Enrolled</div>
            <div className="stat-value">{stats?.totalStudents || 0}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon emerald">
            <Award size={26} />
          </div>
          <div className="stat-info">
            <div className="stat-label">Skills Logged</div>
            <div className="stat-value">{stats?.totalSkills || 0}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon sky">
            <Briefcase size={26} />
          </div>
          <div className="stat-info">
            <div className="stat-label">Internships</div>
            <div className="stat-value">{stats?.totalInternships || 0}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon amber">
            <FileCheck size={26} />
          </div>
          <div className="stat-info">
            <div className="stat-label">Certifications</div>
            <div className="stat-value">{stats?.totalCertifications || 0}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <Code2 size={26} />
          </div>
          <div className="stat-info">
            <div className="stat-label">Projects Built</div>
            <div className="stat-value">{stats?.totalProjects || 0}</div>
          </div>
        </div>
      </div>

      {/* Section 2: Department Distributions & Recent Students */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.75rem' }}>
        {/* Department Distribution */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <Building2 size={20} color="var(--primary)" />
              <span>Department Distribution</span>
            </h2>
            <span className="badge badge-indigo">
              {Object.keys(departmentData).length} Departments
            </span>
          </div>
          <div className="card-body">
            {Object.keys(departmentData).length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No departmental records available yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {Object.entries(departmentData).map(([dept, count]) => {
                  const pct = stats?.totalStudents > 0 ? Math.round((count / stats.totalStudents) * 100) : 0;
                  return (
                    <div key={dept}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.88rem', fontWeight: 700 }}>
                        <span style={{ color: '#0f172a' }}>{dept}</span>
                        <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{count} Students ({pct}%)</span>
                      </div>
                      <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                        <div 
                          style={{ 
                            width: `${pct}%`, 
                            height: '100%', 
                            background: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 100%)', 
                            borderRadius: '999px',
                            transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                          }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Recent Students Card */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <Users size={20} color="var(--secondary)" />
              <span>Recent Enrolled Students</span>
            </h2>
            <button className="btn btn-secondary btn-icon" onClick={onViewAllStudents} title="View all directory">
              <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Directory</span>
              <ArrowRight size={14} />
            </button>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {(!students || students.length === 0) ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                No students enrolled yet.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Roll Number</th>
                      <th>Student Name</th>
                      <th>Department</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.slice(0, 5).map((student) => (
                      <tr key={student.id}>
                        <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{student.rollNumber}</td>
                        <td style={{ fontWeight: 600, color: '#0f172a' }}>{student.name}</td>
                        <td>
                          <span className="badge badge-indigo">{student.department}</span>
                        </td>
                        <td>
                          <button 
                            className="btn btn-secondary" 
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                            onClick={() => onSelectStudent(student)}
                          >
                            Portfolio
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
