import React, { useState } from 'react';
import { 
  ArrowLeft, Printer, Edit3, Plus, Trash2, Award, Briefcase, 
  FileCheck, Code2, ExternalLink, CheckCircle, Mail, Phone, Calendar 
} from 'lucide-react';

export default function StudentProfile({
  student,
  onBack,
  onEditStudent,
  onOpenSkillModal,
  onDeleteSkill,
  onOpenInternshipModal,
  onDeleteInternship,
  onOpenCertModal,
  onDeleteCert,
  onOpenProjectModal,
  onDeleteProject,
  currentUser
}) {
  const [activeTab, setActiveTab] = useState('skills');

  if (!student) return null;

  const isAdmin = currentUser?.role === 'admin';
  const isOwnerOrAdmin = isAdmin || currentUser?.identifier?.toUpperCase() === student.rollNumber?.toUpperCase();

  const getInitials = (name) => {
    if (!name) return 'S';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* Top action bar */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button className="btn btn-secondary" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back to Directory</span>
        </button>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={handlePrint}>
            <Printer size={16} />
            <span>Print Verified Bio-Data</span>
          </button>
          {isOwnerOrAdmin && (
            <button className="btn btn-primary" onClick={() => onEditStudent(student)}>
              <Edit3 size={16} />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      {/* Profile Header Banner */}
      <div className="profile-header-card">
        <div className="profile-avatar-info">
          <div className="profile-avatar">
            {getInitials(student.name)}
          </div>
          <div>
            <h1 className="profile-name">{student.name}</h1>
            <div className="profile-meta">
              <span><strong>Roll No:</strong> {student.rollNumber}</span>
              <span>•</span>
              <span><strong>Dept:</strong> {student.department} (Year {student.yearOfStudy})</span>
              <span>•</span>
              <span><strong>CGPA:</strong> {student.cgpa ? parseFloat(student.cgpa).toFixed(2) : 'N/A'}</span>
            </div>
            <div className="profile-meta" style={{ marginTop: '0.6rem', opacity: 0.9 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mail size={15} /> {student.email}
              </span>
              {student.phone && (
                <>
                  <span>•</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Phone size={15} /> {student.phone}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Quick KPI summary */}
        <div style={{ display: 'flex', gap: '1.75rem', background: 'rgba(255, 255, 255, 0.12)', padding: '1.25rem 2rem', borderRadius: 'var(--radius-lg)', backdropFilter: 'blur(10px)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{student.skills?.length || 0}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Skills</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{student.internships?.length || 0}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Internships</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{student.certifications?.length || 0}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Certs</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{student.projects?.length || 0}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Projects</div>
          </div>
        </div>
      </div>

      {/* Tabs bar */}
      <div className="profile-tabs no-print">
        <button 
          className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          <Award size={18} />
          <span>Technical Skills ({student.skills?.length || 0})</span>
        </button>

        <button 
          className={`tab-btn ${activeTab === 'internships' ? 'active' : ''}`}
          onClick={() => setActiveTab('internships')}
        >
          <Briefcase size={18} />
          <span>Corporate Internships ({student.internships?.length || 0})</span>
        </button>

        <button 
          className={`tab-btn ${activeTab === 'certifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('certifications')}
        >
          <FileCheck size={18} />
          <span>Certifications ({student.certifications?.length || 0})</span>
        </button>

        <button 
          className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <Code2 size={18} />
          <span>Projects ({student.projects?.length || 0})</span>
        </button>
      </div>

      {/* Tab 1: Skills */}
      {(activeTab === 'skills' || window.matchMedia('print').matches) && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <Award size={20} color="var(--primary)" />
              <span>Technical Skills Portfolio</span>
            </h2>
            {isOwnerOrAdmin && (
              <button className="btn btn-primary no-print" onClick={onOpenSkillModal}>
                <Plus size={15} />
                <span>Add Skill</span>
              </button>
            )}
          </div>
          <div className="card-body">
            {(!student.skills || student.skills.length === 0) ? (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No skills logged yet.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {student.skills.map((skill) => (
                  <div 
                    key={skill.id} 
                    style={{ 
                      border: '1.5px solid var(--border-color)', 
                      borderRadius: 'var(--radius-lg)', 
                      padding: '1.25rem', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      background: 'white',
                      boxShadow: 'var(--shadow-subtle)'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a' }}>
                        {skill.skillName}
                      </div>
                      <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.45rem' }}>
                        <span className="badge badge-indigo">{skill.proficiencyLevel || 'Beginner'}</span>
                        {skill.verified && (
                          <span className="badge badge-emerald">
                            <CheckCircle size={11} /> Faculty Verified
                          </span>
                        )}
                      </div>
                    </div>
                    {isOwnerOrAdmin && (
                      <button 
                        className="btn btn-danger btn-icon no-print" 
                        onClick={() => onDeleteSkill(skill.id)}
                        title="Delete Skill"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Internships */}
      {(activeTab === 'internships' || window.matchMedia('print').matches) && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <Briefcase size={20} color="var(--secondary)" />
              <span>Corporate Internships & Experience</span>
            </h2>
            {isOwnerOrAdmin && (
              <button className="btn btn-primary no-print" onClick={onOpenInternshipModal}>
                <Plus size={15} />
                <span>Add Internship</span>
              </button>
            )}
          </div>
          <div className="card-body">
            {(!student.internships || student.internships.length === 0) ? (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No corporate internships recorded yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {student.internships.map((internship) => (
                  <div 
                    key={internship.id} 
                    style={{ 
                      border: '1.5px solid var(--border-color)', 
                      borderRadius: 'var(--radius-lg)', 
                      padding: '1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      background: 'white',
                      boxShadow: 'var(--shadow-subtle)'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
                        {internship.role} <span style={{ color: 'var(--primary)', fontWeight: 600 }}>@ {internship.companyName}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.85rem', marginTop: '0.5rem', fontSize: '0.88rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Calendar size={14} /> {internship.startDate || 'N/A'} to {internship.endDate || 'Present'}
                        </span>
                        {internship.stipend && (
                          <span>• Stipend: <strong>{internship.stipend}</strong></span>
                        )}
                        <span className="badge badge-sky">{internship.status || 'Active'}</span>
                      </div>
                      {internship.certificateUrl && (
                        <div style={{ marginTop: '0.75rem' }}>
                          <a 
                            href={internship.certificateUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}
                          >
                            <ExternalLink size={14} /> View Internship Certificate / Offer
                          </a>
                        </div>
                      )}
                    </div>
                    {isOwnerOrAdmin && (
                      <button 
                        className="btn btn-danger btn-icon no-print" 
                        onClick={() => onDeleteInternship(internship.id)}
                        title="Delete Internship"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Certifications */}
      {(activeTab === 'certifications' || window.matchMedia('print').matches) && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <FileCheck size={20} color="var(--warning)" />
              <span>Global Certifications & Credentials</span>
            </h2>
            {isOwnerOrAdmin && (
              <button className="btn btn-primary no-print" onClick={onOpenCertModal}>
                <Plus size={15} />
                <span>Add Certification</span>
              </button>
            )}
          </div>
          <div className="card-body">
            {(!student.certifications || student.certifications.length === 0) ? (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No certifications logged yet.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
                {student.certifications.map((cert) => (
                  <div 
                    key={cert.id} 
                    style={{ 
                      border: '1.5px solid var(--border-color)', 
                      borderRadius: 'var(--radius-lg)', 
                      padding: '1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      background: 'white',
                      boxShadow: 'var(--shadow-subtle)'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                        {cert.title}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#475569', marginTop: '0.3rem' }}>
                        Issued by: <strong>{cert.issuingOrganization}</strong>
                      </div>
                      {cert.issueDate && (
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                          Issued: {cert.issueDate}
                        </div>
                      )}
                      {cert.credentialUrl && (
                        <div style={{ marginTop: '0.65rem' }}>
                          <a 
                            href={cert.credentialUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.88rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}
                          >
                            <ExternalLink size={14} /> View Credential
                          </a>
                        </div>
                      )}
                    </div>
                    {isOwnerOrAdmin && (
                      <button 
                        className="btn btn-danger btn-icon no-print" 
                        onClick={() => onDeleteCert(cert.id)}
                        title="Delete Certification"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Projects */}
      {(activeTab === 'projects' || window.matchMedia('print').matches) && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <Code2 size={20} color="var(--accent)" />
              <span>Academic & Live Projects</span>
            </h2>
            {isOwnerOrAdmin && (
              <button className="btn btn-primary no-print" onClick={onOpenProjectModal}>
                <Plus size={15} />
                <span>Add Project</span>
              </button>
            )}
          </div>
          <div className="card-body">
            {(!student.projects || student.projects.length === 0) ? (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No projects recorded yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {student.projects.map((proj) => (
                  <div 
                    key={proj.id} 
                    style={{ 
                      border: '1.5px solid var(--border-color)', 
                      borderRadius: 'var(--radius-lg)', 
                      padding: '1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      background: 'white',
                      boxShadow: 'var(--shadow-subtle)'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
                        {proj.title}
                      </div>
                      {proj.technologiesUsed && (
                        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                          {proj.technologiesUsed.split(',').map((tech, i) => (
                            <span key={i} className="badge badge-indigo">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                      {proj.description && (
                        <p style={{ fontSize: '0.92rem', color: '#475569', marginTop: '0.75rem', lineHeight: '1.6' }}>
                          {proj.description}
                        </p>
                      )}
                      {proj.projectUrl && (
                        <div style={{ marginTop: '0.75rem' }}>
                          <a 
                            href={proj.projectUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.88rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}
                          >
                            <ExternalLink size={14} /> Project / Repository Link
                          </a>
                        </div>
                      )}
                    </div>
                    {isOwnerOrAdmin && (
                      <button 
                        className="btn btn-danger btn-icon no-print" 
                        onClick={() => onDeleteProject(proj.id)}
                        title="Delete Project"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
