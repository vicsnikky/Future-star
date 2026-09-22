import React, { useState, useRef } from 'react';
import {
  GraduationCap,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Layers,
  Table,
  ChevronRight,
  ChevronDown,
  Calendar,
  Award,
  Globe2,
  Compass,
  Check
} from 'lucide-react';
import { CURRICULUM_STAGES, CurriculumStage } from '../data/curriculumStages';
import { ExamMode } from '../types';

interface CurriculumLadderNavigatorProps {
  onSelectSubject: (mode: ExamMode) => void;
  onStartPractising: () => void;
  onRegisterClick: () => void;
  selectedStageId?: string;
  onStageChange?: (stageId: string) => void;
}

export const CurriculumLadderNavigator: React.FC<CurriculumLadderNavigatorProps> = ({
  onSelectSubject,
  onStartPractising,
  onRegisterClick,
  selectedStageId,
  onStageChange,
}) => {
  const [internalStageId, setInternalStageId] = useState<string>('primary-education');
  const activeStageId = selectedStageId || internalStageId;
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const detailsRef = useRef<HTMLDivElement>(null);

  const activeStage = CURRICULUM_STAGES.find((s) => s.id === activeStageId) || CURRICULUM_STAGES[0];

  const handleStageSelect = (stageId: string) => {
    setInternalStageId(stageId);
    onStageChange?.(stageId);
    if (detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const toggleSolution = (key: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="curriculum-ladder-section" className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title & Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
              <GraduationCap className="w-4 h-4 text-blue-700 dark:text-blue-400" />
              UK National Curriculum & Academic Progression Ladder
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Explore Every Stage: Primary to University Entrance
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Navigate seamlessly through all 5 tiers of the British National Curriculum. Prepare for statutory KS2 SATs, selective 11+ grammar entrance, Key Stage 3 checkpoints, GCSEs (AQA, Edexcel, OCR), and Sixth Form AS/A-Levels leading to university matriculation.
            </p>
          </div>

          {/* View Mode Switcher (Detailed Explorer vs. Comparison Matrix Table) */}
          <div className="inline-flex p-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs shrink-0">
            <button
              id="curriculum-view-cards-btn"
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'cards'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Stage Explorer
            </button>
            <button
              id="curriculum-view-table-btn"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'table'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              Comparative Matrix
            </button>
          </div>
        </div>

        {/* 5-Step Stage Navigation Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
          {CURRICULUM_STAGES.map((stage) => {
            const isActive = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                id={`stage-nav-btn-${stage.stageNumber}`}
                onClick={() => handleStageSelect(stage.id)}
                className={`text-left p-4 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? 'border-blue-900 dark:border-blue-500 bg-white dark:bg-slate-800 shadow-md ring-2 ring-blue-900/15 dark:ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-blue-900 dark:bg-blue-500" />
                )}
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isActive
                        ? 'bg-blue-900 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      Stage {stage.stageNumber}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      {stage.ageRange}
                    </span>
                  </div>

                  <h3 className={`font-black text-sm leading-snug line-clamp-2 ${
                    isActive ? 'text-blue-950 dark:text-blue-300' : 'text-slate-800 dark:text-slate-200'
                  }`}>
                    {stage.name}
                  </h3>

                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                    {stage.ukYears}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-blue-900 dark:text-blue-400 truncate max-w-[140px]">
                    {stage.ukStageName}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${
                    isActive ? 'text-blue-900 dark:text-blue-400 translate-x-0.5' : 'text-slate-400'
                  }`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* View Mode 1: Detailed Stage Card & Explorer */}
        {viewMode === 'cards' && (
          <div ref={detailsRef} className="space-y-6">
            {/* Active Stage Hero Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-700">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-blue-900 text-white text-xs font-black uppercase tracking-wider">
                      Stage {activeStage.stageNumber}: {activeStage.ukStageName}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 text-xs font-bold border border-amber-300/40">
                      Typical Age: {activeStage.ageRange}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                      UK Years: {activeStage.ukYears}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
                    {activeStage.name}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-4xl leading-relaxed">
                    {activeStage.summary}
                  </p>
                </div>

                {/* Primary Action Button */}
                <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
                  <button
                    id="stage-active-action-btn"
                    onClick={() => {
                      if (activeStage.id === 'primary-education') {
                        onSelectSubject('Mixed');
                      } else {
                        onSelectSubject('Mathematics');
                      }
                    }}
                    className="px-6 py-3.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {activeStage.callToAction.label}
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {activeStage.id === 'primary-education' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectSubject('Mathematics')}
                        className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
                      >
                        Maths 50Q
                      </button>
                      <button
                        onClick={() => onSelectSubject('English')}
                        className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
                      >
                        English 50Q
                      </button>
                      <button
                        onClick={() => onSelectSubject('Verbal Reasoning')}
                        className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
                      >
                        VR 50Q
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* British Curriculum Qualification & Exam Boards Banner */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-400 mb-1.5">
                    <Globe2 className="w-3.5 h-3.5" />
                    National Qualification & Benchmark Award
                  </div>
                  <div className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                    {activeStage.benchmarkQualifications.primaryAward}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {activeStage.benchmarkQualifications.assessmentStandard}
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-400 mb-1.5">
                    <Award className="w-3.5 h-3.5" />
                    Official UK Examination Boards
                  </div>
                  <div className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                    {activeStage.examBoards}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Accredited awarding bodies and assessment providers across the United Kingdom.
                  </div>
                </div>
              </div>

              {/* Core Subjects Grid */}
              <div className="mt-8">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                  Key Subjects & Curriculum Modules
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activeStage.coreSubjects.map((subj, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between"
                    >
                      <div>
                        <div className="font-black text-base text-slate-900 dark:text-slate-100 mb-1">
                          {subj.name}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                          {subj.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {subj.topics.map((topic, tidx) => (
                          <span
                            key={tidx}
                            className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestones & Assessment Format */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                    Key Academic Progression Milestones
                  </h4>
                  <ul className="space-y-2">
                    {activeStage.keyMilestones.map((m, midx) => (
                      <li key={midx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                    Standard Assessment Structure
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    {activeStage.assessmentFormat}
                  </p>
                </div>
              </div>

              {/* Sample Authentic Questions for this Stage */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Authentic Stage Sample Questions
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Try solving before checking explanation
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeStage.sampleQuestions.map((sq, qidx) => {
                    const solKey = `${activeStage.id}-${qidx}`;
                    const isRevealed = !!revealedSolutions[solKey];

                    return (
                      <div
                        key={qidx}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                              {sq.subject}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
                            {sq.question}
                          </p>

                          <div className="mt-3 grid grid-cols-2 gap-1.5">
                            {sq.options.map((opt, oidx) => (
                              <div
                                key={oidx}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                                  isRevealed && opt === sq.correctAnswer
                                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700 font-bold'
                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                                }`}
                              >
                                {opt}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800">
                          <button
                            onClick={() => toggleSolution(solKey)}
                            className="text-xs font-bold text-blue-900 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            {isRevealed ? 'Hide Explanation' : 'View Correct Answer & Solution'}
                          </button>

                          {isRevealed && (
                            <div className="mt-2.5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed">
                              <div className="font-bold mb-1">Correct Answer: {sq.correctAnswer}</div>
                              <div>{sq.explanation}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Mode 2: Comprehensive Progression Matrix Table */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  <th className="p-4 font-black">Stage</th>
                  <th className="p-4 font-black">Age</th>
                  <th className="p-4 font-black">UK Key Stage & Years</th>
                  <th className="p-4 font-black">Primary Qualification / Benchmark</th>
                  <th className="p-4 font-black">Official UK Exam Boards</th>
                  <th className="p-4 font-black">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {CURRICULUM_STAGES.map((st) => (
                  <tr
                    key={st.id}
                    onClick={() => {
                      handleStageSelect(st.id);
                      setViewMode('cards');
                    }}
                    className="hover:bg-blue-50/50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                  >
                    <td className="p-4 font-black text-slate-900 dark:text-slate-100 whitespace-nowrap">
                      Stage {st.stageNumber}: {st.name}
                    </td>
                    <td className="p-4 font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {st.ageRange}
                    </td>
                    <td className="p-4 font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 font-bold">
                        {st.ukStageName} ({st.ukYears})
                      </span>
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">
                      {st.benchmarkQualifications.primaryAward}
                    </td>
                    <td className="p-4 text-blue-900 dark:text-blue-300 font-bold">
                      {st.examBoards}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStageSelect(st.id);
                          setViewMode('cards');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-900 text-white font-bold text-xs hover:bg-blue-800 transition-colors"
                      >
                        Explore Stage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
