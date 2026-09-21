import React, { useState } from 'react';
import { Mail, Lock, User, AlertCircle, ArrowLeft, Shield, Eye, EyeOff } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (profile: UserProfile) => void;
}

const DEFAULT_ADMIN_EMAIL = 'futurestarstutorial16@gmail.com';
const DEFAULT_ADMIN_PASS = 'Futurestars_2026';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAdminModeToggle = () => {
    setIsAdminMode(prev => !prev);
    setError('');
  };

  const isTargetAdmin = (targetEmail: string) => {
    const clean = targetEmail.toLowerCase().trim();
    return clean === DEFAULT_ADMIN_EMAIL || clean.includes('admin');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cleanEmail = email.toLowerCase().trim();
    const cleanPassword = password.trim();
    const isAdmin = isTargetAdmin(cleanEmail) || isAdminMode;

    try {
      if (isRegister) {
        if (!displayName.trim()) {
          setError('Please provide your full name');
          setLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, cleanPassword);
        const user = userCredential.user;
        await updateProfile(user, { displayName });

        const profile: UserProfile = {
          uid: user.uid,
          email: user.email || cleanEmail,
          displayName: displayName.trim(),
          role: isAdmin ? 'admin' : 'student',
          createdAt: new Date().toISOString(),
        };

        // Save to Firestore users collection
        await setDoc(doc(db, 'users', user.uid), profile);
        onSuccess(profile);
        onClose();
      } else {
        let user;
        try {
          const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, cleanPassword);
          user = userCredential.user;
        } catch (signInErr: any) {
          // If this is the designated admin credentials and account hasn't been created yet, auto-provision
          if (
            cleanEmail === DEFAULT_ADMIN_EMAIL &&
            cleanPassword === DEFAULT_ADMIN_PASS &&
            (signInErr.code === 'auth/user-not-found' || signInErr.code === 'auth/invalid-credential' || signInErr.code === 'auth/internal-error')
          ) {
            const newCredential = await createUserWithEmailAndPassword(auth, cleanEmail, cleanPassword);
            user = newCredential.user;
            await updateProfile(user, { displayName: 'Future Stars Administrator' });
          } else {
            throw signInErr;
          }
        }

        // Fetch or create profile doc
        const userDocRef = doc(db, 'users', user.uid);
        const snap = await getDoc(userDocRef);

        let profile: UserProfile;
        if (snap.exists()) {
          profile = snap.data() as UserProfile;
          // Ensure designated admin email always holds admin role
          if (isAdmin && profile.role !== 'admin') {
            profile.role = 'admin';
            await setDoc(userDocRef, { role: 'admin' }, { merge: true });
          }
        } else {
          profile = {
            uid: user.uid,
            email: user.email || cleanEmail,
            displayName: user.displayName || (isAdmin ? 'Future Stars Administrator' : 'Student'),
            role: isAdmin ? 'admin' : 'student',
            createdAt: new Date().toISOString(),
          };
          await setDoc(userDocRef, profile);
        }

        onSuccess(profile);
        onClose();
      }
    } catch (err: any) {
      console.error('Authentication error:', err);
      const errCode = err.code || '';
      const errMsg = (err.message || '').toUpperCase();

      if (
        errCode === 'auth/wrong-password' ||
        errCode === 'auth/user-not-found' ||
        errCode === 'auth/invalid-credential' ||
        errCode === 'auth/invalid-login-credentials' ||
        errMsg.includes('INVALID_LOGIN_CREDENTIALS') ||
        errMsg.includes('INVALID-CREDENTIAL')
      ) {
        setError('Incorrect email or password. Please verify your credentials and try again.');
      } else if (errCode === 'auth/internal-error' || errMsg.includes('INTERNAL-ERROR')) {
        setError('Incorrect email or password, or connection timeout. Please check your credentials and try again.');
      } else if (errCode === 'auth/email-already-in-use') {
        setError('An account with this email already exists. Try signing in instead.');
      } else if (errCode === 'auth/weak-password') {
        setError('Password must be at least 6 characters.');
      } else if (errCode === 'auth/too-many-requests') {
        setError('Too many failed sign-in attempts. Please wait a moment before trying again.');
      } else if (errCode === 'auth/network-request-failed') {
        setError('Network connection error. Please check your internet connection and try again.');
      } else if (errCode === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        const cleanMsg = (err.message || '')
          .replace(/^Firebase:\s*Error\s*\(([^)]+)\)\.?/i, '$1')
          .replace(/^auth\//i, '');
        setError(cleanMsg || 'Authentication failed. Please verify credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoStudentQuickLogin = () => {
    const studentProf: UserProfile = {
      uid: 'student-demo-user',
      email: 'alex.taylor@example.co.uk',
      displayName: 'Alex Taylor',
      role: 'student',
      createdAt: new Date().toISOString()
    };
    onSuccess(studentProf);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        <div className="px-6 pt-6 pb-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <img
              src="https://i.ibb.co/9mXgHJMv/logo1.jpg"
              alt="FUTURE STARS Logo"
              className="w-9 h-9 rounded-lg object-contain bg-white shadow-xs border border-slate-200"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {isRegister ? 'Create Account' : 'Welcome Back'}
              </h3>
              <p className="text-xs text-slate-500">
                {isAdminMode ? 'Administrator Portal' : 'Student Examination Portal'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Candidate Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  id="auth-display-name-input"
                  type="text"
                  required
                  placeholder="e.g. Oliver Smith"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                id="auth-email-input"
                type="email"
                required
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <button
                type="button"
                id="auth-toggle-password-text-btn"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-[11px] font-medium text-blue-900 hover:text-blue-700 flex items-center gap-1 transition-colors"
              >
                {showPassword ? (
                  <>
                    <EyeOff className="w-3 h-3" />
                    <span>Hide password</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3 h-3" />
                    <span>Show password</span>
                  </>
                )}
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                id="auth-password-input"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder={showPassword ? 'Enter your password' : '••••••••'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900 font-sans"
              />
              <button
                id="auth-toggle-password-icon-btn"
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-hidden p-0.5 rounded transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              id="auth-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-semibold text-sm transition-all disabled:opacity-50"
            >
              {loading ? 'Please wait...' : isRegister ? 'Register & Continue' : 'Sign In'}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              className="text-blue-900 hover:underline font-medium"
            >
              {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Register"}
            </button>

            <button
              type="button"
              onClick={handleAdminModeToggle}
              className={`flex items-center gap-1 font-semibold px-2 py-1 rounded transition-colors ${
                isAdminMode ? 'bg-amber-100 text-amber-900' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              {isAdminMode ? 'Switch to Student' : 'Admin Login'}
            </button>
          </div>

          {isAdminMode && (
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Administrator Access:</strong> Please provide your admin email and password above to access curriculum controls.
              </span>
            </div>
          )}

          {/* Quick Demo Access Button for candidate trial */}
          <div className="mt-4 pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 mb-2">Instant Demo Candidate Access:</p>
            <button
              type="button"
              id="quick-demo-student-btn"
              onClick={handleDemoStudentQuickLogin}
              className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors"
            >
              Try as Demo Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
