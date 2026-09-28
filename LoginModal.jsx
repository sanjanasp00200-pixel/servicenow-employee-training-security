import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_USERS } from '../data/initialData';
import { Shield, Key, UserCheck, Lock, AlertCircle } from 'lucide-react';

export const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useApp();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(username, password);
    if (res.success) {
      setError('');
      onClose();
    } else {
      setError(res.error);
    }
  };

  const handleQuickLogin = (demoUser) => {
    setUsername(demoUser.username);
    setPassword(demoUser.password);
    const res = login(demoUser.username, demoUser.password);
    if (res.success) {
      setError('');
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '480px' }}>
        <div className="modal-header" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Shield size={22} style={{ color: '#3b82f6' }} />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'white' }}>ServiceNow Demo Authentication</h3>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Role-Based Access Control System</span>
            </div>
          </div>
        </div>

        <div className="modal-body" style={{ padding: '1.5rem' }}>
          {error && (
            <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username (e.g. admin)"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (e.g. admin123)"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              <Lock size={16} /> Sign In
            </button>
          </form>

          <div style={{ margin: '1.5rem 0 1rem', textAlign: 'center', position: 'relative' }}>
            <hr style={{ borderColor: '#e2e8f0' }} />
            <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '0 0.5rem', fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
              QUICK DEMO ACCOUNTS
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
            {DEMO_USERS.map((user) => (
              <button
                key={user.id}
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => handleQuickLogin(user)}
                style={{ justifyContent: 'flex-start', textAlign: 'left', padding: '0.5rem 0.6rem' }}
              >
                <UserCheck size={14} style={{ color: '#2563eb' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.78rem' }}>{user.role}</div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{user.username}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            🔒 Demo authentication simulation. No real credentials stored.
          </span>
        </div>
      </div>
    </div>
  );
};
