import React, { useState, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  BookOpen,
  TrendingUp,
  Award,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  ChevronRight,
  Target,
  BarChart3,
  ArrowUpRight
} from 'lucide-react';
import { ExamAttempt, UserProfile, ExamMode } from '../types';
import { StudentProgressAnalytics } from './StudentProgressAnalytics';

interface StudentDashboardProps {
  user: UserProfile;
  examHistory: ExamAttempt[];
  activeTab?: 'practice' | 'progress';
  onTabChange?: (tab: 'practice' | 'progress') => void;
  onStartExam: (mode: ExamMode) => void;
  onViewResult: (exam: ExamAttempt) => void;
  onOpenMistakes: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  examHistory,
  activeTab: externalTab,
  onTabChange,
  onStartExam,
  onViewResult,
  onOpenMistakes,
}) => {
  const [internalTab, setInternalTab] = useState<'practice' | 'progress'>('practice');
  const activeTab = externalTab !== undefined ? externalTab : internalTab;

  const handleSetTab = (tab: 'practice' | 'progress') => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalTab(tab);
    }
  };

  const completedCount = examHistory.length;

  const totalAttemptedQuestions = examHistory.reduce((acc, curr) => acc + curr.totalQuestions, 0);
  const totalCorrectQuestions = examHistory.reduce((acc, curr) => acc + (curr.correctCount || 0), 0);

  const averagePercentage = completedCount > 0
    ? Math.round(examHistory.reduce((acc, curr) => acc + (curr.percentage || 0), 0) / completedCount)
    : 0;

  const highestScore = completedCount > 0
    ? Math.max(...examHistory.map(e => e.score || 0))
    : 0;

  const recentExam = examHistory[0];

  // Weak area identification from history
  const topicStats: Record<string, { total: number; correct: number }> = {};
  examHistory.forEach(e => {
    if (e.topicBreakdown) {
      Object.entries(e.topicBreakdown).forEach(([t, d]) => {
        if (!topicStats[t]) topicStats[t] = { total: 0, correct: 0 };
        topicStats[t].total += d.total;
        topicStats[t].correct += d.correct;
      });
    }
  });

  const weakTopics = Object.entries(topicStats)
    .map(([topic, data]) => ({
      topic,
      percentage: Math.round((data.correct / (data.total || 1)) * 100),
      total: data.total
    }))
    .filter(t => t.total >= 3 && t.percentage < 65)
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome & Primary Actions Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800 text-blue-200 text-xs font-bold uppercase tracking-wider mb-4">
            Candidate Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Welcome, {user.displayName}!
          </h1>
          <p className="mt-3 text-blue-100 text-base leading-relaxed">
            Ready to test your knowledge under real UK 11+ conditions? Complete a 50-question timed examination or review your past attempts.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              id="student-dash-start-math-btn"
              onClick={() => onStartExam('Mathematics')}
              className="px-5 py-3 rounded-xl bg-white text-blue-950 font-bold text-sm hover:bg-blue-50 shadow-xs flex items-center gap-2 transition-all"
            >
              <Play className="w-4 h-4 fill-blue-950" />
              Start Maths (50 Qs)
            </button>
            <button
              id="student-dash-start-mixed-btn"
              onClick={() => onStartExam('Mixed')}
              className="px-5 py-3 rounded-xl bg-blue-800/80 hover:bg-blue-800 text-white font-bold text-sm border border-blue-700 flex items-center gap-2 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              Start Mixed Practice
            </button>
            <button
              id="student-dash-review-mistakes-btn"
              onClick={onOpenMistakes}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-xs transition-all"
            >
              <Target className="w-4 h-4" />
              My Mistakes
            </button>
            <button
              id="student-dash-view-progress-btn"
              onClick={() => handleSetTab('progress')}
              className="px-5 py-3 rounded-xl bg-indigo-900/80 hover:bg-indigo-800 text-white font-bold text-sm border border-indigo-700/80 flex items-center gap-2 shadow-xs transition-all"
            >
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Progress & Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          onClick={() => handleSetTab('progress')}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer group"
          title="Click to view progress analytics"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold uppercase">Exams Completed</span>
            <FileText className="w-4 h-4 text-blue-900 dark:text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-slate-100 mt-2">{completedCount}</div>
          <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
            <span>Timed 40-min exams</span>
            <span className="text-[10px] text-blue-700 dark:text-blue-400 font-semibold group-hover:underline">Analytics &rarr;</span>
          </div>
        </div>

        <div
          onClick={() => handleSetTab('progress')}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-500 transition-all cursor-pointer group"
          title="Click to view progress analytics"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold uppercase">Average Score</span>
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-slate-100 mt-2">{averagePercentage}%</div>
          <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
            <span>Overall percentage</span>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold group-hover:underline">Trends &rarr;</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold uppercase">Highest Score</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-slate-100 mt-2">
            {highestScore} <span className="text-sm font-normal text-slate-400">/ 50</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">Personal record</div>
        </div>

        <div
          onClick={() => handleSetTab('progress')}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer group"
          title="Click to view topic breakdown"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold uppercase">Questions Mastered</span>
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-slate-100 mt-2">{totalCorrectQuestions}</div>
          <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
            <span>out of {totalAttemptedQuestions} answered</span>
            <span className="text-[10px] text-blue-700 dark:text-blue-400 font-semibold group-hover:underline">Mastery &rarr;</span>
          </div>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          id="tab-student-practice"
          onClick={() => handleSetTab('practice')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activeTab === 'practice'
              ? 'bg-blue-900 dark:bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Practice & Examinations
        </button>
        <button
          id="tab-student-progress"
          onClick={() => handleSetTab('progress')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activeTab === 'progress'
              ? 'bg-blue-900 dark:bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          Progress & Data Visualizations
          {completedCount > 0 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 font-black ml-1">
              Live Charts
            </span>
          )}
        </button>
      </div>

      {/* Conditionally Render Active Tab Content */}
      {activeTab === 'progress' ? (
        <StudentProgressAnalytics
          examHistory={examHistory}
          onStartExam={onStartExam}
        />
      ) : (
        <div className="space-y-8">

      {/* Weak Areas Recommendation Card */}
      {weakTopics.length > 0 && (
        <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Recommended Adaptive Practice</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Our analysis shows you have room for improvement in:{' '}
                {weakTopics.map(w => `${w.topic} (${w.percentage}%)`).join(', ')}.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenMistakes}
            className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 transition-colors"
          >
            Review Weak Topics
          </button>
        </div>
      )}

      {/* Subject Practice Cards */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">Start Subject Practice</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-bold flex items-center justify-center text-sm mb-4">
                123
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Mathematics</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Fractions, Decimals, Percentages, Algebra, Ratio, Geometry & Word Problems.
              </p>
            </div>
            <button
              onClick={() => onStartExam('Mathematics')}
              className="mt-6 w-full py-2.5 rounded-lg bg-blue-900 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors"
            >
              Start Maths Exam <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 font-bold flex items-center justify-center text-sm mb-4">
                ABC
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">English</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Grammar, Vocabulary, Spelling, Punctuation, Synonyms, and Comprehension.
              </p>
            </div>
            <button
              onClick={() => onStartExam('English')}
              className="mt-6 w-full py-2.5 rounded-lg bg-blue-900 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors"
            >
              Start English Exam <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-300 font-bold flex items-center justify-center text-sm mb-4">
                VR
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Verbal Reasoning</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Sequences, Codes, Analogies, Odd One Out, Hidden Words & Logic Patterns.
              </p>
            </div>
            <button
              onClick={() => onStartExam('Verbal Reasoning')}
              className="mt-6 w-full py-2.5 rounded-lg bg-blue-900 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors"
            >
              Start Verbal Reasoning <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Examinations History */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">Recent Examination Attempts</h2>
        {examHistory.length === 0 ? (
          <div className="text-center py-10 text-slate-500 dark:text-slate-400">
            <BookOpen className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <p className="font-medium text-slate-700 dark:text-slate-300">No examination attempts yet.</p>
            <p className="text-xs text-slate-400 mt-1">Select a subject above to begin your first 40-minute practice test.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-850 border-y border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Percentage</th>
                  <th className="px-4 py-3">Time Used</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {examHistory.map((ex) => {
                  const mins = Math.floor((ex.timeUsedSeconds || 0) / 60);
                  const secs = (ex.timeUsedSeconds || 0) % 60;
                  return (
                    <tr key={ex.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-slate-100">{ex.subject}</td>
                      <td className="px-4 py-3.5 text-xs text-slate-500 dark:text-slate-400">
                        {new Date(ex.submittedAt || ex.startTime).toLocaleString('en-GB')}
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-slate-800 dark:text-slate-200">
                        {ex.score} / {ex.totalQuestions}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          (ex.percentage || 0) >= 70 ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' :
                          (ex.percentage || 0) >= 50 ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300' : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                        }`}>
                          {ex.percentage}%
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-500 dark:text-slate-400">
                        {mins}m {secs}s
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={() => onViewResult(ex)}
                          className="px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
                        >
                          View Results & Solutions
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )}
</div>
  );
};
