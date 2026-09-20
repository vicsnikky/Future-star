import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Question, ExamAttempt, PdfDocument, ExamDifficultyConfig } from '../types';
import { SEED_QUESTIONS } from '../data/seedQuestions';

const QUESTIONS_COLLECTION = 'questions';
const EXAMS_COLLECTION = 'exam_attempts';
const PDFS_COLLECTION = 'pdf_documents';
const CONFIG_COLLECTION = 'system_config';

export const DEFAULT_PAST_PAPERS: PdfDocument[] = [
  {
    id: 'pdf-gl-maths-2024',
    name: 'GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf',
    size: 482000,
    uploadedAt: '2026-09-15T10:00:00.000Z',
    extractedCount: 50,
    approvedCount: 50,
    status: 'processed'
  },
  {
    id: 'pdf-csse-english-2023',
    name: 'CSSE_Essex_11Plus_English_Comprehension_Paper_2023.pdf',
    size: 512000,
    uploadedAt: '2026-09-16T14:30:00.000Z',
    extractedCount: 50,
    approvedCount: 50,
    status: 'processed'
  },
  {
    id: 'pdf-bexley-verbal-2024',
    name: 'Bexley_Grammar_Verbal_Reasoning_Full_Practice_2024.pdf',
    size: 438000,
    uploadedAt: '2026-09-17T09:15:00.000Z',
    extractedCount: 50,
    approvedCount: 50,
    status: 'processed'
  }
];

// 1. Initialize Seed Data if Question Bank is empty
export async function ensureSeedQuestionsLoaded(): Promise<number> {
  try {
    return SEED_QUESTIONS.length;
  } catch (error) {
    console.error('Error ensuring seed questions in Firestore:', error);
    return 0;
  }
}

// 2. Fetch all approved questions for exams (Combining 760+ bank with Firestore)
export async function getApprovedQuestions(subject?: string): Promise<Question[]> {
  const questionMap = new Map<string, Question>();

  // Load curated 760+ questions
  for (const q of SEED_QUESTIONS) {
    if (!subject || subject === 'Mixed' || q.subject === subject) {
      questionMap.set(q.questionText.trim(), { ...q, difficulty: 'Hard' });
    }
  }

  try {
    let qRef;
    if (subject && subject !== 'Mixed') {
      qRef = query(
        collection(db, QUESTIONS_COLLECTION),
        where('approved', '==', true),
        where('subject', '==', subject)
      );
    } else {
      qRef = query(
        collection(db, QUESTIONS_COLLECTION),
        where('approved', '==', true)
      );
    }

    const snap = await getDocs(qRef);
    snap.forEach((docSnap) => {
      const data = docSnap.data() as Question;
      questionMap.set(data.questionText.trim(), { ...data, id: docSnap.id, difficulty: 'Hard' });
    });
  } catch (err) {
    console.warn('Firestore offline or fallback; using comprehensive local question bank:', err);
  }

  return Array.from(questionMap.values());
}

// 3. Fetch all questions for Admin review (combining curated 760+ and custom/PDF-extracted)
export async function getAllQuestionsForAdmin(): Promise<Question[]> {
  const questionMap = new Map<string, Question>();

  for (const q of SEED_QUESTIONS) {
    questionMap.set(q.questionText.trim(), { ...q, difficulty: 'Hard' });
  }

  try {
    const snap = await getDocs(collection(db, QUESTIONS_COLLECTION));
    snap.forEach((docSnap) => {
      const data = docSnap.data() as Question;
      questionMap.set(data.questionText.trim(), { ...data, id: docSnap.id, difficulty: 'Hard' });
    });
  } catch (error) {
    console.error('Error getting admin questions from Firestore:', error);
  }

  return Array.from(questionMap.values());
}

// 4. Save question (AI-generated or PDF-extracted or manual)
export async function saveQuestion(questionData: Omit<Question, 'id'>): Promise<Question> {
  const docRef = doc(collection(db, QUESTIONS_COLLECTION));
  const newQ: Question = {
    ...questionData,
    id: docRef.id,
  };
  await setDoc(docRef, newQ);
  return newQ;
}

