import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle2 size={18} className="text-success" style={{ color: '#16a34a' }} />;
      case 'error': return <AlertCircle size={18} className="text-danger" style={{ color: '#dc2626' }} />;
      case 'warning': return <AlertTriangle size={18} className="text-warning" style={{ color: '#d97706' }} />;
      default: return <Info size={18} className="text-info" style={{ color: '#0284c7' }} />;
    }
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          {getIcon(toast.type)}
          <span style={{ flex: 1 }}>{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} style={{ color: '#94a3b8' }}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
