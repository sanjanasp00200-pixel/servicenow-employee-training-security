// Initial Sample Data for Employee Training & Secure Data Management

export const DEMO_USERS = [
  {
    id: 'USR-001',
    username: 'admin',
    password: 'admin123',
    name: 'System Administrator',
    role: 'ADMIN',
    email: 'admin@enterprise.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'USR-002',
    username: 'hrmanager',
    password: 'hr123',
    name: 'Sarah Jenkins',
    role: 'HR MANAGER',
    email: 'sarah.jenkins@enterprise.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'USR-003',
    username: 'employee',
    password: 'employee123',
    name: 'John Smith',
    role: 'EMPLOYEE',
    email: 'john.smith@enterprise.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'USR-004',
    username: 'guest',
    password: 'guest123',
    name: 'External Auditor (Guest)',
    role: 'GUEST',
    email: 'guest.auditor@external.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_EMPLOYEES = [
  { id: 'EMP101', name: 'John Smith', email: 'john.smith@company.com', department: 'HR', role: 'HR Specialist' },
  { id: 'EMP102', name: 'David Kumar', email: 'david.kumar@company.com', department: 'IT', role: 'System Admin' },
  { id: 'EMP103', name: 'Priya Sharma', email: 'priya.sharma@company.com', department: 'Finance', role: 'Senior Analyst' },
  { id: 'EMP104', name: 'Anitha Raj', email: 'anitha.raj@company.com', department: 'Operations', role: 'Operations Lead' },
  { id: 'EMP105', name: 'Rahul Kumar', email: 'rahul.kumar@company.com', department: 'IT', role: 'Software Engineer' },
  { id: 'EMP106', name: 'Sarah Jenkins', email: 'sarah.j@company.com', department: 'HR', role: 'HR Manager' },
  { id: 'EMP107', name: 'Michael Chen', email: 'michael.c@company.com', department: 'Engineering', role: 'DevOps Lead' },
  { id: 'EMP108', name: 'Emily Davis', email: 'emily.d@company.com', department: 'Marketing', role: 'Marketing Director' },
  { id: 'EMP109', name: 'Robert Taylor', email: 'robert.t@company.com', department: 'Legal', role: 'Compliance Officer' },
  { id: 'EMP110', name: 'Sophia Patel', email: 'sophia.p@company.com', department: 'Finance', role: 'Financial Auditor' }
];

export const INITIAL_TRAINING_RECORDS = [
  { id: 'TRN-1001', trainingName: 'ServiceNow Basics', completionDate: '2026-09-10', status: 'Completed', employeeId: 'EMP101' },
  { id: 'TRN-1002', trainingName: 'Security Training', completionDate: '2026-09-15', status: 'In Progress', employeeId: 'EMP102' },
  { id: 'TRN-1003', trainingName: 'HR Policy Training', completionDate: '2026-09-20', status: 'Not Started', employeeId: 'EMP103' },
  { id: 'TRN-1004', trainingName: 'Cyber Security Awareness', completionDate: '2026-08-12', status: 'Completed', employeeId: 'EMP104' },
  { id: 'TRN-1005', trainingName: 'Workplace Safety', completionDate: '2026-09-01', status: 'Completed', employeeId: 'EMP105' },
  { id: 'TRN-1006', trainingName: 'Cloud Fundamentals', completionDate: '2026-10-05', status: 'In Progress', employeeId: 'EMP102' },
  { id: 'TRN-1007', trainingName: 'Python Training', completionDate: '2026-07-18', status: 'Completed', employeeId: 'EMP107' },
  { id: 'TRN-1008', trainingName: 'AI Fundamentals', completionDate: '2026-09-25', status: 'In Progress', employeeId: 'EMP108' },
  { id: 'TRN-1009', trainingName: 'Data Analytics', completionDate: '2026-08-30', status: 'Completed', employeeId: 'EMP110' },
  { id: 'TRN-1010', trainingName: 'Database Management', completionDate: '2026-10-15', status: 'Not Started', employeeId: 'EMP105' },
  { id: 'TRN-1011', trainingName: 'Data Security', completionDate: '2026-09-05', status: 'Completed', employeeId: 'EMP109' },
  { id: 'TRN-1012', trainingName: 'Compliance & Ethics', completionDate: '2026-09-28', status: 'Completed', employeeId: 'EMP106' },
  { id: 'TRN-1013', trainingName: 'ServiceNow Advanced', completionDate: '2026-11-01', status: 'Not Started', employeeId: 'EMP102' },
  { id: 'TRN-1014', trainingName: 'Financial Controls', completionDate: '2026-08-14', status: 'Completed', employeeId: 'EMP103' },
  { id: 'TRN-1015', trainingName: 'Agile Frameworks', completionDate: '2026-09-18', status: 'In Progress', employeeId: 'EMP104' }
];

export const SAMPLE_CSV_CONTENT = `Training Name,Completion Date,Status,Employee
ServiceNow Basics,2026-09-10,Completed,John Smith
Security Training,2026-09-15,In Progress,David Kumar
HR Policy Training,2026-09-20,Not Started,Priya Sharma
Cloud Fundamentals,2026-10-02,Completed,Anitha Raj
AI Fundamentals,2026-10-12,In Progress,Rahul Kumar
Data Security,2026-09-22,Completed,Robert Taylor`;

export const ACL_DEFINITIONS = [
  {
    resource: 'Employee Training Records',
    operation: 'READ',
    description: 'Allows reading training records. Employees see permitted records; HR Managers & Admins see all.',
    allowedRoles: ['ADMIN', 'HR MANAGER', 'EMPLOYEE'],
    deniedRoles: ['GUEST'],
    ruleName: 'sn_sys_acl_training_read'
  },
  {
    resource: 'Employee Training Records',
    operation: 'WRITE (Create / Edit / Delete)',
    description: 'Allows creating, modifying, or deleting training record entries.',
    allowedRoles: ['ADMIN', 'HR MANAGER'],
    deniedRoles: ['EMPLOYEE', 'GUEST'],
    ruleName: 'sn_sys_acl_training_write'
  },
  {
    resource: 'Data Import & Transform Map',
    operation: 'EXECUTE',
    description: 'Allows staging and executing data transform maps from external CSV files.',
    allowedRoles: ['ADMIN', 'HR MANAGER'],
    deniedRoles: ['EMPLOYEE', 'GUEST'],
    ruleName: 'sn_sys_acl_import_transform'
  },
  {
    resource: 'User Impersonation',
    operation: 'EXECUTE',
    description: 'Allows dynamic context switching to test ACL configurations as target roles.',
    allowedRoles: ['ADMIN'],
    deniedRoles: ['HR MANAGER', 'EMPLOYEE', 'GUEST'],
    ruleName: 'sn_sys_acl_impersonate'
  },
  {
    resource: 'System User Management',
    operation: 'READ / WRITE',
    description: 'Allows managing user accounts, passwords, and assigned system roles.',
    allowedRoles: ['ADMIN'],
    deniedRoles: ['HR MANAGER', 'EMPLOYEE', 'GUEST'],
    ruleName: 'sn_sys_acl_user_admin'
  }
];
