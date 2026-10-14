import React, { useState, useMemo } from 'react';
import { Search, Download, Plus, Eye, Edit3, Trash2, Filter } from 'lucide-react';

export default function StudentList({ 
  students, 
  onSelectStudent, 
  onAddStudent, 
  onEditStudent, 
  onDeleteStudent 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  // Extract unique departments for filter
  const departments = useMemo(() => {
    const set = new Set();
    students.forEach((s) => {
      if (s.department) set.add(s.department);
    });
    return Array.from(set).sort();
  }, [students]);

  // Filtered students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        !searchQuery ||
        s.name?.toLowerCase().includes(q) ||
        s.rollNumber?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q);

      const matchesDept = !departmentFilter || s.department === departmentFilter;
      const matchesYear = !yearFilter || String(s.yearOfStudy) === String(yearFilter);

      return matchesSearch && matchesDept && matchesYear;
    });
  }, [students, searchQuery, departmentFilter, yearFilter]);

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredStudents.length === 0) {
      alert('No students to export.');
      return;
    }

    const headers = ['Roll Number', 'Name', 'Email', 'Phone', 'Department', 'Year', 'CGPA', 'Skills Count', 'Internships Count'];
    const rows = filteredStudents.map((s) => [
      `"${s.rollNumber || ''}"`,
      `"${s.name || ''}"`,
      `"${s.email || ''}"`,
      `"${s.phone || ''}"`,
      `"${s.department || ''}"`,
      s.yearOfStudy || '',
      s.cgpa || '',
      s.skills?.length || 0,
      s.internships?.length || 0,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Students_Export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCgpaBadge = (cgpa) => {
    const val = parseFloat(cgpa);
    if (isNaN(val)) return <span className="badge badge-gray">N/A</span>;
    if (val >= 8.5) return <span className="badge badge-emerald">{val.toFixed(2)} High</span>;
    if (val >= 7.0) return <span className="badge badge-indigo">{val.toFixed(2)} Good</span>;
    return <span className="badge badge-amber">{val.toFixed(2)} Average</span>;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--gray-900)' }}>
            Students Directory
          </h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '0.95rem' }}>
            Comprehensive directory of all enrolled students and portfolios ({filteredStudents.length} of {students.length})
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={handleExportCSV}>
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          <button className="btn btn-primary" onClick={onAddStudent}>
            <Plus size={16} />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="search-input-group">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, roll number, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <select 
            className="select-filter"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select 
            className="select-filter"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option value="">All Years</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>
      </div>

      {/* Students Data Table */}
      <div className="card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Student Info</th>
                <th>Dept & Year</th>
                <th>CGPA</th>
                <th>Skills</th>
                <th>Internships</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray-500)' }}>
                    No students match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td style={{ fontWeight: 600, color: 'var(--primary)' }}>
                      {student.rollNumber}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{student.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{student.email}</div>
                    </td>
                    <td>
                      <span className="badge badge-indigo">{student.department || 'N/A'}</span>
                      <span style={{ marginLeft: '0.4rem', fontSize: '0.82rem', color: 'var(--gray-500)' }}>
                        Yr {student.yearOfStudy || 1}
                      </span>
                    </td>
                    <td>{getCgpaBadge(student.cgpa)}</td>
                    <td>
                      <span className="badge badge-emerald">
                        {student.skills?.length || 0} Skills
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-sky">
                        {student.internships?.length || 0} Internships
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                        <button 
                          className="btn btn-secondary btn-icon" 
                          onClick={() => onSelectStudent(student)}
                          title="View Profile"
                        >
                          <Eye size={15} />
                        </button>
                        <button 
                          className="btn btn-secondary btn-icon" 
                          onClick={() => onEditStudent(student)}
                          title="Edit Student"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button 
                          className="btn btn-danger btn-icon" 
                          onClick={() => onDeleteStudent(student.id, student.name)}
                          title="Delete Student"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
