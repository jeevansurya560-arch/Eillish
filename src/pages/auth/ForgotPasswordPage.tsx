import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ForgotPasswordPage: React.FC = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setIsSubmitting(true);
    const res = await forgotPassword(email);
    setIsSubmitting(false);

    if (res.success) {
      setMessage(res.message);
      setIsSubmitted(true);
    } else {
      setError('Failed to process password recovery request.');
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
        <Link
          to="/auth/login"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '12px',
            fontWeight: 800,
            color: 'var(--color-charcoal-ink)',
            textDecoration: 'none',
            marginBottom: 20,
          }}
        >
          <ArrowLeft size={14} />
          <span>Back to sign in</span>
        </Link>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            color: 'var(--color-charcoal-ink)',
            margin: '0 0 8px 0',
          }}
        >
          Reset Password
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 24px 0', lineHeight: 1.5 }}>
          Enter the email address associated with your Eillish account. We will send you a link to reset your password.
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

        {isSubmitted ? (
          <div
            style={{
              background: 'var(--color-mint-wash)',
              border: '2px solid var(--color-charcoal-ink)',
              borderRadius: 'var(--radius-sm)',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'var(--color-snow)',
                border: '2px solid var(--color-charcoal-ink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px auto',
              }}
            >
              <CheckCircle2 size={22} style={{ color: 'var(--color-charcoal-ink)' }} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', margin: '0 0 6px 0' }}>
              Check your inbox
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--color-charcoal-ink)', lineHeight: 1.5, margin: '0 0 16px 0' }}>
              {message}
            </p>
            <Link
              to="/auth/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '9px 18px',
                borderRadius: 'var(--radius-full)',
                border: '2px solid var(--color-charcoal-ink)',
                background: 'var(--color-charcoal-ink)',
                color: 'var(--color-snow)',
                fontSize: '12.5px',
                fontWeight: 800,
                textDecoration: 'none',
              }}
            >
              <span>Return to Sign In</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label
                htmlFor="forgot-email"
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: 6,
                }}
              >
                Registered Email
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="forgot-email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 38px',
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
                <Mail
                  size={16}
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)',
                  }}
                />
              </div>
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
              <span>{isSubmitting ? 'Sending Link...' : 'Send Recovery Instructions'}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
