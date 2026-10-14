import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function ProjectModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    technologiesUsed: '',
    projectUrl: '',
    description: '',
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
      technologiesUsed: '',
      projectUrl: '',
      description: '',
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add Academic / Portfolio Project</h3>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Project Title *</label>
              <input
                type="text"
                className="form-input"
                name="title"
                required
                placeholder="e.g. AI-Powered Medical Image Classifier"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Technologies Used</label>
              <input
                type="text"
                className="form-input"
                name="technologiesUsed"
                placeholder="e.g. React, Spring Boot, MySQL, Docker (comma-separated)"
                value={formData.technologiesUsed}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Project / Repository URL</label>
              <input
                type="url"
                className="form-input"
                name="projectUrl"
                placeholder="https://github.com/... or live demo URL"
                value={formData.projectUrl}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Brief Description</label>
              <textarea
                className="form-textarea"
                name="description"
                rows="3"
                placeholder="Briefly describe the key functionality and architectural highlights..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
