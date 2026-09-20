import React, { useState } from 'react';
import {
  Target,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BookOpen,
  Filter,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ExamAttempt, Question, SubjectType } from '../types';

interface MyMistakesProps {
  examHistory: ExamAttempt[];
  onBack: () => void;
  onPracticeMistakes: (questions: Question[]) => void;
}

export const MyMistakes: React.FC<MyMistakesProps> = ({
  examHistory,
  onBack,
  onPracticeMistakes,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | 'All'>('All');
  const [expandedIndices, setExpandedIndices] = useState<Record<string, boolean>>({});

  // Collect all mistakes from all completed attempts
  const allMistakes: { question: Question; studentAns: string; examDate: string; key: string }[] = [];
  const seenTexts = new Set<string>();

  examHistory.forEach((attempt) => {
    attempt.questions.forEach((q, idx) => {
      const ans = attempt.studentAnswers[idx];
      // If student answered incorrectly or left blank
      if (!ans || ans.trim() !== q.correctAnswer.trim()) {
        const key = `${q.questionText}-${ans}`;
        if (!seenTexts.has(q.questionText)) {
          seenTexts.add(q.questionText);
          allMistakes.push({
            question: q,
            studentAns: ans || 'Unanswered',
            examDate: attempt.submittedAt || attempt.startTime,
            key,
          });
        }
      }
    });
  });

  const filteredMistakes = allMistakes.filter(
    m => selectedSubject === 'All' || m.question.subject === selectedSubject
  );

  const toggleExpand = (k: string) => {
    setExpandedIndices(prev => ({ ...prev, [k]: !prev[k] }));
  };

  const mathMistakesCount = allMistakes.filter(m => m.question.subject === 'Mathematics').length;
  const englishMistakesCount = allMistakes.filter(m => m.question.subject === 'English').length;
  const vrMistakesCount = allMistakes.filter(m => m.question.subject === 'Verbal Reasoning').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-300 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </button>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Target className="w-6 h-6 text-rose-600 dark:text-rose-400" />
            My Mistakes Review & Practice
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Questions you previously answered incorrectly or left unanswered across all past examinations.
          </p>
        </div>

        {filteredMistakes.length > 0 && (
          <button
            id="practice-filtered-mistakes-btn"
            onClick={() => onPracticeMistakes(filteredMistakes.map(m => m.question))}
            className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Practise These Mistakes ({filteredMistakes.length})
          </button>
        )}
      </div>

      {/* Subject Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setSelectedSubject('All')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            selectedSubject === 'All'
              ? 'bg-blue-900 dark:bg-blue-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          All Subjects ({allMistakes.length})
        </button>
        <button
          onClick={() => setSelectedSubject('Mathematics')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            selectedSubject === 'Mathematics'
              ? 'bg-blue-900 dark:bg-blue-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Mathematics ({mathMistakesCount})
        </button>
        <button
          onClick={() => setSelectedSubject('English')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            selectedSubject === 'English'
              ? 'bg-blue-900 dark:bg-blue-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          English ({englishMistakesCount})
        </button>
        <button
          onClick={() => setSelectedSubject('Verbal Reasoning')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            selectedSubject === 'Verbal Reasoning'
              ? 'bg-blue-900 dark:bg-blue-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Verbal Reasoning ({vrMistakesCount})
        </button>
      </div>

      {/* List of Mistakes */}
      {filteredMistakes.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-500 dark:text-slate-400">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">No Recorded Mistakes!</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Either you haven&apos;t taken any examinations yet, or you got 100% on this subject!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMistakes.map(({ question: q, studentAns, examDate, key }) => {
            const isExpanded = !!expandedIndices[key];

            return (
              <div
                key={key}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300">
                      {q.subject}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {q.topic}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-900 dark:text-purple-300 border border-purple-200 dark:border-purple-800/80">
                      Hard Standard
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 dark:text-slate-500">
                    Exam on {new Date(examDate).toLocaleDateString('en-GB')}
                  </div>
                </div>

                <div className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
                  {q.questionText}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-300">
                    <span className="font-bold block text-[10px] uppercase text-rose-700 dark:text-rose-400">Your Answer:</span>
                    <span className="font-medium line-through">{studentAns}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-300">
                    <span className="font-bold block text-[10px] uppercase text-emerald-700 dark:text-emerald-400">Correct Answer:</span>
                    <span className="font-bold">{q.correctAnswer}</span>
                  </div>
                </div>

                {/* Explanation accordion */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => toggleExpand(key)}
                    className="text-xs font-bold text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                  >
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    {isExpanded ? 'Hide Solution' : 'View Correct Solution & Reasoning'}
                  </button>

                  {isExpanded && (
                    <div className="mt-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
                      <p><strong>Explanation:</strong> {q.explanation}</p>
                      {q.stepByStepSolution && (
                        <div className="pt-1.5 border-t border-slate-200 dark:border-slate-700">
                          <strong>Step-by-step Solution:</strong>
                          <pre className="whitespace-pre-wrap font-sans text-slate-600 dark:text-slate-300 mt-1">
                            {q.stepByStepSolution}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
