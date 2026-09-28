import React from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, Shield, CheckCircle2, RefreshCw, ArrowRight, Lock } from 'lucide-react';
import { AccessDenied } from '../components/AccessDenied';

export const ImpersonateUser = ({ setActiveTab }) => {
  const { currentUser, impersonatedRole, startImpersonation, stopImpersonation } = useApp();

  // Strictly available to real ADMIN
  if (currentUser?.role !== 'ADMIN') {
    return <AccessDenied resourceName="User Impersonation Tool" requiredRole="ADMIN (Real Authenticated User)" />;
  }

  const roleProfiles = [
    {
      role: 'ADMIN',
      title: 'System Administrator',
      description: 'Full system permissions across all modules. Can create, edit, delete, import, manage users and impersonate.',
      readTraining: true,
      writeTraining: true,
      importData: true,
      manageUsers: true,
      impersonate: true,
      badgeClass: 'role-admin'
    },
    {
      role: 'HR MANAGER',
      title: 'HR Manager',
      description: 'Can view training records, create/edit records, and stage/transform CSV imports. Cannot manage system users.',
      readTraining: true,
      writeTraining: true,
      importData: true,
      manageUsers: false,
      impersonate: false,
      badgeClass: 'role-hr-manager'
    },
    {
      role: 'EMPLOYEE',
      title: 'Standard Employee',
      description: 'Can view training records in read-only mode. Cannot create, edit, delete, or import data.',
      readTraining: true,
      writeTraining: false,
      importData: false,
      manageUsers: false,
      impersonate: false,
      badgeClass: 'role-employee'
    },
    {
      role: 'GUEST',
      title: 'External Guest / Auditor',
      description: 'Zero access to Employee Training Records or import engines. Access denied across all data tables.',
      readTraining: false,
      writeTraining: false,
      importData: false,
      manageUsers: false,
      impersonate: false,
      badgeClass: 'role-guest'
    }
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">User Impersonation & ACL Testing Tool</h1>
          <p className="page-subtitle">
            Admin diagnostic tool to switch active role security context and verify platform ACL constraints
          </p>
        </div>
        {impersonatedRole && (
          <button className="btn btn-secondary btn-sm" onClick={stopImpersonation}>
            <RefreshCw size={14} /> Restore Real ADMIN Context
          </button>
        )}
      </div>

      <div className="card-panel">
        <div className="card-header">
          <h3 className="card-title">
            <UserCheck size={18} style={{ color: '#2563eb' }} /> Select Target Security Role to Impersonate
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {roleProfiles.map((profile) => {
            const isCurrentActive = impersonatedRole === profile.role || (!impersonatedRole && profile.role === 'ADMIN');

            return (
              <div
                key={profile.role}
                style={{
                  background: isCurrentActive ? '#eff6ff' : '#f8fafc',
                  border: `2px solid ${isCurrentActive ? '#2563eb' : '#e2e8f0'}`,
                  borderRadius: '12px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span className={`role-pill ${profile.badgeClass}`}>{profile.role}</span>
                    {isCurrentActive && (
                      <span className="status-badge status-completed" style={{ fontSize: '0.7rem' }}>
                        ACTIVE CONTEXT
                      </span>
                    )}
                  </div>

                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
                    {profile.title}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1rem', lineHeight: '1.5' }}>
                    {profile.description}
                  </p>

                  <div style={{ fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Read Training Records:</span>
                      <strong>{profile.readTraining ? '✓ Granted' : '✕ Denied'}</strong>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Write / Edit Records:</span>
                      <strong>{profile.writeTraining ? '✓ Granted' : '✕ Denied'}</strong>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>CSV Import & Transform:</span>
                      <strong>{profile.importData ? '✓ Granted' : '✕ Denied'}</strong>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                  {!isCurrentActive ? (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => startImpersonation(profile.role)}
                    >
                      <UserCheck size={14} /> Impersonate {profile.role}
                    </button>
                  ) : (
                    <button className="btn btn-secondary btn-sm" disabled>
                      Currently Active
                    </button>
                  )}

                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      if (!isCurrentActive) startImpersonation(profile.role);
                      setActiveTab('training-records');
                    }}
                  >
                    Test Training Records <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
