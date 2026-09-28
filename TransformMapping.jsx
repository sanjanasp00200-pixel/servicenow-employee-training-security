import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GitMerge, ArrowRight, Play, CheckCircle2, AlertCircle, RefreshCw, Layers, Award } from 'lucide-react';
import { Modal } from '../components/Modal';
import { AccessDenied } from '../components/AccessDenied';

export const TransformMapping = ({ setActiveTab }) => {
  const { stagedData, executeTransformMap, checkAccess } = useApp();
  const [summaryReport, setSummaryReport] = useState(stagedData?.lastSummary || null);

  if (!checkAccess('IMPORT_DATA')) {
    return <AccessDenied resourceName="Transform Mapping Engine" requiredRole="ADMIN or HR MANAGER" />;
  }

  const [fieldMap, setFieldMap] = useState({
    trainingName: stagedData?.fieldMapping?.trainingName || 'Training Name',
    completionDate: stagedData?.fieldMapping?.completionDate || 'Completion Date',
    status: stagedData?.fieldMapping?.status || 'Status',
    employee: stagedData?.fieldMapping?.employee || 'Employee'
  });

  const handleTransform = () => {
    const summary = executeTransformMap(fieldMap);
    if (summary) {
      setSummaryReport(summary);
    }
  };

  const headers = stagedData?.headers || ['Training Name', 'Completion Date', 'Status', 'Employee'];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">ServiceNow Transform Map Configurator</h1>
          <p className="page-subtitle">
            Map staging columns to target Employee Training Record schema and resolve relational references
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Visual Mapping Interface */}
        <div className="card-panel">
          <div className="card-header">
            <h3 className="card-title">
              <GitMerge size={18} style={{ color: '#2563eb' }} /> Field Mapping Configuration
            </h3>
            <span className="role-pill role-hr-manager">sn_transform_map</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Field Row 1 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>SOURCE STAGING FIELD</span>
                <select
                  className="form-select"
                  value={fieldMap.trainingName}
                  onChange={(e) => setFieldMap({ ...fieldMap, trainingName: e.target.value })}
                  style={{ marginTop: '0.2rem' }}
                >
                  {headers.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>

              <div style={{ padding: '0 1rem', color: '#3b82f6', display: 'flex', alignItems: 'center' }}>
                <ArrowRight size={20} />
              </div>

              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700, textTransform: 'uppercase' }}>TARGET TABLE FIELD</span>
                <div style={{ padding: '0.6rem 0.85rem', background: '#dcfce7', border: '1px solid #86efac', borderRadius: '6px', fontWeight: 700, fontSize: '0.88rem', color: '#166534', marginTop: '0.2rem' }}>
                  Training Name
                </div>
              </div>
            </div>

            {/* Field Row 2 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>SOURCE STAGING FIELD</span>
                <select
                  className="form-select"
                  value={fieldMap.completionDate}
                  onChange={(e) => setFieldMap({ ...fieldMap, completionDate: e.target.value })}
                  style={{ marginTop: '0.2rem' }}
                >
                  {headers.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>

              <div style={{ padding: '0 1rem', color: '#3b82f6', display: 'flex', alignItems: 'center' }}>
                <ArrowRight size={20} />
              </div>

              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700, textTransform: 'uppercase' }}>TARGET TABLE FIELD</span>
                <div style={{ padding: '0.6rem 0.85rem', background: '#dcfce7', border: '1px solid #86efac', borderRadius: '6px', fontWeight: 700, fontSize: '0.88rem', color: '#166534', marginTop: '0.2rem' }}>
                  Completion Date
                </div>
              </div>
            </div>

            {/* Field Row 3 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>SOURCE STAGING FIELD</span>
                <select
                  className="form-select"
                  value={fieldMap.status}
                  onChange={(e) => setFieldMap({ ...fieldMap, status: e.target.value })}
                  style={{ marginTop: '0.2rem' }}
                >
                  {headers.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>

              <div style={{ padding: '0 1rem', color: '#3b82f6', display: 'flex', alignItems: 'center' }}>
                <ArrowRight size={20} />
              </div>

              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700, textTransform: 'uppercase' }}>TARGET TABLE FIELD</span>
                <div style={{ padding: '0.6rem 0.85rem', background: '#dcfce7', border: '1px solid #86efac', borderRadius: '6px', fontWeight: 700, fontSize: '0.88rem', color: '#166534', marginTop: '0.2rem' }}>
                  Status
                </div>
              </div>
            </div>

            {/* Field Row 4 (Employee Reference) */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#eff6ff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.72rem', color: '#1d4ed8', fontWeight: 700, textTransform: 'uppercase' }}>SOURCE STAGING FIELD</span>
                <select
                  className="form-select"
                  value={fieldMap.employee}
                  onChange={(e) => setFieldMap({ ...fieldMap, employee: e.target.value })}
                  style={{ marginTop: '0.2rem' }}
                >
                  {headers.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>

              <div style={{ padding: '0 1rem', color: '#2563eb', display: 'flex', alignItems: 'center' }}>
                <ArrowRight size={20} />
              </div>

              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.72rem', color: '#1d4ed8', fontWeight: 700, textTransform: 'uppercase' }}>TARGET REFERENCE FIELD</span>
                <div style={{ padding: '0.6rem 0.85rem', background: '#3b82f6', color: 'white', borderRadius: '6px', fontWeight: 700, fontSize: '0.88rem', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Layers size={14} /> Employee (Ref ID)
                </div>
              </div>
            </div>
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1.5rem', padding: '0.75rem', fontSize: '1rem' }}
            disabled={!stagedData}
            onClick={handleTransform}
          >
            <Play size={18} /> Transform Data & Insert Records
          </button>
        </div>

        {/* Transform Map Summary / Status Box */}
        <div className="card-panel">
          <div className="card-header">
            <h3 className="card-title">
              <Award size={18} style={{ color: '#2563eb' }} /> Transform Summary Report
            </h3>
          </div>

          {summaryReport ? (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>TOTAL ROWS</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>{summaryReport.totalRows}</div>
                </div>

                <div style={{ background: '#dcfce7', padding: '0.85rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #86efac' }}>
                  <span style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 700 }}>SUCCESSFUL</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#16a34a' }}>{summaryReport.successCount}</div>
                </div>

                <div style={{ background: '#fee2e2', padding: '0.85rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #fca5a5' }}>
                  <span style={{ fontSize: '0.72rem', color: '#991b1b', fontWeight: 700 }}>FAILED</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#dc2626' }}>{summaryReport.failCount}</div>
                </div>
              </div>

              {summaryReport.errorDetails.length > 0 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#dc2626', marginBottom: '0.5rem' }}>
                    Error Details ({summaryReport.errorDetails.length})
                  </h4>
                  <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {summaryReport.errorDetails.map((err, i) => (
                      <div key={i} style={{ background: '#fee2e2', border: '1px solid #fca5a5', padding: '0.6rem', borderRadius: '6px', fontSize: '0.78rem', color: '#991b1b' }}>
                        <strong>Row #{err.row}:</strong> Employee '{err.employee}' - {err.reasons.join('; ')}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => setActiveTab('training-records')}>
                View Updated Training Records <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#64748b' }}>
              <GitMerge size={42} style={{ color: '#cbd5e1', marginBottom: '0.75rem' }} />
              <p style={{ fontSize: '0.9rem' }}>No transform execution executed yet.</p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>
                Click <strong>"Transform Data & Insert Records"</strong> to process active Import Set.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
