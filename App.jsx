import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ImpersonationBanner } from './components/ImpersonationBanner';
import { ToastContainer } from './components/ToastContainer';
import { LoginModal } from './components/LoginModal';

import { Dashboard } from './pages/Dashboard';
import { Employees } from './pages/Employees';
import { TrainingRecords } from './pages/TrainingRecords';
import { ImportData } from './pages/ImportData';
import { TransformMapping } from './pages/TransformMapping';
import { DotWalkingDemo } from './pages/DotWalkingDemo';
import { SecurityACL } from './pages/SecurityACL';
import { ImpersonateUser } from './pages/ImpersonateUser';
import { UsersManagement } from './pages/UsersManagement';
import { AboutProject } from './pages/AboutProject';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'employees':
        return <Employees />;
      case 'training-records':
        return <TrainingRecords />;
      case 'import-data':
        return <ImportData setActiveTab={setActiveTab} />;
      case 'transform-mapping':
        return <TransformMapping setActiveTab={setActiveTab} />;
      case 'dot-walking':
        return <DotWalkingDemo />;
      case 'security-acl':
        return <SecurityACL setActiveTab={setActiveTab} />;
      case 'impersonate-user':
        return <ImpersonateUser setActiveTab={setActiveTab} />;
      case 'system-users':
        return <UsersManagement />;
      case 'about-project':
        return <AboutProject />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ImpersonationBanner />
      <Navbar onOpenLogin={() => setIsLoginOpen(true)} />
      
      <div className="app-layout">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="main-wrapper">
          <div className="main-content">
            {renderTabContent()}
          </div>
        </main>
      </div>

      <ToastContainer />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
