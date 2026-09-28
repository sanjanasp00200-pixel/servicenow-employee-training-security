import React from 'react';
import { useApp } from '../context/AppContext';
import { AlertTriangle, X } from 'lucide-react';

export const ImpersonationBanner = () => {
  const { impersonatedRole, stopImpersonation, currentUser } = useApp();

  if (!impersonatedRole || currentUser?.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="impersonation-banner">
      <div className="impersonation-info">
        <AlertTriangle size={18} />
        <span>
          Currently impersonating: <strong>{impersonatedRole}</strong> (Logged in as {currentUser.name})
        </span>
      </div>
      <button className="impersonation-stop-btn" onClick={stopImpersonation}>
        <X size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
        End Impersonation
      </button>
    </div>
  );
};
