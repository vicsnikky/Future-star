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
  Send
} from 'lucide-react';
import { ExamAttempt, Question } from '../types';

interface ExamViewProps {
  exam: ExamAttempt;
  onUpdateExam: (updated: ExamAttempt) => void;
  onSubmitExam: (finalExam: ExamAttempt) => void;
}

export const ExamView: React.FC<ExamViewProps> = ({
  exam,
  onUpdateExam,
  onSubmitExam,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
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
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-blue-950 text-white shadow-md border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-800 flex items-center justify-center font-bold text-lg text-white">
              FS
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                {exam.subject} Examination
              </div>
              <h1 className="text-lg font-bold">
                Question {currentIndex + 1} of {exam.totalQuestions}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* 40-Minute Countdown Display */}
            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono font-bold text-base ${
              timeRemaining < 300
                ? 'bg-red-600 text-white animate-pulse'
                : timeRemaining < 600
                ? 'bg-amber-500 text-slate-900'
                : 'bg-blue-900/80 text-blue-100 border border-blue-700'
            }`}>
              <Clock className="w-4 h-4" />
              <span>Time Remaining: {formatTime(timeRemaining)}</span>
            </div>

            {/* Submit Button */}
            <button
              id="exam-header-submit-btn"
              onClick={() => setShowConfirmModal(true)}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xs transition-colors"
            >
              <Send className="w-4 h-4" />
              Submit Exam
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
        <div className="lg:col-span-3 flex flex-col justify-between bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
          <div>
            {/* Meta tags: Topic, Difficulty, Flag button */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-900">
                  {currentQ.subject}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                  Topic: {currentQ.topic}
                </span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                  currentQ.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800' :
                  currentQ.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {currentQ.difficulty}
                </span>
              </div>

              <button
                id="flag-question-toggle-btn"
                onClick={handleToggleFlag}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isFlagged
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-600 text-amber-600' : ''}`} />
                {isFlagged ? 'Flagged for Review' : 'Flag Question'}
              </button>
            </div>

            {/* Question Text */}
            <div className="mb-8">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Question {currentIndex + 1}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
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
                        ? 'border-blue-900 bg-blue-50/80 ring-2 ring-blue-900/20 text-blue-950 font-bold'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                      isSelected
                        ? 'bg-blue-900 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {optLetter}
                    </span>
                    <span className="text-base flex-1">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Nav Controls */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            <button
              id="exam-prev-question-btn"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
              className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold text-sm flex items-center gap-1.5 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="text-xs text-slate-500 font-medium">
              Candidate: <span className="font-bold text-slate-800">{exam.studentName}</span>
            </div>

            {currentIndex < exam.totalQuestions - 1 ? (
              <button
                id="exam-next-question-btn"
                onClick={() => setCurrentIndex(prev => prev + 1)}
                className="px-5 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm flex items-center gap-1.5 transition-colors"
              >
                Next
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
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
              Question Navigator (50)
            </h3>
          </div>

          {/* Legend - Complies with accessibility mandate: does not rely on colour alone */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-blue-900 border border-blue-900 inline-block" />
              <span>Current (Active)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-emerald-100 border border-emerald-500 text-emerald-800 flex items-center justify-center text-[9px] font-bold">✓</span>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-slate-100 border border-slate-300 inline-block" />
              <span>Unanswered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-amber-100 border border-amber-500 text-amber-800 flex items-center justify-center text-[9px] font-bold">⚑</span>
              <span>Flagged</span>
            </div>
          </div>

          {/* Grid of 50 Questions */}
          <div className="grid grid-cols-5 gap-2 overflow-y-auto max-h-96 pr-1">
            {exam.questions.map((_, i) => {
              const hasAnswer = !!exam.studentAnswers[i];
              const flagged = exam.flaggedQuestions.includes(i);
              const isCurrent = i === currentIndex;

              let styleClasses = 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100';
              if (isCurrent) {
                styleClasses = 'bg-blue-900 text-white font-bold border-blue-900 ring-2 ring-blue-900/30';
              } else if (flagged) {
                styleClasses = 'bg-amber-100 border-amber-400 text-amber-900 font-bold';
              } else if (hasAnswer) {
                styleClasses = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold';
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
                    <span className="absolute top-0.5 right-0.5 text-[8px] text-amber-700 font-bold">⚑</span>
                  )}
                  {hasAnswer && !isCurrent && !flagged && (
                    <span className="absolute bottom-0.5 right-1 text-[8px] text-emerald-700 font-bold">✓</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Summary Counts */}
          <div className="mt-6 pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Answered:</span>
              <span className="font-bold text-slate-900">{answeredCount} / 50</span>
            </div>
            <div className="flex justify-between">
              <span>Unanswered:</span>
              <span className="font-bold text-rose-700">{unansweredCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Flagged for review:</span>
              <span className="font-bold text-amber-700">{flaggedCount}</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Confirm Exam Submission</h3>
                <p className="text-xs text-slate-500">Are you sure you want to finish?</p>
              </div>
            </div>

            {/* Status breakdown */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Total Questions:</span>
                <span className="font-bold text-slate-900">50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700 font-medium">Answered:</span>
                <span className="font-bold text-emerald-700">{answeredCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-rose-700 font-medium">Unanswered:</span>
                <span className="font-bold text-rose-700">{unansweredCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700 font-medium">Flagged for review:</span>
                <span className="font-bold text-amber-700">{flaggedCount}</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
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
                className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50"
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
                className="px-5 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm shadow-sm transition-colors"
              >
                Submit Examination
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
