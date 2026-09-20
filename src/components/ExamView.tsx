import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Send,
  Keyboard,
  Moon,
  Sun,
  Coffee,
  Play,
  Pause
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

  const isMixedExam = exam.subject === 'Mixed' || exam.totalQuestions === 150;
  const totalAllowedSeconds = exam.durationMinutes * 60; // 90 * 60 = 5400 for Mixed, 2400 for single subjects

  // State-based exam countdown timer (freezes during breaks)
  const [timeRemaining, setTimeRemaining] = useState<number>(() => {
    if (exam.timeUsedSeconds !== undefined && exam.timeUsedSeconds > 0) {
      return Math.max(0, totalAllowedSeconds - exam.timeUsedSeconds);
    }
    return totalAllowedSeconds;
  });

  // Break state for 5-minute pauses between subjects in Mixed mode
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [breakSubjectCompleted, setBreakSubjectCompleted] = useState<'Mathematics' | 'English' | null>(null);
  const [breakNextSubject, setBreakNextSubject] = useState<'English' | 'Verbal Reasoning' | null>(null);
  const [breakTargetIndex, setBreakTargetIndex] = useState<number>(50);
  const [breakSecondsRemaining, setBreakSecondsRemaining] = useState<number>(300); // 5 mins = 300s
  const [break1Taken, setBreak1Taken] = useState(false);
  const [break2Taken, setBreak2Taken] = useState(false);

  // Section filter in question navigator for 150-question Mixed exam
  const [navigatorSection, setNavigatorSection] = useState<'all' | 'math' | 'eng' | 'vr'>('all');

  // Helper to determine subject of current question in Mixed mode
  const getCurrentSectionName = (index: number): string => {
    if (!isMixedExam) return `${exam.subject} Examination`;
    if (index < 50) return 'Mixed Examination • Section 1: Mathematics';
    if (index < 100) return 'Mixed Examination • Section 2: English';
    return 'Mixed Examination • Section 3: Verbal Reasoning';
  };

  // 1. Examination Timer Countdown (PAUSES completely when isBreakActive is true)
  useEffect(() => {
    if (isBreakActive) return; // Exam timer completely PAUSED during break!

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        const next = prev - 1;

        // Warnings at 10 minutes, 5 minutes, 1 minute
        if (next === 600) {
          setShowWarning('Attention: Exactly 10 minutes remaining in this examination.');
        } else if (next === 300) {
          setShowWarning('Warning: Exactly 5 minutes remaining. Please review your answers.');
        } else if (next === 60) {
          setShowWarning('Final Warning: 1 minute remaining! Auto-submission will execute at 00:00.');
        }

        if (next <= 0) {
          clearInterval(interval);
          handleFinalSubmit(true);
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreakActive, exam]);

  // 2. Break Timer Countdown (Runs only when isBreakActive is true)
  useEffect(() => {
    if (!isBreakActive) return;

    const breakInterval = setInterval(() => {
      setBreakSecondsRemaining(prev => {
        if (prev <= 1) {
          // 5-minute break expired: automatically resume exam timer
          handleResumeFromBreak();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(breakInterval);
  }, [isBreakActive, breakTargetIndex]);

  // Resume from 5-minute break immediately
  const handleResumeFromBreak = () => {
    setIsBreakActive(false);
    if (breakTargetIndex !== undefined && breakTargetIndex >= 0 && breakTargetIndex < exam.totalQuestions) {
      setCurrentIndex(breakTargetIndex);
    }
  };

  // Trigger a 5-minute subject break
  const triggerBreak = (
    completed: 'Mathematics' | 'English',
    next: 'English' | 'Verbal Reasoning',
    targetIdx: number,
    breakNum: 1 | 2
  ) => {
    setBreakSubjectCompleted(completed);
    setBreakNextSubject(next);
    setBreakTargetIndex(targetIdx);
    setBreakSecondsRemaining(300); // 5 mins
    if (breakNum === 1) setBreak1Taken(true);
    if (breakNum === 2) setBreak2Taken(true);
    setIsBreakActive(true);
  };

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

  const handleNextQuestion = () => {
    // Intercept section boundaries for 5-minute pause breaks in Mixed mode
    if (isMixedExam && currentIndex === 49 && !break1Taken) {
      triggerBreak('Mathematics', 'English', 50, 1);
      return;
    }
    if (isMixedExam && currentIndex === 99 && !break2Taken) {
      triggerBreak('English', 'Verbal Reasoning', 100, 2);
      return;
    }

    if (currentIndex < exam.totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowConfirmModal(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Keyboard Navigation & Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isBreakActive) return; // Ignore exam hotkeys while resting

      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      const keyUpper = e.key.toUpperCase();

      // Modal escape
      if (e.key === 'Escape') {
        setShowConfirmModal(false);
        setShowShortcutsModal(false);
        return;
      }

      // Help modal: ? or /
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setShowShortcutsModal(prev => !prev);
        return;
      }

      // Dark mode toggle: Shift + D
      if (e.shiftKey && keyUpper === 'D' && onToggleDarkMode) {
        e.preventDefault();
        onToggleDarkMode();
        return;
      }

      // Option Selection: A, B, C, D or 1, 2, 3, 4
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
        handleNextQuestion();
        return;
      }

      // Previous Question: ArrowLeft or K
      if (e.key === 'ArrowLeft' || keyUpper === 'K') {
        e.preventDefault();
        handlePrevQuestion();
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
  }, [currentIndex, currentQ, exam, isFlagged, showConfirmModal, showShortcutsModal, onToggleDarkMode, isBreakActive, break1Taken, break2Taken, isMixedExam]);

  const handleFinalSubmit = (forced = false) => {
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

    const totalQuestions = exam.questions.length || exam.totalQuestions || 50;
    const percentage = Math.round((correct / totalQuestions) * 100);
    const timeUsedSeconds = Math.max(0, totalAllowedSeconds - timeRemaining);

    const completedExam: ExamAttempt = {
      ...exam,
      status: 'completed',
      submittedAt: new Date().toISOString(),
      score: correct,
      percentage,
      correctCount: correct,
      incorrectCount: incorrect,
      unansweredCount: unanswered,
      timeUsedSeconds,
      topicBreakdown,
    };

    onSubmitExam(completedExam);
  };

  // Counts for review modal & navigator
  const answeredCount = Object.keys(exam.studentAnswers).filter(k => !!exam.studentAnswers[Number(k)]).length;
  const unansweredCount = exam.totalQuestions - answeredCount;
  const flaggedCount = exam.flaggedQuestions.length;

  // Question Navigator indices filtered by section
  const visibleNavigatorIndices = useMemo(() => {
    if (!isMixedExam || navigatorSection === 'all') {
      return exam.questions.map((_, i) => i);
    }
    if (navigatorSection === 'math') {
      return exam.questions.map((_, i) => i).filter(i => i < 50);
    }
    if (navigatorSection === 'eng') {
      return exam.questions.map((_, i) => i).filter(i => i >= 50 && i < 100);
    }
    return exam.questions.map((_, i) => i).filter(i => i >= 100);
  }, [exam.questions, navigatorSection, isMixedExam]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-blue-950 dark:bg-slate-900 text-white shadow-md border-b border-blue-900 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-800 dark:bg-blue-900 flex items-center justify-center font-bold text-lg text-white shrink-0">
              FS
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-300 dark:text-blue-400 flex items-center gap-2">
                <span>{getCurrentSectionName(currentIndex)}</span>
                {isMixedExam && (
                  <span className="hidden sm:inline-block px-2 py-0.2 rounded-full bg-blue-900 text-blue-200 text-[10px] font-bold">
                    150 Questions • 1h 30m
                  </span>
                )}
              </div>
              <h1 className="text-lg font-bold">
                Question {currentIndex + 1} of {exam.totalQuestions}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Optional Break Trigger button in Mixed Exam */}
            {isMixedExam && (!break1Taken || !break2Taken) && (
              <button
                type="button"
                id="exam-header-manual-break-btn"
                onClick={() => {
                  if (!break1Taken && currentIndex < 50) {
                    triggerBreak('Mathematics', 'English', 50, 1);
                  } else if (!break2Taken) {
                    triggerBreak('English', 'Verbal Reasoning', 100, 2);
                  }
                }}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-900/90 hover:bg-indigo-800 text-indigo-100 text-xs font-bold border border-indigo-700/80 transition-all shadow-xs"
                title="Pause the exam timer and take an optional 5-minute break"
              >
                <Coffee className="w-3.5 h-3.5 text-amber-300" />
                <span>Take 5m Break</span>
              </button>
            )}

            {/* Countdown Display */}
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono font-bold text-sm sm:text-base ${
                isBreakActive
                  ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300 animate-pulse'
                  : timeRemaining < 300
                  ? 'bg-red-600 text-white animate-pulse'
                  : timeRemaining < 600
                  ? 'bg-amber-500 text-slate-900'
                  : 'bg-blue-900/80 dark:bg-slate-800 text-blue-100 border border-blue-700 dark:border-slate-700'
              }`}
              title={isBreakActive ? 'Exam timer is paused' : 'Time remaining in exam'}
            >
              {isBreakActive ? <Pause className="w-4 h-4 text-slate-950" /> : <Clock className="w-4 h-4" />}
              <span>{formatTime(timeRemaining)}</span>
              {isBreakActive && <span className="text-[10px] uppercase font-sans font-black tracking-wider">PAUSED</span>}
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
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {currentQ.subject}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {currentQ.topic || 'General Knowledge'}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  currentQ.difficulty === 'Hard'
                    ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300'
                    : currentQ.difficulty === 'Medium'
                    ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300'
                    : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                }`}>
                  {currentQ.difficulty}
                </span>
              </div>

              {/* Flag Question for Review Toggle */}
              <button
                id="exam-flag-btn"
                onClick={handleToggleFlag}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isFlagged
                    ? 'bg-amber-500 text-slate-950 shadow-xs ring-2 ring-amber-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400'
                }`}
                title="Flag this question for later review (F)"
              >
                <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-current' : ''}`} />
                <span>{isFlagged ? 'Flagged' : 'Flag Question'}</span>
                <kbd className="hidden sm:inline px-1 py-0.2 bg-slate-200 dark:bg-slate-700 rounded text-[9px]">F</kbd>
              </button>
            </div>

            {/* Question Text */}
            <div className="mb-8">
              <div className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                Question {currentIndex + 1} of {exam.totalQuestions}
              </div>
              <h2 className="text-lg sm:text-xl font-bold leading-relaxed text-slate-900 dark:text-slate-100">
                {currentQ.questionText}
              </h2>
            </div>

            {/* Answer Options Grid */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswer === opt;
                const letter = String.fromCharCode(65 + idx); // A, B, C, D

                return (
                  <button
                    key={idx}
                    id={`exam-opt-btn-${idx}`}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4 ${
                      isSelected
                        ? 'border-blue-900 dark:border-blue-500 bg-blue-50/80 dark:bg-blue-950/60 ring-2 ring-blue-900/30 dark:ring-blue-500/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-850 hover:bg-slate-50/60 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-blue-900 dark:bg-blue-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {letter}
                    </div>
                    <div className="text-sm font-medium text-slate-800 dark:text-slate-200 pt-0.5 leading-snug">
                      {opt}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Section Boundary Prompt Banner on Q50 & Q100 in Mixed Exam */}
            {isMixedExam && currentIndex === 49 && !break1Taken && (
              <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-slate-100">
                      You are completing Section 1: Mathematics!
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400">
                      When you click Next, you can take a 5-minute break with the exam timer paused.
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => triggerBreak('Mathematics', 'English', 50, 1)}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shrink-0 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Coffee className="w-3.5 h-3.5" />
                  Take 5m Break Now
                </button>
              </div>
            )}

            {isMixedExam && currentIndex === 99 && !break2Taken && (
              <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-slate-100">
                      You are completing Section 2: English!
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400">
                      When you click Next, you can take a 5-minute break with the exam timer paused before Verbal Reasoning.
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => triggerBreak('English', 'Verbal Reasoning', 100, 2)}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shrink-0 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Coffee className="w-3.5 h-3.5" />
                  Take 5m Break Now
                </button>
              </div>
            )}
          </div>

          {/* Navigation Controls: Previous / Next / Review */}
          <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6 mt-8">
            <button
              id="exam-prev-btn"
              onClick={handlePrevQuestion}
              disabled={currentIndex === 0}
              className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                  : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="text-xs text-slate-400 font-medium hidden sm:block">
              Use arrow keys <kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px]">←</kbd>{' '}
              <kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px]">→</kbd> to navigate
            </div>

            {currentIndex < exam.totalQuestions - 1 ? (
              <button
                id="exam-next-btn"
                onClick={handleNextQuestion}
                className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors shadow-xs"
              >
                <span>
                  {isMixedExam && (currentIndex === 49 || currentIndex === 99)
                    ? 'Complete Section & Next'
                    : 'Next Question'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="exam-review-submit-btn"
                onClick={() => setShowConfirmModal(true)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors shadow-xs"
              >
                <span>Review & Finish</span>
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right 1 Column: Question Navigation Grid */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 flex flex-col transition-colors">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Question Navigator ({exam.totalQuestions})
            </h3>
          </div>

          {/* Section Filter Pills for Mixed 150-Question Exam */}
          {isMixedExam && (
            <div className="grid grid-cols-2 gap-1.5 mb-3 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setNavigatorSection('all')}
                className={`py-1 rounded-lg text-[10px] font-bold text-center transition-all ${
                  navigatorSection === 'all'
                    ? 'bg-blue-900 dark:bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                All (150)
              </button>
              <button
                type="button"
                onClick={() => setNavigatorSection('math')}
                className={`py-1 rounded-lg text-[10px] font-bold text-center transition-all ${
                  navigatorSection === 'math'
                    ? 'bg-blue-900 dark:bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Maths (1-50)
              </button>
              <button
                type="button"
                onClick={() => setNavigatorSection('eng')}
                className={`py-1 rounded-lg text-[10px] font-bold text-center transition-all ${
                  navigatorSection === 'eng'
                    ? 'bg-blue-900 dark:bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                English (51-100)
              </button>
              <button
                type="button"
                onClick={() => setNavigatorSection('vr')}
                className={`py-1 rounded-lg text-[10px] font-bold text-center transition-all ${
                  navigatorSection === 'vr'
                    ? 'bg-blue-900 dark:bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                VR (101-150)
              </button>
            </div>
          )}

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
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

          {/* Grid of Questions */}
          <div className="grid grid-cols-5 gap-2 overflow-y-auto max-h-96 pr-1">
            {visibleNavigatorIndices.map((i) => {
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
              <span className="font-bold text-slate-900 dark:text-white">{answeredCount} / {exam.totalQuestions}</span>
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

      {/* 5-MINUTE SUBJECT BREAK MODAL WITH TIMER PAUSE & RESUME */}
      {isBreakActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-blue-200 dark:border-blue-900 overflow-hidden text-center p-6 sm:p-8 space-y-6">
            {/* Break Icon & Badge */}
            <div className="space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 mx-auto flex items-center justify-center shadow-inner">
                <Coffee className="w-8 h-8" />
              </div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300/60">
                5-Minute Subject Rest Interval
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                Section Complete: {breakSubjectCompleted}!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                Fantastic job completing the 50 questions in {breakSubjectCompleted}. Up next is <strong>{breakNextSubject}</strong>.
              </p>
            </div>

            {/* Timer Paused Banner & Live 5:00 Break Clock */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 text-xs font-bold">
                <Pause className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
                <span>Examination Timer Paused (Exam clock is frozen)</span>
              </div>

              <div className="text-4xl sm:text-5xl font-mono font-black text-amber-700 dark:text-amber-400 tracking-wider">
                {formatTime(breakSecondsRemaining)}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Break auto-advances to {breakNextSubject} when timer expires.
              </p>
            </div>

            {/* Quick Rest Tips */}
            <div className="grid grid-cols-3 gap-2.5 text-left text-xs">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50">
                <div className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1 mb-1">
                  💧 Hydrate
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  Drink some water to refresh your brain.
                </div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50">
                <div className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1 mb-1">
                  🧘 Stretch
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  Rest your eyes and stretch your shoulders.
                </div>
              </div>
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50">
                <div className="font-bold text-purple-900 dark:text-purple-300 flex items-center gap-1 mb-1">
                  🧠 Reset
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  Take three slow, deep breaths.
                </div>
              </div>
            </div>

            {/* Action Buttons: Continue to Resume Exam Timer */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                id="break-resume-btn"
                onClick={handleResumeFromBreak}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Continue to {breakNextSubject} (Resume Exam Timer)</span>
              </button>

              <button
                type="button"
                onClick={handleResumeFromBreak}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors py-1 cursor-pointer"
              >
                Skip remaining break time and begin immediately &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal before manual submit */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Submit Examination?</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Review your completion before final scoring.</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Total Questions:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{exam.totalQuestions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Answered Questions:</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">{answeredCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Unanswered Questions:</span>
                <span className="font-bold text-rose-700 dark:text-rose-400">{unansweredCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Flagged Questions:</span>
                <span className="font-bold text-amber-700 dark:text-amber-400">{flaggedCount}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2">
                <span className="text-slate-600 dark:text-slate-400">Time Remaining:</span>
                <span className="font-bold font-mono text-blue-900 dark:text-blue-400">{formatTime(timeRemaining)}</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>You still have {unansweredCount} unanswered questions. Unanswered questions receive 0 marks.</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Keep Reviewing
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmModal(false);
                  handleFinalSubmit(false);
                }}
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors"
              >
                Yes, Submit Exam
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
