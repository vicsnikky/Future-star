import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import {
  UserProfile,
  ExamAttempt,
  Question,
  ExamMode,
  PdfDocument,
  ExamDifficultyConfig
} from './types';
import {
  ensureSeedQuestionsLoaded,
  getApprovedQuestions,
  getAllQuestionsForAdmin,
  saveExamAttempt,
  getActiveExam,
  getStudentExamHistory,
  getPdfDocuments,
  getExamConfig,
} from './services/dbService';
import { buildDynamic50Exam, shuffleArray } from './services/examEngine';
import { sanitizeQuestion, deduplicateQuestions, normalizeQuestionText } from './services/questionSanitizer';
import { SEED_QUESTIONS } from './data/seedQuestions';

// Components
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { ExamSetupModal } from './components/ExamSetupModal';
import { ExamView } from './components/ExamView';
import { ResultView } from './components/ResultView';
import { StudentDashboard } from './components/StudentDashboard';
import { MyMistakes } from './components/MyMistakes';
import { AdminDashboard } from './components/AdminDashboard';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import {
  BookOpen,
  LogOut,
  User,
  Shield,
  Home,
  Target,
  FileText,
  TrendingUp,
  Moon,
  Sun,
  Keyboard
} from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  // App views: 'landing' | 'student_dashboard' | 'admin_dashboard' | 'active_exam' | 'exam_result' | 'my_mistakes'
  const [currentView, setCurrentView] = useState<
    'landing' | 'student_dashboard' | 'admin_dashboard' | 'active_exam' | 'exam_result' | 'my_mistakes'
  >('landing');
  const [studentDashboardTab, setStudentDashboardTab] = useState<'practice' | 'progress'>('practice');

  // Dark mode state with persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fs_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [showGlobalShortcutsModal, setShowGlobalShortcutsModal] = useState(false);

  // Sync dark mode with html documentElement class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('fs_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('fs_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // Global Keyboard Shortcuts (Shift+D for Dark Mode, ? for shortcuts modal)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      // Shift+D -> Toggle theme
      if (e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        toggleDarkMode();
        return;
      }

      // ? -> Open Shortcuts Guide (when outside exam view, where ExamView manages its own modal)
      if (e.key === '?' && currentView !== 'active_exam') {
        e.preventDefault();
        setShowGlobalShortcutsModal(prev => !prev);
        return;
      }

      if (e.key === 'Escape' && showGlobalShortcutsModal) {
        setShowGlobalShortcutsModal(false);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [currentView, showGlobalShortcutsModal]);

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isExamSetupOpen, setIsExamSetupOpen] = useState(false);
  const [setupDefaultSubject, setSetupDefaultSubject] = useState<ExamMode>('Mathematics');

  // Examination State
  const [activeExam, setActiveExam] = useState<ExamAttempt | null>(null);
  const [selectedResultExam, setSelectedResultExam] = useState<ExamAttempt | null>(null);
  const [examHistory, setExamHistory] = useState<ExamAttempt[]>([]);

  // Admin Data
  const [adminQuestions, setAdminQuestions] = useState<Question[]>([]);
  const [pdfDocs, setPdfDocs] = useState<PdfDocument[]>([]);
  const [examConfig, setExamConfig] = useState<ExamDifficultyConfig>({
    easyCount: 0,
    mediumCount: 0,
    hardCount: 50,
    negativeMarking: false,
  });

  // 1. Initial auth & seed data setup
  useEffect(() => {
    async function initApp() {
      await ensureSeedQuestionsLoaded();
      const cfg = await getExamConfig();
      setExamConfig(cfg);

      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          try {
            const userRef = doc(db, 'users', firebaseUser.uid);
            const userSnap = await getDoc(userRef);
            let profile: UserProfile;
            const isDesignatedAdmin = firebaseUser.email?.toLowerCase().trim() === 'futurestarstutorial16@gmail.com' ||
                                      firebaseUser.email?.includes('admin');

            if (userSnap.exists()) {
              profile = userSnap.data() as UserProfile;
              if (isDesignatedAdmin && profile.role !== 'admin') {
                profile.role = 'admin';
              }
            } else {
              profile = {
                uid: firebaseUser.uid,
                email: firebaseUser.email || '',
                displayName: firebaseUser.displayName || (isDesignatedAdmin ? 'Future Stars Administrator' : 'Student'),
                role: isDesignatedAdmin ? 'admin' : 'student',
                createdAt: new Date().toISOString(),
              };
            }
            setCurrentUser(profile);

            // Check if there was an in-progress exam
            const inProgress = await getActiveExam(profile.uid);
            if (inProgress) {
              setActiveExam(inProgress);
              setCurrentView('active_exam');
            } else {
              if (profile.role === 'admin') {
                setCurrentView('admin_dashboard');
              } else {
                setCurrentView('student_dashboard');
              }
            }

            // Load history
            const hist = await getStudentExamHistory(profile.uid);
            setExamHistory(hist);
          } catch (e) {
            console.error('Error fetching user profile:', e);
          }
        }
        setAuthChecking(false);
      });

      return () => unsubscribe();
    }

    initApp();
  }, []);

  // Reload history or admin data when needed
  const loadUserData = async (uid: string) => {
    const hist = await getStudentExamHistory(uid);
    setExamHistory(hist);
  };

  const loadAdminData = async () => {
    const qs = await getAllQuestionsForAdmin();
    setAdminQuestions(qs);
    const pdfs = await getPdfDocuments();
    setPdfDocs(pdfs);
  };

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      loadAdminData();
    }
  }, [currentUser]);

  // Start Examination flow
  const handleStartExamFlow = async (candidateName: string, subject: ExamMode, candidateEmail?: string) => {
    setIsExamSetupOpen(false);

    // Fetch approved pool
    const approvedPool = await getApprovedQuestions(subject);
    const dynamicQuestions = buildDynamic50Exam(approvedPool, subject, examConfig);

    const isGuest = !currentUser;
    let guestUid = localStorage.getItem('fs_guest_uid');
    if (!guestUid) {
      guestUid = `guest-${Date.now()}`;
      localStorage.setItem('fs_guest_uid', guestUid);
    }

    const studentId = currentUser?.uid || guestUid;
    const cleanEmail =
      currentUser?.email ||
      candidateEmail ||
      `${candidateName.trim().toLowerCase().replace(/\s+/g, '.')}@guest.practice`;

    const isMixed = subject === 'Mixed';
    const totalQuestions = isMixed ? 150 : 50;
    const durationMinutes = isMixed ? 90 : 40; // 1 hour 30 minutes for Mixed (150 Qs), 40 minutes for single subject (50 Qs)

    const newExam: ExamAttempt = {
      id: `exam-${Date.now()}`,
      studentId,
      studentName: candidateName.trim(),
      studentEmail: cleanEmail,
      isRegistered: !isGuest,
      subject,
      startTime: new Date().toISOString(),
      durationMinutes,
      totalQuestions,
      questions: dynamicQuestions,
      studentAnswers: {},
      flaggedQuestions: [],
      status: 'in_progress',
    };

    setActiveExam(newExam);
    setCurrentView('active_exam');

    // Save to Firestore and local cache
    await saveExamAttempt(newExam);
  };

  // Exam in-progress auto-save
  const handleUpdateExam = async (updated: ExamAttempt) => {
    setActiveExam(updated);
    await saveExamAttempt(updated);
  };

  // Exam submission
  const handleSubmitExam = async (completedExam: ExamAttempt) => {
    setActiveExam(null);
    setSelectedResultExam(completedExam);
    setCurrentView('exam_result');

    await saveExamAttempt(completedExam);
    if (currentUser) {
      await loadUserData(currentUser.uid);
    } else {
      // Guest local history
      setExamHistory(prev => [completedExam, ...prev]);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Global Navigation when authenticated */}
      {currentUser && currentView !== 'active_exam' && (
        <nav className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentView(currentUser.role === 'admin' ? 'admin_dashboard' : 'student_dashboard')}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <img
                  src="https://i.ibb.co/9mXgHJMv/logo1.jpg"
                  alt="FUTURE STARS Logo"
                  className="w-10 h-10 rounded-xl object-contain bg-white shadow-xs border border-slate-200 dark:border-slate-700"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left">
                  <span className="font-extrabold text-lg tracking-tight text-blue-950 dark:text-blue-100 block">FUTURE STARS</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider block">11+ Examination Platform</span>
                </div>
              </button>

              <div className="hidden md:flex items-center gap-1 ml-6 border-l border-slate-200 dark:border-slate-800 pl-4">
                {currentUser.role === 'student' ? (
                  <>
                    <button
                      onClick={() => {
                        setStudentDashboardTab('practice');
                        setCurrentView('student_dashboard');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        currentView === 'student_dashboard' && studentDashboardTab === 'practice'
                          ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-900 dark:text-blue-300'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <Home className="w-3.5 h-3.5 inline mr-1" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        setStudentDashboardTab('progress');
                        setCurrentView('student_dashboard');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        currentView === 'student_dashboard' && studentDashboardTab === 'progress'
                          ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-900 dark:text-blue-300'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <TrendingUp className="w-3.5 h-3.5 inline mr-1 text-emerald-600 dark:text-emerald-400" />
                      Progress Analytics
                    </button>
                    <button
                      onClick={() => setCurrentView('my_mistakes')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        currentView === 'my_mistakes'
                          ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-900 dark:text-blue-300'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <Target className="w-3.5 h-3.5 inline mr-1" />
                      My Mistakes
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setCurrentView('admin_dashboard')}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 flex items-center gap-1"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Admin Curriculum & Question Bank
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Keyboard Shortcuts Trigger */}
              <button
                id="global-shortcuts-btn"
                onClick={() => setShowGlobalShortcutsModal(true)}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Keyboard Shortcuts Guide (?)"
                aria-label="View shortcuts guide"
              >
                <Keyboard className="w-4 h-4" />
              </button>

              {/* Dark Mode Toggle */}
              <button
                id="global-theme-toggle-btn"
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode (Shift+D)`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              </button>

              <button
                id="global-start-exam-header-btn"
                onClick={() => {
                  setSetupDefaultSubject('Mathematics');
                  setIsExamSetupOpen(true);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-blue-900 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition-colors"
              >
                New 50-Q Exam
              </button>

              <div className="flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-slate-800">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{currentUser.displayName}</div>
                  <div className="text-[10px] text-slate-400 capitalize">{currentUser.role}</div>
                </div>
                <button
                  id="sign-out-btn"
                  onClick={handleSignOut}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Views */}
      <div className="flex-1">
        {/* Landing View */}
        {currentView === 'landing' && (
          <LandingPage
            onStartPractising={() => {
              setSetupDefaultSubject('Mathematics');
              setIsExamSetupOpen(true);
            }}
            onLoginClick={() => setIsAuthModalOpen(true)}
            onSelectSubject={(subj) => {
              setSetupDefaultSubject(subj);
              setIsExamSetupOpen(true);
            }}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
            onOpenShortcuts={() => setShowGlobalShortcutsModal(true)}
          />
        )}

        {/* Student Dashboard */}
        {currentView === 'student_dashboard' && currentUser && (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <StudentDashboard
              user={currentUser}
              examHistory={examHistory}
              activeTab={studentDashboardTab}
              onTabChange={setStudentDashboardTab}
              onStartExam={(mode) => {
                setSetupDefaultSubject(mode);
                setIsExamSetupOpen(true);
              }}
              onViewResult={(ex) => {
                setSelectedResultExam(ex);
                setCurrentView('exam_result');
              }}
              onOpenMistakes={() => setCurrentView('my_mistakes')}
            />
          </main>
        )}

        {/* My Mistakes View */}
        {currentView === 'my_mistakes' && (
          <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <MyMistakes
              examHistory={examHistory}
              onBack={() => setCurrentView('student_dashboard')}
              onPracticeMistakes={(qs) => {
                // Launch custom practice with mistaken questions (deduplicated, no repeats)
                const candidateName = currentUser?.displayName || 'Student';
                const uniqueMistakes = deduplicateQuestions(qs);
                let practiceQuestions = uniqueMistakes;

                // If fewer than 25 questions, supplement with unique questions from SEED_QUESTIONS
                if (practiceQuestions.length < 25) {
                  const existingKeys = new Set(practiceQuestions.map(q => normalizeQuestionText(q.questionText)));
                  const availableSupplements = SEED_QUESTIONS.filter(q => !existingKeys.has(normalizeQuestionText(q.questionText)));
                  const extra = shuffleArray(availableSupplements).slice(0, 25 - practiceQuestions.length);
                  practiceQuestions = [...practiceQuestions, ...extra.map(sanitizeQuestion)];
                }

                const count = practiceQuestions.length;
                const newExam: ExamAttempt = {
                  id: `exam-mistakes-${Date.now()}`,
                  studentId: currentUser?.uid || 'student',
                  studentName: candidateName,
                  studentEmail: currentUser?.email || 'student@futurestars.edu',
                  subject: 'Mixed',
                  startTime: new Date().toISOString(),
                  durationMinutes: Math.max(15, Math.ceil(count * 0.8)),
                  totalQuestions: count,
                  questions: practiceQuestions,
                  studentAnswers: {},
                  flaggedQuestions: [],
                  status: 'in_progress',
                };
                setActiveExam(newExam);
                setCurrentView('active_exam');
              }}
            />
          </main>
        )}

        {/* Admin Dashboard */}
        {currentView === 'admin_dashboard' && (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AdminDashboard
              questions={adminQuestions}
              pdfDocs={pdfDocs}
              examConfig={examConfig}
              onRefreshData={loadAdminData}
              onViewExamResult={(exam) => {
                setSelectedResultExam(exam);
                setCurrentView('exam_result');
              }}
            />
          </main>
        )}

        {/* Active Timed Examination Interface */}
        {currentView === 'active_exam' && activeExam && (
          <ExamView
            exam={activeExam}
            onUpdateExam={handleUpdateExam}
            onSubmitExam={handleSubmitExam}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        )}

        {/* Exam Result & Detailed Solutions View */}
        {currentView === 'exam_result' && selectedResultExam && (
          <ResultView
            exam={selectedResultExam}
            onRetakeExam={() => {
              setSetupDefaultSubject(selectedResultExam.subject);
              setIsExamSetupOpen(true);
            }}
            onGoToDashboard={() => setCurrentView(currentUser ? 'student_dashboard' : 'landing')}
          />
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(profile) => {
          setCurrentUser(profile);
          if (profile.role === 'admin') {
            setCurrentView('admin_dashboard');
          } else {
            setCurrentView('student_dashboard');
          }
        }}
      />

      {/* Exam Setup & Candidate Name Modal */}
      <ExamSetupModal
        isOpen={isExamSetupOpen}
        onClose={() => setIsExamSetupOpen(false)}
        defaultName={currentUser?.displayName || ''}
        defaultSubject={setupDefaultSubject}
        defaultEmail={currentUser?.email || ''}
        isUserLoggedIn={!!currentUser}
        onStartExam={handleStartExamFlow}
      />

      {/* Global Keyboard Shortcuts Guide Modal */}
      <KeyboardShortcutsModal
        isOpen={showGlobalShortcutsModal}
        onClose={() => setShowGlobalShortcutsModal(false)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    </div>
  );
}
