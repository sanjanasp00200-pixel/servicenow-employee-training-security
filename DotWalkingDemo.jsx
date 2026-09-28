import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link, ArrowDown, Building, User, Award, CheckCircle2, ShieldCheck, Database } from 'lucide-react';

export const DotWalkingDemo = () => {
  const { trainingRecords, employees, getDotWalkedTrainingRecord } = useApp();
  const [selectedRecordId, setSelectedRecordId] = useState(trainingRecords[0]?.id || '');

  const rawRecord = trainingRecords.find((r) => r.id === selectedRecordId) || trainingRecords[0];
  const dotWalked = rawRecord ? getDotWalkedTrainingRecord(rawRecord) : null;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dot-Walking Architecture & Reference Model</h1>
          <p className="page-subtitle">
            Dynamic relational resolution of Employee details without storing duplicate data in Training Records
          </p>
        </div>
      </div>

      {/* Concept Architecture Flow Box */}
      <div className="card-panel">
        <div className="card-header">
          <h3 className="card-title">
            <Link size={18} style={{ color: '#2563eb' }} /> What is ServiceNow Dot-Walking?
          </h3>
        </div>

        <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          <strong>Dot-Walking</strong> allows referencing fields from related tables. In this application, a 
          <code> TrainingRecord</code> holds only an <code>employeeId</code> reference key. When rendering reports, 
          the system dynamically traverses:
          <br />
          <code>training_record ➔ employee_reference ➔ department</code> without storing duplicate department strings in the training table.
        </p>

        {/* Visual Diagram Banner */}
        <div className="dot-walk-diagram">
          <div className="dot-node">
            <div className="dot-node-title">1. Training Record Table</div>
            <div className="dot-node-value">Training Record</div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>
              Stores <code>employeeId</code> key
            </div>
          </div>

          <div className="dot-arrow">➔</div>

          <div className="dot-node">
            <div className="dot-node-title">2. Reference Relationship</div>
            <div className="dot-node-value">Employee Reference</div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>
              Relational Link
            </div>
          </div>

          <div className="dot-arrow">➔</div>

          <div className="dot-node">
            <div className="dot-node-title">3. Master Record Table</div>
            <div className="dot-node-value">Employee Master</div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>
              Master record object
            </div>
          </div>

          <div className="dot-arrow">➔</div>

          <div className="dot-node" style={{ background: 'rgba(59, 130, 246, 0.25)', border: '1px solid #3b82f6' }}>
            <div className="dot-node-title" style={{ color: '#93c5fd' }}>4. Dot-Walked Attribute</div>
            <div className="dot-node-value" style={{ color: '#ffffff' }}>Department</div>
            <div style={{ fontSize: '0.7rem', color: '#bfdbfe', marginTop: '4px' }}>
              Dynamically Retrieved!
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Live Record Tracer */}
      <div className="card-panel">
        <div className="card-header">
          <h3 className="card-title">
            <Award size={18} style={{ color: '#2563eb' }} /> Interactive Dot-Walking Record Tracer
          </h3>
        </div>

        <div className="form-group" style={{ maxWidth: '500px', marginBottom: '1.5rem' }}>
          <label className="form-label">Select Training Record to Trace Dot-Walking Pipeline:</label>
          <select
            className="form-select"
            value={selectedRecordId}
            onChange={(e) => setSelectedRecordId(e.target.value)}
          >
            {trainingRecords.map((rec) => (
              <option key={rec.id} value={rec.id}>
                {rec.id} - {rec.trainingName}
              </option>
            ))}
          </select>
        </div>

        {dotWalked && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {/* Step 1 Card */}
            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#2563eb' }}>
                <Award size={20} />
                <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Step 1: Raw Training Record</h4>
              </div>

              <div style={{ fontSize: '0.82rem', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', gap: '0.4rem', background: '#ffffff', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <div>id: "{rawRecord.id}"</div>
                <div>trainingName: "{rawRecord.trainingName}"</div>
                <div>completionDate: "{rawRecord.completionDate}"</div>
                <div>status: "{rawRecord.status}"</div>
                <div style={{ background: '#fef3c7', color: '#92400e', padding: '0.2rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>
                  employeeId: "{rawRecord.employeeId}" ⚡ (Ref Key)
                </div>
                <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.2rem' }}>
                  🚫 Notice: department property is NOT stored here!
                </div>
              </div>
            </div>

            {/* Step 2 Card */}
            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#2563eb' }}>
                <User size={20} />
                <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Step 2: Employee Table Lookup</h4>
              </div>

              {dotWalked.employeeObject ? (
                <div style={{ fontSize: '0.82rem', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', gap: '0.4rem', background: '#ffffff', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <div>id: "{dotWalked.employeeObject.id}"</div>
                  <div>name: "{dotWalked.employeeObject.name}"</div>
                  <div>email: "{dotWalked.employeeObject.email}"</div>
                  <div style={{ background: '#dcfce7', color: '#166534', padding: '0.2rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>
                    department: "{dotWalked.employeeObject.department}"
                  </div>
                  <div>role: "{dotWalked.employeeObject.role}"</div>
                </div>
              ) : (
                <div style={{ color: '#dc2626', padding: '1rem', textAlign: 'center' }}>
                  Employee reference target not found in Master Employees table!
                </div>
              )}
            </div>

            {/* Step 3 Card */}
            <div style={{ background: '#eff6ff', padding: '1.25rem', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#1d4ed8' }}>
                <Building size={20} />
                <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Step 3: Resolved Dot-Walked Output</h4>
              </div>

              <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', background: '#ffffff', padding: '0.85rem', borderRadius: '6px', border: '1px solid #bfdbfe' }}>
                <div>
                  <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Training:</span>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{dotWalked.trainingName}</div>
                </div>

                <div>
                  <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Employee Reference:</span>
                  <div style={{ fontWeight: 700, color: '#2563eb' }}>{dotWalked.employeeName}</div>
                </div>

                <div>
                  <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Dot-Walked Department:</span>
                  <div style={{ marginTop: '0.2rem' }}>
                    <span className="dot-walk-cell" style={{ fontSize: '0.9rem' }}>
                      <Building size={14} /> {dotWalked.dotWalkedDepartment}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
