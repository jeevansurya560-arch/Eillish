import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AppShell } from './components/layout/AppShell';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { SecurityPage } from './pages/SecurityPage';
import { AboutPage } from './pages/AboutPage';
import { DocsPage } from './pages/DocsPage';
import { ChangelogPage } from './pages/ChangelogPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { GitHubCallbackPage } from './pages/auth/GitHubCallbackPage';

// Onboarding
import { OnboardingPage } from './pages/OnboardingPage';

// Authenticated Workspaces
import { DashboardPage } from './pages/DashboardPage';
import { KnowledgePage } from './pages/KnowledgePage';
import { KnowledgeDetailPage } from './pages/KnowledgeDetailPage';
import { SearchPage } from './pages/SearchPage';
import { RepositoriesPage } from './pages/RepositoriesPage';
import { RepositoryDetailPage } from './pages/RepositoryDetailPage';
import { ActivityPage } from './pages/ActivityPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing & Marketing */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Authentication Routes */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/login" element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/signup" element={<Navigate to="/auth/signup" replace />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
          <Route path="/auth/github/callback" element={<GitHubCallbackPage />} />

          {/* Onboarding Flow */}
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            }
          />
          <Route path="/app/onboarding" element={<Navigate to="/onboarding" replace />} />

          {/* Authenticated Workspace Shell */}
          <Route
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/app/dashboard" element={<Navigate to="/dashboard" replace />} />

            <Route path="/knowledge" element={<KnowledgePage />} />
            <Route path="/knowledge/:id" element={<KnowledgeDetailPage />} />
            <Route path="/app/knowledge" element={<Navigate to="/knowledge" replace />} />
            <Route path="/app/knowledge/:id" element={<KnowledgeDetailPage />} />

            <Route path="/search" element={<SearchPage />} />
            <Route path="/ask" element={<Navigate to="/search" replace />} />
            <Route path="/app/ask" element={<Navigate to="/search" replace />} />

            <Route path="/repositories" element={<RepositoriesPage />} />
            <Route path="/repositories/:id" element={<RepositoryDetailPage />} />
            <Route path="/app/repositories" element={<Navigate to="/repositories" replace />} />
            <Route path="/app/repositories/:id" element={<RepositoryDetailPage />} />

            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/app/activity" element={<Navigate to="/activity" replace />} />

            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/app/analytics" element={<Navigate to="/analytics" replace />} />

            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/app/settings" element={<Navigate to="/settings" replace />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
