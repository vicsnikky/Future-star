import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  UserCheck,
  ShieldAlert,
  Search,
  Filter,
  RefreshCw,
  Award,
  BookOpen,
  Clock,
  CheckCircle2,
  XCircle,
  Download,
  ChevronRight,
  TrendingUp,
  Target,
  Trash2,
  X,
  ExternalLink,
  Sparkles,
  BarChart3,
  Calendar,
  Mail,
  User
} from 'lucide-react';
import { ExamAttempt, UserProfile, ExamMode } from '../types';
import { getAllExamAttempts, getAllRegisteredUsers, deleteExamAttempt } from '../services/dbService';
import { downloadExamResultPdf } from '../utils/pdfExport';
import { StudentProgressAnalytics } from './StudentProgressAnalytics';

interface AdminStudentProgressProps {
  onInspectExamResult?: (exam: ExamAttempt) => void;
}

export interface StudentDossier {
  key: string;
  id: string;
  name: string;
  email: string;
  isRegistered: boolean;
  registeredAt?: string;
  attempts: ExamAttempt[];
  completedCount: number;
  averagePercentage: number;
  highestPercentage: number;
  totalTimeSeconds: number;
  lastActiveDate: string;
  subjectsPracticed: ExamMode[];
  topicStats: Record<string, { total: number; correct: number; percentage: number }>;
}

