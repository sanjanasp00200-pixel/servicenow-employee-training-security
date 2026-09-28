import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ShieldAlert, Lock, CheckCircle2, XCircle, ArrowRight, UserCheck, Layers, FileKey } from 'lucide-react';
import { ACL_DEFINITIONS } from '../data/initialData';

export const SecurityACL = ({ setActiveTab }) => {
  const { currentUser, effectiveRole, checkAccess, impersonatedRole } = useApp();

  const isReadGranted = checkAccess('TRAINING_RECORDS_READ');
  const isWriteGranted = checkAccess('TRAINING_RECORDS_WRITE');
  const isImportGranted = checkAccess('IMPORT_DATA');
  const isImpersonateGranted = currentUser?.role === 'ADMIN';

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">ServiceNow Security & ACL Architecture</h1>
          <p className="page-subtitle">
            Role-Based Access Control (RBAC), Read/Write ACL Rule Evaluation & Context Verification
          </p>
        </div>
      </div>

      {/* Active User ACL Status Box */}
      <div className="card-panel" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>
              CURRENT EVALUATED SECURITY CONTEXT
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0.2rem 0', color: '#ffffff' }}>
              {currentUser?.name || 'Guest User'} (@{currentUser?.username || 'guest'})
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem' }}>
              <span className={`role-pill role-${effectiveRole.toLowerCase().replace(' ', '-')}`}>
                Active Role: {effectiveRole}
              </span>
              {impersonatedRole && (
                <span style={{ fontSize: '0.75rem', background: '#b45309', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                  ⚠️ IMPERSONATED
                </span>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.85rem 1.25rem', borderRadius: '10px', textAlignment: 'center', border: '1px solid rgba(255,255,255,0.15)' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700 }}>READ ACCESS</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '0.2rem', color: isReadGranted ? '#4ade80' : '#f87171', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                {isReadGranted ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                {isReadGranted ? 'GRANTED' : 'DENIED'}
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.85rem 1.25rem', borderRadius: '10px', textAlignment: 'center', border: '1px solid rgba(255,255,255,0.15)' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700 }}>WRITE ACCESS</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '0.2rem', color: isWriteGranted ? '#4ade80' : '#f87171', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                {isWriteGranted ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                {isWriteGranted ? 'GRANTED' : 'DENIED'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ServiceNow Security Pipeline Flowchart */}
      <div className="card-panel">
        <div className="card-header">
          <h3 className="card-title">
            <ShieldCheck size={18} style={{ color: '#2563eb' }} /> Access Control Execution Pipeline
          </h3>
        </div>

        <div className="dot-walk-diagram">
          <div className="dot-node">
            <div className="dot-node-title">1. Authentication</div>
            <div className="dot-node-value">User Login</div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>Validate Credentials</div>
          </div>

          <div className="dot-arrow">➔</div>

          <div className="dot-node">
            <div className="dot-node-title">2. Identity Context</div>
            <div className="dot-node-value">Identify User</div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>Retrieve sys_user</div>
          </div>

          <div className="dot-arrow">➔</div>

          <div className="dot-node">
            <div className="dot-node-title">3. Role Mapping</div>
            <div className="dot-node-value">Check Role</div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>ADMIN / HR / EMP / GUEST</div>
          </div>

          <div className="dot-arrow">➔</div>

          <div className="dot-node" style={{ background: 'rgba(37, 99, 235, 0.2)', border: '1px solid #3b82f6' }}>
            <div className="dot-node-title" style={{ color: '#93c5fd' }}>4. Security ACL</div>
            <div className="dot-node-value" style={{ color: '#ffffff' }}>Check Rule</div>
            <div style={{ fontSize: '0.7rem', color: '#bfdbfe', marginTop: '4px' }}>sn_sys_acl evaluation</div>
          </div>

          <div className="dot-arrow">➔</div>

          <div className="dot-node" style={{ background: 'rgba(22, 163, 74, 0.25)', border: '1px solid #22c55e' }}>
            <div className="dot-node-title" style={{ color: '#86efac' }}>5. Policy Enforcer</div>
            <div className="dot-node-value" style={{ color: '#ffffff' }}>Allow / Deny</div>
            <div style={{ fontSize: '0.7rem', color: '#bbf7d0', marginTop: '4px' }}>Route & Data Guard</div>
          </div>
        </div>
      </div>

      {/* Master ACL Rules Matrix Table */}
      <div className="card-panel">
        <div className="card-header">
          <h3 className="card-title">
            <FileKey size={18} style={{ color: '#2563eb' }} /> Master Access Control Rules Matrix (ACL)
          </h3>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ACL Rule Name</th>
                <th>Resource Target</th>
                <th>Operation</th>
                <th>Allowed System Roles</th>
                <th>Active Role Status</th>
              </tr>
            </thead>
            <tbody>
              {ACL_DEFINITIONS.map((acl) => {
                const isPermitted = acl.allowedRoles.includes(effectiveRole);
                return (
                  <tr key={acl.ruleName}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#2563eb' }}>{acl.ruleName}</td>
                    <td style={{ fontWeight: 600 }}>{acl.resource}</td>
                    <td>
                      <span className="role-pill role-hr-manager" style={{ textTransform: 'none' }}>
                        {acl.operation}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                        {acl.allowedRoles.map((r) => (
                          <span key={r} className={`role-pill role-${r.toLowerCase().replace(' ', '-')}`} style={{ fontSize: '0.68rem' }}>
                            {r}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      {isPermitted ? (
                        <span className="status-badge status-completed">
                          <CheckCircle2 size={12} /> GRANTED
                        </span>
                      ) : (
                        <span className="status-badge status-in-progress" style={{ background: '#fee2e2', color: '#dc2626' }}>
                          <XCircle size={12} /> DENIED
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Security & Concepts Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        <div className="card-panel">
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock size={18} style={{ color: '#2563eb' }} /> Authentication vs Authorization
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.6' }}>
            <strong>Authentication</strong> verifies who you are via credentials (admin/admin123).
            <br />
            <strong>Authorization</strong> determines what you are allowed to do via assigned roles and ACL policies.
          </p>
        </div>

        <div className="card-panel">
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserCheck size={18} style={{ color: '#2563eb' }} /> User Impersonation Testing
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.6' }}>
            ServiceNow allows System Administrators to impersonate other user roles without logging out, enabling rapid validation of ACL policies and security scope testing.
          </p>
        </div>
      </div>
    </div>
  );
};
