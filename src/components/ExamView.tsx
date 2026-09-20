import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ShieldAlert,
  Send,
  Keyboard,
  Moon,
  Sun
} from 'lucide-react';
import { ExamAttempt, Question } from '../types';
import { KeyboardShortcutsModal } from './KeyboardShortcutsModal';

interface ExamViewProps {
  exam: ExamAttempt;
  onUpdateExam: (updated: ExamAttempt) => void;
  onSubmitExam: (finalExam: ExamAttempt) => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const ExamView: React.FC<ExamViewProps> = ({
  exam,
  onUpdateExam,
  onSubmitExam,
  isDarkMode = false,
  onToggleDarkMode,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
  const [showWarning, setShowWarning] = useState<string | null>(null);

  // Calculate remaining seconds based on server/start timestamp
  const startTimeMs = new Date(exam.startTime).getTime();
  const totalAllowedSeconds = exam.durationMinutes * 60; // 40 * 60 = 2400

  const calculateRemainingSeconds = () => {
    const elapsedSeconds = Math.floor((Date.now() - startTimeMs) / 1000);
    const remain = totalAllowedSeconds - elapsedSeconds;
    return Math.max(0, remain);
  };

  const [timeRemaining, setTimeRemaining] = useState<number>(calculateRemainingSeconds);
  const timerRef = useRef<any>(null);

  // Timer countdown and warning triggers
  useEffect(() => {
    timerRef.current = setInterval(() => {
      const remain = calculateRemainingSeconds();
      setTimeRemaining(remain);

      // Warning triggers at 10 minutes (600s), 5 minutes (300s), 1 minute (60s)
      if (remain === 600) {
        setShowWarning('Attention: Exactly 10 minutes remaining in this examination.');
      } else if (remain === 300) {
        setShowWarning('Warning: Exactly 5 minutes remaining. Please review your answers.');
      } else if (remain === 60) {
        setShowWarning('Final Warning: 1 minute remaining! Auto-submission will execute at 00:00.');
      }

      // Auto-submission when timer hits zero
      if (remain <= 0) {
        clearInterval(timerRef.current);
        handleFinalSubmit(true); // force auto submit
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [exam]);

  // Window unload warning if student tries to close tab during exam
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'Your examination is still in progress. Are you sure you want to leave?';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ: Question = exam.questions[currentIndex] || exam.questions[0];
  const selectedAnswer = exam.studentAnswers[currentIndex] || '';
  const isFlagged = exam.flaggedQuestions.includes(currentIndex);

  const handleSelectOption = (opt: string) => {
    const updatedAnswers = { ...exam.studentAnswers, [currentIndex]: opt };
    const updated = { ...exam, studentAnswers: updatedAnswers };
    onUpdateExam(updated);
  };

  const handleToggleFlag = () => {
    let updatedFlags: number[];
    if (isFlagged) {
      updatedFlags = exam.flaggedQuestions.filter(idx => idx !== currentIndex);
    } else {
      updatedFlags = [...exam.flaggedQuestions, currentIndex];
    }
    onUpdateExam({ ...exam, flaggedQuestions: updatedFlags });
  };

  // Keyboard Navigation & Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      // Escape key: close active modal
      if (e.key === 'Escape') {
        if (showConfirmModal) {
          setShowConfirmModal(false);
          return;
        }
        if (showShortcutsModal) {
          setShowShortcutsModal(false);
          return;
        }
      }

      // Shift + D: Dark Mode toggle
      if (e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        onToggleDarkMode?.();
        return;
      }

      // Question mark (?): open shortcuts modal
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setShowShortcutsModal(prev => !prev);
        return;
      }

      // When modal is open, prevent other exam actions
      if (showConfirmModal || showShortcutsModal) {
        return;
      }

      // Number keys (1-4) or letter keys (A-D) to select option
      const keyUpper = e.key.toUpperCase();
      let optIdx = -1;
      if (keyUpper === 'A' || e.key === '1') optIdx = 0;
      else if (keyUpper === 'B' || e.key === '2') optIdx = 1;
      else if (keyUpper === 'C' || e.key === '3') optIdx = 2;
      else if (keyUpper === 'D' || e.key === '4') optIdx = 3;

      if (optIdx >= 0 && currentQ && currentQ.options && currentQ.options[optIdx] !== undefined) {
        e.preventDefault();
        handleSelectOption(currentQ.options[optIdx]);
        return;
      }

      // Next Question: ArrowRight or J
      if (e.key === 'ArrowRight' || keyUpper === 'J') {
        e.preventDefault();
        if (currentIndex < exam.totalQuestions - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setShowConfirmModal(true);
        }
        return;
      }

      // Previous Question: ArrowLeft or K
      if (e.key === 'ArrowLeft' || keyUpper === 'K') {
        e.preventDefault();
        if (currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
        }
        return;
      }

      // Flag / unflag: F
      if (keyUpper === 'F') {
        e.preventDefault();
        handleToggleFlag();
        return;
      }

      // Submit modal trigger: S or Ctrl+Enter
      if ((e.ctrlKey && e.key === 'Enter') || keyUpper === 'S') {
        e.preventDefault();
        setShowConfirmModal(true);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQ, exam, isFlagged, showConfirmModal, showShortcutsModal, onToggleDarkMode]);

  const handleFinalSubmit = (forced = false) => {
    if (timerRef.current) clearInterval(timerRef.current);

    // Calculate marks
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    const topicBreakdown: Record<string, { total: number; correct: number }> = {};

    exam.questions.forEach((q, idx) => {
      const ans = exam.studentAnswers[idx];
      const topic = q.topic || 'General';
      if (!topicBreakdown[topic]) {
        topicBreakdown[topic] = { total: 0, correct: 0 };
      }
      topicBreakdown[topic].total += 1;

      if (!ans) {
        unanswered++;
      } else if (ans.trim() === q.correctAnswer.trim()) {
        correct++;
        topicBreakdown[topic].correct += 1;
      } else {
        incorrect++;
      }
    });

    const totalQuestions = exam.questions.length || 50;
    const percentage = Math.round((correct / totalQuestions) * 100);
    const timeUsedSeconds = totalAllowedSeconds - timeRemaining;

    const completedExam: ExamAttempt = {
      ...exam,
      status: 'completed',
      submittedAt: new Date().toISOString(),
      timeUsedSeconds,
      score: correct,
      percentage,
      correctCount: correct,
      incorrectCount: incorrect,
      unansweredCount: unanswered,
      topicBreakdown,
    };

    onSubmitExam(completedExam);
  };

  // Counts for review modal
  const answeredCount = Object.keys(exam.studentAnswers).filter(k => !!exam.studentAnswers[Number(k)]).length;
  const unansweredCount = exam.totalQuestions - answeredCount;
  const flaggedCount = exam.flaggedQuestions.length;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-blue-950 dark:bg-slate-900 text-white shadow-md border-b border-blue-900 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-800 dark:bg-blue-900 flex items-center justify-center font-bold text-lg text-white">
              FS
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-300 dark:text-blue-400">
                {exam.subject} Examination
              </div>
              <h1 className="text-lg font-bold">
                Question {currentIndex + 1} of {exam.totalQuestions}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* 40-Minute Countdown Display */}
            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono font-bold text-sm sm:text-base ${
              timeRemaining < 300
                ? 'bg-red-600 text-white animate-pulse'
                : timeRemaining < 600
                ? 'bg-amber-500 text-slate-900'
                : 'bg-blue-900/80 dark:bg-slate-800 text-blue-100 border border-blue-700 dark:border-slate-700'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeRemaining)}</span>
            </div>

            {/* Keyboard Shortcuts Trigger */}
            <button
              id="exam-header-shortcuts-btn"
              onClick={() => setShowShortcutsModal(true)}
              className="p-2 rounded-lg bg-blue-900/80 hover:bg-blue-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-blue-700/60 dark:border-slate-700 transition-colors"
              title="Keyboard Shortcuts (?)"
              aria-label="View Keyboard Shortcuts"
            >
              <Keyboard className="w-4 h-4" />
              <span className="hidden md:inline">Hotkeys</span>
              <kbd className="hidden md:inline px-1 py-0.5 bg-blue-950/70 dark:bg-slate-900 rounded text-[10px] font-mono">?</kbd>
            </button>

            {/* Dark Mode Toggle */}
            {onToggleDarkMode && (
              <button
                id="exam-header-darkmode-toggle"
                onClick={onToggleDarkMode}
                className="p-2 rounded-lg bg-blue-900/80 hover:bg-blue-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-200 hover:text-white border border-blue-700/60 dark:border-slate-700 transition-colors"
                title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode (Shift+D)`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-200" />}
              </button>
            )}

            {/* Submit Button */}
            <button
              id="exam-header-submit-btn"
              onClick={() => setShowConfirmModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
            >
              <Send className="w-4 h-4" />
              <span className="hidden xs:inline">Submit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Warnings */}
      {showWarning && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-center text-sm font-bold flex items-center justify-center gap-2 shadow-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>{showWarning}</span>
          <button
            onClick={() => setShowWarning(null)}
            className="ml-4 text-xs underline font-semibold cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Examination Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left 3 Columns: Active Question Area */}
        <div className="lg:col-span-3 flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 sm:p-8 transition-colors">
          <div>
            {/* Meta tags: Topic, Difficulty, Flag button */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300">
                  {currentQ.subject}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Topic: {currentQ.topic}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-300">
                  Hard • Grammar School Standard
                </span>
              </div>

              <button
                id="flag-question-toggle-btn"
                onClick={handleToggleFlag}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isFlagged
                    ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
                title="Shortcut: Press 'F'"
              >
                <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-600 dark:fill-amber-400 text-amber-600 dark:text-amber-400' : ''}`} />
                <span>{isFlagged ? 'Flagged' : 'Flag Question'}</span>
                <kbd className="hidden sm:inline text-[10px] font-mono px-1 py-0.5 rounded bg-white/60 dark:bg-slate-700/60 ml-1">F</kbd>
              </button>
            </div>

            {/* Question Text */}
            <div className="mb-8">
              <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Question {currentIndex + 1}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
                {currentQ.questionText}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, optIdx) => {
                const optLetter = String.fromCharCode(65 + optIdx); // A, B, C, D
                const isSelected = selectedAnswer === option;

                return (
                  <button
                    key={optIdx}
                    id={`exam-option-${currentIndex}-${optLetter}`}
                    type="button"
                    onClick={() => handleSelectOption(option)}
                    className={`w-full p-4 rounded-xl border text-left flex items-center gap-4 transition-all ${
                      isSelected
                        ? 'border-blue-900 dark:border-blue-500 bg-blue-50/80 dark:bg-blue-950/50 ring-2 ring-blue-900/20 dark:ring-blue-500/20 text-blue-950 dark:text-blue-100 font-bold'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                      isSelected
                        ? 'bg-blue-900 dark:bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {optLetter}
                    </span>
                    <span className="text-base flex-1">{option}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 shrink-0">
                      [{optLetter}]
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Nav Controls */}
          <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
            <button
              id="exam-prev-question-btn"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
              className="px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Shortcut: Press '←' or 'K'"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
              <kbd className="hidden sm:inline font-mono text-[10px] opacity-60 ml-0.5">←</kbd>
            </button>

            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Candidate: <span className="font-bold text-slate-800 dark:text-slate-200">{exam.studentName}</span>
            </div>

            {currentIndex < exam.totalQuestions - 1 ? (
              <button
                id="exam-next-question-btn"
                onClick={() => setCurrentIndex(prev => prev + 1)}
                className="px-5 py-2.5 rounded-lg bg-blue-900 dark:bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-600 text-white font-bold text-sm flex items-center gap-1.5 transition-colors"
                title="Shortcut: Press '→' or 'J'"
              >
                Next
                <kbd className="hidden sm:inline font-mono text-[10px] bg-blue-950/60 dark:bg-blue-900 px-1 py-0.5 rounded text-white/80">→</kbd>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="exam-final-review-btn"
                onClick={() => setShowConfirmModal(true)}
                className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-1.5 transition-colors"
              >
                Review & Submit
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right 1 Column: Question Navigation Grid */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 flex flex-col transition-colors">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Question Navigator (50)
            </h3>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-blue-900 dark:bg-blue-600 border border-blue-900 dark:border-blue-600 inline-block" />
              <span>Current</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-emerald-100 dark:bg-emerald-950 border border-emerald-500 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-[9px] font-bold">✓</span>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 inline-block" />
              <span>Unanswered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-amber-100 dark:bg-amber-950 border border-amber-500 text-amber-800 dark:text-amber-300 flex items-center justify-center text-[9px] font-bold">⚑</span>
              <span>Flagged</span>
            </div>
          </div>

          {/* Grid of 50 Questions */}
          <div className="grid grid-cols-5 gap-2 overflow-y-auto max-h-96 pr-1">
            {exam.questions.map((_, i) => {
              const hasAnswer = !!exam.studentAnswers[i];
              const flagged = exam.flaggedQuestions.includes(i);
              const isCurrent = i === currentIndex;

              let styleClasses = 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800';
              if (isCurrent) {
                styleClasses = 'bg-blue-900 dark:bg-blue-600 text-white font-bold border-blue-900 dark:border-blue-500 ring-2 ring-blue-900/30 dark:ring-blue-500/30';
              } else if (flagged) {
                styleClasses = 'bg-amber-100 dark:bg-amber-950/80 border-amber-400 dark:border-amber-600 text-amber-900 dark:text-amber-300 font-bold';
              } else if (hasAnswer) {
                styleClasses = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-700 text-emerald-900 dark:text-emerald-300 font-semibold';
              }

              return (
                <button
                  key={i}
                  id={`nav-q-btn-${i + 1}`}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-9 rounded-lg border text-xs flex items-center justify-center relative transition-all ${styleClasses}`}
                  aria-label={`Question ${i + 1}${hasAnswer ? ', Answered' : ', Unanswered'}${flagged ? ', Flagged' : ''}`}
                >
                  <span>{i + 1}</span>
                  {flagged && (
                    <span className="absolute top-0.5 right-0.5 text-[8px] text-amber-700 dark:text-amber-400 font-bold">⚑</span>
                  )}
                  {hasAnswer && !isCurrent && !flagged && (
                    <span className="absolute bottom-0.5 right-1 text-[8px] text-emerald-700 dark:text-emerald-400 font-bold">✓</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Summary Counts */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex justify-between">
              <span>Answered:</span>
              <span className="font-bold text-slate-900 dark:text-white">{answeredCount} / 50</span>
            </div>
            <div className="flex justify-between">
              <span>Unanswered:</span>
              <span className="font-bold text-rose-700 dark:text-rose-400">{unansweredCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Flagged for review:</span>
              <span className="font-bold text-amber-700 dark:text-amber-400">{flaggedCount}</span>
            </div>
          </div>

          <button
            onClick={() => setShowConfirmModal(true)}
            className="mt-6 w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xs transition-colors"
          >
            Submit Examination
          </button>
        </div>
      </main>

      {/* Confirmation Modal before manual submit */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Confirm Exam Submission</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Are you sure you want to finish?</p>
              </div>
            </div>

            {/* Status breakdown */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Total Questions:</span>
                <span className="font-bold text-slate-900 dark:text-white">50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">Answered:</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">{answeredCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-rose-700 dark:text-rose-400 font-medium">Unanswered:</span>
                <span className="font-bold text-rose-700 dark:text-rose-400">{unansweredCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700 dark:text-amber-400 font-medium">Flagged for review:</span>
                <span className="font-bold text-amber-700 dark:text-amber-400">{flaggedCount}</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>
                  You have {unansweredCount} unanswered questions remaining. You can go back and answer them before submitting!
                </span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                id="exam-continue-btn"
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Continue Examination
              </button>
              <button
                id="exam-confirm-submit-btn"
                type="button"
                onClick={() => {
                  setShowConfirmModal(false);
                  handleFinalSubmit(false);
                }}
                className="px-5 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold text-sm shadow-sm transition-colors"
              >
                Submit Examination
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Guide Modal */}
      <KeyboardShortcutsModal
        isOpen={showShortcutsModal}
        onClose={() => setShowShortcutsModal(false)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode || (() => {})}
      />
    </div>
  );
};