export const AdminStudentProgress: React.FC<AdminStudentProgressProps> = ({
  onInspectExamResult,
}) => {
  const [loading, setLoading] = useState(true);
  const [allExams, setAllExams] = useState<ExamAttempt[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<UserProfile[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentDossier | null>(null);
  const [viewingAnalyticsStudent, setViewingAnalyticsStudent] = useState<StudentDossier | null>(null);
  const [inspectingAttempt, setInspectingAttempt] = useState<ExamAttempt | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'registered' | 'unregistered'>('all');
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'most_exams' | 'name'>('recent');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Load all exam attempts and registered users
  const loadData = async () => {
    setLoading(true);
    try {
      const [exams, users] = await Promise.all([
        getAllExamAttempts(),
        getAllRegisteredUsers(),
      ]);
      setAllExams(exams);
      setRegisteredUsers(users);
    } catch (err) {
      console.error('Failed to load admin student progress data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Aggregate exam attempts and registered users into unified dossiers
  const studentDossiers = useMemo(() => {
    const studentMap = new Map<string, StudentDossier>();

    // 1. Initialize dossiers for all registered students (even if they haven't taken an exam yet)
    registeredUsers.forEach(u => {
      // Skip pure admin accounts from student roster unless they practiced
      const key = `reg-${u.uid}`;
      studentMap.set(key, {
        key,
        id: u.uid,
        name: u.displayName || u.email.split('@')[0],
        email: u.email,
        isRegistered: true,
        registeredAt: u.createdAt,
        attempts: [],
        completedCount: 0,
        averagePercentage: 0,
        highestPercentage: 0,
        totalTimeSeconds: 0,
        lastActiveDate: u.createdAt || '',
        subjectsPracticed: [],
        topicStats: {},
      });
    });

    // 2. Associate exam attempts to students (match by studentId, or match guest candidates)
    allExams.forEach(exam => {
      const isRegisteredExam =
        exam.isRegistered ||
        registeredUsers.some(u => u.uid === exam.studentId || u.email.toLowerCase() === exam.studentEmail?.toLowerCase());

      let studentKey = '';
      if (isRegisteredExam) {
        // Find matching registered user
        const matchedUser = registeredUsers.find(
          u => u.uid === exam.studentId || u.email.toLowerCase() === exam.studentEmail?.toLowerCase()
        );
        if (matchedUser) {
          studentKey = `reg-${matchedUser.uid}`;
        } else {
          studentKey = `reg-${exam.studentId}`;
        }
      } else {
        // Group unregistered / guest students by studentName (normalized) or guest id
        const cleanName = (exam.studentName || 'Guest Candidate').trim().toLowerCase();
        studentKey = `guest-${cleanName}`;
      }

      if (!studentMap.has(studentKey)) {
        studentMap.set(studentKey, {
          key: studentKey,
          id: exam.studentId,
          name: exam.studentName || 'Unregistered Candidate',
          email: exam.studentEmail || 'Guest (No account)',
          isRegistered: false,
          attempts: [],
          completedCount: 0,
          averagePercentage: 0,
          highestPercentage: 0,
          totalTimeSeconds: 0,
          lastActiveDate: exam.submittedAt || exam.startTime || '',
          subjectsPracticed: [],
          topicStats: {},
        });
      }

      const dossier = studentMap.get(studentKey)!;
      dossier.attempts.push(exam);

      // Keep latest active date
      const examDate = exam.submittedAt || exam.startTime || '';
      if (examDate && (!dossier.lastActiveDate || new Date(examDate) > new Date(dossier.lastActiveDate))) {
        dossier.lastActiveDate = examDate;
      }
    });

    // 3. Calculate statistics for each student
    const resultList: StudentDossier[] = [];

    studentMap.forEach(dossier => {
      // Sort student's attempts descending
      dossier.attempts.sort(
        (a, b) => new Date(b.submittedAt || b.startTime).getTime() - new Date(a.submittedAt || a.startTime).getTime()
      );

      const completed = dossier.attempts.filter(a => a.status === 'completed');
      dossier.completedCount = completed.length;

      if (completed.length > 0) {
        const totalPct = completed.reduce((acc, curr) => acc + (curr.percentage || 0), 0);
        dossier.averagePercentage = Math.round(totalPct / completed.length);
        dossier.highestPercentage = Math.max(...completed.map(c => c.percentage || 0));
        dossier.totalTimeSeconds = completed.reduce((acc, curr) => acc + (curr.timeUsedSeconds || 0), 0);

        // Unique subjects practiced
        const subjs = new Set<ExamMode>();
        completed.forEach(c => subjs.add(c.subject));
        dossier.subjectsPracticed = Array.from(subjs);

        // Topic stats aggregation
        const topics: Record<string, { total: number; correct: number; percentage: number }> = {};
        completed.forEach(c => {
          if (c.topicBreakdown) {
            Object.entries(c.topicBreakdown).forEach(([topic, stat]) => {
              if (!topics[topic]) {
                topics[topic] = { total: 0, correct: 0, percentage: 0 };
              }
              topics[topic].total += stat.total;
              topics[topic].correct += stat.correct;
            });
          }
        });

        // Compute percentages
        Object.keys(topics).forEach(t => {
          topics[t].percentage = topics[t].total > 0 ? Math.round((topics[t].correct / topics[t].total) * 100) : 0;
        });

        dossier.topicStats = topics;
      }

      resultList.push(dossier);
    });

    return resultList;
  }, [allExams, registeredUsers]);

  // Apply filters and sorting
  const filteredStudents = useMemo(() => {
    return studentDossiers.filter(student => {
      // Filter by registered vs guest
      if (filterType === 'registered' && !student.isRegistered) return false;
      if (filterType === 'unregistered' && student.isRegistered) return false;

      // Filter by subject
      if (filterSubject !== 'all') {
        const hasPracticed = student.subjectsPracticed.includes(filterSubject as ExamMode);
        if (!hasPracticed) return false;
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = student.name.toLowerCase().includes(q);
        const matchesEmail = student.email.toLowerCase().includes(q);
        if (!matchesName && !matchesEmail) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.lastActiveDate || 0).getTime() - new Date(a.lastActiveDate || 0).getTime();
      }
      if (sortBy === 'highest') {
        return b.highestPercentage - a.highestPercentage;
      }
      if (sortBy === 'most_exams') {
        return b.completedCount - a.completedCount;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [studentDossiers, filterType, filterSubject, searchQuery, sortBy]);

  // Overall statistics
  const summaryStats = useMemo(() => {
    const totalRegistered = studentDossiers.filter(s => s.isRegistered).length;
    const totalUnregistered = studentDossiers.filter(s => !s.isRegistered).length;
    const totalExamsCompleted = allExams.filter(e => e.status === 'completed').length;
    const completedAttempts = allExams.filter(e => e.status === 'completed');
    const overallAvgScore = completedAttempts.length > 0
      ? Math.round(completedAttempts.reduce((acc, curr) => acc + (curr.percentage || 0), 0) / completedAttempts.length)
      : 0;

    return {
      totalRegistered,
      totalUnregistered,
      totalStudents: studentDossiers.length,
      totalExamsCompleted,
      overallAvgScore,
    };
  }, [studentDossiers, allExams]);

  // Delete an individual exam attempt
  const handleDeleteAttempt = async (attemptId: string) => {
    if (!window.confirm('Are you sure you want to remove this examination attempt?')) return;
    setDeletingId(attemptId);
    try {
      await deleteExamAttempt(attemptId);
      await loadData();
      if (selectedStudent) {
        setSelectedStudent(prev => {
          if (!prev) return null;
          const updatedAttempts = prev.attempts.filter(a => a.id !== attemptId);
          return {
            ...prev,
            attempts: updatedAttempts,
            completedCount: updatedAttempts.filter(a => a.status === 'completed').length,
          };
        });
      }
    } catch (err) {
      console.error('Failed to delete attempt:', err);
    } finally {
      setDeletingId(null);
    }
  };

  // Keep selected student synced when data changes
  useEffect(() => {
    if (selectedStudent) {
      const refreshed = studentDossiers.find(s => s.key === selectedStudent.key);
      if (refreshed) {
        setSelectedStudent(refreshed);
      }
    }
    if (viewingAnalyticsStudent) {
      const refreshed = studentDossiers.find(s => s.key === viewingAnalyticsStudent.key);
      if (refreshed) {
        setViewingAnalyticsStudent(refreshed);
      }
    }
  }, [studentDossiers]);

  // If admin is inspecting a student's full progress dashboard analytics
  if (viewingAnalyticsStudent) {
    return (
      <div className="space-y-6">
        {/* Navigation & Candidate Switcher Bar */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setViewingAnalyticsStudent(null)}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            &larr; Back to Candidate Roster
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0">
              Switch Candidate:
            </span>
            <select
              value={viewingAnalyticsStudent.key}
              onChange={(e) => {
                const found = studentDossiers.find(s => s.key === e.target.value);
                if (found) setViewingAnalyticsStudent(found);
              }}
              className="text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-900 cursor-pointer"
            >
              {studentDossiers.map(s => (
                <option key={s.key} value={s.key}>
                  {s.name} ({s.isRegistered ? 'Registered' : 'Guest'} • {s.completedCount} exams)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Full Interactive Progress & Analytics Dashboard */}
        <StudentProgressAnalytics
          examHistory={viewingAnalyticsStudent.attempts}
          candidateName={viewingAnalyticsStudent.name}
          candidateEmail={viewingAnalyticsStudent.email}
          isRegistered={viewingAnalyticsStudent.isRegistered}
          isAdminView={true}
          onBack={() => setViewingAnalyticsStudent(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner & Refresh */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Admin Student Progress Intelligence
            </span>
            <span className="text-xs text-slate-400">• Real-Time Firestore Sync</span>
          </div>
          <h2 className="text-2xl font-black mt-1 text-white">
            Student & Guest Practice Tracker
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Monitor mock exam scores, topic strengths, and progress for <strong>both registered students</strong> and <strong>candidates practicing as guests</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={loadData}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors border border-blue-700 disabled:opacity-50"
            title="Refresh student progress data from Firestore"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Refreshing...' : 'Refresh Records'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold">
            <span>Registered Students</span>
            <UserCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mt-2">
            {summaryStats.totalRegistered}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Accounts with login profile
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold">
            <span>Guest / Unregistered</span>
            <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mt-2">
            {summaryStats.totalUnregistered}
          </div>
          <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-1">
            Practiced without registering
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold">
            <span>Total Mock Tests</span>
            <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mt-2">
            {summaryStats.totalExamsCompleted}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Completed 50-Q mock exams
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold">
            <span>Platform Average</span>
            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mt-2">
            {summaryStats.overallAvgScore}%
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Grammar benchmark is 80%
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        {/* Registration Category Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3.5">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              filterType === 'all'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>All Candidates ({studentDossiers.length})</span>
          </button>

          <button
            onClick={() => setFilterType('registered')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              filterType === 'registered'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Registered Accounts ({summaryStats.totalRegistered})</span>
          </button>

          <button
            onClick={() => setFilterType('unregistered')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              filterType === 'unregistered'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Unregistered Guest Practice ({summaryStats.totalUnregistered})</span>
          </button>
        </div>

        {/* Search Bar & Dropdown Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search candidate by name, email, or guest id..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 focus:outline-hidden"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Subject Filter */}
          <div className="sm:col-span-3">
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-xs font-semibold focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 focus:outline-hidden"
            >
              <option value="all">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="English">English</option>
              <option value="Verbal Reasoning">Verbal Reasoning</option>
              <option value="Mixed">Mixed Subjects</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="sm:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-xs font-semibold focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 focus:outline-hidden"
            >
              <option value="recent">Sort: Most Recently Active</option>
              <option value="highest">Sort: Highest Average Score</option>
              <option value="most_exams">Sort: Most Exams Taken</option>
              <option value="name">Sort: Candidate Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student Roster Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-slate-100">
              Student Practice Roster ({filteredStudents.length} candidates found)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Click on any candidate to inspect their complete progress dossier, scores, and question reviews.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-900 dark:text-blue-400" />
            <p className="text-sm font-medium">Fetching registered students and guest attempts from database...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <Users className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No candidates match your filter</p>
            <p className="text-xs text-slate-400">
              Try changing your search terms or selecting "All Candidates".
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="py-3.5 px-4 sm:px-6">Candidate</th>
                  <th className="py-3.5 px-4">Account Status</th>
                  <th className="py-3.5 px-4 text-center">Exams Completed</th>
                  <th className="py-3.5 px-4 text-center">Average Score</th>
                  <th className="py-3.5 px-4 text-center">Highest Score</th>
                  <th className="py-3.5 px-4">Subjects Attempted</th>
                  <th className="py-3.5 px-4">Last Activity</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {filteredStudents.map((student) => {
                  const hasExams = student.completedCount > 0;
                  const isHighAchiever = student.averagePercentage >= 75;
                  const isModerate = student.averagePercentage >= 60 && student.averagePercentage < 75;

                  return (
                    <tr
                      key={student.key}
                      onClick={() => setSelectedStudent(student)}
                      className="hover:bg-blue-50/50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                    >
                      {/* Candidate Name & Email */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                              student.isRegistered
                                ? 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                                : 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                            }`}
                          >
                            {student.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 dark:text-slate-100 truncate text-sm">
                              {student.name}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
                              <Mail className="w-3 h-3 shrink-0" />
                              <span>{student.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Account Status Badge */}
                      <td className="py-3.5 px-4">
                        {student.isRegistered ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                            <UserCheck className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                            Registered Student
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                            <ShieldAlert className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                            Guest (Unregistered)
                          </span>
                        )}
                      </td>

                      {/* Completed Exams Count */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-black text-slate-900 dark:text-slate-100 text-sm">
                          {student.completedCount}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 ml-1">
                          {student.completedCount === 1 ? 'test' : 'tests'}
                        </span>
                      </td>

                      {/* Average Score */}
                      <td className="py-3.5 px-4 text-center">
                        {hasExams ? (
                          <div className="inline-flex items-center gap-1.5">
                            <span
                              className={`px-2 py-0.5 rounded-md font-bold text-xs ${
                                isHighAchiever
                                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                                  : isModerate
                                  ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                                  : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                              }`}
                            >
                              {student.averagePercentage}%
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs italic">No tests yet</span>
                        )}
                      </td>

                      {/* Highest Score */}
                      <td className="py-3.5 px-4 text-center">
                        {hasExams ? (
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {student.highestPercentage}%
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      {/* Subjects Attempted Badges */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {student.subjectsPracticed.length > 0 ? (
                            student.subjectsPracticed.map(s => (
                              <span
                                key={s}
                                className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                              >
                                {s}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400 text-[11px] italic">None</span>
                          )}
                        </div>
                      </td>

                      {/* Last Activity */}
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 text-[11px]">
                        {student.lastActiveDate ? (
                          <span>
                            {new Date(student.lastActiveDate).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setViewingAnalyticsStudent(student);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs inline-flex items-center gap-1 transition-colors shadow-xs cursor-pointer"
                            title={`Open progress dashboard & analytics for ${student.name}`}
                          >
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>Analytics</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStudent(student);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                            title={`Open candidate dossier for ${student.name}`}
                          >
                            <span>Dossier</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DETAILED STUDENT PROGRESS DOSSIER MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
          <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 sm:p-6 shrink-0 flex items-start justify-between border-b border-slate-800">
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shrink-0 ${
                    selectedStudent.isRegistered
                      ? 'bg-blue-600 text-white'
                      : 'bg-amber-600 text-white'
                  }`}
                >
                  {selectedStudent.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl font-black text-white">
                      {selectedStudent.name}
                    </h3>
                    {selectedStudent.isRegistered ? (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                        Registered Student Account
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                        Guest / Unregistered Practice
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-3 flex-wrap">
                    <span>Email: {selectedStudent.email}</span>
                    {selectedStudent.registeredAt && (
                      <span>• Registered: {new Date(selectedStudent.registeredAt).toLocaleDateString('en-GB')}</span>
                    )}
                    <span>• Candidate ID: {selectedStudent.id}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setViewingAnalyticsStudent(selectedStudent);
                    setSelectedStudent(null);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  title="Open full analytics dashboard with score graphs and subject breakdown"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Full Analytics</span>
                </button>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Close dossier"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1 text-slate-900 dark:text-slate-100">
              {/* Stats Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400" />
                    Exams Completed
                  </div>
                  <div className="text-2xl font-black mt-1.5 text-slate-900 dark:text-slate-100">
                    {selectedStudent.completedCount}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Total mock examinations
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Average Score
                  </div>
                  <div className="text-2xl font-black mt-1.5 text-slate-900 dark:text-slate-100">
                    {selectedStudent.averagePercentage}%
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Target: 80% Benchmark
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    Highest Result
                  </div>
                  <div className="text-2xl font-black mt-1.5 text-slate-900 dark:text-slate-100">
                    {selectedStudent.highestPercentage}%
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Personal best test score
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    Total Practice Time
                  </div>
                  <div className="text-2xl font-black mt-1.5 text-slate-900 dark:text-slate-100">
                    {Math.round(selectedStudent.totalTimeSeconds / 60)} mins
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Time spent in timed exams
                  </div>
                </div>
              </div>

              {/* Topic Mastery Strengths & Weaknesses */}
              {Object.keys(selectedStudent.topicStats).length > 0 && (
                <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                    Topic Accuracy & Diagnostic Breakdown
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {Object.entries(selectedStudent.topicStats).map(([topic, stat]) => {
                      const isStrong = stat.percentage >= 75;
                      const isWeak = stat.percentage < 60;
                      return (
                        <div
                          key={topic}
                          className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                        >
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-slate-100">{topic}</div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">
                              {stat.correct} / {stat.total} correct
                            </div>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-md font-black text-xs ${
                              isStrong
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                                : isWeak
                                ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300'
                                : 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                            }`}
                          >
                            {stat.percentage}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Complete Chronological Exam Attempts History */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                    Examination History ({selectedStudent.attempts.length} attempts recorded)
                  </h4>
                </div>

                {selectedStudent.attempts.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                    <BookOpen className="w-6 h-6 mx-auto text-slate-300 dark:text-slate-600 mb-1" />
                    <p className="text-xs font-semibold">No mock examinations recorded for this candidate yet.</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {selectedStudent.attempts.map((attempt, index) => {
                      const isCompleted = attempt.status === 'completed';
                      const timeMins = Math.floor((attempt.timeUsedSeconds || 0) / 60);
                      const timeSecs = (attempt.timeUsedSeconds || 0) % 60;

                      return (
                        <div
                          key={attempt.id}
                          className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                                #{selectedStudent.attempts.length - index} • {attempt.subject} Practice
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                                  isCompleted
                                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                                    : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                                }`}
                              >
                                {attempt.status}
                              </span>
                            </div>

                            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3 flex-wrap">
                              <span>
                                Date: {new Date(attempt.submittedAt || attempt.startTime).toLocaleString('en-GB')}
                              </span>
                              {isCompleted && (
                                <span>
                                  Duration: {timeMins}m {timeSecs}s / 40m
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            {isCompleted ? (
                              <div className="text-right">
                                <div className="text-lg font-black text-slate-900 dark:text-slate-100">
                                  {attempt.score} / {attempt.totalQuestions}
                                </div>
                                <div
                                  className={`text-xs font-bold ${
                                    (attempt.percentage || 0) >= 80
                                      ? 'text-emerald-600 dark:text-emerald-400'
                                      : (attempt.percentage || 0) >= 60
                                      ? 'text-blue-600 dark:text-blue-400'
                                      : 'text-amber-600 dark:text-amber-400'
                                  }`}
                                >
                                  {attempt.percentage}% Score
                                </div>
                              </div>
                            ) : (
                              <span className="text-xs text-amber-600 dark:text-amber-400 font-bold">
                                In Progress
                              </span>
                            )}

                            <div className="flex items-center gap-1.5 border-l border-slate-200 dark:border-slate-700 pl-3">
                              {/* Inspect Question Answers */}
                              <button
                                type="button"
                                onClick={() => setInspectingAttempt(attempt)}
                                className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-900 dark:text-blue-200 text-xs font-bold transition-colors"
                                title="Inspect student's answers & solutions"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>

                              {/* Download PDF Certificate */}
                              {isCompleted && (
                                <button
                                  type="button"
                                  onClick={() => downloadExamResultPdf(attempt)}
                                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
                                  title="Download official PDF report certificate"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </button>
                              )}

                              {/* Delete test attempt */}
                              <button
                                type="button"
                                disabled={deletingId === attempt.id}
                                onClick={() => handleDeleteAttempt(attempt.id)}
                                className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors disabled:opacity-50"
                                title="Delete this attempt"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 sm:px-6 py-3.5 sm:py-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end shrink-0">
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXAM INSPECTION & QUESTION-BY-QUESTION REVIEW MODAL */}
      {inspectingAttempt && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/80 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
          <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="bg-blue-950 text-white p-5 sm:p-6 shrink-0 flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                  Admin Exam Script Review • {inspectingAttempt.subject}
                </span>
                <h3 className="text-xl font-black mt-1">
                  {inspectingAttempt.studentName}'s Examination Script
                </h3>
                <p className="text-xs text-blue-200 mt-1">
                  Candidate Score: {inspectingAttempt.score} / {inspectingAttempt.totalQuestions} ({inspectingAttempt.percentage}%) • Date: {new Date(inspectingAttempt.submittedAt || inspectingAttempt.startTime).toLocaleString('en-GB')}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadExamResultPdf(inspectingAttempt)}
                  className="px-3 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-blue-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF Certificate</span>
                </button>
                <button
                  onClick={() => setInspectingAttempt(null)}
                  className="p-1.5 rounded-lg text-blue-300 hover:text-white hover:bg-blue-900 transition-colors"
                  aria-label="Close script review"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1 divide-y divide-slate-100 dark:divide-slate-800">
              {inspectingAttempt.questions.map((q, idx) => {
                const studentAns = inspectingAttempt.studentAnswers?.[idx];
                const isCorrect = studentAns === q.correctAnswer;
                const isUnanswered = studentAns === undefined;

                return (
                  <div key={q.id || idx} className="pt-4 first:pt-0 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                          Q{idx + 1}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {q.subject} • {q.topic} • {q.difficulty}
                        </span>
                      </div>

                      {/* Status indicator */}
                      <div>
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : isUnanswered ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            Unanswered
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300">
                            <XCircle className="w-3.5 h-3.5" /> Incorrect
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                      {q.questionText}
                    </p>

                    {/* Options list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt) => {
                        const isStudentChoice = studentAns === opt;
                        const isRightAnswer = q.correctAnswer === opt;

                        let optClass = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200';
                        if (isRightAnswer) {
                          optClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold';
                        } else if (isStudentChoice && !isRightAnswer) {
                          optClass = 'border-red-500 bg-red-50 dark:bg-red-950/50 text-red-900 dark:text-red-200 line-through';
                        }

                        return (
                          <div
                            key={opt}
                            className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${optClass}`}
                          >
                            <span>{opt}</span>
                            {isRightAnswer && (
                              <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400">
                                Correct Answer
                              </span>
                            )}
                            {isStudentChoice && !isRightAnswer && (
                              <span className="text-[10px] uppercase font-bold text-red-700 dark:text-red-400">
                                Student Answer
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {q.explanation && (
                      <div className="p-3 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200">
                        <span className="font-bold">Explanation / Model Solution: </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setInspectingAttempt(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
              >
                Close Script Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
