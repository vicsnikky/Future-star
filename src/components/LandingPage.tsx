import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Clock,
  Award,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Moon,
  Sun,
  Keyboard,
  GraduationCap,
  Layers,
  Menu,
  X
} from 'lucide-react';
import { ExamMode } from '../types';
import { CurriculumLadderNavigator } from './CurriculumLadderNavigator';
import { CURRICULUM_STAGES } from '../data/curriculumStages';

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
  const [selectedStageId, setSelectedStageId] = useState<string>('primary-education');
  const [isCurriculumDropdownOpen, setIsCurriculumDropdownOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToStage = (stageId: string) => {
    setSelectedStageId(stageId);
    setIsCurriculumDropdownOpen(false);
    setIsMobileMenuOpen(false);
    scrollToSection('curriculum-ladder-section');
  };

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

          {/* Quick Page Navigation Anchors */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 relative">
            {/* Interactive UK Curriculum Stages Dropdown */}
            <div className="relative">
              <button
                id="header-curriculum-dropdown-btn"
                onClick={() => setIsCurriculumDropdownOpen(!isCurriculumDropdownOpen)}
                className="px-3 py-2 rounded-lg hover:text-blue-900 dark:hover:text-blue-300 hover:bg-blue-50/70 dark:hover:bg-blue-950/50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
                <span>UK Curriculum</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCurriculumDropdownOpen ? 'rotate-180 text-blue-700' : ''}`} />
              </button>

              {isCurriculumDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span>Select UK Curriculum Stage</span>
                    <span className="text-[10px] lowercase text-blue-600 dark:text-blue-400">All 5 Tiers</span>
                  </div>
                  <div className="mt-1 space-y-1">
                    {CURRICULUM_STAGES.map((stage) => (
                      <button
                        key={stage.id}
                        id={`dropdown-stage-item-${stage.stageNumber}`}
                        onClick={() => handleNavigateToStage(stage.id)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs transition-colors flex items-start gap-3 cursor-pointer ${
                          selectedStageId === stage.id
                            ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-950 dark:text-blue-200 font-bold'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-300 flex items-center justify-center font-extrabold text-[10px] shrink-0 mt-0.5">
                          {stage.stageNumber}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold truncate text-slate-900 dark:text-slate-100">{stage.name}</span>
                            <span className="text-[10px] text-slate-500 shrink-0 font-medium">{stage.ageRange}</span>
                          </div>
                          <div className="text-[11px] text-blue-900 dark:text-blue-400 font-medium truncate mt-0.5">
                            {stage.ukStageName}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {stage.benchmarkQualifications.primaryAward} • <span className="font-semibold text-blue-900 dark:text-blue-300">{stage.examBoards}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection('subjects-section')}
              className="px-3 py-2 rounded-lg hover:text-blue-900 dark:hover:text-blue-300 hover:bg-blue-50/70 dark:hover:bg-blue-950/50 transition-colors cursor-pointer"
            >
              11+ Subjects
            </button>
            <button
              onClick={() => scrollToSection('mixed-exam-section')}
              className="px-3 py-2 rounded-lg hover:text-blue-900 dark:hover:text-blue-300 hover:bg-blue-50/70 dark:hover:bg-blue-950/50 transition-colors cursor-pointer"
            >
              150-Q Mixed Exam
            </button>
            <button
              onClick={() => scrollToSection('how-it-works-section')}
              className="px-3 py-2 rounded-lg hover:text-blue-900 dark:hover:text-blue-300 hover:bg-blue-50/70 dark:hover:bg-blue-950/50 transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('faqs-section')}
              className="px-3 py-2 rounded-lg hover:text-blue-900 dark:hover:text-blue-300 hover:bg-blue-50/70 dark:hover:bg-blue-950/50 transition-colors cursor-pointer"
            >
              FAQs
            </button>
          </nav>

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

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg lg:hidden text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              UK Curriculum Stages
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {CURRICULUM_STAGES.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => handleNavigateToStage(stage.id)}
                  className={`text-left p-2.5 rounded-xl text-xs flex items-center justify-between ${
                    selectedStageId === stage.id
                      ? 'bg-blue-100 dark:bg-blue-950 text-blue-950 dark:text-blue-200 font-bold'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="truncate">
                    <span className="font-bold mr-2">Stage {stage.stageNumber}:</span>
                    <span>{stage.name}</span>
                    <span className="text-[10px] text-slate-400 block">{stage.ageRange} • {stage.ukStageName}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 shrink-0 text-slate-400" />
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2 text-xs font-semibold">
              <button
                onClick={() => { scrollToSection('subjects-section'); setIsMobileMenuOpen(false); }}
                className="text-left py-2 text-slate-700 dark:text-slate-300 hover:text-blue-900"
              >
                11+ Subjects
              </button>
              <button
                onClick={() => { scrollToSection('mixed-exam-section'); setIsMobileMenuOpen(false); }}
                className="text-left py-2 text-slate-700 dark:text-slate-300 hover:text-blue-900"
              >
                150-Q Mixed Exam
              </button>
              <button
                onClick={() => { scrollToSection('how-it-works-section'); setIsMobileMenuOpen(false); }}
                className="text-left py-2 text-slate-700 dark:text-slate-300 hover:text-blue-900"
              >
                How It Works
              </button>
              <button
                onClick={() => { scrollToSection('faqs-section'); setIsMobileMenuOpen(false); }}
                className="text-left py-2 text-slate-700 dark:text-slate-300 hover:text-blue-900"
              >
                FAQs
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-18 lg:pb-24 bg-radial from-blue-50/70 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950 text-blue-900 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
            UK 11+ & National Curriculum Progression System
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-[1.15]">
            Prepare Smarter Across <span className="text-blue-900 dark:text-blue-400">All UK Curriculum Stages</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            From Key Stage 1 & 2 Primary Foundations (11+ Entrance & SATs) to Secondary Key Stage 3, GCSEs, and Sixth Form A-Levels, navigate your path to academic excellence.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="hero-start-practising-btn"
              onClick={onStartPractising}
              className="w-full sm:w-auto px-8 py-4 text-base font-bold rounded-xl bg-blue-900 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 text-white shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              Start 11+ Mock Exam
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              id="hero-explore-ladder-btn"
              onClick={() => scrollToSection('curriculum-ladder-section')}
              className="w-full sm:w-auto px-8 py-4 text-base font-bold rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <GraduationCap className="w-5 h-5 text-blue-900 dark:text-blue-400" />
              Explore All 5 Curriculum Stages
            </button>
          </div>

          {/* Dedicated UK Curriculum 5-Stage Direct Quick-Navigator */}
          <div className="mt-10 p-4 sm:p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 max-w-5xl mx-auto shadow-sm text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Select Any UK Curriculum Stage to Navigate Directly:
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Click any card to inspect syllabus, milestones & exam benchmarks</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {CURRICULUM_STAGES.map((stage) => {
                const isSelected = selectedStageId === stage.id;
                return (
                  <button
                    key={stage.id}
                    id={`hero-stage-card-${stage.stageNumber}`}
                    onClick={() => handleNavigateToStage(stage.id)}
                    className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between text-left cursor-pointer group relative overflow-hidden ${
                      isSelected
                        ? 'border-blue-900 dark:border-blue-500 bg-blue-50/60 dark:bg-blue-950/50 ring-2 ring-blue-900/20 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850 hover:bg-white dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          isSelected
                            ? 'bg-blue-900 text-white'
                            : 'bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}>
                          Stage {stage.stageNumber}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                          {stage.ageRange}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-xs text-slate-900 dark:text-slate-100 leading-snug line-clamp-2">
                        {stage.name}
                      </h3>

                      <div className="text-[11px] font-semibold text-blue-900 dark:text-blue-400 mt-1 line-clamp-1">
                        {stage.ukStageName}
                      </div>

                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-tight">
                        {stage.benchmarkQualifications.primaryAward} • <span className="font-semibold text-blue-900 dark:text-blue-300">{stage.examBoards}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[10px] font-bold text-blue-900 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                      <span>Explore Stage</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-2xl font-black text-blue-900 dark:text-blue-400">50 / 150</div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Single or Mixed 150 Qs</div>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-2xl font-black text-blue-900 dark:text-blue-400">40m / 90m</div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Real Exam Countdown</div>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-2xl font-black text-blue-900 dark:text-blue-400">5 Min</div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Paused Subject Breaks</div>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-2xl font-black text-blue-900 dark:text-blue-400">PDF</div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Official Result Certificate</div>
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

      {/* UK Curriculum & Progression Ladder Navigator Section */}
      <CurriculumLadderNavigator
        selectedStageId={selectedStageId}
        onStageChange={setSelectedStageId}
        onSelectSubject={onSelectSubject}
        onStartPractising={onStartPractising}
        onRegisterClick={onLoginClick}
      />

      {/* Subjects Selection Section */}
      <section id="subjects-section" className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
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
          <div id="mixed-exam-section" className="mt-10 rounded-2xl bg-gradient-to-r from-amber-500/15 via-blue-900/5 to-indigo-900/15 dark:from-amber-500/10 dark:via-blue-900/20 dark:to-indigo-900/20 border-2 border-amber-400/60 dark:border-amber-500/50 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider">
                  Full 11+ Mock Exam
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 text-xs font-bold">
                  150 Questions • 1 Hour 30 Minutes
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 text-xs font-bold">
                  5-Min Paused Subject Breaks
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                150-Question Mixed Examination (Maths + English + Verbal Reasoning)
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Take the ultimate grammar school readiness challenge: 50 Mathematics + 50 English + 50 Verbal Reasoning. After finishing each subject section, you can take a 5-minute pause break. The exam clock freezes completely and immediately resumes the instant you press Continue.
              </p>
            </div>
            <button
              id="landing-mixed-exam-btn"
              onClick={() => onSelectSubject('Mixed')}
              className="px-8 py-4 rounded-xl bg-blue-900 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 text-white font-black text-base shadow-md hover:shadow-lg flex items-center gap-2 shrink-0 transition-all cursor-pointer"
            >
              Start 150-Question Mixed Exam <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works-section" className="py-16 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">How It Works</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Designed specifically to replicate official UK Grammar School entrance examinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 flex items-center justify-center font-bold mb-4">1</div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">Provide Name & Subject</h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Enter your candidate name and choose English, Maths, Verbal Reasoning, or Mixed Practice.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 flex items-center justify-center font-bold mb-4">2</div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">Timed 50 Questions</h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Answer 50 questions in exactly 40 minutes with a countdown timer, flag tools, and question navigation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 flex items-center justify-center font-bold mb-4">3</div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">Instant Marking</h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Get marked instantly with score, percentage, correct/incorrect totals, and time used.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 flex items-center justify-center font-bold mb-4">4</div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">Detailed Explanations & PDF</h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Review step-by-step solutions for mistakes and download an official PDF result report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Practice Matters Section */}
      <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Why Timed Practice Matters</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              In real 11+ exams, pacing is just as critical as academic ability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
              <CheckCircle2 className="w-6 h-6 text-blue-900 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">Build Speed & Accuracy</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Students have only 48 seconds per question on average. Our 40-minute timer trains disciplined pacing.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
              <CheckCircle2 className="w-6 h-6 text-blue-900 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">Never the Same Exam Twice</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Our dynamic selection engine and UK curriculum question generation ensure rich variance on every attempt.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
              <CheckCircle2 className="w-6 h-6 text-blue-900 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">Master Difficult Reasoning</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Step-by-step solutions teach children the exact logical patterns behind code deciphering and word relationships.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
              <CheckCircle2 className="w-6 h-6 text-blue-900 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">Target Weak Topics</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  The My Mistakes dashboard tracks topic weaknesses so students can practise their mistakes until perfected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="faqs-section" className="py-16 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800">
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
