import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function CertificationModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    issuingOrganization: '',
    issueDate: '',
    credentialUrl: '',
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
      title: '',
      issuingOrganization: '',
      issueDate: '',
      credentialUrl: '',
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add Certification</h3>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Certificate Title *</label>
              <input
                type="text"
                className="form-input"
                name="title"
                required
                placeholder="e.g. AWS Certified Solutions Architect, NPTEL Deep Learning"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Issuing Organization *</label>
              <input
                type="text"
                className="form-input"
                name="issuingOrganization"
                required
                placeholder="e.g. Amazon Web Services, Coursera, NPTEL"
                value={formData.issuingOrganization}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Issue Date</label>
              <input
                type="date"
                className="form-input"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Credential Verification URL</label>
              <input
                type="url"
                className="form-input"
                name="credentialUrl"
                placeholder="https://www.credly.com/... or cert URL"
                value={formData.credentialUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Certification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
