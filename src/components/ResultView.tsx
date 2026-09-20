import React, { useState } from 'react';
import {
  Award,
  Download,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  RotateCcw,
  BookOpen,
  Filter,
  ChevronDown,
  ChevronUp,
  Share2,
  Home
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ExamAttempt } from '../types';
import { downloadExamResultPdf } from '../utils/pdfExport';

interface ResultViewProps {
  exam: ExamAttempt;
  onRetakeExam: () => void;
  onGoToDashboard: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  exam,
  onRetakeExam,
  onGoToDashboard,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'incorrect' | 'unanswered' | 'correct'>('incorrect');
  const [expandedSolutions, setExpandedSolutions] = useState<Record<number, boolean>>({});

  React.useEffect(() => {
    // If high score (>70%), launch celebratory confetti
    if ((exam.percentage || 0) >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [exam]);

  const toggleSolution = (idx: number) => {
    setExpandedSolutions(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleDownloadPdf = () => {
    downloadExamResultPdf(exam);
  };

  const timeMinutes = Math.floor((exam.timeUsedSeconds || 0) / 60);
  const timeSeconds = (exam.timeUsedSeconds || 0) % 60;

  // Filter questions according to student's inspection preference
  const filteredQuestions = exam.questions.map((q, idx) => ({ q, idx })).filter(({ q, idx }) => {
    const studentAns = exam.studentAnswers[idx];
    const isAnswered = !!studentAns;
    const isCorrect = isAnswered && studentAns.trim() === q.correctAnswer.trim();

    if (filterMode === 'correct') return isCorrect;
    if (filterMode === 'incorrect') return isAnswered && !isCorrect;
    if (filterMode === 'unanswered') return !isAnswered;
    return true; // 'all'
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top Navigation / Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            id="result-back-dashboard-btn"
            onClick={onGoToDashboard}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-300"
          >
            <Home className="w-4 h-4" />
            Return to Dashboard
          </button>

          <div className="flex items-center gap-3">
            <button
              id="result-download-pdf-top-btn"
              onClick={handleDownloadPdf}
              className="px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Result PDF
            </button>
            <button
              id="result-retake-btn"
              onClick={onRetakeExam}
              className="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Take Another Test
            </button>
          </div>
        </div>

        {/* Certificate / Score Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="bg-blue-950 text-white p-8 sm:p-10 text-center relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800 text-blue-200 text-xs font-bold uppercase tracking-wider mb-4">
              <Award className="w-4 h-4 text-amber-400" />
              FUTURE STARS • 11+ Examination Official Result
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              {exam.studentName}&apos;s Examination Result
            </h1>
            <p className="mt-2 text-blue-200 text-sm">
              {exam.subject} Practice • Completed on {new Date(exam.submittedAt || exam.startTime).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
              <div className="bg-blue-900/60 border border-blue-800 rounded-2xl p-4">
                <div className="text-xs text-blue-300 font-semibold uppercase">Total Score</div>
                <div className="text-3xl font-black text-white mt-1">
                  {exam.score} <span className="text-lg text-blue-300 font-normal">/ 50</span>
                </div>
              </div>

              <div className="bg-blue-900/60 border border-blue-800 rounded-2xl p-4">
                <div className="text-xs text-blue-300 font-semibold uppercase">Percentage</div>
                <div className="text-3xl font-black text-amber-300 mt-1">
                  {exam.percentage}%
                </div>
              </div>

              <div className="bg-blue-900/60 border border-blue-800 rounded-2xl p-4">
                <div className="text-xs text-blue-300 font-semibold uppercase">Time Taken</div>
                <div className="text-3xl font-black text-white mt-1">
                  {timeMinutes}m {timeSeconds}s
                </div>
                <div className="text-[10px] text-blue-300 mt-0.5">out of 40 mins</div>
              </div>

              <div className="bg-blue-900/60 border border-blue-800 rounded-2xl p-4">
                <div className="text-xs text-blue-300 font-semibold uppercase">Performance</div>
                <div className="text-xl font-black text-emerald-300 mt-2">
                  {(exam.percentage || 0) >= 80 ? 'Distinction' :
                   (exam.percentage || 0) >= 65 ? 'Grammar Standard' :
                   (exam.percentage || 0) >= 50 ? 'Satisfactory' : 'Needs Practice'}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 border-b border-slate-200 dark:border-slate-800 divide-x divide-slate-200 dark:divide-slate-800 bg-slate-50 dark:bg-slate-900/60 text-center py-4">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Correct Answers</span>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{exam.correctCount}</div>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Incorrect Answers</span>
              <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-0.5">{exam.incorrectCount}</div>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Unanswered Questions</span>
              <div className="text-2xl font-bold text-slate-600 dark:text-slate-400 mt-0.5">{exam.unansweredCount}</div>
            </div>
          </div>

          {/* Topic Performance Breakdown */}
          {exam.topicBreakdown && Object.keys(exam.topicBreakdown).length > 0 && (
            <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-900 dark:text-blue-400" />
                Topic Performance Breakdown & Mastery
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(exam.topicBreakdown).map(([topic, data]) => {
                  const pct = Math.round((data.correct / (data.total || 1)) * 100);
                  const isWeak = pct < 60;
                  return (
                    <div key={topic} className={`p-4 rounded-xl border ${isWeak ? 'bg-rose-50/50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50' : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'}`}>
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-slate-900 dark:text-slate-100">{topic}</span>
                        <span className={`font-black ${isWeak ? 'text-rose-700 dark:text-rose-400' : 'text-emerald-700 dark:text-emerald-400'}`}>{pct}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mt-2 overflow-hidden">
                        <div
                          className={`h-full ${isWeak ? 'bg-rose-500' : 'bg-emerald-500'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex justify-between">
                        <span>{data.correct} of {data.total} correct</span>
                        {isWeak && <span className="font-bold text-rose-600 dark:text-rose-400">Needs Focus</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Question Solutions & Explanations Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Detailed Solutions & Answer Key
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Review step-by-step solutions and learn from mistakes made during the exam.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <button
                onClick={() => setFilterMode('incorrect')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterMode === 'incorrect' ? 'bg-white dark:bg-slate-900 text-rose-700 dark:text-rose-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Incorrect ({exam.incorrectCount})
              </button>
              <button
                onClick={() => setFilterMode('unanswered')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterMode === 'unanswered' ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Unanswered ({exam.unansweredCount})
              </button>
              <button
                onClick={() => setFilterMode('correct')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterMode === 'correct' ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Correct ({exam.correctCount})
              </button>
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterMode === 'all' ? 'bg-white dark:bg-slate-900 text-blue-900 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                All (50)
              </button>
            </div>
          </div>

          {/* List of Review Questions */}
          <div className="mt-6 space-y-6">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <p className="font-semibold text-slate-800 dark:text-slate-200">No questions found for this filter.</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Excellent job! Select &quot;All&quot; to inspect all 50 questions.</p>
              </div>
            ) : (
              filteredQuestions.map(({ q, idx }) => {
                const studentAns = exam.studentAnswers[idx];
                const isAnswered = !!studentAns;
                const isCorrect = isAnswered && studentAns.trim() === q.correctAnswer.trim();
                const isExpanded = !!expandedSolutions[idx];

                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border p-5 sm:p-6 transition-all ${
                      isCorrect
                        ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20'
                        : isAnswered
                        ? 'border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/20'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                          isCorrect ? 'bg-emerald-600 text-white' : isAnswered ? 'bg-rose-600 text-white' : 'bg-slate-400 text-white'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                          {q.subject} • {q.topic}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/80 text-purple-900 dark:text-purple-300">
                          Hard Standard
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/50 px-2.5 py-1 rounded-md">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : isAnswered ? (
                          <span className="inline-flex items-center gap-1 text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/50 px-2.5 py-1 rounded-md">
                            <XCircle className="w-3.5 h-3.5" /> Incorrect
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                            <AlertCircle className="w-3.5 h-3.5" /> Unanswered
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 text-base font-bold text-slate-900 dark:text-slate-100">
                      {q.questionText}
                    </div>

                    {/* Options list showing student selection vs correct answer */}
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      {q.options.map((opt, optIdx) => {
                        const optLetter = String.fromCharCode(65 + optIdx);
                        const isStudentChoice = studentAns === opt;
                        const isRightChoice = q.correctAnswer === opt;

                        let optClass = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200';
                        if (isRightChoice) {
                          optClass = 'border-emerald-500 bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200 font-bold ring-1 ring-emerald-500';
                        } else if (isStudentChoice && !isRightChoice) {
                          optClass = 'border-rose-400 bg-rose-100/70 dark:bg-rose-950/60 text-rose-950 dark:text-rose-200 font-bold line-through';
                        }

                        return (
                          <div key={optIdx} className={`p-3 rounded-xl border flex items-center justify-between text-xs ${optClass}`}>
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{optLetter}.</span>
                              <span>{opt}</span>
                            </div>
                            {isRightChoice && <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300">Correct Answer</span>}
                            {isStudentChoice && !isRightChoice && <span className="text-[10px] uppercase font-bold text-rose-800 dark:text-rose-300">Your Choice</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation & Step-by-Step Solution Accordion */}
                    <div className="mt-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                      <button
                        onClick={() => toggleSolution(idx)}
                        className="text-xs font-bold text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        {isExpanded ? 'Hide Step-by-Step Solution & Explanation' : 'View Step-by-Step Solution & Explanation'}
                      </button>

                      {isExpanded && (
                        <div className="mt-3 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs space-y-2 text-slate-800 dark:text-slate-200">
                          <div>
                            <span className="font-bold text-blue-950 dark:text-blue-300 block mb-0.5">Explanation:</span>
                            <p className="leading-relaxed text-slate-700 dark:text-slate-300">{q.explanation}</p>
                          </div>
                          {q.stepByStepSolution && (
                            <div className="pt-2 border-t border-blue-200/60 dark:border-blue-900/40">
                              <span className="font-bold text-blue-950 dark:text-blue-300 block mb-0.5">Detailed Working:</span>
                              <pre className="whitespace-pre-wrap font-sans leading-relaxed text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 p-3 rounded-lg border border-blue-100 dark:border-blue-950">
                                {q.stepByStepSolution}
                              </pre>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
