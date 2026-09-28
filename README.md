# Employee Training & Secure Data Management

> A ServiceNow-inspired Enterprise Demo Application demonstrating CSV Importing, Transform Mapping, Relational Dot-Walking, and Role-Based Access Control (RBAC).

---

## 📌 Project Overview

**Project Title:** Employee Training & Secure Data Management  
**Project Topic:** Importing and Securing Data in ServiceNow  
**Tech Stack:** React 19, Vite, JavaScript (ES6+), HTML5, CSS3, LocalStorage, PapaParse  

> **Note:** This project is a standalone web application built for educational and demonstration purposes. It models key architectural concepts of the ServiceNow platform (Import Sets, Transform Maps, Dot-Walking, RBAC, ACL rules, and Impersonation).

---

## ❓ Problem Statement

> *"Linking each record to an employee and pulling employee details such as department into the record for easier reporting."*

In traditional flat database structures, employee attributes (such as Department) are duplicated across training records. This redundant data storage creates sync anomalies, increases storage overhead, and leads to inconsistent reporting when an employee changes departments.

---

## 🎯 Project Objective

> *"Implement access control using user roles and demonstrate secure data management."*

The primary objectives of this mini project are:
1. Demonstrate **relational data modeling** where `TrainingRecord` references `Employee` via `employeeId`, dynamically fetching the department via **Dot-Walking** without storing duplicate department data.
2. Simulate ServiceNow's **Import Set** and **Transform Map** pipeline for importing external Excel/CSV training data.
3. Implement granular **Role-Based Access Control (RBAC)** and **Read/Write Access Control Lists (ACL)** to restrict feature visibility and record manipulation based on active security context.
4. Provide an **Impersonation Tool** for System Administrators to dynamically switch roles and test security constraints.

---

## 🚀 Key Features & Modules

### 1. Executive Dashboard
- **KPI Metrics:** Total Employees, Total Training Records, Completed, In Progress, and Not Started count.
- **Visual Status Progress:** Interactive percentage breakdown bar chart of training completion.
- **Security Context Indicator:** Real-time visibility of current user identity and evaluated role.

### 2. Employee Master Directory
- Pre-loaded with 10 realistic employee records across HR, IT, Finance, Operations, Engineering, Marketing, and Legal departments.
- Supports real-time searching by Name, Email, ID, and filtering by Department.
- Admin modal to create new master employee records.

### 3. Employee Training Records Table
- Displays Training Name, Completion Date, Status, Employee Reference, and **Dot-Walked Department**.
- Form validation to create/edit records with live dot-walking preview.
- Multi-parameter Search (Name/Employee), Status Filter, Department Filter, and Date Sorting.

### 4. ServiceNow-Style Import Set Staging
- File dropzone supporting CSV file uploads parsed via `PapaParse`.
- Pre-loaded with a one-click sample CSV dataset.
- Staging table validating row columns and matching employee names against master records.

### 5. Transform Map & Field Mapping
- Visual diagram mapping Source Staging Fields (`Training Name`, `Completion Date`, `Status`, `Employee`) to Target Table Fields.
- One-click transform execution inserting valid records into the database.
- **Transform Summary Report:** Displays total rows, successful imports, failed rows, and detailed row-by-row error reasons.

### 6. Relational Dot-Walking Demonstration
- Visual interactive schema diagram explaining `Training Record ➔ Employee Reference ➔ Employee ➔ Department`.
- Live pipeline tracer allowing users to pick any record and step through data resolution.

### 7. Security & Access Control (ACL)
- Live permission matrix testing Read & Write ACLs for the active role context.
- Educational security flow diagram (`Login ➔ Identify User ➔ Check Role ➔ Check ACL ➔ Allow/Deny`).
- Route guards denying unauthorized users from viewing restricted views.

### 8. User Impersonation & Testing
- Admin tool allowing dynamic role switching between **ADMIN**, **HR MANAGER**, **EMPLOYEE**, and **GUEST**.
- Persistent top alert banner indicating active impersonation state.

