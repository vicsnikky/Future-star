import React, { useState } from 'react';
import { Play, ArrowRight, Award, AlertCircle, Sparkles, BookOpen, Clock } from 'lucide-react';
import { ExamMode } from '../types';

interface ExamSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultName: string;
  defaultSubject: ExamMode;
  onStartExam: (candidateName: string, subject: ExamMode) => void;
}

export const ExamSetupModal: React.FC<ExamSetupModalProps> = ({
  isOpen,
  onClose,
  defaultName,
  defaultSubject,
  onStartExam,
}) => {
  const [candidateName, setCandidateName] = useState(defaultName || '');
  const [subject, setSubject] = useState<ExamMode>(defaultSubject || 'Mathematics');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleStart = () => {
    if (!candidateName.trim()) {
      setError('Please provide your name before starting the examination.');
      return;
    }
    setError('');
    onStartExam(candidateName.trim(), subject);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="bg-blue-950 text-white p-5 sm:p-6 shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">
              FUTURE STARS • 11+ Examination
            </span>
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
            Replicates official UK Grammar School 11+ conditions.
          </p>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Student Name Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
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
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-blue-900 focus:outline-hidden"
            />
            <p className="text-xs text-slate-500 mt-1">
              Your name will be printed on your official examination result certificate and PDF report.
            </p>
          </div>

          {/* Subject Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
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
                      ? 'border-blue-900 bg-blue-50/80 ring-2 ring-blue-900/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="font-bold text-sm text-slate-900">{mode} Practice</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {mode === 'Mixed' ? 'All 3 subjects combined' : `50 questions in ${mode}`}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Official 11+ Exam Instructions & Rules Banner */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-950 text-xs space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-amber-900 text-sm">
              <Clock className="w-4 h-4 text-amber-800 shrink-0" />
              BEFORE YOU START (Exam Instructions):
            </div>
            <ul className="list-disc pl-5 space-y-1 text-amber-900/90 leading-relaxed">
              <li>You have <strong>50 questions</strong> to answer.</li>
              <li>Time allowed: <strong>exactly 40 minutes</strong>.</li>
              <li>You can move between questions, change answers, and flag questions for review.</li>
              <li>You can review unanswered questions before submitting.</li>
              <li>When the countdown timer reaches zero, your examination will automatically submit.</li>
              <li>Make sure you have a stable internet connection. Good luck!</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons - Pinned Footer Always Accessible */}
        <div className="px-5 sm:px-6 py-3.5 sm:py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            id="confirm-start-exam-btn"
            type="button"
            onClick={handleStart}
            className="px-5 sm:px-6 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-sm font-bold flex items-center gap-2 shadow-xs transition-colors"
          >
            <Play className="w-4 h-4 fill-white" />
            Start Examination Now
          </button>
        </div>
      </div>
    </div>
  );
};
