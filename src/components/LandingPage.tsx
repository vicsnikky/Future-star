import React from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Clock,
  Award,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Moon,
  Sun,
  Keyboard
} from 'lucide-react';
import { ExamMode } from '../types';

interface LandingPageProps {
  onStartPractising: () => void;
  onLoginClick: () => void;
  onSelectSubject: (mode: ExamMode) => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  onOpenShortcuts?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartPractising,
  onLoginClick,
  onSelectSubject,
  isDarkMode = false,
  onToggleDarkMode,
  onOpenShortcuts,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Navigation Header */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://i.ibb.co/9mXgHJMv/logo1.jpg"
              alt="FUTURE STARS Logo"
              className="w-11 h-11 rounded-xl object-contain bg-white shadow-sm border border-slate-200 dark:border-slate-700"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="font-extrabold text-xl tracking-tight text-blue-950 dark:text-blue-100">FUTURE STARS</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">11+ Examination System</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Keyboard Shortcuts Guide Button */}
            {onOpenShortcuts && (
              <button
                id="landing-shortcuts-btn"
                onClick={onOpenShortcuts}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Keyboard Shortcuts (?)"
                aria-label="View keyboard shortcuts"
              >
                <Keyboard className="w-4 h-4" />
              </button>
            )}

            {/* Dark Mode Toggle */}
            {onToggleDarkMode && (
              <button
                id="landing-theme-toggle-btn"
                onClick={onToggleDarkMode}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode (Shift+D)`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              </button>
            )}

            <button
              id="landing-login-nav-btn"
              onClick={onLoginClick}
              className="px-3 sm:px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-400 transition-colors"
            >
              Sign In
            </button>
            <button
              id="landing-start-nav-btn"
              onClick={onStartPractising}
              className="px-4 sm:px-5 py-2 text-sm font-semibold rounded-lg bg-blue-900 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 text-white shadow-sm transition-all"
            >
              Start Practising
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-radial from-blue-50/70 via-white to-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 text-blue-900 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            UK 11+ Examination Standard Practice System
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Prepare Smarter for Your <span className="text-blue-900">11+ Examination</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Practise English, Mathematics and Verbal Reasoning with realistic timed examinations, instant results and detailed solutions.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="hero-start-practising-btn"
              onClick={onStartPractising}
              className="w-full sm:w-auto px-8 py-4 text-base font-bold rounded-xl bg-blue-900 hover:bg-blue-800 text-white shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              Start Practising Now
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              id="hero-login-btn"
              onClick={onLoginClick}
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-xs transition-all"
            >
              Student / Admin Login
            </button>
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="text-2xl font-black text-blue-900">50 / 150</div>
              <div className="text-xs font-medium text-slate-500 mt-1">Single or Mixed 150 Qs</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="text-2xl font-black text-blue-900">40m / 90m</div>
              <div className="text-xs font-medium text-slate-500 mt-1">Real Exam Countdown</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="text-2xl font-black text-blue-900">5 Min</div>
              <div className="text-xs font-medium text-slate-500 mt-1">Paused Subject Breaks</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="text-2xl font-black text-blue-900">PDF</div>
              <div className="text-xs font-medium text-slate-500 mt-1">Official Result Certificate</div>
            </div>
          </div>

          {/* Registration Callout Banner (Enabling Admin Progress Tracking) */}
          <div className="mt-10 max-w-4xl mx-auto p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white text-left shadow-lg border border-blue-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                Student Registration Recommended
              </div>
              <h3 className="text-lg sm:text-xl font-black">
                Register Your Student Account So We Can Track Your Progress
              </h3>
              <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
                Please register your account with your name and email so our tutors and administrators can track your progress, review your mock exam history, analyze topic strengths, and support you every step of the way toward grammar school entrance success.
              </p>
            </div>
            <button
              id="landing-register-prompt-btn"
              onClick={onLoginClick}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shrink-0 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Register / Sign In Now
            </button>
          </div>
        </div>
      </section>

      {/* Subjects Selection Section */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Three Main 11+ Subjects
            </h2>
            <p className="mt-3 text-slate-600">
              Each module tests essential curriculum skills evaluated by Grammar Schools and Independent 11+ Boards (GL Assessment & CEM style).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mathematics */}
            <div className="rounded-2xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-md transition-all bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl mb-4">
                  123
                </div>
                <h3 className="text-xl font-bold text-slate-900">Mathematics Practice</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Covers fractions, decimals, percentages, ratio & proportion, algebra, geometry, perimeter, time, money, and multi-step word problems.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['Fractions', 'Decimals', 'Algebra', 'Geometry', 'Word Problems'].map(t => (
                    <span key={t} className="text-xs px-2 py-1 bg-white border border-slate-200 rounded-md text-slate-700 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => onSelectSubject('Mathematics')}
                className="mt-6 w-full py-2.5 px-4 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-semibold text-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                Practise Maths <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* English */}
            <div className="rounded-2xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-md transition-all bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl mb-4">
                  ABC
                </div>
                <h3 className="text-xl font-bold text-slate-900">English Practice</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Tests reading comprehension, advanced vocabulary, spelling, punctuation, grammar, homophones, synonyms, and parts of speech.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['Grammar', 'Vocabulary', 'Spelling', 'Punctuation', 'Comprehension'].map(t => (
                    <span key={t} className="text-xs px-2 py-1 bg-white border border-slate-200 rounded-md text-slate-700 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => onSelectSubject('English')}
                className="mt-6 w-full py-2.5 px-4 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-semibold text-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                Practise English <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Verbal Reasoning */}
            <div className="rounded-2xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-md transition-all bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xl mb-4">
                  VR
                </div>
                <h3 className="text-xl font-bold text-slate-900">Verbal Reasoning Practice</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Focuses on letter & number sequences, analogies, cipher codes, odd one out, hidden words, word relationships, and logical reasoning.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['Letter Sequences', 'Codes', 'Analogies', 'Odd One Out', 'Hidden Words'].map(t => (
                    <span key={t} className="text-xs px-2 py-1 bg-white border border-slate-200 rounded-md text-slate-700 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => onSelectSubject('Verbal Reasoning')}
                className="mt-6 w-full py-2.5 px-4 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-semibold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                Practise Verbal Reasoning <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 150-Question Mixed Exam Showcase Banner */}
          <div className="mt-10 rounded-2xl bg-gradient-to-r from-amber-500/15 via-blue-900/5 to-indigo-900/15 border-2 border-amber-400/60 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider">
                  Full 11+ Mock Exam
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
                  150 Questions • 1 Hour 30 Minutes
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                  5-Min Paused Subject Breaks
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                150-Question Mixed Examination (Maths + English + Verbal Reasoning)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Take the ultimate grammar school readiness challenge: 50 Mathematics + 50 English + 50 Verbal Reasoning. After finishing each subject section, you can take a 5-minute pause break. The exam clock freezes completely and immediately resumes the instant you press Continue.
              </p>
            </div>
            <button
              id="landing-mixed-exam-btn"
              onClick={() => onSelectSubject('Mixed')}
              className="px-8 py-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-black text-base shadow-md hover:shadow-lg flex items-center gap-2 shrink-0 transition-all cursor-pointer"
            >
              Start 150-Question Mixed Exam <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">How It Works</h2>
            <p className="mt-3 text-slate-600">
              Designed specifically to replicate official UK Grammar School entrance examinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold mb-4">1</div>
              <h4 className="font-bold text-lg text-slate-900">Provide Name & Subject</h4>
              <p className="mt-2 text-sm text-slate-600">
                Enter your candidate name and choose English, Maths, Verbal Reasoning, or Mixed Practice.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold mb-4">2</div>
              <h4 className="font-bold text-lg text-slate-900">Timed 50 Questions</h4>
              <p className="mt-2 text-sm text-slate-600">
                Answer 50 questions in exactly 40 minutes with a countdown timer, flag tools, and question navigation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold mb-4">3</div>
              <h4 className="font-bold text-lg text-slate-900">Instant Marking</h4>
              <p className="mt-2 text-sm text-slate-600">
                Get marked instantly with score, percentage, correct/incorrect totals, and time used.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold mb-4">4</div>
              <h4 className="font-bold text-lg text-slate-900">Detailed Explanations & PDF</h4>
              <p className="mt-2 text-sm text-slate-600">
                Review step-by-step solutions for mistakes and download an official PDF result report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Practice Matters Section */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Why Timed Practice Matters</h2>
            <p className="mt-3 text-slate-600">
              In real 11+ exams, pacing is just as critical as academic ability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-4 p-5 rounded-xl border border-slate-200 bg-slate-50/50">
              <CheckCircle2 className="w-6 h-6 text-blue-900 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900">Build Speed & Accuracy</h4>
                <p className="text-sm text-slate-600 mt-1">
                  Students have only 48 seconds per question on average. Our 40-minute timer trains disciplined pacing.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-xl border border-slate-200 bg-slate-50/50">
              <CheckCircle2 className="w-6 h-6 text-blue-900 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900">Never the Same Exam Twice</h4>
                <p className="text-sm text-slate-600 mt-1">
                  Our dynamic selection engine and AI question generation ensure that questions change on every attempt.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-xl border border-slate-200 bg-slate-50/50">
              <CheckCircle2 className="w-6 h-6 text-blue-900 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900">Master Difficult Reasoning</h4>
                <p className="text-sm text-slate-600 mt-1">
                  Step-by-step solutions teach children the exact logical patterns behind code deciphering and word relationships.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-xl border border-slate-200 bg-slate-50/50">
              <CheckCircle2 className="w-6 h-6 text-blue-900 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900">Target Weak Topics</h4>
                <p className="text-sm text-slate-600 mt-1">
                  The My Mistakes dashboard tracks topic weaknesses so students can practise their mistakes until perfected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-white border border-slate-200">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-900" />
                How many questions are in each test?
              </h4>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Each examination has exactly 50 multiple-choice questions, and you have exactly 40 minutes to complete it.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-900" />
                What happens if the 40-minute timer runs out?
              </h4>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                The system automatically submits your examination when the countdown hits zero, marks all answered questions, and gives you your detailed result instantly.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-900" />
                Can I download and print my result?
              </h4>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Yes! Every student can enter their name and download an official FUTURE STARS PDF Certificate showing total score, percentage, time spent, topic analysis, and question explanations.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-900" />
                Can administrators upload past paper PDFs?
              </h4>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Yes. Administrators have a dedicated dashboard where they can upload past question PDFs, extract questions with AI OCR, review and approve them before they appear in student examinations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Excel in Your 11+ Examinations?
          </h2>
          <p className="mt-4 text-blue-200 text-lg max-w-2xl mx-auto">
            Join FUTURE STARS today. Start a full 50-question examination or take a diagnostic practice test right now.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartPractising}
              className="w-full sm:w-auto px-8 py-4 text-base font-bold rounded-xl bg-white text-blue-950 hover:bg-blue-50 shadow-md transition-all"
            >
              Start Free Practice
            </button>
            <button
              onClick={onLoginClick}
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold rounded-xl bg-blue-900 hover:bg-blue-800 text-white border border-blue-700 transition-all"
            >
              Sign In to Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="https://i.ibb.co/9mXgHJMv/logo1.jpg"
              alt="FUTURE STARS Logo"
              className="w-8 h-8 rounded-lg object-contain bg-white shadow-xs border border-slate-700"
              referrerPolicy="no-referrer"
            />
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">FUTURE STARS</span>
              <span>• UK 11+ Entrance Examination Practice System</span>
            </div>
          </div>
          <p>© {new Date().getFullYear()} FUTURE STARS Educational Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
