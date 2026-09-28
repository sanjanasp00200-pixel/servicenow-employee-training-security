import React from 'react';
import { ShieldX, Lock, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AccessDenied = ({ resourceName = 'This Module', requiredRole = 'ADMIN or HR MANAGER' }) => {
  const { effectiveRole, impersonatedRole, stopImpersonation } = useApp();

  return (
    <div className="card-panel" style={{ textAlign: 'center', padding: '3rem 1.5rem', maxWidth: '650px', margin: '2rem auto' }}>
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: '#fee2e2',
          color: '#dc2626',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem'
        }}
      >
        <ShieldX size={38} />
      </div>

      <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
        Access Denied (403 Forbidden)
      </h2>

      <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
        You do not have permission to view or execute operations on <strong>{resourceName}</strong> under current Access Control Rules (ACL).
      </p>

      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '1rem',
          marginBottom: '1.5rem',
          textAlign: 'left',
          fontSize: '0.85rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{ color: '#64748b' }}>Active Security Context Role:</span>
          <strong style={{ color: '#dc2626' }}>{effectiveRole}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{ color: '#64748b' }}>Required ACL Roles:</span>
          <strong style={{ color: '#16a34a' }}>{requiredRole}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#64748b' }}>ACL Rule Evaluated:</span>
          <span style={{ fontFamily: 'monospace', color: '#0f172a', fontWeight: 600 }}>
            sn_sys_acl_{resourceName.toLowerCase().replace(/[^a-z0-9]/g, '_')}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {impersonatedRole && (
          <button className="btn btn-primary" onClick={stopImpersonation}>
            <RefreshCw size={16} /> Stop Impersonating {impersonatedRole}
          </button>
        )}
      </div>
    </div>
  );
};
