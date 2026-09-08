import React, { createContext, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useToast } from './hooks/useToast';
import AppLayout from './components/layout/AppLayout';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ScannerPage from './pages/ScannerPage';
import ProcessingPage from './pages/ProcessingPage';
import ReportPage from './pages/ReportPage';
import InspectorPage from './pages/InspectorPage';
import ScanHistoryPage from './pages/ScanHistoryPage';
import NotFoundPage from './pages/NotFoundPage';
import SignInPage from './pages/SignInPage';

const ToastContext = createContext(null);
export const useToastContext = () => useContext(ToastContext);

export default function App() {
  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>
      <AppLayout toasts={toast.toasts} onRemoveToast={toast.removeToast}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/scan" element={<ScannerPage />} />
          <Route path="/processing/:scanId" element={<ProcessingPage />} />
          <Route path="/report/:scanId" element={<ReportPage />} />
          <Route path="/inspector" element={<InspectorPage />} />
          <Route path="/history" element={<ScanHistoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppLayout>
    </ToastContext.Provider>
  );
}
