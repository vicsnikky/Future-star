import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, Sparkles, BookOpen, Clock, HelpCircle, Layers } from 'lucide-react';
import { SCHOOL_LEVEL_QUESTIONS } from '../data/questions/schoolLevelQuestions';
import { ALL_AQA_QUESTIONS, AQA_MODULAR_SETS } from '../data/questions/aqaQuestions';
import { Question } from '../types';

export type PracticeLevelType = 'KS3' | 'GCSE' | 'AQA' | 'A-Level';

interface SchoolLevelPracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLevel?: PracticeLevelType;
  defaultAqaSetId?: string;
  onBookTutoring?: (level: string) => void;
}

export const SchoolLevelPracticeModal: React.FC<SchoolLevelPracticeModalProps> = ({
  isOpen,
  onClose,
  defaultLevel = 'GCSE',
  defaultAqaSetId,
  onBookTutoring,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<PracticeLevelType>(defaultLevel);
  const [selectedAqaSetId, setSelectedAqaSetId] = useState<string>(defaultAqaSetId || 'all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (defaultLevel) {
      setSelectedLevel(defaultLevel);
    }
    if (defaultAqaSetId) {
      setSelectedAqaSetId(defaultAqaSetId);
    }
  }, [defaultLevel, defaultAqaSetId, isOpen]);

  if (!isOpen) return null;

  // Filter questions for the selected level and optional AQA set
  let questions: Question[] = [];
  if (selectedLevel === 'AQA') {
    if (selectedAqaSetId === 'all') {
      questions = ALL_AQA_QUESTIONS;
    } else {
      const targetSet = AQA_MODULAR_SETS.find((s) => s.id === selectedAqaSetId);
      questions = targetSet ? targetSet.questions : ALL_AQA_QUESTIONS;
    }
  } else {
    questions = SCHOOL_LEVEL_QUESTIONS.filter((q) =>
      q.tags?.some((t) => t.toUpperCase().includes(selectedLevel.toUpperCase()))
    );
  }

  const activeQuestion = questions[currentQuestionIndex] || questions[0];

  const handleSelectOption = (option: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));
  };

  const toggleExplanation = (idx: number) => {
    setShowExplanation((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setShowExplanation({});
    setCurrentQuestionIndex(0);
  };

  const handleLevelChange = (lvl: PracticeLevelType) => {
    setSelectedLevel(lvl);
    setSelectedAqaSetId('all');
    handleReset();
  };

  const handleAqaSetChange = (setId: string) => {
    setSelectedAqaSetId(setId);
    handleReset();
  };

  // Calculate score
  let score = 0;
  if (questions.length > 0) {
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });
  }
  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  const levelInfo = {
    KS3: {
      title: 'Key Stage 3 Secondary Diagnostic Checkpoint (Years 7–9)',
      standards: 'AQA & Edexcel Secondary Framework • Baseline Banding',
      badge: 'Secondary KS3',
    },
    GCSE: {
      title: 'GCSE Mini-Mock Challenge (Years 10–11)',
      standards: 'AQA 8300 / Edexcel 1MA1 • Target Grades 7, 8 & 9',
      badge: 'GCSE 9–1 Tier',
    },
    AQA: {
      title: 'AQA 8300 Mathematics Modular Mastery Bank (85 Questions)',
      standards: 'Official AQA 8300 Modular Sets: BIDMAS, Fractions, Percentages, Ratios & Full Paper',
      badge: 'AQA 8300 Modular',
    },
    'A-Level': {
      title: 'Sixth Form / A-Level Pure Mathematics & Admissions',
      standards: 'AQA 7357 / Edexcel 9MA0 • STEP / MAT Aligned',
      badge: 'GCE Advanced Level',
    },
  }[selectedLevel];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white border-b border-slate-800 shrink-0">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
                {levelInfo.badge}
              </span>
              <span className="text-xs text-slate-400 font-medium">British Curriculum Diagnostic</span>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-lg font-bold"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-black">{levelInfo.title}</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">{levelInfo.standards}</p>

          {/* Level Switcher Buttons inside the modal */}
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            {(['KS3', 'GCSE', 'AQA', 'A-Level'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => handleLevelChange(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {lvl === 'KS3'
                  ? 'Key Stage 3 (Y7–9)'
                  : lvl === 'GCSE'
                  ? 'GCSE (Y10–11)'
                  : lvl === 'AQA'
                  ? 'AQA 8300 (85 Qs)'
                  : 'A-Levels (Y12–13)'}
              </button>
            ))}
          </div>

          {/* Sub-selector when AQA is active */}
          {selectedLevel === 'AQA' && (
            <div className="mt-3 pt-3 border-t border-slate-800/80">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                Select AQA Modular Set:
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <button
                  type="button"
                  onClick={() => handleAqaSetChange('all')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedAqaSetId === 'all'
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  All Sets (85 Qs)
                </button>
                {AQA_MODULAR_SETS.map((set) => (
                  <button
                    key={set.id}
                    type="button"
                    onClick={() => handleAqaSetChange(set.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedAqaSetId === set.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {set.title.split(':')[0]} ({set.questionCount} Qs)
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {!isSubmitted ? (
            <>
              {/* Question Navigation Numbers */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </div>
                <div className="flex items-center gap-1.5 flex-wrap max-h-24 overflow-y-auto pr-1">
                  {questions.map((_, idx) => {
                    const answered = userAnswers[idx] !== undefined;
                    const isActive = currentQuestionIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-blue-900 dark:bg-blue-600 text-white ring-2 ring-blue-400'
                            : answered
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Question Display */}
              {activeQuestion ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/70 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                      {activeQuestion.topic}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {activeQuestion.subject} • AQA Specification
                    </span>
                  </div>

                  <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
                    {activeQuestion.questionText}
                  </p>

                  {/* 4 Distinct Multiple-Choice Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {activeQuestion.options.map((opt, oidx) => {
                      const isSelected = userAnswers[currentQuestionIndex] === opt;
                      return (
                        <button
                          key={oidx}
                          type="button"
                          onClick={() => handleSelectOption(opt)}
                          className={`p-3.5 rounded-xl border text-left text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${
                            isSelected
                              ? 'border-blue-900 dark:border-blue-500 bg-blue-50 dark:bg-blue-950/60 ring-2 ring-blue-900/20 text-blue-950 dark:text-blue-200 font-bold'
                              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/80 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-black shrink-0 ${
                              isSelected
                                ? 'bg-blue-900 dark:bg-blue-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {String.fromCharCode(65 + oidx)}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            /* Results & Step-by-Step Review */
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white text-center">
                <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-300">Diagnostic Result</div>
                <h3 className="text-3xl font-black mt-1">{percentage}%</h3>
                <p className="text-sm text-blue-200 mt-1">
                  You answered {score} out of {questions.length} questions correctly.
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 rounded-xl bg-white text-blue-950 text-xs font-bold hover:bg-blue-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retake Diagnostic
                  </button>
                  {onBookTutoring && (
                    <button
                      onClick={() => onBookTutoring(selectedLevel)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Book 1-on-1 Tutoring for {selectedLevel}
                    </button>
                  )}
                </div>
              </div>

              {/* In-Depth Explanations for all questions */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Question Review & Mark Scheme Solutions
                </h4>

                {questions.map((q, idx) => {
                  const candidateAnswer = userAnswers[idx];
                  const isCorrect = candidateAnswer === q.correctAnswer;

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                            Question {idx + 1} • {q.topic}
                          </span>
                          <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{q.questionText}</p>
                        </div>
                        {isCorrect ? (
                          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-bold shrink-0">
                            <CheckCircle2 className="w-4 h-4" /> Correct
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400 text-xs font-bold shrink-0">
                            <XCircle className="w-4 h-4" /> Incorrect
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div
                          className={`p-2.5 rounded-lg border ${
                            isCorrect
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200 font-bold'
                              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-900 dark:text-rose-200'
                          }`}
                        >
                          <span className="font-semibold block text-[10px] uppercase text-slate-500 dark:text-slate-400">
                            Your Choice
                          </span>
                          {candidateAnswer || 'Not answered'}
                        </div>
                        <div className="p-2.5 rounded-lg border bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200 font-bold">
                          <span className="font-semibold block text-[10px] uppercase text-emerald-700 dark:text-emerald-400">
                            Accredited Correct Answer
                          </span>
                          {q.correctAnswer}
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        <div className="font-bold text-slate-900 dark:text-slate-100 mb-1">Mark Scheme Solution:</div>
                        <div>{q.explanation}</div>
                        {q.stepByStepSolution && (
                          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 font-mono whitespace-pre-line">
                            {q.stepByStepSolution}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          {!isSubmitted ? (
            <>
              <button
                type="button"
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 cursor-pointer"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                    className="px-5 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    Next Question <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(true)}
                    className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-xs cursor-pointer"
                  >
                    Submit & View Marking
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold cursor-pointer"
              >
                Reset Diagnostic
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
