import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { LandingPage } from './pages/LandingPage';
import { KnowledgePage } from './pages/KnowledgePage';
import { SearchPage } from './pages/SearchPage';
import { RepositoriesPage } from './pages/RepositoriesPage';
import { ActivityPage } from './pages/ActivityPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dedicated Individual Landing Page (Ferrari 100vw cinematic experience) */}
        <Route path="/" element={<LandingPage />} />

        {/* Individual Inside Pages with Closable Sidebar & Ferrari App Shell */}
        <Route element={<AppShell />}>
          <Route path="knowledge" element={<KnowledgePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="repositories" element={<RepositoriesPage />} />
          <Route path="activity" element={<ActivityPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
