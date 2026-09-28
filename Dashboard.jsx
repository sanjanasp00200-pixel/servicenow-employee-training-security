import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, Award, CheckCircle2, Clock, AlertCircle, Shield, UploadCloud, Link, ArrowRight } from 'lucide-react';

export const Dashboard = ({ setActiveTab }) => {
  const { employees, trainingRecords, currentUser, effectiveRole, getDotWalkedTrainingRecord, checkAccess } = useApp();

  const totalEmployees = employees.length;
  const totalTrainings = trainingRecords.length;
  const completedCount = trainingRecords.filter((t) => t.status === 'Completed').length;
  const inProgressCount = trainingRecords.filter((t) => t.status === 'In Progress').length;
  const notStartedCount = trainingRecords.filter((t) => t.status === 'Not Started').length;

  const completedPct = totalTrainings ? Math.round((completedCount / totalTrainings) * 100) : 0;
  const inProgressPct = totalTrainings ? Math.round((inProgressCount / totalTrainings) * 100) : 0;
  const notStartedPct = totalTrainings ? Math.round((notStartedCount / totalTrainings) * 100) : 0;

  // Dot-walked recent trainings sample
  const recentTrainings = trainingRecords.slice(0, 5).map(getDotWalkedTrainingRecord);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Executive Dashboard</h1>
          <p className="page-subtitle">
            Welcome back, <strong>{currentUser?.name || 'Guest User'}</strong> | System Context: <strong>{effectiveRole}</strong>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {checkAccess('IMPORT_DATA') && (
            <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('import-data')}>
              <UploadCloud size={16} /> Import Training CSV
            </button>
          )}
          <button className="btn btn-outline btn-sm" onClick={() => setActiveTab('dot-walking')}>
            <Link size={16} /> Dot-Walking Demo
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon-box kpi-icon-blue">
            <Users size={24} />
          </div>
          <div className="kpi-content">
            <span className="kpi-value">{totalEmployees}</span>
            <span className="kpi-label">Total Employees</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box kpi-icon-purple">
            <Award size={24} />
          </div>
          <div className="kpi-content">
            <span className="kpi-value">{totalTrainings}</span>
            <span className="kpi-label">Training Records</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box kpi-icon-green">
            <CheckCircle2 size={24} />
          </div>
          <div className="kpi-content">
            <span className="kpi-value">{completedCount}</span>
            <span className="kpi-label">Completed ({completedPct}%)</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box kpi-icon-amber">
            <Clock size={24} />
          </div>
          <div className="kpi-content">
            <span className="kpi-value">{inProgressCount}</span>
            <span className="kpi-label">In Progress ({inProgressPct}%)</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box kpi-icon-slate">
            <AlertCircle size={24} />
          </div>
          <div className="kpi-content">
            <span className="kpi-value">{notStartedCount}</span>
            <span className="kpi-label">Not Started ({notStartedPct}%)</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Status Distribution Visual Chart */}
        <div className="card-panel">
          <div className="card-header">
            <h3 className="card-title">
              <Award size={18} style={{ color: '#2563eb' }} /> Training Status Distribution
            </h3>
          </div>
          
          <div style={{ padding: '0.5rem 0' }}>
            {/* Progress Bar Stack */}
            <div style={{ height: '14px', borderRadius: '7px', background: '#e2e8f0', display: 'flex', overflow: 'hidden', marginBottom: '1.5rem' }}>
              <div style={{ width: `${completedPct}%`, background: '#16a34a' }} title={`Completed: ${completedPct}%`} />
              <div style={{ width: `${inProgressPct}%`, background: '#d97706' }} title={`In Progress: ${inProgressPct}%`} />
              <div style={{ width: `${notStartedPct}%`, background: '#64748b' }} title={`Not Started: ${notStartedPct}%`} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#16a34a' }} />
                  <span>Completed Trainings</span>
                </div>
                <strong>{completedCount} ({completedPct}%)</strong>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#d97706' }} />
                  <span>In Progress</span>
                </div>
                <strong>{inProgressCount} ({inProgressPct}%)</strong>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#64748b' }} />
                  <span>Not Started</span>
                </div>
                <strong>{notStartedCount} ({notStartedPct}%)</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Current Active Security Context Box */}
        <div className="card-panel">
          <div className="card-header">
            <h3 className="card-title">
              <Shield size={18} style={{ color: '#2563eb' }} /> Active Security & ACL Context
            </h3>
          </div>
          
          <div style={{ fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700 }}>LOGGED-IN USER</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{currentUser?.name || 'Not Authenticated'}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Username: {currentUser?.username || 'guest'}</div>
            </div>

            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700 }}>EVALUATED ROLE & PERMISSIONS</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                <span className={`role-pill role-${effectiveRole.toLowerCase().replace(' ', '-')}`}>
                  {effectiveRole}
                </span>
              </div>
            </div>

            <button
              className="btn btn-outline btn-sm"
              onClick={() => setActiveTab('security-acl')}
              style={{ justifyContent: 'space-between', marginTop: '0.25rem' }}
            >
              <span>Inspect ServiceNow ACL Rules</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Training Records Preview Table with Dot-Walked Department */}
      <div className="card-panel">
        <div className="card-header">
          <h3 className="card-title">
            <Award size={18} style={{ color: '#2563eb' }} /> Recent Training Records (Dot-Walked Preview)
          </h3>
          <button className="btn btn-outline btn-sm" onClick={() => setActiveTab('training-records')}>
            View All Records <ArrowRight size={14} />
          </button>
        </div>

        {checkAccess('TRAINING_RECORDS_READ') ? (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Record ID</th>
                  <th>Training Name</th>
                  <th>Completion Date</th>
                  <th>Status</th>
                  <th>Employee (Reference)</th>
                  <th>Department (Dot-Walked)</th>
                </tr>
              </thead>
              <tbody>
                {recentTrainings.map((rec) => (
                  <tr key={rec.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{rec.id}</td>
                    <td style={{ fontWeight: 600 }}>{rec.trainingName}</td>
                    <td>{rec.completionDate}</td>
                    <td>
                      <span className={`status-badge status-${rec.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {rec.status}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600, color: '#2563eb' }}>{rec.employeeName}</td>
                    <td>
                      <span className="dot-walk-cell">
                        <Link size={12} /> {rec.dotWalkedDepartment}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ padding: '1.5rem', textAlign: 'center', background: '#fee2e2', borderRadius: '8px', color: '#991b1b' }}>
            🔒 Access Denied: Role <strong>{effectiveRole}</strong> does not have Read permission for Training Records.
          </div>
        )}
      </div>
    </div>
  );
};
