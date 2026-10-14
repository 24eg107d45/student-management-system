import React from 'react';
import { Users, Award, Briefcase, FileCheck, Code2, ArrowRight } from 'lucide-react';

export default function Dashboard({ stats, students, onSelectStudent, onViewAllStudents }) {
  const departmentData = stats?.departmentDistribution || {};

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--gray-900)' }}>
          Academic & Career Dashboard
        </h1>
        <p style={{ color: 'var(--gray-500)', fontSize: '0.95rem' }}>
          Overview of student technical profiles, corporate internships, and skill credentials
        </p>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.5rem' }}>
        {/* Department Distribution Card */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <span>Department Distribution</span>
            </h2>
          </div>
          <div className="card-body">
            {Object.keys(departmentData).length === 0 ? (
              <p style={{ color: 'var(--gray-400)', fontStyle: 'italic' }}>No departmental records available yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {Object.entries(departmentData).map(([dept, count]) => {
                  const pct = stats?.totalStudents > 0 ? Math.round((count / stats.totalStudents) * 100) : 0;
                  return (
                    <div key={dept}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.88rem', fontWeight: 600 }}>
                        <span>{dept}</span>
                        <span style={{ color: 'var(--gray-500)' }}>{count} Students ({pct}%)</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: 'var(--gray-200)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div 
                          style={{ 
                            width: `${pct}%`, 
                            height: '100%', 
                            background: 'var(--primary)', 
                            borderRadius: '999px',
                            transition: 'width 0.4s ease'
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
              <span>Recent Students</span>
            </h2>
            <button className="btn btn-secondary btn-icon" onClick={onViewAllStudents} title="View all">
              <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {(!students || students.length === 0) ? (
              <div style={{ padding: '1.5rem', color: 'var(--gray-400)', fontStyle: 'italic' }}>
                No students enrolled yet.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Roll No</th>
                      <th>Name</th>
                      <th>Dept</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.slice(0, 5).map((student) => (
                      <tr key={student.id}>
                        <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{student.rollNumber}</td>
                        <td>{student.name}</td>
                        <td>
                          <span className="badge badge-indigo">{student.department}</span>
                        </td>
                        <td>
                          <button 
                            className="btn btn-secondary" 
                            style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
                            onClick={() => onSelectStudent(student)}
                          >
                            Profile
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
