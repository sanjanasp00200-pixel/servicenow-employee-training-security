import React from 'react';
import { useApp } from '../context/AppContext';
import { LogOut, RotateCcw, ShieldCheck, UserCheck } from 'lucide-react';

export const Navbar = ({ onOpenLogin }) => {
  const { currentUser, effectiveRole, impersonatedRole, logout, resetSystemData } = useApp();

  const getRoleClass = (role) => {
    switch (role) {
      case 'ADMIN': return 'role-admin';
      case 'HR MANAGER': return 'role-hr-manager';
      case 'EMPLOYEE': return 'role-employee';
      default: return 'role-guest';
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="navbar-title-group">
          <h1 className="navbar-title">Employee Training & Secure Data Management</h1>
          <span className="navbar-subtitle">ServiceNow-Inspired Data Import, Dot-Walking & RBAC Demo</span>
        </div>
      </div>

      <div className="navbar-right">
        {impersonatedRole && (
          <span className="role-pill role-admin" title="Original Auth Account">
            <UserCheck size={12} /> Real User: ADMIN
          </span>
        )}

        <span className={`role-pill ${getRoleClass(effectiveRole)}`}>
          <ShieldCheck size={12} /> {effectiveRole}
        </span>

        {currentUser ? (
          <div className="user-profile-menu">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={currentUser.name}
              className="user-avatar"
            />
            <div className="user-details">
              <span className="user-name">{currentUser.name}</span>
              <span className="user-role-label">@{currentUser.username}</span>
            </div>
            <button
              className="btn btn-outline btn-sm"
              onClick={logout}
              title="Logout from system"
              style={{ marginLeft: '0.5rem', padding: '0.25rem 0.5rem' }}
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <button className="btn btn-primary btn-sm" onClick={onOpenLogin}>
            Sign In
          </button>
        )}

        <button
          className="btn btn-secondary btn-sm"
          onClick={resetSystemData}
          title="Reset sample employees & training data to default"
        >
          <RotateCcw size={14} /> Reset Data
        </button>
      </div>
    </header>
  );
};
