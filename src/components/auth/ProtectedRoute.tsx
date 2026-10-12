import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-peach-paper)',
          gap: 16,
          fontFamily: 'var(--font-manrope)',
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            border: '3px solid var(--color-charcoal-ink)',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-charcoal-ink)' }}>
          Verifying session credentials...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Preserve attempted URL so user is returned to their destination after authenticating
    const redirectUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/auth/login?from=${redirectUrl}`} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
