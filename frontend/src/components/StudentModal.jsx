import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function StudentModal({ isOpen, onClose, onSubmit, studentToEdit }) {
  const [formData, setFormData] = useState({
    rollNumber: '',
    name: '',
    email: '',
    phone: '',
    department: 'CSE',
    yearOfStudy: '3',
    cgpa: '',
  });

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        rollNumber: studentToEdit.rollNumber || '',
        name: studentToEdit.name || '',
        email: studentToEdit.email || '',
        phone: studentToEdit.phone || '',
        department: studentToEdit.department || 'CSE',
        yearOfStudy: String(studentToEdit.yearOfStudy || '3'),
        cgpa: String(studentToEdit.cgpa || ''),
      });
    } else {
      setFormData({
        rollNumber: '',
        name: '',
        email: '',
        phone: '',
        department: 'CSE',
        yearOfStudy: '3',
        cgpa: '',
      });
    }
  }, [studentToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      yearOfStudy: parseInt(formData.yearOfStudy, 10) || 1,
      cgpa: formData.cgpa ? parseFloat(formData.cgpa) : null,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{studentToEdit ? 'Edit Student Details' : 'Enroll New Student'}</h3>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Roll Number *</label>
              <input
                type="text"
                className="form-input"
                name="rollNumber"
                required
                placeholder="e.g. 24EG107D45"
                value={formData.rollNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                className="form-input"
                name="name"
                required
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                className="form-input"
                name="email"
                required
                placeholder="student@college.edu"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                className="form-input"
                name="phone"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Department *</label>
                <select
                  className="form-select"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="CSE">CSE</option>
                  <option value="AIML">AIML</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">MECH</option>
                  <option value="CIVIL">CIVIL</option>
                </select>
              </div>

              <div className="form-group">
                <label>Year of Study *</label>
                <select
                  className="form-select"
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                >
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Cumulative GPA (CGPA)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                className="form-input"
                name="cgpa"
                placeholder="e.g. 8.75"
                value={formData.cgpa}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {studentToEdit ? 'Save Changes' : 'Enroll Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
