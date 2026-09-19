import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle,
  XCircle,
  Edit2,
  Trash2,
  Settings,
  Search,
  Filter,
  Plus,
  ArrowRight,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { Question, SubjectType, DifficultyLevel, PdfDocument, ExamDifficultyConfig } from '../types';
import { generateAIQuestions, extractQuestionsFromPdfText } from '../services/aiService';
import {
  saveQuestion,
  updateQuestion,
  deleteQuestion,
  savePdfDocument,
  saveExamConfig
} from '../services/dbService';

interface AdminDashboardProps {
  questions: Question[];
  pdfDocs: PdfDocument[];
  examConfig: ExamDifficultyConfig;
  onRefreshData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  questions,
  pdfDocs,
  examConfig,
  onRefreshData,
}) => {
  const [activeTab, setActiveTab] = useState<'question_bank' | 'ai_generator' | 'pdf_upload' | 'settings'>('question_bank');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending'>('all');

  // AI Generator Form
  const [aiSubject, setAiSubject] = useState<SubjectType>('Mathematics');
  const [aiTopic, setAiTopic] = useState('Fractions');
  const [aiDifficulty, setAiDifficulty] = useState<DifficultyLevel>('Medium');
  const [aiCount, setAiCount] = useState<number>(5);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiGeneratedPreview, setAiGeneratedPreview] = useState<Omit<Question, 'id'>[]>([]);

  // PDF Extraction Simulation / OCR
  const [pdfUploading, setPdfUploading] = useState(false);
  const [extractedPreview, setExtractedPreview] = useState<Omit<Question, 'id'>[]>([]);
  const [currentPdfName, setCurrentPdfName] = useState('');

  // Editing Modal / Inline
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Settings state
  const [localConfig, setLocalConfig] = useState<ExamDifficultyConfig>(examConfig);
  const [configSaved, setConfigSaved] = useState(false);

  // Filtered Question Bank
  const filteredQuestions = questions.filter(q => {
    const matchesSearch = !searchQuery ||
      q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubject = filterSubject === 'All' || q.subject === filterSubject;
    const matchesStatus = filterStatus === 'all' ||
      (filterStatus === 'approved' && q.approved) ||
      (filterStatus === 'pending' && !q.approved);

    return matchesSearch && matchesSubject && matchesStatus;
  });

  // Action Handlers
  const handleApproveQuestion = async (q: Question) => {
    await updateQuestion(q.id, { approved: true, reviewedAt: new Date().toISOString() });
    onRefreshData();
  };

  const handleRejectOrDelete = async (id: string) => {
    await deleteQuestion(id);
    onRefreshData();
  };

  const handleSaveEditedQuestion = async () => {
    if (!editingQuestion) return;
    await updateQuestion(editingQuestion.id, editingQuestion);
    setEditingQuestion(null);
    onRefreshData();
  };

  // Generate AI Questions
  const handleRunAiGenerator = async (e: React.FormEvent) => {
    e.preventDefault();
    setAiGenerating(true);
    try {
      const generated = await generateAIQuestions({
        subject: aiSubject,
        topic: aiTopic,
        difficulty: aiDifficulty,
        count: aiCount,
      });
      setAiGeneratedPreview(generated);
    } catch (err) {
      console.error('Failed to generate AI questions:', err);
    } finally {
      setAiGenerating(false);
    }
  };

  // Save Approved AI Questions into active Question Bank
  const handleApproveAiQuestion = async (item: Omit<Question, 'id'>, index: number) => {
    await saveQuestion({
      ...item,
      approved: true, // Marked approved by admin
      reviewedAt: new Date().toISOString(),
    });
    setAiGeneratedPreview(prev => prev.filter((_, i) => i !== index));
    onRefreshData();
  };

  // PDF File Selection and Processing
  const handlePdfFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPdfUploading(true);
    setCurrentPdfName(file.name);

    // Read text content or simulate OCR text
    const reader = new FileReader();
    reader.onload = async () => {
      const text = (reader.result as string) || '';
      const extracted = await extractQuestionsFromPdfText(file.name, text || 'Sample 11+ past paper text with questions');

      setExtractedPreview(extracted);

      // Save PDF Document meta
      await savePdfDocument({
        name: file.name,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        extractedCount: extracted.length,
        approvedCount: 0,
        status: 'processed'
      });

      setPdfUploading(false);
      onRefreshData();
    };

    // Read as text
    reader.readAsText(file);
  };

  const handleApproveExtractedQuestion = async (item: Omit<Question, 'id'>, index: number) => {
    await saveQuestion({
      ...item,
      approved: true,
      reviewedAt: new Date().toISOString(),
    });
    setExtractedPreview(prev => prev.filter((_, i) => i !== index));
    onRefreshData();
  };

  const handleSaveConfig = async () => {
    await saveExamConfig(localConfig);
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
            FUTURE STARS Administrator Portal
          </div>
          <h1 className="text-2xl font-black mt-1">Question Bank & Curriculum Control</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage approved 11+ questions, review OCR extractions from past paper PDFs, and generate new questions with AI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRefreshData}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Refresh database"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('question_bank')}
          className={`px-4 py-3 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'question_bank'
              ? 'border-blue-900 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Question Bank ({questions.length})
        </button>
        <button
          onClick={() => setActiveTab('ai_generator')}
          className={`px-4 py-3 text-sm font-bold border-b-2 flex items-center gap-1.5 transition-all ${
            activeTab === 'ai_generator'
              ? 'border-blue-900 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          AI Question Generator
        </button>
        <button
          onClick={() => setActiveTab('pdf_upload')}
          className={`px-4 py-3 text-sm font-bold border-b-2 flex items-center gap-1.5 transition-all ${
            activeTab === 'pdf_upload'
              ? 'border-blue-900 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <UploadCloud className="w-4 h-4 text-blue-600" />
          Past Paper PDF OCR & Extraction
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-3 text-sm font-bold border-b-2 flex items-center gap-1.5 transition-all ${
            activeTab === 'settings'
              ? 'border-blue-900 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Settings className="w-4 h-4 text-slate-600" />
          Exam Settings
        </button>
      </div>

      {/* Tab 1: Question Bank */}
      {activeTab === 'question_bank' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search questions by text or topic..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-blue-900"
              />
            </div>

            <select
              value={filterSubject}
              onChange={e => setFilterSubject(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white"
            >
              <option value="All">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="English">English</option>
              <option value="Verbal Reasoning">Verbal Reasoning</option>
            </select>

            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white"
            >
              <option value="all">All Approval Status</option>
              <option value="approved">Approved for Students</option>
              <option value="pending">Pending Approval</option>
            </select>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Subject & Topic</th>
                    <th className="px-4 py-3">Question</th>
                    <th className="px-4 py-3">Correct Answer</th>
                    <th className="px-4 py-3">Source</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {filteredQuestions.map(q => (
                    <tr key={q.id} className="hover:bg-slate-50/70">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-bold text-slate-900 block">{q.subject}</span>
                        <span className="text-slate-500">{q.topic} • {q.difficulty}</span>
                      </td>
                      <td className="px-4 py-3 max-w-md">
                        <span className="font-medium text-slate-800 line-clamp-2">{q.questionText}</span>
                      </td>
                      <td className="px-4 py-3 font-bold text-emerald-700 whitespace-nowrap">
                        {q.correctAnswer}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                        {q.sourceType}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          q.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {q.approved ? 'Approved' : 'Pending Review'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap space-x-1">
                        {!q.approved && (
                          <button
                            onClick={() => handleApproveQuestion(q)}
                            className="p-1.5 rounded-md bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            title="Approve Question"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => setEditingQuestion(q)}
                          className="p-1.5 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200"
                          title="Edit Question"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRejectOrDelete(q.id)}
                          className="p-1.5 rounded-md bg-rose-100 text-rose-800 hover:bg-rose-200"
                          title="Delete Question"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: AI Question Generator */}
      {activeTab === 'ai_generator' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Generate Original 11+ Examination Questions
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              AI crafts new, high-difficulty questions testing similar reasoning patterns. Generated questions require administrator review before entering the student question bank.
            </p>

            <form onSubmit={handleRunAiGenerator} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                <select
                  value={aiSubject}
                  onChange={e => {
                    const s = e.target.value as SubjectType;
                    setAiSubject(s);
                    if (s === 'Mathematics') setAiTopic('Fractions');
                    else if (s === 'English') setAiTopic('Vocabulary');
                    else setAiTopic('Letter sequences');
                  }}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="English">English</option>
                  <option value="Verbal Reasoning">Verbal Reasoning</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Topic</label>
                <input
                  type="text"
                  value={aiTopic}
                  onChange={e => setAiTopic(e.target.value)}
                  placeholder="e.g. Percentages"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Difficulty</label>
                <select
                  value={aiDifficulty}
                  onChange={e => setAiDifficulty(e.target.value as DifficultyLevel)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={aiCount}
                  onChange={e => setAiCount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300"
                />
              </div>

              <div className="sm:col-span-4 pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={aiGenerating}
                  className="px-6 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-colors disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  {aiGenerating ? 'Generating Questions...' : 'Generate Questions with AI'}
                </button>
              </div>
            </form>
          </div>

          {/* AI Generated Preview List for Admin Review & Quality Control */}
          {aiGeneratedPreview.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900">
                  AI Generated Questions for Review ({aiGeneratedPreview.length})
                </h3>
                <span className="text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  Quality Control: Verify calculations & explanations before approving
                </span>
              </div>

              <div className="space-y-4">
                {aiGeneratedPreview.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900">{item.subject}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">{item.topic}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">{item.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApproveAiQuestion(item, idx)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Approve Question
                        </button>
                        <button
                          onClick={() => setAiGeneratedPreview(prev => prev.filter((_, i) => i !== idx))}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-rose-700 font-bold text-xs"
                        >
                          Reject
                        </button>
                      </div>
                    </div>

                    <div className="font-bold text-sm text-slate-900">{item.questionText}</div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {item.options.map((opt, optIdx) => (
                        <div
                          key={optIdx}
                          className={`p-2 rounded-lg border ${
                            opt === item.correctAnswer ? 'bg-emerald-50 border-emerald-400 font-bold text-emerald-900' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}. {opt}
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
                      <p><strong>Explanation:</strong> {item.explanation}</p>
                      {item.stepByStepSolution && <p><strong>Solution:</strong> {item.stepByStepSolution}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: PDF Upload & OCR Extraction */}
      {activeTab === 'pdf_upload' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-blue-600" />
              Upload 11+ Past Question Papers (PDF)
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Upload selectable or scanned PDF past papers. The AI extracts question texts, options, and answer keys. Extracted questions remain in pending status until reviewed and approved.
            </p>

            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                id="pdf-upload-file-input"
                accept=".pdf,.txt,.doc"
                onChange={handlePdfFileSelect}
                className="hidden"
              />
              <label
                htmlFor="pdf-upload-file-input"
                className="cursor-pointer flex flex-col items-center justify-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-bold text-sm text-blue-900 hover:underline">
                    Click to browse or drag and drop past paper PDF
                  </span>
                  <p className="text-xs text-slate-400 mt-1">Supports PDF format (Max 25MB)</p>
                </div>
              </label>
            </div>

            {pdfUploading && (
              <div className="mt-4 p-4 rounded-xl bg-blue-50 text-blue-900 text-xs flex items-center gap-3">
                <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                <span>Processing & extracting 11+ questions from {currentPdfName}...</span>
              </div>
            )}
          </div>

          {/* Extracted Questions Pending Approval */}
          {extractedPreview.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900">
                  Extracted Questions Pending Approval from &ldquo;{currentPdfName}&rdquo; ({extractedPreview.length})
                </h3>
              </div>

              <div className="space-y-4">
                {extractedPreview.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900">{item.subject}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">{item.topic}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">{item.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApproveExtractedQuestion(item, idx)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Approve for Active Bank
                        </button>
                        <button
                          onClick={() => setExtractedPreview(prev => prev.filter((_, i) => i !== idx))}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-rose-700 font-bold text-xs"
                        >
                          Reject
                        </button>
                      </div>
                    </div>

                    <div className="font-bold text-sm text-slate-900">{item.questionText}</div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {item.options.map((opt, optIdx) => (
                        <div
                          key={optIdx}
                          className={`p-2 rounded-lg border ${
                            opt === item.correctAnswer ? 'bg-emerald-50 border-emerald-400 font-bold text-emerald-900' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}. {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* List of uploaded PDF documents */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-4">
              Uploaded Past Paper Documents ({pdfDocs.length})
            </h3>
            {pdfDocs.length === 0 ? (
              <p className="text-xs text-slate-400">No documents uploaded yet.</p>
            ) : (
              <div className="space-y-2">
                {pdfDocs.map(doc => (
                  <div key={doc.id} className="p-3 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-blue-900" />
                      <div>
                        <span className="font-bold text-slate-800">{doc.name}</span>
                        <span className="text-slate-400 ml-2">({Math.round(doc.size / 1024)} KB)</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Exam Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6 max-w-2xl">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Examination Difficulty & Rules Configuration</h2>
            <p className="text-xs text-slate-500 mt-1">
              Configure the distribution of questions across difficulty levels for 50-question examination attempts.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Easy Questions</label>
                <input
                  type="number"
                  value={localConfig.easyCount}
                  onChange={e => setLocalConfig(prev => ({ ...prev, easyCount: Number(e.target.value) }))}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Medium Questions</label>
                <input
                  type="number"
                  value={localConfig.mediumCount}
                  onChange={e => setLocalConfig(prev => ({ ...prev, mediumCount: Number(e.target.value) }))}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hard Questions</label>
                <input
                  type="number"
                  value={localConfig.hardCount}
                  onChange={e => setLocalConfig(prev => ({ ...prev, hardCount: Number(e.target.value) }))}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600">
              Total Questions: <span className="font-bold">{localConfig.easyCount + localConfig.mediumCount + localConfig.hardCount}</span> (Target: exactly 50 questions)
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <input
                  type="checkbox"
                  checked={localConfig.negativeMarking}
                  onChange={e => setLocalConfig(prev => ({ ...prev, negativeMarking: e.target.checked }))}
                  className="w-4 h-4 rounded border-slate-300 text-blue-900"
                />
                Enable Negative Marking (Deduct 0.25 marks for incorrect answers)
              </label>
              <p className="text-xs text-slate-500 mt-1 pl-6">
                Disabled by default. When enabled, tests will deduct penalty points.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              {configSaved && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Settings updated successfully!
                </span>
              )}
              <button
                onClick={handleSaveConfig}
                className="px-6 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm shadow-xs ml-auto transition-colors"
              >
                Save Exam Configuration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Question Edit Modal */}
      {editingQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-900">Edit 11+ Question</h3>
              <button
                onClick={() => setEditingQuestion(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Question Text</label>
              <textarea
                rows={3}
                value={editingQuestion.questionText}
                onChange={e => setEditingQuestion({ ...editingQuestion, questionText: e.target.value })}
                className="w-full p-2.5 text-sm rounded-lg border border-slate-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {editingQuestion.options.map((opt, i) => (
                <div key={i}>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Option {String.fromCharCode(65 + i)}
                  </label>
                  <input
                    type="text"
                    value={opt}
                    onChange={e => {
                      const newOpts = [...editingQuestion.options];
                      newOpts[i] = e.target.value;
                      setEditingQuestion({ ...editingQuestion, options: newOpts });
                    }}
                    className="w-full p-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Correct Answer</label>
              <input
                type="text"
                value={editingQuestion.correctAnswer}
                onChange={e => setEditingQuestion({ ...editingQuestion, correctAnswer: e.target.value })}
                className="w-full p-2 text-xs rounded-lg border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Explanation</label>
              <textarea
                rows={2}
                value={editingQuestion.explanation}
                onChange={e => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
                className="w-full p-2 text-xs rounded-lg border border-slate-300"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setEditingQuestion(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditedQuestion}
                className="px-5 py-2 rounded-lg bg-blue-900 text-white text-xs font-bold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
