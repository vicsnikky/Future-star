import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Cell
} from 'recharts';
import {
  TrendingUp,
  Target,
  Award,
  Zap,
  BarChart3,
  Calendar,
  CheckCircle2,
  BookOpen,
  ArrowUpRight,
  Info
} from 'lucide-react';
import { ExamAttempt } from '../types';

interface StudentProgressAnalyticsProps {
  examHistory: ExamAttempt[];
  onStartExam?: (subject: any) => void;
}

export const StudentProgressAnalytics: React.FC<StudentProgressAnalyticsProps> = ({
  examHistory,
  onStartExam
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [metricView, setMetricView] = useState<'score' | 'speed'>('score');

  // Filter history based on selected subject and sort chronologically (oldest to newest for trend)
  const filteredHistory = useMemo(() => {
    const list = selectedSubject === 'All'
      ? [...examHistory]
      : examHistory.filter(e => e.subject === selectedSubject);

    return list.sort((a, b) => {
      const timeA = new Date(a.submittedAt || a.startTime).getTime();
      const timeB = new Date(b.submittedAt || b.startTime).getTime();
      return timeA - timeB;
    });
  }, [examHistory, selectedSubject]);

  // Data for Score Progression Chart
  const progressionData = useMemo(() => {
    return filteredHistory.map((attempt, index) => {
      const dateObj = new Date(attempt.submittedAt || attempt.startTime);
      const formattedDate = dateObj.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short'
      });
      const avgSecondsPerQ = attempt.totalQuestions > 0
        ? Math.round((attempt.timeUsedSeconds || 0) / attempt.totalQuestions)
        : 0;

      return {
        attemptNumber: `Test #${index + 1}`,
        rawAttempt: index + 1,
        date: formattedDate,
        fullDate: dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
        subject: attempt.subject,
        percentage: attempt.percentage,
        score: attempt.score,
        totalQuestions: attempt.totalQuestions,
        timeMinutes: Math.round((attempt.timeUsedSeconds || 0) / 60),
        secondsPerQuestion: avgSecondsPerQ,
        targetBenchmark: 80 // Grammar school standard benchmark
      };
    });
  }, [filteredHistory]);

  // Subject Performance Comparisons
  const subjectBreakdown = useMemo(() => {
    const subjects = ['Mathematics', 'English', 'Verbal Reasoning'];
    return subjects.map(sub => {
      const attempts = examHistory.filter(e => e.subject === sub);
      if (attempts.length === 0) {
        return {
          subject: sub,
          attempts: 0,
          averagePercentage: 0,
          bestPercentage: 0,
          totalCorrect: 0,
          totalAnswered: 0
        };
      }
      const totalPct = attempts.reduce((acc, a) => acc + (a.percentage || 0), 0);
      const best = Math.max(...attempts.map(a => a.percentage || 0));
      const totalCorrect = attempts.reduce((acc, a) => acc + (a.correctCount || 0), 0);
      const totalAnswered = attempts.reduce((acc, a) => acc + a.totalQuestions, 0);

      return {
        subject: sub,
        attempts: attempts.length,
        averagePercentage: Math.round(totalPct / attempts.length),
        bestPercentage: best,
        totalCorrect,
        totalAnswered
      };
    });
  }, [examHistory]);

  // Topic Level Mastery Breakdown
  const topicMastery = useMemo(() => {
    const map: Record<string, { total: number; correct: number; subject: string }> = {};

    examHistory.forEach(exam => {
      if (exam.topicBreakdown) {
        Object.entries(exam.topicBreakdown).forEach(([topic, data]) => {
          if (!map[topic]) {
            map[topic] = { total: 0, correct: 0, subject: exam.subject };
          }
          map[topic].total += data.total;
          map[topic].correct += data.correct;
        });
      }
    });

    return Object.entries(map)
      .map(([topic, data]) => ({
        topic,
        subject: data.subject,
        total: data.total,
        correct: data.correct,
        accuracy: Math.round((data.correct / (data.total || 1)) * 100)
      }))
      .sort((a, b) => b.total - a.total);
  }, [examHistory]);

  // Strengths vs Focus Areas
  const strengths = useMemo(() => {
    return topicMastery
      .filter(t => t.total >= 4 && t.accuracy >= 75)
      .sort((a, b) => b.accuracy - a.accuracy)
      .slice(0, 4);
  }, [topicMastery]);

  const focusAreas = useMemo(() => {
    return topicMastery
      .filter(t => t.total >= 3 && t.accuracy < 70)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 4);
  }, [topicMastery]);

  // Overall progression summary delta
  const progressDelta = useMemo(() => {
    if (filteredHistory.length < 2) return null;
    const firstScore = filteredHistory[0].percentage || 0;
    const latestScore = filteredHistory[filteredHistory.length - 1].percentage || 0;
    return latestScore - firstScore;
  }, [filteredHistory]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-300">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Progress & Performance Analytics</h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Track candidate score trajectories, subject mastery, and target grammar school benchmarks over time.
            </p>
          </div>

          {/* Subject Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl flex-wrap">
            {['All', 'Mathematics', 'English', 'Verbal Reasoning'].map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedSubject === sub
                    ? 'bg-blue-900 dark:bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
                }`}
              >
                {sub === 'All' ? 'All Subjects' : sub}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* When no exam attempts exist yet */}
      {examHistory.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 p-12 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-300 rounded-2xl flex items-center justify-center mx-auto">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">Start Practicing to Build Your Progress Chart</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Complete your first 50-question 11+ practice exam in Mathematics, English, or Verbal Reasoning. Your score curves, speed metrics, and topic mastery will automatically plot here!
            </p>
          </div>
          {onStartExam && (
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => onStartExam('Mathematics')}
                className="px-4 py-2.5 rounded-xl bg-blue-900 dark:bg-blue-600 text-white font-bold text-xs hover:bg-blue-800 dark:hover:bg-blue-500 transition-colors shadow-xs"
              >
                Start First Practice Test
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Key Analytics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Total Tests</span>
                <Calendar className="w-4 h-4 text-blue-900 dark:text-blue-400" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">
                {filteredHistory.length}
                <span className="text-xs font-medium text-slate-400 ml-1.5">
                  ({selectedSubject === 'All' ? 'overall' : selectedSubject})
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {filteredHistory.reduce((acc, h) => acc + h.totalQuestions, 0)} questions attempted
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Latest Score</span>
                <Award className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2 flex items-baseline gap-2">
                <span>{filteredHistory[filteredHistory.length - 1]?.percentage || 0}%</span>
                {progressDelta !== null && (
                  <span className={`text-xs font-bold flex items-center ${progressDelta >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {progressDelta >= 0 ? `+${progressDelta}%` : `${progressDelta}%`}
                    <ArrowUpRight className={`w-3.5 h-3.5 ${progressDelta < 0 ? 'rotate-90' : ''}`} />
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {progressDelta !== null ? 'Overall score improvement' : 'First practice test recorded'}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Grammar Benchmark</span>
                <Target className="w-4 h-4 text-purple-700 dark:text-purple-400" />
              </div>
              <div className="text-2xl font-black text-purple-900 dark:text-purple-300 mt-2">80%</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Typical UK Grammar School pass standard
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Pace / Speed</span>
                <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">
                {filteredHistory.length > 0
                  ? Math.round(
                      filteredHistory.reduce((acc, h) => acc + (h.timeUsedSeconds || 0), 0) /
                      Math.max(1, filteredHistory.reduce((acc, h) => acc + h.totalQuestions, 0))
                    )
                  : 0}s
                <span className="text-xs font-normal text-slate-400 ml-1">/ question</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Target: 48s per question for 50 Qs in 40m
              </div>
            </div>
          </div>

          {/* Score Trajectory / Progression Chart */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="font-black text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                  Score Progression Over Time
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  See how scores climb across consecutive attempts compared to the 80% Grammar School benchmark.
                </p>
              </div>

              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg self-start sm:self-auto text-xs">
                <button
                  onClick={() => setMetricView('score')}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                    metricView === 'score' ? 'bg-white dark:bg-slate-900 text-blue-900 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Score Percentage (%)
                </button>
                <button
                  onClick={() => setMetricView('speed')}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                    metricView === 'speed' ? 'bg-white dark:bg-slate-900 text-blue-900 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Time / Speed (s)
                </button>
              </div>
            </div>

            {progressionData.length === 1 ? (
              <div className="p-4 mb-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-300 flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0" />
                <span>
                  <strong>Great start!</strong> You have completed 1 examination. As you complete more tests, this graph will show your upward trajectory and score improvements.
                </span>
              </div>
            ) : null}

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                {metricView === 'score' ? (
                  <AreaChart data={progressionData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="attemptNumber"
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 100]}
                      ticks={[0, 20, 40, 60, 80, 100]}
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      tickLine={false}
                      unit="%"
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-900 text-white p-3 rounded-xl text-xs shadow-xl border border-slate-800">
                              <div className="font-bold text-slate-200">{data.attemptNumber} • {data.subject}</div>
                              <div className="text-[10px] text-slate-400 mt-0.5">{data.fullDate}</div>
                              <div className="mt-2 text-sm font-black text-emerald-400">
                                {data.percentage}% ({data.score}/{data.totalQuestions} marks)
                              </div>
                              <div className="text-[10px] text-slate-300 mt-1">
                                Duration: {data.timeMinutes}m ({data.secondsPerQuestion}s/Q)
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <ReferenceLine
                      y={80}
                      stroke="#9333ea"
                      strokeDasharray="4 4"
                      strokeWidth={1.5}
                      label={{
                        value: 'Grammar Benchmark (80%)',
                        position: 'top',
                        fill: '#9333ea',
                        fontSize: 10,
                        fontWeight: 'bold'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="percentage"
                      name="Score Percentage"
                      stroke="#1e3a8a"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#scoreGradient)"
                      dot={{ r: 5, fill: '#1e3a8a', strokeWidth: 2, stroke: '#ffffff' }}
                      activeDot={{ r: 7, fill: '#2563eb' }}
                    />
                  </AreaChart>
                ) : (
                  <AreaChart data={progressionData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="speedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d97706" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#d97706" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="attemptNumber"
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      tickLine={false}
                      unit="s"
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-900 text-white p-3 rounded-xl text-xs shadow-xl border border-slate-800">
                              <div className="font-bold text-slate-200">{data.attemptNumber} • {data.subject}</div>
                              <div className="mt-1 text-sm font-black text-amber-400">
                                {data.secondsPerQuestion} seconds / question
                              </div>
                              <div className="text-[10px] text-slate-400 mt-0.5">
                                Total test time: {data.timeMinutes} minutes
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <ReferenceLine
                      y={48}
                      stroke="#10b981"
                      strokeDasharray="4 4"
                      strokeWidth={1.5}
                      label={{
                        value: 'Target Pace (48s/Q)',
                        position: 'top',
                        fill: '#10b981',
                        fontSize: 10,
                        fontWeight: 'bold'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="secondsPerQuestion"
                      name="Seconds per Question"
                      stroke="#d97706"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#speedGradient)"
                      dot={{ r: 5, fill: '#d97706', strokeWidth: 2, stroke: '#ffffff' }}
                      activeDot={{ r: 7, fill: '#f59e0b' }}
                    />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Subject Mastery Comparison & Topics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subject Mastery Comparison Chart */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-black text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                  Subject Mastery Comparison
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 mb-4">
                  Average accuracy percentage across each core 11+ discipline.
                </p>

                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subjectBreakdown} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} />
                      <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tick={{ fontSize: 11, fill: '#64748b' }} unit="%" tickLine={false} />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const d = payload[0].payload;
                            return (
                              <div className="bg-slate-900 text-white p-3 rounded-xl text-xs shadow-xl">
                                <div className="font-bold text-slate-200">{d.subject}</div>
                                <div className="mt-1 text-emerald-400 font-bold">Average: {d.averagePercentage}%</div>
                                <div className="text-slate-300 text-[10px]">Best Score: {d.bestPercentage}%</div>
                                <div className="text-slate-400 text-[10px] mt-0.5">Total attempts: {d.attempts}</div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <ReferenceLine y={80} stroke="#9333ea" strokeDasharray="3 3" />
                      <Bar dataKey="averagePercentage" radius={[6, 6, 0, 0]}>
                        {subjectBreakdown.map((entry, index) => {
                          const colors = ['#3b82f6', '#10b981', '#8b5cf6'];
                          return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                        })}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                {subjectBreakdown.map(sub => (
                  <div key={sub.subject} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 truncate">{sub.subject}</div>
                    <div className="text-base font-black text-slate-900 dark:text-slate-100 mt-0.5">
                      {sub.attempts > 0 ? `${sub.averagePercentage}%` : '—'}
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500">
                      {sub.attempts} {sub.attempts === 1 ? 'test' : 'tests'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Focus Areas */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-black text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Target className="w-4 h-4 text-purple-700 dark:text-purple-400" />
                  Topic Strengths & Recommended Focus
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 mb-4">
                  Granular breakdown of specific curriculum topics from your attempts.
                </p>

                {topicMastery.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 dark:text-slate-500 text-xs">
                    Complete more tests to unlock detailed topic-level analytics.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Strengths */}
                    {strengths.length > 0 && (
                      <div>
                        <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 mb-2">
                          <CheckCircle2 className="w-3.5 h-3.5" /> High Mastery Topics (≥75%)
                        </div>
                        <div className="space-y-2">
                          {strengths.map(t => (
                            <div key={t.topic} className="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 flex items-center justify-between">
                              <div>
                                <div className="text-xs font-bold text-slate-800 dark:text-slate-100">{t.topic}</div>
                                <div className="text-[10px] text-slate-500 dark:text-slate-400">{t.subject} • {t.correct}/{t.total} correct</div>
                              </div>
                              <div className="text-xs font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-900/50 px-2 py-0.5 rounded-md">
                                {t.accuracy}%
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Focus Areas */}
                    {focusAreas.length > 0 && (
                      <div>
                        <div className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 mb-2">
                          <Zap className="w-3.5 h-3.5" /> Priority Focus Topics (&lt;70%)
                        </div>
                        <div className="space-y-2">
                          {focusAreas.map(t => (
                            <div key={t.topic} className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 flex items-center justify-between">
                              <div>
                                <div className="text-xs font-bold text-slate-800 dark:text-slate-100">{t.topic}</div>
                                <div className="text-[10px] text-slate-500 dark:text-slate-400">{t.subject} • {t.correct}/{t.total} correct</div>
                              </div>
                              <div className="text-xs font-black text-amber-700 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-900/50 px-2 py-0.5 rounded-md">
                                {t.accuracy}%
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {strengths.length === 0 && focusAreas.length === 0 && (
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-slate-600 dark:text-slate-400 text-xs text-center">
                        Keep practicing to accumulate 3+ questions per topic for mastery tagging.
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>Hard Grammar School Standard</span>
                <span className="font-semibold text-blue-900 dark:text-blue-400">Updated in real-time</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
