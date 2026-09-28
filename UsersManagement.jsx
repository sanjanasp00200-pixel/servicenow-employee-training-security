import React from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_USERS } from '../data/initialData';
import { UserCog, ShieldCheck, Mail, Key } from 'lucide-react';
import { AccessDenied } from '../components/AccessDenied';

export const UsersManagement = () => {
  const { checkAccess } = useApp();

  if (!checkAccess('MANAGE_USERS')) {
    return <AccessDenied resourceName="System User Management" requiredRole="ADMIN" />;
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">System Users & Authentication Registry</h1>
          <p className="page-subtitle">
            User directory (sys_user table simulation) mapping accounts to system roles and credentials
          </p>
        </div>
      </div>

      <div className="card-panel">
        <div className="card-header">
          <h3 className="card-title">
            <UserCog size={18} style={{ color: '#2563eb' }} /> Registered Demo User Accounts ({DEMO_USERS.length})
          </h3>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Full Name</th>
                <th>Username</th>
                <th>Password</th>
                <th>Assigned System Role</th>
                <th>Email Address</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_USERS.map((user) => (
                <tr key={user.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{user.id}</td>
                  <td style={{ fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <img src={user.avatar} alt="" style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td style={{ fontFamily: 'monospace', color: '#2563eb' }}>{user.username}</td>
                  <td style={{ fontFamily: 'monospace', color: '#64748b' }}>{user.password}</td>
                  <td>
                    <span className={`role-pill role-${user.role.toLowerCase().replace(' ', '-')}`}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ color: '#64748b' }}>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
