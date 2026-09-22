import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Moon,
  Sun,
  Keyboard,
  GraduationCap,
  Menu,
  X,
  MessageCircle,
  Phone,
  CheckCircle2,
  Check,
  Award,
  Clock,
  BookOpen,
  FileText
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

const TUTOR_WHATSAPP_LINK = "https://wa.me/2347062712735?text=Hello%20FUTURE%20STARS%2C%20I%20would%20like%20to%20inquire%20about%20one-on-one%20tutorials%20for%20my%20child.";

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

  const scrollToSection = (sectionId: string) => {
    setIsCurriculumDropdownOpen(false);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToStage = (stageId: string) => {
    setSelectedStageId(stageId);
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
              className="w-10 h-10 rounded-xl object-contain bg-white shadow-xs border border-slate-200 dark:border-slate-700"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-blue-950 dark:text-blue-100">FUTURE STARS</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                11+ Examination System
              </span>
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
                <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span>British Curriculum Stages</span>
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
              onClick={() => scrollToSection('tutoring-section')}
              className="px-3 py-2 rounded-lg hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/50 transition-colors cursor-pointer text-emerald-700 dark:text-emerald-400 font-bold"
            >
              1-on-1 Tutoring
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
            {/* Direct WhatsApp 1-on-1 Tutorial Referral Button */}
            <a
              id="header-whatsapp-tutorial-btn"
              href={TUTOR_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
              title="Chat on WhatsApp for 1-on-1 Tutoring"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>1-on-1 Tutoring</span>
            </a>

            {/* Keyboard Shortcuts Guide Button */}
            {onOpenShortcuts && (
              <button
                onClick={onOpenShortcuts}
                className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors cursor-pointer"
                title="Keyboard Shortcuts (?)"
              >
                <Keyboard className="w-3.5 h-3.5" />
                <span className="text-[11px] font-mono">?</span>
              </button>
            )}

            {/* Dark Mode Toggle */}
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
              </button>
            )}

            <button
              onClick={onLoginClick}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition-colors cursor-pointer"
            >
              Sign In
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
            <a
              href={TUTOR_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>1-on-1 Tutoring via WhatsApp</span>
            </a>

            <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="text-xs font-bold uppercase text-slate-400 px-2 py-1">Curriculum Stages</div>
              {CURRICULUM_STAGES.map((st) => (
                <button
                  key={st.id}
                  onClick={() => handleNavigateToStage(st.id)}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
                >
                  <span>Stage {st.stageNumber}: {st.name}</span>
                  <span className="text-[10px] text-slate-500">{st.ageRange}</span>
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1 text-sm font-medium">
              <button
                onClick={() => scrollToSection('subjects-section')}
                className="text-left py-2 px-3 text-slate-700 dark:text-slate-300 hover:text-blue-900"
              >
                11+ Subjects Practice
              </button>
              <button
                onClick={() => scrollToSection('mixed-exam-section')}
                className="text-left py-2 px-3 text-slate-700 dark:text-slate-300 hover:text-blue-900"
              >
                150-Q Mixed Exam
              </button>
              <button
                onClick={() => scrollToSection('tutoring-section')}
                className="text-left py-2 px-3 text-emerald-700 dark:text-emerald-400 font-bold"
              >
                1-on-1 Tutoring Referral
              </button>
              <button
                onClick={() => scrollToSection('how-it-works-section')}
                className="text-left py-2 px-3 text-slate-700 dark:text-slate-300 hover:text-blue-900"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('faqs-section')}
                className="text-left py-2 px-3 text-slate-700 dark:text-slate-300 hover:text-blue-900"
              >
                FAQs
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section: Simple, Focused, High-Impact */}
      <section className="relative overflow-hidden pt-12 pb-14 lg:pt-16 lg:pb-18 bg-gradient-to-b from-blue-50/60 via-white to-slate-50 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/90 dark:bg-blue-950 text-blue-900 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
            Official British 11+ & National Curriculum Preparation
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-[1.15]">
            Master the 11+ & British Curriculum <span className="text-blue-900 dark:text-blue-400">with Confidence</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Practice real exam-style questions for Mathematics, English, and Verbal Reasoning with instant marking, step-by-step explanations, and personalized one-on-one tutorial support.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              id="hero-start-practising-btn"
              onClick={onStartPractising}
              className="w-full sm:w-auto px-7 py-3.5 text-base font-bold rounded-xl bg-blue-900 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 text-white shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              Start 11+ Mock Exam
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              id="hero-book-tutoring-btn"
              href={TUTOR_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 text-base font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Book 1-on-1 Tutorial</span>
            </a>
          </div>

          {/* Simplified Quick Stage Navigation Pills */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Explore British Curriculum Stages:
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {CURRICULUM_STAGES.map((st) => (
                <button
                  key={st.id}
                  onClick={() => handleNavigateToStage(st.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedStageId === st.id
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
                  }`}
                >
                  Stage {st.stageNumber}: {st.ukYears}
                </button>
              ))}
            </div>
          </div>

          {/* Clean 4-Item Feature Highlights Strip */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left max-w-3xl mx-auto">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-blue-900 dark:text-blue-400 shrink-0" />
              <div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100">50 & 150 Qs</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Single or Full Mocks</div>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-900 dark:text-blue-400 shrink-0" />
              <div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100">40m / 90m</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Timed Exam Clocks</div>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-center gap-3">
              <Award className="w-5 h-5 text-blue-900 dark:text-blue-400 shrink-0" />
              <div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100">GL / CEM / AQA</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Accredited Boards</div>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-900 dark:text-blue-400 shrink-0" />
              <div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100">Instant PDF</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Verified Certificate</div>
              </div>
            </div>
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

      {/* Dedicated 1-on-1 Tutoring Referral Section (WhatsApp: +234 706 271 2735) */}
      <section id="tutoring-section" className="py-16 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-blue-50 dark:from-slate-900 dark:via-emerald-950/20 dark:to-slate-900 border-y border-emerald-200 dark:border-emerald-900/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-850 border border-emerald-200 dark:border-emerald-800/60 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl -z-10" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold uppercase tracking-wider">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Personalized 1-on-1 Tutoring Available
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
                  Want Dedicated One-on-One Tutoring for Your Child?
                </h2>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  Connect directly with our experienced British Curriculum specialist tutors for personalized online tutoring. We provide focused coaching for 11+ Grammar School Entrance (GL Assessment & CEM), Key Stage 3, GCSEs, and A-Levels.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="flex items-start gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Targeted Weakness Remediation</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>GL & CEM Exam Techniques</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Weekly Parent Progress Reports</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Box */}
              <div className="p-6 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center shrink-0 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md mb-3">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  Dedicated Tutoring Support
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-slate-100 mt-1">
                  Official WhatsApp Desk
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 mb-4">
                  Quick consultation for schedules, syllabus & tutor matching
                </div>
                <a
                  id="section-whatsapp-chat-btn"
                  href={TUTOR_WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Selection Section */}
      <section id="subjects-section" className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Three Main 11+ Subjects
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Each module tests essential curriculum skills evaluated by Grammar Schools and Independent 11+ Boards (GL Assessment & CEM style).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mathematics */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:border-blue-300 hover:shadow-md transition-all bg-slate-50/50 dark:bg-slate-800/50 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl mb-4">
                  123
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Mathematics Practice</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Covers fractions, decimals, percentages, ratio & proportion, algebra, geometry, perimeter, time, money, and multi-step word problems.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['Fractions', 'Decimals', 'Algebra', 'Geometry', 'Word Problems'].map(t => (
                    <span key={t} className="text-xs px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-700 dark:text-slate-300 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => onSelectSubject('Mathematics')}
                className="mt-6 w-full py-2.5 px-4 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-semibold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                Practise Maths <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* English */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:border-blue-300 hover:shadow-md transition-all bg-slate-50/50 dark:bg-slate-800/50 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl mb-4">
                  ABC
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">English Practice</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Tests reading comprehension, advanced vocabulary, spelling, punctuation, grammar, homophones, synonyms, and parts of speech.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['Grammar', 'Vocabulary', 'Spelling', 'Punctuation', 'Comprehension'].map(t => (
                    <span key={t} className="text-xs px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-700 dark:text-slate-300 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => onSelectSubject('English')}
                className="mt-6 w-full py-2.5 px-4 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-semibold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                Practise English <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Verbal Reasoning */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:border-blue-300 hover:shadow-md transition-all bg-slate-50/50 dark:bg-slate-800/50 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xl mb-4">
                  VR
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Verbal Reasoning Practice</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Focuses on letter & number sequences, analogies, cipher codes, odd one out, hidden words, word relationships, and logical reasoning.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['Letter Sequences', 'Codes', 'Analogies', 'Odd One Out', 'Hidden Words'].map(t => (
                    <span key={t} className="text-xs px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-700 dark:text-slate-300 font-medium">
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
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">How It Works</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Designed specifically to replicate official UK Grammar School entrance examinations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 flex items-center justify-center font-bold mb-4">1</div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">Provide Name & Subject</h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Enter candidate name and choose English, Maths, Verbal Reasoning, or Mixed 150Q Practice.
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
                Get marked instantly with score, percentage, correct/incorrect totals, and time breakdown.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 flex items-center justify-center font-bold mb-4">4</div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">Solutions & PDF Certificate</h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Review step-by-step solutions for mistakes and download an official PDF result report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Account Progress Tracking Banner */}
      <section className="py-12 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white text-left shadow-lg border border-blue-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                Student Account Recommended
              </div>
              <h3 className="text-lg sm:text-xl font-black">
                Register Your Student Account to Track Progress
              </h3>
              <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
                Create a student profile so our tutors can track your mock scores, review your mistaken questions, analyze topic strengths, and support your grammar school prep.
              </p>
            </div>
            <button
              id="landing-register-prompt-btn"
              onClick={onLoginClick}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shrink-0 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Register / Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="faqs-section" className="py-16 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3.5">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700/80">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                How many questions are in each test?
              </h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Each single-subject examination has 50 multiple-choice questions with a 40-minute countdown. The Mixed Mock Examination has 150 questions (50 Maths + 50 English + 50 VR) in 90 minutes with 5-minute paused subject breaks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700/80">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                How can I book a 1-on-1 tutorial for my child?
              </h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                You can reach out directly to our tutoring coordinator on <a href={TUTOR_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-600 dark:text-emerald-400 underline">WhatsApp</a>. Our coordinators will match your child with a specialist tutor based on their current stage and target grammar schools.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700/80">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                Can I download and print my result?
              </h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Yes! Every candidate can download an official FUTURE STARS PDF Certificate showing total score, percentage, time spent, topic analysis, and question explanations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700/80">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                Are questions repeated during an examination?
              </h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                No. Our dynamic test generation engine strictly tracks session questions to guarantee zero repeats and ensures all four multiple-choice answer options are distinct and accurately verified.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-950 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Excel in Your Examinations?
          </h2>
          <p className="mt-4 text-blue-200 text-base max-w-xl mx-auto">
            Start a free 50-question mock exam right now, or contact us for personalized 1-on-1 tutoring.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onStartPractising}
              className="w-full sm:w-auto px-7 py-3.5 text-base font-bold rounded-xl bg-white text-blue-950 hover:bg-blue-50 shadow-md transition-all cursor-pointer"
            >
              Start Free Practice
            </button>
            <a
              href={TUTOR_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 text-base font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp for Tutoring</span>
            </a>
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
              <span>• UK 11+ Entrance & National Curriculum Platform</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={TUTOR_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>1-on-1 Tutoring via WhatsApp</span>
            </a>
            <span>•</span>
            <p>© {new Date().getFullYear()} FUTURE STARS. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Quick-Contact Button (Always Accessible) */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          id="floating-whatsapp-tutorial-btn"
          href={TUTOR_WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-white/30"
          title="Inquire for 1-on-1 Tutoring on WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-200"></span>
            </span>
          </div>
          <span className="text-xs font-black tracking-wide pr-1">1-on-1 Tutoring</span>
        </a>
      </div>
    </div>
  );
};