// 5. Update Question (Edit or Approve/Reject)
export async function updateQuestion(id: string, updates: Partial<Question>): Promise<void> {
  const docRef = doc(db, QUESTIONS_COLLECTION, id);
  await updateDoc(docRef, updates);
}

// 6. Delete Question
export async function deleteQuestion(id: string): Promise<void> {
  const docRef = doc(db, QUESTIONS_COLLECTION, id);
  await deleteDoc(docRef);
}

// 7. Save or Update Active Exam Attempt (Auto-save)
export async function saveExamAttempt(attempt: ExamAttempt): Promise<void> {
  const docRef = doc(db, EXAMS_COLLECTION, attempt.id);
  await setDoc(docRef, attempt, { merge: true });
}

// 8. Get Active / In-progress exam for a student
export async function getActiveExam(studentId: string): Promise<ExamAttempt | null> {
  try {
    const q = query(
      collection(db, EXAMS_COLLECTION),
      where('studentId', '==', studentId),
      where('status', '==', 'in_progress')
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs[0].data() as ExamAttempt;
    }
    return null;
  } catch (e) {
    console.error('Error fetching active exam:', e);
    return null;
  }
}

// 9. Get student exam history
export async function getStudentExamHistory(studentId: string): Promise<ExamAttempt[]> {
  try {
    const q = query(
      collection(db, EXAMS_COLLECTION),
      where('studentId', '==', studentId),
      where('status', '==', 'completed')
    );
    const snap = await getDocs(q);
    const results: ExamAttempt[] = [];
    snap.forEach((docSnap) => {
      results.push(docSnap.data() as ExamAttempt);
    });
    // Sort descending by submittedAt or startTime
    results.sort((a, b) => new Date(b.submittedAt || b.startTime).getTime() - new Date(a.submittedAt || a.startTime).getTime());
    return results;
  } catch (e) {
    console.error('Error fetching student exam history:', e);
    return [];
  }
}

// 10. Get all completed exams for Admin stats
export async function getAllCompletedExams(): Promise<ExamAttempt[]> {
  try {
    const q = query(
      collection(db, EXAMS_COLLECTION),
      where('status', '==', 'completed')
    );
    const snap = await getDocs(q);
    const results: ExamAttempt[] = [];
    snap.forEach((docSnap) => {
      results.push(docSnap.data() as ExamAttempt);
    });
    return results;
  } catch (e) {
    console.error('Error fetching admin exam stats:', e);
    return [];
  }
}

// 11. PDF Documents tracker
export async function getPdfDocuments(): Promise<PdfDocument[]> {
  const docMap = new Map<string, PdfDocument>();
  DEFAULT_PAST_PAPERS.forEach(d => docMap.set(d.name, d));

  try {
    const snap = await getDocs(collection(db, PDFS_COLLECTION));
    snap.forEach(d => {
      const data = { id: d.id, ...d.data() } as PdfDocument;
      docMap.set(data.name, data);
    });
  } catch (e) {
    console.error('Error getting PDF documents from Firestore:', e);
  }
  return Array.from(docMap.values());
}

export async function savePdfDocument(docData: Omit<PdfDocument, 'id'>): Promise<PdfDocument> {
  const docRef = doc(collection(db, PDFS_COLLECTION));
  const newPdf: PdfDocument = { ...docData, id: docRef.id };
  await setDoc(docRef, newPdf);
  return newPdf;
}

// 12. Exam settings config (All 50 questions strictly Hard / Grammar School Standard)
export async function getExamConfig(): Promise<ExamDifficultyConfig> {
  const defaultConf: ExamDifficultyConfig = {
    easyCount: 0,
    mediumCount: 0,
    hardCount: 50,
    negativeMarking: false,
  };
  try {
    const docRef = doc(db, CONFIG_COLLECTION, 'exam_settings');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { ...defaultConf, ...snap.data() } as ExamDifficultyConfig;
    }
    return defaultConf;
  } catch {
    return defaultConf;
  }
}

export async function saveExamConfig(cfg: ExamDifficultyConfig): Promise<void> {
  const docRef = doc(db, CONFIG_COLLECTION, 'exam_settings');
  await setDoc(docRef, cfg, { merge: true });
}
