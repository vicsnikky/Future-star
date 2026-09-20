export type SubjectType = 'English' | 'Mathematics' | 'Verbal Reasoning';
export type ExamMode = 'English' | 'Mathematics' | 'Verbal Reasoning' | 'Mixed';
export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: string;
  subject: SubjectType;
  topic: string;
  difficulty: DifficultyLevel;
  questionText: string;
  options: string[]; // typically A, B, C, D (and sometimes E)
  correctAnswer: string; // The text or matching option
  explanation: string;
  stepByStepSolution?: string;
  sourceType: 'past_paper' | 'ai_generated' | 'curated_seed' | 'admin_manual';
  sourcePdfName?: string;
  sourcePdfYear?: string;
  tags?: string[];
  approved: boolean;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'student' | 'admin';
  createdAt: string;
}

export interface ExamAttempt {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  isRegistered?: boolean;
  subject: ExamMode;
  startTime: string; // ISO string
  durationMinutes: number; // 40
  totalQuestions: number; // 50
  questions: Question[]; // The exact snapshot of 50 questions presented
  studentAnswers: Record<number, string>; // question index -> chosen answer
  flaggedQuestions: number[]; // array of question indices (0..49)
  status: 'in_progress' | 'completed' | 'abandoned';
  submittedAt?: string;
  timeUsedSeconds?: number;
  score?: number;
  percentage?: number;
  correctCount?: number;
  incorrectCount?: number;
  unansweredCount?: number;
  topicBreakdown?: Record<string, { total: number; correct: number }>;
}

export interface PdfDocument {
  id: string;
  name: string;
  size: number;
  uploadedAt: string;
  extractedCount: number;
  approvedCount: number;
  status: 'uploaded' | 'processing' | 'processed' | 'error';
}

export interface ExamDifficultyConfig {
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  negativeMarking: boolean;
}
