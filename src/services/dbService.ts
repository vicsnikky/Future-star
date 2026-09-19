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

// 1. Initialize Seed Data if Question Bank is empty
export async function ensureSeedQuestionsLoaded(): Promise<number> {
  try {
    const qSnap = await getDocs(query(collection(db, QUESTIONS_COLLECTION), limit(1)));
    if (!qSnap.empty) {
      return 0; // Already seeded
    }

    let count = 0;
    for (const item of SEED_QUESTIONS) {
      const qRef = doc(collection(db, QUESTIONS_COLLECTION));
      await setDoc(qRef, {
        ...item,
        id: qRef.id,
        createdAt: new Date().toISOString(),
      });
      count++;
    }
    return count;
  } catch (error) {
    console.error('Error ensuring seed questions in Firestore:', error);
    return 0;
  }
}

// 2. Fetch all approved questions for exams
export async function getApprovedQuestions(subject?: string): Promise<Question[]> {
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
    const questions: Question[] = [];
    snap.forEach((docSnap) => {
      questions.push({ id: docSnap.id, ...docSnap.data() } as Question);
    });

    // Fallback if Firestore query was empty or offline before seeding
    if (questions.length === 0) {
      const filtered = SEED_QUESTIONS.filter(q => !subject || subject === 'Mixed' || q.subject === subject);
      return filtered.map((q, idx) => ({ ...q, id: `seed-local-${idx}` }));
    }

    return questions;
  } catch (err) {
    console.warn('Falling back to local curated seed questions:', err);
    const filtered = SEED_QUESTIONS.filter(q => !subject || subject === 'Mixed' || q.subject === subject);
    return filtered.map((q, idx) => ({ ...q, id: `seed-local-${idx}` }));
  }
}

// 3. Fetch all questions for Admin review (approved, pending, rejected)
export async function getAllQuestionsForAdmin(): Promise<Question[]> {
  try {
    const snap = await getDocs(collection(db, QUESTIONS_COLLECTION));
    const list: Question[] = [];
    snap.forEach((docSnap) => {
      list.push({ id: docSnap.id, ...docSnap.data() } as Question);
    });
    if (list.length === 0) {
      return SEED_QUESTIONS.map((q, idx) => ({ ...q, id: `seed-${idx}` }));
    }
    return list;
  } catch (error) {
    console.error('Error getting admin questions:', error);
    return SEED_QUESTIONS.map((q, idx) => ({ ...q, id: `seed-${idx}` }));
  }
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
  try {
    const snap = await getDocs(collection(db, PDFS_COLLECTION));
    const list: PdfDocument[] = [];
    snap.forEach(d => list.push({ id: d.id, ...d.data() } as PdfDocument));
    return list;
  } catch (e) {
    console.error('Error getting PDF documents:', e);
    return [];
  }
}

export async function savePdfDocument(docData: Omit<PdfDocument, 'id'>): Promise<PdfDocument> {
  const docRef = doc(collection(db, PDFS_COLLECTION));
  const newPdf: PdfDocument = { ...docData, id: docRef.id };
  await setDoc(docRef, newPdf);
  return newPdf;
}

// 12. Exam settings config
export async function getExamConfig(): Promise<ExamDifficultyConfig> {
  const defaultConf: ExamDifficultyConfig = {
    easyCount: 15,
    mediumCount: 25,
    hardCount: 10,
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
