import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USERS, INITIAL_EMPLOYEES, INITIAL_TRAINING_RECORDS } from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Authentication & Impersonation State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sn_current_user');
    return saved ? JSON.parse(saved) : DEMO_USERS[0]; // Default Admin
  });

  const [impersonatedRole, setImpersonatedRole] = useState(() => {
    return localStorage.getItem('sn_impersonated_role') || null;
  });

  // Data Persistence State
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('sn_employees');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
  });

  const [trainingRecords, setTrainingRecords] = useState(() => {
    const saved = localStorage.getItem('sn_training_records');
    return saved ? JSON.parse(saved) : INITIAL_TRAINING_RECORDS;
  });

  // Staging state for ServiceNow Import Set simulation
  const [stagedData, setStagedData] = useState(() => {
    const saved = localStorage.getItem('sn_staged_import');
    return saved ? JSON.parse(saved) : null;
  });

  // Toast Notification State
  const [toasts, setToasts] = useState([]);

  // Sync states to LocalStorage
  useEffect(() => {
    localStorage.setItem('sn_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    if (impersonatedRole) {
      localStorage.setItem('sn_impersonated_role', impersonatedRole);
    } else {
      localStorage.removeItem('sn_impersonated_role');
    }
  }, [impersonatedRole]);

  useEffect(() => {
    localStorage.setItem('sn_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('sn_training_records', JSON.stringify(trainingRecords));
  }, [trainingRecords]);

  useEffect(() => {
    if (stagedData) {
      localStorage.setItem('sn_staged_import', JSON.stringify(stagedData));
    } else {
      localStorage.removeItem('sn_staged_import');
    }
  }, [stagedData]);

  // Derived Effective Role
  const effectiveRole = impersonatedRole || (currentUser ? currentUser.role : 'GUEST');

  // Toast Handler
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth Handlers
  const login = (username, password) => {
    const user = DEMO_USERS.find(
      (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      setImpersonatedRole(null); // Reset impersonation on explicit login
      showToast(`Welcome back, ${user.name}! Logged in as ${user.role}.`, 'success');
      return { success: true, user };
    } else {
      showToast('Invalid username or password. Use demo credentials.', 'error');
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setImpersonatedRole(null);
    showToast('You have been logged out.', 'info');
  };

  // Impersonation Handlers (Admin feature)
  const startImpersonation = (targetRole) => {
    if (currentUser?.role !== 'ADMIN') {
      showToast('Only System Administrators can use the Impersonate feature.', 'error');
      return;
    }
    setImpersonatedRole(targetRole);
    showToast(`Impersonating Role: ${targetRole}. System ACLs updated.`, 'warning');
  };

  const stopImpersonation = () => {
    setImpersonatedRole(null);
    showToast('Impersonation mode ended. Restored ADMIN permissions.', 'info');
  };

  // ACL Helper - Checks permission for effective role
  const checkAccess = (resource, action) => {
    if (!currentUser && effectiveRole === 'GUEST') {
      // Unauthenticated
      if (resource === 'PUBLIC') return true;
      return false;
    }

    switch (resource) {
      case 'TRAINING_RECORDS_READ':
        return ['ADMIN', 'HR MANAGER', 'EMPLOYEE'].includes(effectiveRole);
      case 'TRAINING_RECORDS_WRITE':
        return ['ADMIN', 'HR MANAGER'].includes(effectiveRole);
      case 'IMPORT_DATA':
        return ['ADMIN', 'HR MANAGER'].includes(effectiveRole);
      case 'IMPERSONATE':
        // Only real admin can initiate, regardless of current impersonated role
        return currentUser?.role === 'ADMIN';
      case 'MANAGE_USERS':
        return effectiveRole === 'ADMIN';
      case 'EMPLOYEES_VIEW':
        return ['ADMIN', 'HR MANAGER', 'EMPLOYEE'].includes(effectiveRole);
      default:
        return true;
    }
  };

  // Dot-Walking Resolver Function
  // Resolves Employee object and Department dynamically from employeeId
  const getDotWalkedTrainingRecord = (record) => {
    const employee = employees.find((e) => e.id === record.employeeId || e.name === record.employeeName);
    return {
      ...record,
      employeeObject: employee || null,
      employeeName: employee ? employee.name : record.employeeName || 'Unknown Employee',
      // Dot-walking: Record -> Employee Reference -> Department
      dotWalkedDepartment: employee ? employee.department : 'Unassigned / Not Found'
    };
  };

  // CRUD Operations for Employees
  const addEmployee = (empData) => {
    if (!checkAccess('MANAGE_USERS', 'WRITE')) {
      showToast('Access Denied: Insufficient permissions to create employee.', 'error');
      return false;
    }
    const newId = `EMP${100 + employees.length + 1}`;
    const newEmp = { id: newId, ...empData };
    setEmployees((prev) => [...prev, newEmp]);
    showToast(`Employee ${newEmp.name} (${newEmp.id}) added successfully.`, 'success');
    return true;
  };

  // CRUD Operations for Training Records
  const addTrainingRecord = (recordData) => {
    if (!checkAccess('TRAINING_RECORDS_WRITE', 'CREATE')) {
      showToast('ACL Denied: You do not have Write permission for Training Records.', 'error');
      return false;
    }
    const newId = `TRN-${1000 + trainingRecords.length + 1}`;
    const newRecord = {
      id: newId,
      trainingName: recordData.trainingName,
      completionDate: recordData.completionDate,
      status: recordData.status,
      employeeId: recordData.employeeId
      // Notice: department is NOT stored here to follow strict dot-walking model
    };
    setTrainingRecords((prev) => [newRecord, ...prev]);
    showToast(`Training record '${newRecord.trainingName}' created successfully.`, 'success');
    return true;
  };

  const updateTrainingRecord = (id, updatedData) => {
    if (!checkAccess('TRAINING_RECORDS_WRITE', 'UPDATE')) {
      showToast('ACL Denied: You do not have Write permission to edit records.', 'error');
      return false;
    }
    setTrainingRecords((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, ...updatedData } : rec))
    );
    showToast(`Training record '${id}' updated successfully.`, 'success');
    return true;
  };

  const deleteTrainingRecord = (id) => {
    if (!checkAccess('TRAINING_RECORDS_WRITE', 'DELETE')) {
      showToast('ACL Denied: You do not have Write permission to delete records.', 'error');
      return false;
    }
    setTrainingRecords((prev) => prev.filter((rec) => rec.id !== id));
    showToast(`Training record '${id}' deleted successfully.`, 'info');
    return true;
  };

  // ServiceNow Import Set & Transform Map Simulation
  const stageImportData = (parsedRows, fileName = 'Import_Data.csv') => {
    if (!parsedRows || parsedRows.length === 0) {
      showToast('Uploaded CSV file contains no valid rows.', 'error');
      return;
    }

    // Identify columns
    const headers = Object.keys(parsedRows[0]);
    
    // Evaluate validity of each row for staging preview
    const evaluatedRows = parsedRows.map((row, index) => {
      const empName = row['Employee'] || row['employee'] || row['Employee Name'] || '';
      const matchedEmp = employees.find((e) => e.name.toLowerCase() === empName.trim().toLowerCase());
      
      const errors = [];
      if (!row['Training Name']) errors.push('Missing Training Name');
      if (!row['Completion Date']) errors.push('Missing Completion Date');
      if (!row['Status']) errors.push('Missing Status');
      if (!empName) errors.push('Missing Employee');
      else if (!matchedEmp) errors.push(`Employee '${empName}' not found in Employee master table`);

      return {
        rowNumber: index + 1,
        rawData: row,
        matchedEmployee: matchedEmp || null,
        status: errors.length === 0 ? 'VALID' : 'ERROR',
        errors
      };
    });

    const staged = {
      fileName,
      timestamp: new Date().toISOString(),
      headers,
      rows: evaluatedRows,
      fieldMapping: {
        trainingName: headers.find((h) => h.toLowerCase().includes('training')) || headers[0] || '',
        completionDate: headers.find((h) => h.toLowerCase().includes('date')) || headers[1] || '',
        status: headers.find((h) => h.toLowerCase().includes('status')) || headers[2] || '',
        employee: headers.find((h) => h.toLowerCase().includes('employee')) || headers[3] || ''
      },
      transformed: false
    };

    setStagedData(staged);
    showToast(`Import Set created with ${evaluatedRows.length} rows ready for transformation map!`, 'success');
  };

  const executeTransformMap = (customMapping = null) => {
    if (!stagedData) {
      showToast('No staged Import Set data found to transform.', 'error');
      return null;
    }

    const mapping = customMapping || stagedData.fieldMapping;
    let successCount = 0;
    let failCount = 0;
    const errorDetails = [];
    const newRecordsToAdd = [];

    stagedData.rows.forEach((stagedRow, index) => {
      const data = stagedRow.rawData;
      const tName = data[mapping.trainingName]?.trim();
      const cDate = data[mapping.completionDate]?.trim();
      const status = data[mapping.status]?.trim();
      const empName = data[mapping.employee]?.trim();

      // Find matching employee by name
      const matchedEmp = employees.find((e) => e.name.toLowerCase() === (empName || '').toLowerCase());

      const rowErrors = [];
      if (!tName) rowErrors.push('Missing Training Name');
      if (!cDate) rowErrors.push('Missing Completion Date');
      if (!status) rowErrors.push('Missing Status');
      if (!empName) rowErrors.push('Missing Employee field');
      else if (!matchedEmp) rowErrors.push(`Employee '${empName}' does not exist in master records`);

      if (rowErrors.length === 0 && matchedEmp) {
        successCount++;
        newRecordsToAdd.push({
          id: `TRN-${1000 + trainingRecords.length + newRecordsToAdd.length + 1}`,
          trainingName: tName,
          completionDate: cDate,
          status: ['Completed', 'In Progress', 'Not Started'].includes(status) ? status : 'In Progress',
          employeeId: matchedEmp.id // Dot-walking reference
        });
      } else {
        failCount++;
        errorDetails.push({
          row: index + 1,
          employee: empName || 'N/A',
          training: tName || 'N/A',
          reasons: rowErrors
        });
      }
    });

    if (newRecordsToAdd.length > 0) {
      setTrainingRecords((prev) => [...newRecordsToAdd, ...prev]);
    }

    const summary = {
      totalRows: stagedData.rows.length,
      successCount,
      failCount,
      errorDetails,
      timestamp: new Date().toLocaleTimeString()
    };

    // Mark staged data as transformed
    setStagedData((prev) => ({ ...prev, transformed: true, lastSummary: summary }));
    showToast(`Transform Map executed! ${successCount} imported, ${failCount} failed.`, successCount > 0 ? 'success' : 'warning');

    return summary;
  };

  const clearStagedData = () => {
    setStagedData(null);
    showToast('Import Set cleared.', 'info');
  };

  // Reset to default sample data
  const resetSystemData = () => {
    setEmployees(INITIAL_EMPLOYEES);
    setTrainingRecords(INITIAL_TRAINING_RECORDS);
    setStagedData(null);
    setImpersonatedRole(null);
    localStorage.removeItem('sn_employees');
    localStorage.removeItem('sn_training_records');
    localStorage.removeItem('sn_staged_import');
    localStorage.removeItem('sn_impersonated_role');
    showToast('System data reset to initial demo state.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        impersonatedRole,
        effectiveRole,
        employees,
        trainingRecords,
        stagedData,
        toasts,
        showToast,
        removeToast,
        login,
        logout,
        startImpersonation,
        stopImpersonation,
        checkAccess,
        getDotWalkedTrainingRecord,
        addEmployee,
        addTrainingRecord,
        updateTrainingRecord,
        deleteTrainingRecord,
        stageImportData,
        executeTransformMap,
        clearStagedData,
        resetSystemData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
