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
}) {
  const [activeTab, setActiveTab] = useState('skills');

  if (!student) return null;

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
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <button className="btn btn-secondary" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back to Students</span>
        </button>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={handlePrint}>
            <Printer size={16} />
            <span>Print Bio-Data</span>
          </button>
          <button className="btn btn-primary" onClick={() => onEditStudent(student)}>
            <Edit3 size={16} />
            <span>Edit Profile</span>
          </button>
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
              <span><strong>CGPA:</strong> {student.cgpa || 'N/A'}</span>
            </div>
            <div className="profile-meta" style={{ marginTop: '0.5rem', opacity: 0.85 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <Mail size={14} /> {student.email}
              </span>
              {student.phone && (
                <>
                  <span>•</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Phone size={14} /> {student.phone}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Quick KPI summary */}
        <div style={{ display: 'flex', gap: '1.5rem', background: 'rgba(255, 255, 255, 0.1)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{student.skills?.length || 0}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase' }}>Skills</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{student.internships?.length || 0}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase' }}>Internships</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{student.certifications?.length || 0}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase' }}>Certs</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{student.projects?.length || 0}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase' }}>Projects</div>
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
          <span>Internships ({student.internships?.length || 0})</span>
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
              <span>Technical Skills</span>
            </h2>
            <button className="btn btn-primary no-print" onClick={onOpenSkillModal}>
              <Plus size={15} />
              <span>Add Skill</span>
            </button>
          </div>
          <div className="card-body">
            {(!student.skills || student.skills.length === 0) ? (
              <p style={{ color: 'var(--gray-400)', fontStyle: 'italic' }}>No skills logged yet.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                {student.skills.map((skill) => (
                  <div 
                    key={skill.id} 
                    style={{ 
                      border: '1px solid var(--gray-200)', 
                      borderRadius: 'var(--radius-md)', 
                      padding: '1rem', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      background: 'white'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--gray-900)' }}>
                        {skill.skillName}
                      </div>
                      <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.35rem' }}>
                        <span className="badge badge-indigo">{skill.proficiencyLevel || 'Beginner'}</span>
                        {skill.verified && (
                          <span className="badge badge-emerald">
                            <CheckCircle size={11} /> Verified
                          </span>
                        )}
                      </div>
                    </div>
                    <button 
                      className="btn btn-danger btn-icon no-print" 
                      onClick={() => onDeleteSkill(skill.id)}
                      title="Delete Skill"
                    >
                      <Trash2 size={14} />
                    </button>
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
              <span>Corporate Internships</span>
            </h2>
            <button className="btn btn-primary no-print" onClick={onOpenInternshipModal}>
              <Plus size={15} />
              <span>Add Internship</span>
            </button>
          </div>
          <div className="card-body">
            {(!student.internships || student.internships.length === 0) ? (
              <p style={{ color: 'var(--gray-400)', fontStyle: 'italic' }}>No internships recorded yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {student.internships.map((internship) => (
                  <div 
                    key={internship.id} 
                    style={{ 
                      border: '1px solid var(--gray-200)', 
                      borderRadius: 'var(--radius-md)', 
                      padding: '1.25rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      background: 'white'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--gray-900)' }}>
                        {internship.role} <span style={{ color: 'var(--primary)', fontWeight: 500 }}>@ {internship.companyName}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.4rem', fontSize: '0.85rem', color: 'var(--gray-500)', flexWrap: 'wrap' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Calendar size={13} /> {internship.startDate || 'N/A'} to {internship.endDate || 'Present'}
                        </span>
                        {internship.stipend && (
                          <span>• Stipend: <strong>{internship.stipend}</strong></span>
                        )}
                        <span className="badge badge-sky">{internship.status || 'Active'}</span>
                      </div>
                      {internship.certificateUrl && (
                        <div style={{ marginTop: '0.6rem' }}>
                          <a 
                            href={internship.certificateUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--primary)', textDecoration: 'none' }}
                          >
                            <ExternalLink size={13} /> View Certificate / Letter
                          </a>
                        </div>
                      )}
                    </div>
                    <button 
                      className="btn btn-danger btn-icon no-print" 
                      onClick={() => onDeleteInternship(internship.id)}
                      title="Delete Internship"
                    >
                      <Trash2 size={14} />
                    </button>
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
              <span>Certifications & Credentials</span>
            </h2>
            <button className="btn btn-primary no-print" onClick={onOpenCertModal}>
              <Plus size={15} />
              <span>Add Certification</span>
            </button>
          </div>
          <div className="card-body">
            {(!student.certifications || student.certifications.length === 0) ? (
              <p style={{ color: 'var(--gray-400)', fontStyle: 'italic' }}>No certifications logged yet.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
                {student.certifications.map((cert) => (
                  <div 
                    key={cert.id} 
                    style={{ 
                      border: '1px solid var(--gray-200)', 
                      borderRadius: 'var(--radius-md)', 
                      padding: '1.25rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      background: 'white'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--gray-900)' }}>
                        {cert.title}
                      </div>
                      <div style={{ fontSize: '0.88rem', color: 'var(--gray-600)', marginTop: '0.2rem' }}>
                        Issued by: <strong>{cert.issuingOrganization}</strong>
                      </div>
                      {cert.issueDate && (
                        <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginTop: '0.2rem' }}>
                          Issued: {cert.issueDate}
                        </div>
                      )}
                      {cert.credentialUrl && (
                        <div style={{ marginTop: '0.5rem' }}>
                          <a 
                            href={cert.credentialUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--primary)', textDecoration: 'none' }}
                          >
                            <ExternalLink size={13} /> View Credential
                          </a>
                        </div>
                      )}
                    </div>
                    <button 
                      className="btn btn-danger btn-icon no-print" 
                      onClick={() => onDeleteCert(cert.id)}
                      title="Delete Certification"
                    >
                      <Trash2 size={14} />
                    </button>
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
              <Code2 size={20} color="#7c3aed" />
              <span>Academic & Live Projects</span>
            </h2>
            <button className="btn btn-primary no-print" onClick={onOpenProjectModal}>
              <Plus size={15} />
              <span>Add Project</span>
            </button>
          </div>
          <div className="card-body">
            {(!student.projects || student.projects.length === 0) ? (
              <p style={{ color: 'var(--gray-400)', fontStyle: 'italic' }}>No projects recorded yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {student.projects.map((proj) => (
                  <div 
                    key={proj.id} 
                    style={{ 
                      border: '1px solid var(--gray-200)', 
                      borderRadius: 'var(--radius-md)', 
                      padding: '1.25rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      background: 'white'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--gray-900)' }}>
                        {proj.title}
                      </div>
                      {proj.technologiesUsed && (
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                          {proj.technologiesUsed.split(',').map((tech, i) => (
                            <span key={i} className="badge badge-indigo">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                      {proj.description && (
                        <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', marginTop: '0.6rem', lineHeight: '1.5' }}>
                          {proj.description}
                        </p>
                      )}
                      {proj.projectUrl && (
                        <div style={{ marginTop: '0.6rem' }}>
                          <a 
                            href={proj.projectUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--primary)', textDecoration: 'none' }}
                          >
                            <ExternalLink size={13} /> Project / Repository Link
                          </a>
                        </div>
                      )}
                    </div>
                    <button 
                      className="btn btn-danger btn-icon no-print" 
                      onClick={() => onDeleteProject(proj.id)}
                      title="Delete Project"
                    >
                      <Trash2 size={14} />
                    </button>
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
