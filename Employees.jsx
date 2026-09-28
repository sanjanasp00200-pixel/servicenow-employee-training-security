import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Search, Plus, Filter, UserCheck, Mail, Building } from 'lucide-react';
import { Modal } from '../components/Modal';

export const Employees = () => {
  const { employees, addEmployee, checkAccess, effectiveRole } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'IT',
    role: 'Specialist'
  });

  const departments = ['ALL', ...new Set(employees.map((e) => e.department))];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = departmentFilter === 'ALL' || emp.department === departmentFilter;

    return matchesSearch && matchesDept;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    const success = addEmployee(formData);
    if (success) {
      setFormData({ name: '', email: '', department: 'IT', role: 'Specialist' });
      setIsModalOpen(false);
    }
  };

  const canManage = checkAccess('MANAGE_USERS');

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Employee Master Table</h1>
          <p className="page-subtitle">
            Source table for Employee Reference relationship and Dot-Walking department resolution
          </p>
        </div>
        {canManage && (
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Add New Employee
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="card-panel" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              className="form-input"
              placeholder="Search by Employee ID, Name, Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2.2rem' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} style={{ color: '#64748b' }} />
            <select
              className="form-select"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              style={{ width: '180px' }}
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  Dept: {dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Employees Table */}
      <div className="card-panel">
        <div className="card-header">
          <h3 className="card-title">
            <Users size={18} style={{ color: '#2563eb' }} /> Master Employees List ({filteredEmployees.length})
          </h3>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Email Address</th>
                <th>Department</th>
                <th>Role / Title</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#2563eb' }}>{emp.id}</td>
                    <td style={{ fontWeight: 600 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <UserCheck size={16} style={{ color: '#3b82f6' }} />
                        <span>{emp.name}</span>
                      </div>
                    </td>
                    <td style={{ color: '#64748b' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Mail size={14} />
                        <span>{emp.email}</span>
                      </div>
                    </td>
                    <td>
                      <span className="dot-walk-cell">
                        <Building size={12} /> {emp.department}
                      </span>
                    </td>
                    <td style={{ fontWeight: 500, color: '#0f172a' }}>{emp.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                    No employees matching filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Employee Record"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Save Employee
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alex Morgan"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. alex.morgan@company.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Department *</label>
            <select
              className="form-select"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            >
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Legal">Legal</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Role / Job Title *</label>
            <input
              type="text"
              className="form-input"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g. Senior Software Engineer"
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
