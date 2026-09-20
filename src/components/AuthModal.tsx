import React, { useState } from 'react';
import { Mail, Lock, User, AlertCircle, ArrowLeft, Shield } from 'lucide-react';
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
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAdminModeToggle = () => {
    const nextMode = !isAdminMode;
    setIsAdminMode(nextMode);
    if (nextMode && !email) {
      setEmail(DEFAULT_ADMIN_EMAIL);
      setPassword(DEFAULT_ADMIN_PASS);
    }
  };

  const handleFillAdminCredentials = () => {
    setIsAdminMode(true);
    setIsRegister(false);
    setEmail(DEFAULT_ADMIN_EMAIL);
    setPassword(DEFAULT_ADMIN_PASS);
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
    const isAdmin = isTargetAdmin(cleanEmail) || isAdminMode;

    try {
      if (isRegister) {
        if (!displayName.trim()) {
          setError('Please provide your full name');
          setLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
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
          const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
          user = userCredential.user;
        } catch (signInErr: any) {
          // If this is the default admin credentials and account hasn't been created in Firebase yet, auto-provision
          if (
            cleanEmail === DEFAULT_ADMIN_EMAIL &&
            password === DEFAULT_ADMIN_PASS &&
            (signInErr.code === 'auth/user-not-found' || signInErr.code === 'auth/invalid-credential')
          ) {
            const newCredential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
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
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists. Try signing in.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError(err.message || 'Authentication failed. Please check credentials.');
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
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-sm">
              FS
            </div>
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
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                id="auth-password-input"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
              />
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
              {isAdminMode ? 'Admin Mode (Active)' : 'Admin Login'}
            </button>
          </div>

          {isAdminMode && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-2">
              <div>
                <span className="font-bold block">Admin Account Configured:</span>
                <span className="text-[11px] font-mono text-amber-800">futurestarstutorial16@gmail.com</span>
              </div>
              <button
                type="button"
                onClick={handleFillAdminCredentials}
                className="px-2.5 py-1 rounded bg-amber-200/80 hover:bg-amber-200 text-amber-900 font-bold text-[11px] whitespace-nowrap transition-colors"
              >
                Auto-Fill
              </button>
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
