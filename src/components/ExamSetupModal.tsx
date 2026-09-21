import React, { useState } from 'react';
import { Play, Clock, AlertCircle, User, Mail, ShieldAlert } from 'lucide-react';
import { ExamMode } from '../types';

interface ExamSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultName: string;
  defaultSubject: ExamMode;
  defaultEmail?: string;
  isUserLoggedIn?: boolean;
  onStartExam: (candidateName: string, subject: ExamMode, candidateEmail?: string) => void;
}

export const ExamSetupModal: React.FC<ExamSetupModalProps> = ({
  isOpen,
  onClose,
  defaultName,
  defaultSubject,
  defaultEmail = '',
  isUserLoggedIn = false,
  onStartExam,
}) => {
  const [candidateName, setCandidateName] = useState(defaultName || '');
  const [candidateEmail, setCandidateEmail] = useState(defaultEmail || '');
  const [subject, setSubject] = useState<ExamMode>(defaultSubject || 'Mathematics');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleStart = () => {
    if (!candidateName.trim()) {
      setError('Please provide your candidate name before starting the examination.');
      return;
    }
    setError('');
    onStartExam(candidateName.trim(), subject, candidateEmail.trim() || undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="bg-blue-950 text-white p-5 sm:p-6 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src="https://i.ibb.co/9mXgHJMv/logo1.jpg"
                alt="FUTURE STARS Logo"
                className="w-8 h-8 rounded-lg object-contain bg-white shadow-xs border border-blue-800"
                referrerPolicy="no-referrer"
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                FUTURE STARS • 11+ Examination
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-blue-200 hover:text-white text-lg font-bold p-1 rounded-lg hover:bg-blue-900/50"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
          <h2 className="text-xl sm:text-2xl font-black mt-2">Start Timed Examination</h2>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            Replicates official UK Grammar School 11+ conditions (50 Questions • 40 Mins).
          </p>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Guest / Unregistered Notice */}
          {!isUserLoggedIn && (
            <div className="p-3.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Practicing As Guest Candidate:</span>
                <p className="mt-0.5 text-blue-800 dark:text-blue-300 leading-relaxed">
                  We strongly recommend registering your student account so our tutors and administrators can track your progress over time, review your full exam analytics, and identify areas to boost your 11+ score.
                </p>
              </div>
            </div>
          )}

          {/* Student Name Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400" />
              Candidate Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="exam-candidate-name-input"
              type="text"
              required
              placeholder="e.g. Oliver Taylor"
              value={candidateName}
              onChange={(e) => {
                setCandidateName(e.target.value);
                if (error) setError('');
              }}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-medium focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 focus:outline-hidden"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Your name is recorded for your tutor and printed on your official examination result certificate and PDF.
            </p>
          </div>

          {/* Optional Contact / Parent Email for Guest Students */}
          {!isUserLoggedIn && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400" />
                Student or Parent Email <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="exam-candidate-email-input"
                type="email"
                placeholder="e.g. parent@example.com"
                value={candidateEmail}
                onChange={(e) => setCandidateEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-medium focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 focus:outline-hidden"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Helps your tutor quickly look up your mock test results.
              </p>
            </div>
          )}

          {/* Subject Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Select Examination Subject
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(['Mathematics', 'English', 'Verbal Reasoning', 'Mixed'] as ExamMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setSubject(mode)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    subject === mode
                      ? 'border-blue-900 dark:border-blue-500 bg-blue-50/80 dark:bg-blue-950/60 ring-2 ring-blue-900/20 dark:ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{mode} Practice</span>
                    {mode === 'Mixed' && (
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300/60">
                        150 Qs • 1h 30m
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {mode === 'Mixed'
                      ? '150 Qs (Maths + English + VR) • 1h 30m with 5-min subject breaks'
                      : `50 questions in ${mode} • 40 minutes`}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Official 11+ Exam Instructions & Rules Banner */}
          <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/50 text-amber-950 dark:text-amber-200 text-xs space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-amber-900 dark:text-amber-300 text-sm">
              <Clock className="w-4 h-4 text-amber-800 dark:text-amber-400 shrink-0" />
              BEFORE YOU START (Exam Instructions):
            </div>
            {subject === 'Mixed' ? (
              <ul className="list-disc pl-5 space-y-1 text-amber-900/90 dark:text-amber-300/90 leading-relaxed">
                <li>You have <strong>150 questions</strong> across 3 full sections: <strong>50 Mathematics, 50 English, and 50 Verbal Reasoning</strong>.</li>
                <li>Total test time allowed: <strong>1 hour 30 minutes (90 minutes)</strong>.</li>
                <li>☕ <strong>5-Minute Section Breaks</strong>: After completing each subject (Q50 and Q100), you can take an optional 5-minute break.</li>
                <li>⏸️ <strong>Timer Pause</strong>: The examination timer completely pauses during the break!</li>
                <li>▶️ <strong>Instant Resume</strong>: The moment you click <strong>Continue</strong>, the timer resumes counting down immediately.</li>
                <li>Auto-submission occurs when the 1h 30m examination timer reaches 00:00. Good luck!</li>
              </ul>
            ) : (
              <ul className="list-disc pl-5 space-y-1 text-amber-900/90 dark:text-amber-300/90 leading-relaxed">
                <li>You have <strong>50 questions</strong> in {subject}.</li>
                <li>Time allowed: <strong>exactly 40 minutes</strong>.</li>
                <li>You can move between questions, change answers, and flag questions for review.</li>
                <li>You can review unanswered questions before submitting.</li>
                <li>When the countdown timer reaches zero, your examination will automatically submit. Good luck!</li>
              </ul>
            )}
          </div>
        </div>

        {/* Action Buttons - Pinned Footer Always Accessible */}
        <div className="px-5 sm:px-6 py-3.5 sm:py-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            id="confirm-start-exam-btn"
            type="button"
            onClick={handleStart}
            className="px-5 sm:px-6 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-sm font-bold flex items-center gap-2 shadow-xs transition-colors"
          >
            <Play className="w-4 h-4 fill-white" />
            Start Examination Now
          </button>
        </div>
      </div>
    </div>
  );
};

