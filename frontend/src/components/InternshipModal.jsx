import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function InternshipModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    startDate: '',
    endDate: '',
    stipend: '',
    status: 'Completed',
    certificateUrl: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      companyName: '',
      role: '',
      startDate: '',
      endDate: '',
      stipend: '',
      status: 'Completed',
      certificateUrl: '',
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add Internship Record</h3>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Company / Organization Name *</label>
              <input
                type="text"
                className="form-input"
                name="companyName"
                required
                placeholder="e.g. Microsoft, Infosys, Tech Mahindra"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Role / Position *</label>
              <input
                type="text"
                className="form-input"
                name="role"
                required
                placeholder="e.g. Full Stack Developer Intern"
                value={formData.role}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  className="form-input"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  className="form-input"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Stipend / Compensation</label>
                <input
                  type="text"
                  className="form-input"
                  name="stipend"
                  placeholder="e.g. ₹20,000 / month"
                  value={formData.stipend}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Certificate / Offer Letter URL</label>
              <input
                type="url"
                className="form-input"
                name="certificateUrl"
                placeholder="https://drive.google.com/... or verification link"
                value={formData.certificateUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Internship
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
