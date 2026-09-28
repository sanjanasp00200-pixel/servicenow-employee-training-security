import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Papa from 'papaparse';
import { UploadCloud, FileSpreadsheet, CheckCircle2, AlertTriangle, ArrowRight, Play, Trash2, FileCheck } from 'lucide-react';
import { SAMPLE_CSV_CONTENT } from '../data/initialData';
import { AccessDenied } from '../components/AccessDenied';

export const ImportData = ({ setActiveTab }) => {
  const { stageImportData, stagedData, clearStagedData, checkAccess } = useApp();
  const [csvRawText, setCsvRawText] = useState(SAMPLE_CSV_CONTENT);
  const [dragActive, setDragActive] = useState(false);

  if (!checkAccess('IMPORT_DATA')) {
    return <AccessDenied resourceName="Import Data & Transform Engine" requiredRole="ADMIN or HR MANAGER" />;
  }

  const handleFileUpload = (file) => {
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          stageImportData(results.data, file.name);
        }
      },
      error: (err) => {
        alert('CSV Parsing Error: ' + err.message);
      }
    });
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleParseRawText = () => {
    Papa.parse(csvRawText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          stageImportData(results.data, 'Interactive_Import.csv');
        }
      },
      error: (err) => {
        alert('CSV Parsing Error: ' + err.message);
      }
    });
  };

  const handleLoadSample = () => {
    setCsvRawText(SAMPLE_CSV_CONTENT);
    handleParseRawText();
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">ServiceNow Import Set Staging</h1>
          <p className="page-subtitle">
            Upload Excel / CSV training data and stage raw import sets before applying transform maps
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* CSV Dropzone / File Upload */}
        <div className="card-panel">
          <div className="card-header">
            <h3 className="card-title">
              <UploadCloud size={18} style={{ color: '#2563eb' }} /> Upload CSV File
            </h3>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleFileDrop}
            style={{
              border: `2px dashed ${dragActive ? '#2563eb' : '#cbd5e1'}`,
              borderRadius: '12px',
              padding: '2.5rem 1.5rem',
              textAlign: 'center',
              background: dragActive ? '#eff6ff' : '#f8fafc',
              transition: 'all 0.2s ease',
              marginBottom: '1rem'
            }}
          >
            <FileSpreadsheet size={42} style={{ color: '#3b82f6', marginBottom: '0.75rem' }} />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>
              Drag & Drop your CSV file here
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
              Supported columns: <code>Training Name</code>, <code>Completion Date</code>, <code>Status</code>, <code>Employee</code>
            </p>

            <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer' }}>
              Browse File...
              <input
                type="file"
                accept=".csv"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files[0]) handleFileUpload(e.target.files[0]);
                }}
              />
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Or use pre-configured test dataset:</span>
            <button className="btn btn-outline btn-sm" onClick={handleLoadSample}>
              Load Sample CSV Data
            </button>
          </div>
        </div>

        {/* Text Area Parser for Quick Copy Paste */}
        <div className="card-panel">
          <div className="card-header">
            <h3 className="card-title">
              <FileCheck size={18} style={{ color: '#2563eb' }} /> Raw CSV Editor / Preview
            </h3>
          </div>

          <div className="form-group">
            <textarea
              className="form-textarea"
              rows={7}
              style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}
              value={csvRawText}
              onChange={(e) => setCsvRawText(e.target.value)}
            />
          </div>

          <button className="btn btn-secondary btn-sm" style={{ width: '100%' }} onClick={handleParseRawText}>
            <Play size={14} /> Stage Raw CSV Content
          </button>
        </div>
      </div>

      {/* Import Set Staging Preview Table */}
      {stagedData ? (
        <div className="card-panel">
          <div className="card-header">
            <h3 className="card-title">
              <FileSpreadsheet size={18} style={{ color: '#2563eb' }} />
              Active Import Set Staging: <code>{stagedData.fileName}</code> ({stagedData.rows.length} rows)
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-outline btn-sm" onClick={clearStagedData}>
                <Trash2 size={14} /> Clear Staging
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('transform-mapping')}>
                Proceed to Transform Map <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="table-container" style={{ marginBottom: '1.5rem' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Row #</th>
                  <th>Training Name</th>
                  <th>Completion Date</th>
                  <th>Status</th>
                  <th>Employee (Source)</th>
                  <th>Matched Master Employee</th>
                  <th>Resolved Dept</th>
                  <th>Validation Status</th>
                </tr>
              </thead>
              <tbody>
                {stagedData.rows.map((row) => {
                  const data = row.rawData;
                  const empName = data['Employee'] || data['employee'] || data['Employee Name'] || '';
                  const isVal = row.status === 'VALID';

                  return (
                    <tr key={row.rowNumber}>
                      <td style={{ fontWeight: 600 }}>#{row.rowNumber}</td>
                      <td style={{ fontWeight: 600 }}>{data['Training Name'] || '-'}</td>
                      <td>{data['Completion Date'] || '-'}</td>
                      <td>
                        <span className={`status-badge status-${(data['Status'] || '').toLowerCase().replace(/\s+/g, '-')}`}>
                          {data['Status'] || 'N/A'}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600, color: '#2563eb' }}>{empName || '-'}</td>
                      <td>
                        {row.matchedEmployee ? (
                          <span style={{ color: '#16a34a', fontWeight: 600 }}>✓ {row.matchedEmployee.name}</span>
                        ) : (
                          <span style={{ color: '#dc2626', fontWeight: 600 }}>✕ Not Found</span>
                        )}
                      </td>
                      <td>
                        {row.matchedEmployee ? (
                          <span className="dot-walk-cell">{row.matchedEmployee.department}</span>
                        ) : (
                          <span style={{ color: '#94a3b8' }}>-</span>
                        )}
                      </td>
                      <td>
                        {isVal ? (
                          <span className="status-badge status-completed">
                            <CheckCircle2 size={12} /> Valid
                          </span>
                        ) : (
                          <span className="status-badge status-in-progress" style={{ background: '#fee2e2', color: '#dc2626' }}>
                            <AlertTriangle size={12} /> {row.errors.join(', ')}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Quick Transform Execute Banner */}
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                Ready to execute Transform Map?
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
                Map staged import columns directly into the target <code>Employee Training Records</code> table.
              </p>
            </div>
            <button className="btn btn-primary" onClick={() => setActiveTab('transform-mapping')}>
              Configure & Execute Field Mapping <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="card-panel" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
          <UploadCloud size={48} style={{ color: '#94a3b8', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>No Active Import Set Staged</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Upload a CSV file or load sample data to initiate the ServiceNow Import Set workflow.
          </p>
          <button className="btn btn-primary" onClick={handleLoadSample}>
            Load Sample CSV & Stage Import
          </button>
        </div>
      )}
    </div>
  );
};
