import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Users,
  Award,
  UploadCloud,
  GitMerge,
  Link,
  ShieldAlert,
  UserCheck,
  UserCog,
  HelpCircle,
  Lock
} from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { effectiveRole, checkAccess, currentUser } = useApp();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      section: 'OVERVIEW',
      allowed: true
    },
    {
      id: 'employees',
      label: 'Employees',
      icon: Users,
      section: 'DATA MANAGEMENT',
      allowed: checkAccess('EMPLOYEES_VIEW')
    },
    {
      id: 'training-records',
      label: 'Employee Training Records',
      icon: Award,
      section: 'DATA MANAGEMENT',
      allowed: checkAccess('TRAINING_RECORDS_READ')
    },
    {
      id: 'import-data',
      label: 'Import Data',
      icon: UploadCloud,
      section: 'IMPORT & TRANSFORM',
      allowed: checkAccess('IMPORT_DATA')
    },
    {
      id: 'transform-mapping',
      label: 'Transform / Field Mapping',
      icon: GitMerge,
      section: 'IMPORT & TRANSFORM',
      allowed: checkAccess('IMPORT_DATA')
    },
    {
      id: 'dot-walking',
      label: 'Employee Reference',
      icon: Link,
      section: 'RELATIONSHIPS',
      allowed: true
    },
    {
      id: 'security-acl',
      label: 'Security & ACL',
      icon: ShieldAlert,
      section: 'SECURITY & ACL',
      allowed: true
    },
    {
      id: 'impersonate-user',
      label: 'Impersonate User',
      icon: UserCheck,
      section: 'ADMIN TOOLS',
      allowed: currentUser?.role === 'ADMIN' // Strictly available only to real Admin
    },
    {
      id: 'system-users',
      label: 'System Users',
      icon: UserCog,
      section: 'ADMIN TOOLS',
      allowed: checkAccess('MANAGE_USERS')
    },
    {
      id: 'about-project',
      label: 'About Project',
      icon: HelpCircle,
      section: 'INFO',
      allowed: true
    }
  ];

  // Group by section
  const sections = ['OVERVIEW', 'DATA MANAGEMENT', 'IMPORT & TRANSFORM', 'RELATIONSHIPS', 'SECURITY & ACL', 'ADMIN TOOLS', 'INFO'];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="servicenow-logo-badge">sn</div>
        <div className="sidebar-brand-text">ServiceNow Demo</div>
      </div>

      <nav className="sidebar-nav">
        {sections.map((sec) => {
          const items = navItems.filter((i) => i.section === sec);
          if (items.length === 0) return null;

          return (
            <div key={sec}>
              <div className="nav-section-title">{sec}</div>
              {items.map((item) => {
                const Icon = item.icon;
                const isAllowed = item.allowed;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    className={`nav-item ${isActive ? 'active' : ''} ${!isAllowed ? 'disabled' : ''}`}
                    onClick={() => {
                      if (isAllowed) {
                        setActiveTab(item.id);
                      }
                    }}
                    title={!isAllowed ? `Access Denied for role ${effectiveRole}` : item.label}
                  >
                    <div className="nav-item-left">
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </div>
                    {!isAllowed && <Lock size={14} style={{ color: '#ef4444' }} />}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div>Active Role: <strong>{effectiveRole}</strong></div>
        <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>
          ServiceNow ACL Engine v2.4
        </div>
      </div>
    </aside>
  );
};
