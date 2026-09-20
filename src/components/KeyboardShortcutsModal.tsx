import React from 'react';
import { X, Keyboard, Moon, Sun, CheckCircle, Navigation, Play, Flag, Send } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  onToggleDarkMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-900 dark:text-blue-300">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Keyboard Shortcuts
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Speed up practice tests and navigation with hotkeys
              </p>
            </div>
          </div>
          <button
            id="btn-close-shortcuts-modal"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close keyboard shortcuts"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Exam Navigation Shortcuts */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-400">
            <Navigation className="w-3.5 h-3.5" />
            During 11+ Examinations
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-slate-700 dark:text-slate-300">Select Option A / B / C / D</span>
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 rounded-md bg-white dark:bg-slate-700 font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 shadow-2xs">A-D</kbd>
                <span className="text-slate-400">or</span>
                <kbd className="px-2 py-1 rounded-md bg-white dark:bg-slate-700 font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 shadow-2xs">1-4</kbd>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-slate-700 dark:text-slate-300">Next Question</span>
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 rounded-md bg-white dark:bg-slate-700 font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 shadow-2xs">→</kbd>
                <span className="text-slate-400">or</span>
                <kbd className="px-2 py-1 rounded-md bg-white dark:bg-slate-700 font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 shadow-2xs">J</kbd>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-slate-700 dark:text-slate-300">Previous Question</span>
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 rounded-md bg-white dark:bg-slate-700 font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 shadow-2xs">←</kbd>
                <span className="text-slate-400">or</span>
                <kbd className="px-2 py-1 rounded-md bg-white dark:bg-slate-700 font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 shadow-2xs">K</kbd>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-slate-700 dark:text-slate-300">Flag for Review</span>
              <kbd className="px-2 py-1 rounded-md bg-white dark:bg-slate-700 font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 shadow-2xs">F</kbd>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 sm:col-span-2">
              <span className="text-slate-700 dark:text-slate-300">Submit Examination</span>
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 rounded-md bg-white dark:bg-slate-700 font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 shadow-2xs">Ctrl</kbd>
                <span className="text-slate-400">+</span>
                <kbd className="px-2 py-1 rounded-md bg-white dark:bg-slate-700 font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 shadow-2xs">Enter</kbd>
              </div>
            </div>
          </div>
        </div>

        {/* Global Shortcuts */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-purple-400">
            <Play className="w-3.5 h-3.5" />
            General & Accessibility
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-slate-700 dark:text-slate-300">Toggle Dark Mode</span>
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 rounded-md bg-white dark:bg-slate-700 font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 shadow-2xs">Shift</kbd>
                <span className="text-slate-400">+</span>
                <kbd className="px-2 py-1 rounded-md bg-white dark:bg-slate-700 font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 shadow-2xs">D</kbd>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-slate-700 dark:text-slate-300">Open Shortcuts Guide</span>
              <kbd className="px-2 py-1 rounded-md bg-white dark:bg-slate-700 font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 shadow-2xs">?</kbd>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-slate-700 dark:text-slate-300">Close Any Modal</span>
              <kbd className="px-2 py-1 rounded-md bg-white dark:bg-slate-700 font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 shadow-2xs">Esc</kbd>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-slate-700 dark:text-slate-300">Dashboard / Home</span>
              <kbd className="px-2 py-1 rounded-md bg-white dark:bg-slate-700 font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 shadow-2xs">H</kbd>
            </div>
          </div>
        </div>

        {/* Quick Dark Mode Action in Modal */}
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {isDarkMode ? (
              <Moon className="w-5 h-5 text-purple-400" />
            ) : (
              <Sun className="w-5 h-5 text-amber-500" />
            )}
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Current Theme: {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Press <span className="font-mono font-bold">Shift+D</span> anytime to toggle
              </div>
            </div>
          </div>

          <button
            id="modal-toggle-theme-btn"
            onClick={onToggleDarkMode}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-2xs"
          >
            Switch to {isDarkMode ? 'Light' : 'Dark'}
          </button>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-900 text-white font-bold text-xs hover:bg-blue-800 transition-colors shadow-xs"
          >
            Got it, thanks
          </button>
        </div>
      </div>
    </div>
  );
};