---

## 🔑 Demo Credentials

| Role | Username | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **ADMIN** | `admin` | `admin123` | Full Access: View, Create, Edit, Delete, Import, Manage Users, Impersonate |
| **HR MANAGER** | `hrmanager` | `hr123` | Training Records (Read/Write), Import Data, Transform Map |
| **EMPLOYEE** | `employee` | `employee123` | Training Records (Read-Only) |
| **GUEST** | `guest` | `guest123` | Public Views Only (Training Records & Import Denied) |

---

## 🛡️ Role-Based Access Control (RBAC) Matrix

| Resource / Operation | ADMIN | HR MANAGER | EMPLOYEE | GUEST |
| :--- | :---: | :---: | :---: | :---: |
| View Dashboard | ✅ | ✅ | ✅ | ✅ |
| View Employee Master | ✅ | ✅ | ✅ | ❌ |
| Read Training Records | ✅ | ✅ | ✅ | ❌ |
| Create / Edit / Delete Training Records | ✅ | ✅ | ❌ | ❌ |
| Upload CSV & Execute Transform Map | ✅ | ✅ | ❌ | ❌ |
| Impersonate User Roles | ✅ | ❌ | ❌ | ❌ |
| System User Management | ✅ | ❌ | ❌ | ❌ |

---

## 💻 How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Steps
1. Open terminal in the project root directory:
   ```bash
   cd c:\Users\sanja\OneDrive\Desktop\NM
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open browser at:
   ```
   http://localhost:5173
   ```

5. Build for production (optional):
   ```bash
   npm run build
   ```

---

## 📊 Data Structures

### Employee Schema
```json
{
  "id": "EMP101",
  "name": "John Smith",
  "email": "john.smith@company.com",
  "department": "HR",
  "role": "HR Specialist"
}
```

### Training Record Schema (Dot-Walking Model)
```json
{
  "id": "TRN-1001",
  "trainingName": "ServiceNow Basics",
  "completionDate": "2026-09-10",
  "status": "Completed",
  "employeeId": "EMP101"
}
```
*Note: `department` is NOT stored inside `TrainingRecord`. It is dynamically resolved at render time via `employeeId`.*

---

## 🌟 End-to-End Demonstration Flow

1. **Sign in as Admin:** Login using `admin` / `admin123`.
2. **Review Dashboard:** Inspect total employees (10), training records (15), and completion status progress.
3. **Explore Employee Master:** View employees and their assigned departments.
4. **Inspect Dot-Walking:** Navigate to *Employee Reference*, select a training record, and trace how `Department` is dynamically fetched via `employeeId`.
5. **Import CSV Data:** Navigate to *Import Data*, click *Load Sample CSV Data*, and observe the staged records.
6. **Execute Transform Map:** Click *Proceed to Transform Map*, map the source fields to target fields, and click *Transform Data & Insert Records*.
7. **Verify Training Records:** Return to *Employee Training Records* to see the newly transformed entries.
8. **Test Security ACLs:** Open *Security & ACL* page to inspect live Read/Write permission statuses.
9. **Test Impersonation:**
   - Impersonate **HR Manager** ➔ Verify view/edit permissions.
   - Impersonate **Employee** ➔ Verify write button is locked and edit actions are hidden.
   - Impersonate **Guest** ➔ Verify *Employee Training Records* access is denied with 403 status.
10. **End Impersonation:** Click *End Impersonation* in top banner to return to System Administrator context.

---

## 🔮 Future Enhancements
- Export training completion reports to PDF and Excel format.
- Add granular row-level security (User Criteria) restricting employees to view only their own records.
- Support multi-level dot-walking (e.g., `Training ➔ Employee ➔ Manager ➔ Department`).

---

## 📝 Conclusion

This project successfully models ServiceNow's data management and security framework within a lightweight, fast, and interactive React web application. It highlights the benefits of normalized relational data architectures and enterprise access control rules.
