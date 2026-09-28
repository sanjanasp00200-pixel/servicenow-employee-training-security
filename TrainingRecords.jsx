import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Award, Plus, Search, Filter, ArrowUpDown, Edit, Trash2, Link, Building, Lock } from 'lucide-react';
import { Modal } from '../components/Modal';
import { AccessDenied } from '../components/AccessDenied';

export const TrainingRecords = () => {
  const {
    trainingRecords,
    employees,
    getDotWalkedTrainingRecord,
    addTrainingRecord,
    updateTrainingRecord,
    deleteTrainingRecord,
    checkAccess,
    effectiveRole
  } = useApp();

  const canRead = checkAccess('TRAINING_RECORDS_READ');
  const canWrite = checkAccess('TRAINING_RECORDS_WRITE');

  // Search, Filter & Sort State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('DESC'); // DESC = newest first

  // Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    trainingName: '',
    completionDate: new Date().toISOString().split('T')[0],
    status: 'In Progress',
    employeeId: employees[0]?.id || ''
  });

  if (!canRead) {
    return <AccessDenied resourceName="Employee Training Records" requiredRole="ADMIN, HR MANAGER, or EMPLOYEE" />;
  }

  // Selected Employee object for auto dot-walked department in form
  const selectedEmployeeObj = employees.find((e) => e.id === formData.employeeId);

  // Map and dot-walk records
  const dotWalkedRecords = trainingRecords.map(getDotWalkedTrainingRecord);

  // Extract unique departments for filter
  const departments = ['ALL', ...new Set(employees.map((e) => e.department))];

  // Filtering & Sorting
  const filteredRecords = dotWalkedRecords
    .filter((rec) => {
      const matchesSearch =
        rec.trainingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'ALL' || rec.status === statusFilter;
      const matchesDept = deptFilter === 'ALL' || rec.dotWalkedDepartment === deptFilter;

      return matchesSearch && matchesStatus && matchesDept;
    })
    .sort((a, b) => {
      const dateA = new Date(a.completionDate || 0);
      const dateB = new Date(b.completionDate || 0);
      return sortOrder === 'ASC' ? dateA - dateB : dateB - dateA;
    });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formData.trainingName || !formData.employeeId || !formData.completionDate) return;

    if (editingRecord) {
      updateTrainingRecord(editingRecord.id, formData);
      setEditingRecord(null);
    } else {
      addTrainingRecord(formData);
    }
    setIsCreateOpen(false);
    resetForm();
  };

  const handleEditClick = (rec) => {
    setEditingRecord(rec);
    setFormData({
      trainingName: rec.trainingName,
      completionDate: rec.completionDate,
      status: rec.status,
      employeeId: rec.employeeId || employees.find((e) => e.name === rec.employeeName)?.id || employees[0]?.id
    });
    setIsCreateOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm(`Are you sure you want to delete training record ${id}?`)) {
      deleteTrainingRecord(id);
    }
  };

  const resetForm = () => {
    setFormData({
      trainingName: '',
      completionDate: new Date().toISOString().split('T')[0],
      status: 'In Progress',
      employeeId: employees[0]?.id || ''
    });
    setEditingRecord(null);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Employee Training Records</h1>
          <p className="page-subtitle">
            Demonstrating relational Employee reference and dot-walked Department field fetching
          </p>
        </div>
        {canWrite ? (
          <button
            className="btn btn-primary"
            onClick={() => {
              resetForm();
              setIsCreateOpen(true);
            }}
          >
            <Plus size={16} /> Create Training Record
          </button>
        ) : (
          <div className="role-pill role-employee" style={{ padding: '0.5rem 0.8rem' }}>
            <Lock size={14} /> Read-Only View (Role: {effectiveRole})
          </div>
        )}
      </div>

      {/* Search, Filter & Sort Controls */}
      <div className="card-panel" style={{ padding: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              className="form-input"
              placeholder="Search training or employee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2.2rem' }}
            />
          </div>

          <div>
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">Status: All</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Not Started">Not Started</option>
            </select>
          </div>

          <div>
            <select
              className="form-select"
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  Department: {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              className="btn btn-outline"
              style={{ width: '100%', justifyContent: 'space-between' }}
              onClick={() => setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')}
            >
              <span>Date: {sortOrder === 'DESC' ? 'Newest First' : 'Oldest First'}</span>
              <ArrowUpDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Records Table */}
      <div className="card-panel">
        <div className="card-header">
          <h3 className="card-title">
            <Award size={18} style={{ color: '#2563eb' }} /> Training Records List ({filteredRecords.length})
          </h3>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Training Name</th>
                <th>Completion Date</th>
                <th>Status</th>
                <th>Employee Reference</th>
                <th>Employee Department (Dot-Walked)</th>
                {canWrite && <th style={{ textAlign: 'right' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((rec) => (
                  <tr key={rec.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{rec.id}</td>
                    <td style={{ fontWeight: 600 }}>{rec.trainingName}</td>
                    <td>{rec.completionDate}</td>
                    <td>
                      <span className={`status-badge status-${rec.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {rec.status}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600, color: '#2563eb' }}>
                      {rec.employeeName}
                    </td>
                    <td>
                      <span className="dot-walk-cell">
                        <Link size={12} /> {rec.dotWalkedDepartment}
                      </span>
                    </td>
                    {canWrite && (
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                          <button
                            className="btn btn-outline btn-sm"
                            style={{ padding: '0.25rem 0.5rem' }}
                            onClick={() => handleEditClick(rec)}
                            title="Edit Training Record"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            className="btn btn-outline btn-sm"
                            style={{ padding: '0.25rem 0.5rem', color: '#dc2626', borderColor: '#fca5a5' }}
                            onClick={() => handleDeleteClick(rec.id)}
                            title="Delete Training Record"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={canWrite ? 7 : 6} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                    No training records found matching search filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal for Create & Edit */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false);
          resetForm();
        }}
        title={editingRecord ? `Edit Training Record (${editingRecord.id})` : 'Create New Training Record'}
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setIsCreateOpen(false);
                resetForm();
              }}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleCreateSubmit}>
              {editingRecord ? 'Update Record' : 'Create Record'}
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateSubmit}>
          <div className="form-group">
            <label className="form-label">Training Name *</label>
            <input
              type="text"
              className="form-input"
              value={formData.trainingName}
              onChange={(e) => setFormData({ ...formData, trainingName: e.target.value })}
              placeholder="e.g. Cyber Security Awareness"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Completion Date *</label>
            <input
              type="date"
              className="form-input"
              value={formData.completionDate}
              onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Status *</label>
            <select
              className="form-select"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Not Started">Not Started</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Select Employee (Reference) *</label>
            <select
              className="form-select"
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
              required
            >
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} ({emp.id} - {emp.department})
                </option>
              ))}
            </select>
          </div>

          {/* Dot-Walking Preview Box in Form */}
          <div
            style={{
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '8px',
              padding: '0.85rem',
              marginTop: '1rem'
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase' }}>
              ⚡ Dot-Walking Live Preview
            </div>
            <div style={{ fontSize: '0.85rem', color: '#1e40af', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Building size={14} />
              <span>
                Employee Department: <strong>{selectedEmployeeObj ? selectedEmployeeObj.department : 'N/A'}</strong> (Fetched via Employee reference)
              </span>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
