import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ResetPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || 'valid-sample-token';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    const res = await resetPassword(token, password);
    setIsSubmitting(false);

    if (res.success) {
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
    } else {
      setError(res.message || 'Password reset token expired or invalid.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-peach-paper)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: 'var(--font-manrope)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'var(--color-snow)',
          border: '2px solid var(--color-charcoal-ink)',
          borderRadius: 'var(--radius-cards)',
          padding: '36px',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            color: 'var(--color-charcoal-ink)',
            margin: '0 0 8px 0',
          }}
        >
          Set New Password
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 24px 0', lineHeight: 1.5 }}>
          Create a strong password for your Eillish account.
        </p>

        {error && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              background: '#fef2f2',
              border: '2px solid #ef4444',
              borderRadius: 'var(--radius-sm)',
              color: '#991b1b',
              fontSize: '12.5px',
              fontWeight: 600,
              marginBottom: 18,
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {isSuccess ? (
          <div
            style={{
              background: 'var(--color-mint-wash)',
              border: '2px solid var(--color-charcoal-ink)',
              borderRadius: 'var(--radius-sm)',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <CheckCircle2 size={24} style={{ color: 'var(--color-charcoal-ink)', margin: '0 auto 8px auto' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', margin: '0 0 4px 0' }}>
              Password Updated!
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--color-charcoal-ink)', margin: 0 }}>
              Redirecting you to sign in...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label
                htmlFor="reset-pass"
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: 6,
                }}
              >
                New Password
              </label>
              <input
                id="reset-pass"
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '2px solid var(--color-charcoal-ink)',
                  background: 'var(--color-snow)',
                  fontSize: '13.5px',
                  fontFamily: 'var(--font-manrope)',
                  fontWeight: 600,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label
                htmlFor="reset-confirm-pass"
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: 6,
                }}
              >
                Confirm Password
              </label>
              <input
                id="reset-confirm-pass"
                type="password"
                placeholder="Repeat new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '2px solid var(--color-charcoal-ink)',
                  background: 'var(--color-snow)',
                  fontSize: '13.5px',
                  fontFamily: 'var(--font-manrope)',
                  fontWeight: 600,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                width: '100%',
                padding: '12px 20px',
                borderRadius: 'var(--radius-full)',
                border: '2px solid var(--color-charcoal-ink)',
                background: 'var(--color-charcoal-ink)',
                color: 'var(--color-snow)',
                fontFamily: 'var(--font-manrope)',
                fontSize: '13.5px',
                fontWeight: 800,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
            >
              <span>{isSubmitting ? 'Updating...' : 'Update Password & Sign In'}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link
            to="/auth/login"
            style={{
              fontSize: '12px',
              color: 'var(--color-charcoal-ink)',
              fontWeight: 700,
              textDecoration: 'underline',
            }}
          >
            Cancel and return to sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
