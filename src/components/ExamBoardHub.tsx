import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  Calendar,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Clock,
  Compass,
  FileCheck,
  Check,
  ChevronRight,
  ChevronDown,
  Layers,
  HelpCircle,
  ExternalLink,
  Target
} from 'lucide-react';
import {
  EXAM_SPECIFICATIONS,
  EXAM_TIMELINE,
  REVISION_CHECKLISTS,
  LEVEL_TUTORING_OFFERS
} from '../data/examBoardHubData';
import { CURRICULUM_STAGES } from '../data/curriculumStages';
import { ALL_AQA_QUESTIONS, AQA_MODULAR_SETS, AqaQuestionSet } from '../data/questions/aqaQuestions';
import { PracticeLevelType } from './SchoolLevelPracticeModal';

interface ExamBoardHubProps {
  onOpenDiagnostic: (level: PracticeLevelType, setId?: string) => void;
  onSelectStage?: (stageId: string) => void;
}

const BASE_WHATSAPP_URL = 'https://wa.me/2347062712735';

export const ExamBoardHub: React.FC<ExamBoardHubProps> = ({
  onOpenDiagnostic,
  onSelectStage,
}) => {
  // Tabs: 'aqa-modular' | 'specifications' | 'timeline' | 'checklists' | 'tutoring'
  const [activeTab, setActiveTab] = useState<'aqa-modular' | 'specifications' | 'timeline' | 'checklists' | 'tutoring'>('aqa-modular');
  const [selectedSchoolLevel, setSelectedSchoolLevel] = useState<string>('gcse');
  const [selectedAqaSetId, setSelectedAqaSetId] = useState<string>('aqa-set-1');
  const [showWorkedSolutions, setShowWorkedSolutions] = useState<boolean>(true);

  // Interactive Checklist completion stored in localStorage
  const [checkedTopics, setCheckedTopics] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('fs_revision_checklist');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error('Failed reading revision checklist from storage:', e);
      }
    }
    return {};
  });

  const toggleTopicCheck = (id: string) => {
    setCheckedTopics((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('fs_revision_checklist', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed saving checklist:', e);
      }
      return updated;
    });
  };

  const activeCategory = REVISION_CHECKLISTS.find((c) => c.id === selectedSchoolLevel) || REVISION_CHECKLISTS[0];
  const completedInActive = activeCategory.topics.filter((t) => checkedTopics[t.id]).length;
  const progressPercent = Math.round((completedInActive / activeCategory.topics.length) * 100);

  const currentAqaSet = AQA_MODULAR_SETS.find((s) => s.id === selectedAqaSetId) || AQA_MODULAR_SETS[0];

  return (
    <section id="exam-board-hub-section" className="py-16 sm:py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-4 h-4 text-indigo-700 dark:text-indigo-400" />
              UK Examination Board & School Level Hub
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              AQA, Edexcel & National Curriculum Centre
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Complete specifications, modular question banks (85 AQA questions across 8 modules), revision timelines, subject checklists, and level-specific 1-on-1 tutoring.
            </p>
          </div>

          {/* Quick-Launch Buttons */}
          <div className="shrink-0 flex items-center gap-2.5 flex-wrap">
            <button
              id="hub-launch-aqa-btn"
              onClick={() => onOpenDiagnostic('AQA', selectedAqaSetId)}
              className="px-5 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Practice AQA Modular Set ({currentAqaSet.questionCount} Qs)
            </button>
            <button
              onClick={() => onOpenDiagnostic('AQA', 'all')}
              className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              All 85 AQA Qs
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto mb-8 scrollbar-none">
          <button
            onClick={() => setActiveTab('aqa-modular')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'aqa-modular'
                ? 'bg-blue-900 dark:bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            AQA Modular Practice Sets (85 Qs)
          </button>

          <button
            onClick={() => setActiveTab('specifications')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'specifications'
                ? 'bg-blue-900 dark:bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Exam Specifications (AQA / Edexcel)
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'timeline'
                ? 'bg-blue-900 dark:bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Progression & Exam Timeline
          </button>

          <button
            onClick={() => setActiveTab('checklists')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'checklists'
                ? 'bg-blue-900 dark:bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            Interactive Topic Checklists
          </button>

          <button
            onClick={() => setActiveTab('tutoring')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'tutoring'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            Level 1-on-1 Tutoring Options
          </button>
        </div>

        {/* TAB 1: AQA MODULAR PRACTICE SETS (85 QUESTIONS) */}
        {activeTab === 'aqa-modular' && (
          <div className="space-y-8">
            {/* Spotlight Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 text-white relative overflow-hidden border border-blue-800/40 shadow-xl">
              <div className="relative z-10 max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Official AQA 8300 GCSE Mathematics Modular Bank
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  85 Authentic Modular Practice Questions
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Rigorous preparation covering Negative Numbers & BIDMAS, Fraction Arithmetic, Non-Calculator Percentages, Simplifying Ratios, Sharing Ratios, Reverse/Difference Ratios, Frequency & Probability Contingency Trees, plus the complete 20-Question AQA Assessment Assignment.
                </p>
                <div className="pt-2 flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => onOpenDiagnostic('AQA', selectedAqaSetId)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Take Current Set Quiz ({currentAqaSet.questionCount} Questions)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenDiagnostic('AQA', 'all')}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    Take Full 85-Question Paper
                  </button>
                </div>
              </div>
            </div>

            {/* Set Selection Bar */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center justify-between">
                <span>Select Modular Set:</span>
                <span className="text-blue-900 dark:text-blue-400 font-extrabold">{AQA_MODULAR_SETS.length} Sets Available • Total 85 Questions</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {AQA_MODULAR_SETS.map((set) => {
                  const isSelected = selectedAqaSetId === set.id;
                  return (
                    <button
                      key={set.id}
                      onClick={() => setSelectedAqaSetId(set.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-blue-900 dark:border-blue-500 bg-blue-50/80 dark:bg-blue-950/60 ring-2 ring-blue-900/20 text-blue-950 dark:text-blue-100'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-extrabold text-xs line-clamp-1">{set.title}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-between">
                        <span>{set.badge}</span>
                        <span className="font-black text-blue-900 dark:text-blue-400">{set.questionCount} Qs</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Set Detailed View & Question Explorer */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-5">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 text-[11px] font-black uppercase mb-1.5">
                    {currentAqaSet.badge}
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
                    {currentAqaSet.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {currentAqaSet.description}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => setShowWorkedSolutions((prev) => !prev)}
                    className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    {showWorkedSolutions ? 'Hide Worked Solutions' : 'Show Worked Solutions'}
                  </button>
                  <button
                    onClick={() => onOpenDiagnostic('AQA', currentAqaSet.id)}
                    className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span>Launch Quiz Mode</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Questions List with Full Mathematical Working */}
              <div className="space-y-4">
                {currentAqaSet.questions.map((q, qidx) => (
                  <div
                    key={q.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-blue-900 dark:text-blue-400">
                          Question {qidx + 1} of {currentAqaSet.questionCount} • {q.topic}
                        </span>
                        <h5 className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100">
                          {q.questionText}
                        </h5>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                        {q.difficulty}
                      </span>
                    </div>

                    {/* Multiple-Choice Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                      {q.options.map((opt, oidx) => {
                        const isCorrect = opt === q.correctAnswer;
                        return (
                          <div
                            key={oidx}
                            className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                              showWorkedSolutions && isCorrect
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-bold'
                                : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <span
                              className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 ${
                                showWorkedSolutions && isCorrect
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {String.fromCharCode(65 + oidx)}
                            </span>
                            <span className="flex-1">{opt}</span>
                            {showWorkedSolutions && isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Step-by-Step Mark Scheme Solution */}
                    {showWorkedSolutions && (
                      <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/60 text-xs text-blue-950 dark:text-blue-200 leading-relaxed">
                        <span className="font-extrabold text-blue-900 dark:text-blue-300 block mb-0.5">
                          AQA Mark Scheme & Mathematical Method:
                        </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OFFICIAL EXAM SPECIFICATIONS */}
        {activeTab === 'specifications' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {EXAM_SPECIFICATIONS.map((spec) => (
                <div
                  key={spec.code}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between hover:border-blue-400 dark:hover:border-blue-500 transition-all shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-black px-2.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300">
                        {spec.code}
                      </span>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {spec.level}
                      </span>
                    </div>

                    <h3 className="font-black text-base text-slate-900 dark:text-slate-100 leading-snug mt-1">
                      {spec.title}
                    </h3>

                    <div className="mt-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
                        Structure:
                      </span>
                      {spec.assessmentStructure}
                    </div>

                    <div className="mt-4">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Key Examined Topics:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {spec.keyTopics.map((topic, tidx) => (
                          <span
                            key={tidx}
                            className="text-[11px] font-medium px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Board: {spec.board}</span>
                    <button
                      onClick={() => {
                        if (spec.code.includes('AQA 8300')) {
                          setActiveTab('aqa-modular');
                        } else {
                          const target = spec.level.includes('GCSE')
                            ? 'GCSE'
                            : spec.level.includes('Sixth')
                            ? 'A-Level'
                            : 'KS3';
                          onOpenDiagnostic(target);
                        }
                      }}
                      className="text-xs font-bold text-blue-900 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Practice Questions <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Curriculum Level Navigator Fast Link */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-black text-lg">Looking for Primary to University Curriculum Ladders?</h4>
                <p className="text-xs sm:text-sm text-blue-200 mt-0.5">
                  Explore full syllabus details across all 5 British key stages in our stage explorer.
                </p>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById('curriculum-ladder-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-white text-blue-950 font-black text-xs hover:bg-blue-50 transition-colors shrink-0 cursor-pointer"
              >
                View 5-Stage Ladder
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: PROGRESSION & EXAM SEASON TIMELINE */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <div className="max-w-4xl mx-auto">
              <div className="relative border-l-2 border-blue-900/30 dark:border-blue-500/30 ml-4 sm:ml-6 space-y-8 py-2">
                {EXAM_TIMELINE.map((item, idx) => (
                  <div key={idx} className="relative pl-6 sm:pl-8">
                    {/* Timeline Node Bullet */}
                    <div
                      className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 bg-white dark:bg-slate-900 ${
                        item.importance === 'critical'
                          ? 'border-rose-500 ring-4 ring-rose-500/20'
                          : item.importance === 'milestone'
                          ? 'border-amber-500 ring-4 ring-amber-500/20'
                          : 'border-blue-500 ring-4 ring-blue-500/20'
                      }`}
                    />

                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 shadow-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-black text-blue-900 dark:text-blue-400">
                          {item.period}
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {item.stage}
                        </span>
                      </div>
                      <h4 className="text-base font-black text-slate-900 dark:text-slate-100">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: INTERACTIVE TOPIC CHECKLISTS */}
        {activeTab === 'checklists' && (
          <div className="space-y-6">
            {/* Stage Selector Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {REVISION_CHECKLISTS.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedSchoolLevel(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedSchoolLevel === cat.id
                      ? 'bg-blue-900 dark:bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.stageTitle}
                </button>
              ))}
            </div>

            {/* Checklist Progress Bar */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Revision Mastery for {activeCategory.stageBadge}
                </div>
                <h4 className="text-lg font-black text-slate-900 dark:text-slate-100 mt-0.5">
                  {completedInActive} of {activeCategory.topics.length} Key Topics Mastered ({progressPercent}%)
                </h4>
              </div>
              <div className="w-full sm:w-64 h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shrink-0">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Checkable Topic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {activeCategory.topics.map((top) => {
                const isChecked = !!checkedTopics[top.id];
                return (
                  <div
                    key={top.id}
                    onClick={() => toggleTopicCheck(top.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                      isChecked
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/80'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-blue-300'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isChecked
                          ? 'bg-emerald-600 text-white'
                          : 'border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700'
                      }`}
                    >
                      {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-sm font-bold ${
                            isChecked
                              ? 'text-emerald-950 dark:text-emerald-200 line-through opacity-85'
                              : 'text-slate-900 dark:text-slate-100'
                          }`}
                        >
                          {top.title}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                          {top.board}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        {top.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: LEVEL-SPECIFIC 1-ON-1 TUTORING INQUIRY CARDS */}
        {activeTab === 'tutoring' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                Stage-Specific One-on-One Tutoring
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Select your student’s current academic level to connect directly with a dedicated UK specialist tutor on WhatsApp.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LEVEL_TUTORING_OFFERS.map((offer) => {
                const whatsappUrl = `${BASE_WHATSAPP_URL}?text=${encodeURIComponent(offer.whatsappQuery)}`;
                return (
                  <div
                    key={offer.id}
                    className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex flex-col justify-between shadow-xs hover:border-emerald-400 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                          {offer.badge}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">1-on-1 Online</span>
                      </div>

                      <h4 className="text-lg font-black text-slate-900 dark:text-slate-100">
                        {offer.headline}
                      </h4>
                      <div className="text-xs font-bold text-blue-900 dark:text-blue-400 mb-2">
                        {offer.stageName}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {offer.description}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-slate-700/80">
                        {offer.features.map((feat, fidx) => (
                          <div key={fidx} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-700">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer"
                        title={`Chat on WhatsApp for ${offer.stageName}`}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{offer.actionLabel}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
