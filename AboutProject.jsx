import React from 'react';
import { HelpCircle, Code, ShieldCheck, Link, FileSpreadsheet, CheckCircle2, UserCheck, Layers } from 'lucide-react';

export const AboutProject = () => {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">About the Project</h1>
          <p className="page-subtitle">
            "Employee Training & Secure Data Management" — Inspired by ServiceNow Import Sets & ACL Framework
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Problem Statement Card */}
        <div className="card-panel" style={{ borderLeft: '4px solid #2563eb' }}>
          <h3 className="card-title" style={{ marginBottom: '0.5rem', color: '#2563eb' }}>
            Problem Statement
          </h3>
          <p style={{ color: '#0f172a', fontSize: '0.95rem', fontWeight: 600, lineHeight: '1.6' }}>
            "Linking each record to an employee and pulling employee details such as department into the record for easier reporting."
          </p>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.5rem', lineHeight: '1.5' }}>
            Traditional flat database tables duplicate data (like department names) across every record, leading to data redundancy, sync anomalies, and inefficient reporting.
          </p>
        </div>

        {/* Project Objective Card */}
        <div className="card-panel" style={{ borderLeft: '4px solid #16a34a' }}>
          <h3 className="card-title" style={{ marginBottom: '0.5rem', color: '#16a34a' }}>
            Project Objective
          </h3>
          <p style={{ color: '#0f172a', fontSize: '0.95rem', fontWeight: 600, lineHeight: '1.6' }}>
            "Implement access control using user roles and demonstrate secure data management."
          </p>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.5rem', lineHeight: '1.5' }}>
            Demonstrate how ServiceNow's core principles of relational Reference Fields, Dot-Walking, Import Set Transform Maps, and Security ACLs can be implemented in a clean React architecture.
          </p>
        </div>
      </div>

      {/* Tech Stack & Architecture Highlights */}
      <div className="card-panel">
        <div className="card-header">
          <h3 className="card-title">
            <Code size={18} style={{ color: '#2563eb' }} /> Technology Stack & Technical Highlights
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>Frontend Framework</h4>
            <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.25rem' }}>React 19 + Vite HMR</div>
          </div>

          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>CSV Import Engine</h4>
            <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.25rem' }}>PapaParse 5.5 Library</div>
          </div>

          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>Data Persistence</h4>
            <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.25rem' }}>HTML5 LocalStorage API</div>
          </div>

          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>Styling System</h4>
            <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.25rem' }}>Vanilla CSS3 Design Tokens</div>
          </div>
        </div>
      </div>

      {/* Main Core Features Checklist */}
      <div className="card-panel">
        <div className="card-header">
          <h3 className="card-title">
            <CheckCircle2 size={18} style={{ color: '#16a34a' }} /> Key Implemented Capabilities
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', fontSize: '0.88rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <CheckCircle2 size={18} style={{ color: '#16a34a', marginTop: '2px' }} />
            <div>
              <strong>Employee Training Records:</strong> Full lifecycle tracking with status badges (Completed, In Progress, Not Started).
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <CheckCircle2 size={18} style={{ color: '#16a34a', marginTop: '2px' }} />
            <div>
              <strong>Dot-Walking Engine:</strong> Relational resolution traversing <code>TrainingRecord ➔ Employee ➔ Department</code> dynamically.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <CheckCircle2 size={18} style={{ color: '#16a34a', marginTop: '2px' }} />
            <div>
              <strong>ServiceNow Import Sets:</strong> CSV file parsing, column validation, employee matching, and staging.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <CheckCircle2 size={18} style={{ color: '#16a34a', marginTop: '2px' }} />
            <div>
              <strong>Transform Map Configurator:</strong> Source field to target field visual mapping diagram with execution summary reports.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <CheckCircle2 size={18} style={{ color: '#16a34a', marginTop: '2px' }} />
            <div>
              <strong>Role-Based Access Control (RBAC):</strong> Granular permissions for Admin, HR Manager, Employee, and Guest.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <CheckCircle2 size={18} style={{ color: '#16a34a', marginTop: '2px' }} />
            <div>
              <strong>User Impersonation Testing:</strong> Admin tool for dynamic context switching and live security testing.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
