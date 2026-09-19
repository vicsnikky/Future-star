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
import { buildDynamic50Exam } from './services/examEngine';

// Components
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { ExamSetupModal } from './components/ExamSetupModal';
import { ExamView } from './components/ExamView';
import { ResultView } from './components/ResultView';
import { StudentDashboard } from './components/StudentDashboard';
import { MyMistakes } from './components/MyMistakes';
import { AdminDashboard } from './components/AdminDashboard';
import {
  BookOpen,
  LogOut,
  User,
  Shield,
  Home,
  Target,
  FileText
} from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  // App views: 'landing' | 'student_dashboard' | 'admin_dashboard' | 'active_exam' | 'exam_result' | 'my_mistakes'
  const [currentView, setCurrentView] = useState<
    'landing' | 'student_dashboard' | 'admin_dashboard' | 'active_exam' | 'exam_result' | 'my_mistakes'
  >('landing');

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
    easyCount: 15,
    mediumCount: 25,
    hardCount: 10,
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
            if (userSnap.exists()) {
              profile = userSnap.data() as UserProfile;
            } else {
              profile = {
                uid: firebaseUser.uid,
                email: firebaseUser.email || '',
                displayName: firebaseUser.displayName || 'Student',
                role: firebaseUser.email?.includes('admin') ? 'admin' : 'student',
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
  const handleStartExamFlow = async (candidateName: string, subject: ExamMode) => {
    setIsExamSetupOpen(false);

    // Fetch approved pool
    const approvedPool = await getApprovedQuestions(subject);
    const dynamic50 = buildDynamic50Exam(approvedPool, subject, examConfig);

    const studentId = currentUser?.uid || `guest-${Date.now()}`;
    const newExam: ExamAttempt = {
      id: `exam-${Date.now()}`,
      studentId,
      studentName: candidateName,
      studentEmail: currentUser?.email || 'student@futurestars.edu',
      subject,
      startTime: new Date().toISOString(),
      durationMinutes: 40,
      totalQuestions: 50,
      questions: dynamic50,
      studentAnswers: {},
      flaggedQuestions: [],
      status: 'in_progress',
    };

    setActiveExam(newExam);
    setCurrentView('active_exam');

    // Save to Firestore (offline supported)
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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Global Navigation when authenticated */}
      {currentUser && currentView !== 'active_exam' && (
        <nav className="sticky top-0 z-40 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentView(currentUser.role === 'admin' ? 'admin_dashboard' : 'student_dashboard')}
                className="flex items-center gap-2.5"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-900 text-white flex items-center justify-center font-black text-base shadow-xs">
                  FS
                </div>
                <div className="text-left">
                  <span className="font-extrabold text-lg tracking-tight text-blue-950 block">FUTURE STARS</span>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">11+ Examination Platform</span>
                </div>
              </button>

              <div className="hidden md:flex items-center gap-1 ml-6 border-l border-slate-200 pl-4">
                {currentUser.role === 'student' ? (
                  <>
                    <button
                      onClick={() => setCurrentView('student_dashboard')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        currentView === 'student_dashboard' ? 'bg-blue-50 text-blue-900' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Home className="w-3.5 h-3.5 inline mr-1" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => setCurrentView('my_mistakes')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        currentView === 'my_mistakes' ? 'bg-blue-50 text-blue-900' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Target className="w-3.5 h-3.5 inline mr-1" />
                      My Mistakes
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setCurrentView('admin_dashboard')}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-900 flex items-center gap-1"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Admin Curriculum & Question Bank
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                id="global-start-exam-header-btn"
                onClick={() => {
                  setSetupDefaultSubject('Mathematics');
                  setIsExamSetupOpen(true);
                }}
                className="px-4 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition-colors"
              >
                New 50-Q Exam
              </button>

              <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-bold text-slate-800">{currentUser.displayName}</div>
                  <div className="text-[10px] text-slate-400 capitalize">{currentUser.role}</div>
                </div>
                <button
                  id="sign-out-btn"
                  onClick={handleSignOut}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
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
          />
        )}

        {/* Student Dashboard */}
        {currentView === 'student_dashboard' && currentUser && (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <StudentDashboard
              user={currentUser}
              examHistory={examHistory}
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
                // Launch custom practice with mistaken questions
                const candidateName = currentUser?.displayName || 'Student';
                const dynamic50 = buildDynamic50Exam(qs, 'Mixed', examConfig);
                const newExam: ExamAttempt = {
                  id: `exam-mistakes-${Date.now()}`,
                  studentId: currentUser?.uid || 'student',
                  studentName: candidateName,
                  studentEmail: currentUser?.email || 'student@futurestars.edu',
                  subject: 'Mixed',
                  startTime: new Date().toISOString(),
                  durationMinutes: 40,
                  totalQuestions: 50,
                  questions: dynamic50,
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
            />
          </main>
        )}

        {/* Active Timed Examination Interface */}
        {currentView === 'active_exam' && activeExam && (
          <ExamView
            exam={activeExam}
            onUpdateExam={handleUpdateExam}
            onSubmitExam={handleSubmitExam}
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
        onStartExam={handleStartExamFlow}
      />
    </div>
  );
}
