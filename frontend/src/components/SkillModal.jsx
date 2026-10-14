import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function SkillModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    skillName: '',
    proficiencyLevel: 'Intermediate',
    verified: false,
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ skillName: '', proficiencyLevel: 'Intermediate', verified: false });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add Technical Skill</h3>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Skill Name *</label>
              <input
                type="text"
                className="form-input"
                required
                placeholder="e.g. React.js, Python, Docker"
                value={formData.skillName}
                onChange={(e) => setFormData({ ...formData, skillName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Proficiency Level *</label>
              <select
                className="form-select"
                value={formData.proficiencyLevel}
                onChange={(e) => setFormData({ ...formData, proficiencyLevel: e.target.value })}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '1rem' }}>
              <input
                type="checkbox"
                id="verifiedSkill"
                checked={formData.verified}
                onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <label htmlFor="verifiedSkill" style={{ marginBottom: 0, cursor: 'pointer' }}>
                Verified via Faculty / Assessment
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
