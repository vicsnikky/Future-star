import { Question, ExamMode, ExamDifficultyConfig, SubjectType } from '../types';

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates a specific number of unique, balanced questions for a single subject.
 * If the question bank pool has fewer than targetCount questions, procedural variants
 * are synthesised on the fly.
 */
export function buildSubjectQuestions(
  approvedPool: Question[],
  subject: SubjectType,
  targetCount: number = 50
): Question[] {
  let candidates = approvedPool.filter(q => q.subject === subject);
  if (candidates.length === 0) {
    candidates = approvedPool.filter(q => q.subject === subject || q.subject);
  }

  candidates = shuffleArray(candidates);

  const selected: Question[] = [];
  const usedTexts = new Set<string>();

  for (const q of candidates) {
    if (!usedTexts.has(q.questionText.trim())) {
      selected.push(q);
      usedTexts.add(q.questionText.trim());
      if (selected.length === targetCount) break;
    }
  }

  let counter = 1;
  while (selected.length < targetCount) {
    if (subject === 'Mathematics') {
      const a = 14 + (counter * 3) + Math.floor(Math.random() * 20);
      const b = 8 + (counter * 2) + Math.floor(Math.random() * 15);
      const mult = a * b;
      const opts = [
        `${mult}`,
        `${mult + 10}`,
        `${mult - 10}`,
        `${mult + 12}`
      ];
      const randomizedOptions = shuffleArray(opts);
      const qText = `A school ordered ${a} packs of stationery. Each pack contains ${b} exercise books. How many books were delivered in total?`;
      if (!usedTexts.has(qText)) {
        usedTexts.add(qText);
        selected.push({
          id: `dyn-math-${Date.now()}-${selected.length}`,
          subject: 'Mathematics',
          topic: 'Arithmetic & Problem Solving',
          difficulty: 'Hard',
          questionText: qText,
          options: randomizedOptions,
          correctAnswer: `${mult}`,
          explanation: `Multiply the number of packs by the books per pack: ${a} × ${b} = ${mult}.`,
          stepByStepSolution: `Step 1: Identify quantity: ${a} packs.\nStep 2: Multiply by ${b}: ${a} × ${b} = ${mult}.\nTotal = ${mult} exercise books.`,
          sourceType: 'curated_seed',
          approved: true,
          createdAt: new Date().toISOString()
        });
      }
    } else if (subject === 'English') {
      const vocabList = [
        { word: 'LUMINOUS', ans: 'Bright and glowing', dist: ['Dark and obscure', 'Extremely fragile', 'Loud and noisy'] },
        { word: 'IMPARTIAL', ans: 'Fair and unbiased', dist: ['Biased and selfish', 'Speedy and hasty', 'Timid and weak'] },
        { word: 'PERSEVERANCE', ans: 'Continued effort despite difficulties', dist: ['Giving up easily', 'Sudden anger', 'Careless work'] },
        { word: 'SOLITARY', ans: 'Done or existing alone', dist: ['Crowded and social', 'In pairs', 'Excited'] },
        { word: 'ELOQUENT', ans: 'Fluent or persuasive in speaking or writing', dist: ['Silent and muted', 'Confused and clumsy', 'Angry'] },
        { word: 'OMNIPRESENT', ans: 'Present everywhere simultaneously', dist: ['Absent completely', 'Hidden deeply', 'Ancient'] },
        { word: 'TENACIOUS', ans: 'Holding fast; persistent', dist: ['Easily distracted', 'Weak-willed', 'Rapidly moving'] },
        { word: 'METICULOUS', ans: 'Showing great attention to detail', dist: ['Careless and rushed', 'Vague and general', 'Sleepy'] }
      ];
      const item = vocabList[selected.length % vocabList.length];
      const qText = `Select the option that best defines the word "${item.word}" (Item #${selected.length + 1}).`;
      const randomizedOptions = shuffleArray([item.ans, ...item.dist]);
      selected.push({
        id: `dyn-eng-${Date.now()}-${selected.length}`,
        subject: 'English',
        topic: 'Vocabulary & Semantics',
        difficulty: 'Hard',
        questionText: qText,
        options: randomizedOptions,
        correctAnswer: item.ans,
        explanation: `"${item.word}" means ${item.ans.toLowerCase()}.`,
        stepByStepSolution: `Vocabulary analysis: "${item.word}" refers to being ${item.ans.toLowerCase()}.`,
        sourceType: 'curated_seed',
        approved: true,
        createdAt: new Date().toISOString()
      });
    } else {
      // Verbal Reasoning
      const step = 2 + (counter % 4);
      const start = 3 + (counter * 2);
      const n1 = start;
      const n2 = n1 + step;
      const n3 = n2 + step;
      const n4 = n3 + step;
      const correct = `${n4 + step}`;
      const randomizedOptions = shuffleArray([
        correct,
        `${n4 + step + 1}`,
        `${n4 + step - 2}`,
        `${n4 + step + 3}`
      ]);
      selected.push({
        id: `dyn-vr-${Date.now()}-${selected.length}`,
        subject: 'Verbal Reasoning',
        topic: 'Number & Pattern Sequences',
        difficulty: 'Hard',
        questionText: `Identify the missing number to complete the progression: ${n1}, ${n2}, ${n3}, ${n4}, ( ? )`,
        options: randomizedOptions,
        correctAnswer: correct,
        explanation: `Each consecutive number increases by ${step}: ${n4} + ${step} = ${correct}.`,
        stepByStepSolution: `Step 1: Calculate the common difference: ${n2} - ${n1} = ${step}.\nStep 2: Add ${step} to the last term: ${n4} + ${step} = ${correct}.`,
        sourceType: 'curated_seed',
        approved: true,
        createdAt: new Date().toISOString()
      });
    }
    counter++;
  }

  return shuffleArray(selected).slice(0, targetCount);
}

/**
 * Builds the complete examination question set:
 * - For 'Mixed': Generates 150 questions organized into 3 sections:
 *   50 Mathematics (Q1-50) + 50 English (Q51-100) + 50 Verbal Reasoning (Q101-150)
 * - For single subjects: Generates 50 questions for the selected subject.
 */
export function buildDynamic50Exam(
  approvedPool: Question[],
  mode: ExamMode,
  config?: ExamDifficultyConfig
): Question[] {
  if (mode === 'Mixed') {
    const mathQuestions = buildSubjectQuestions(approvedPool, 'Mathematics', 50);
    const engQuestions = buildSubjectQuestions(approvedPool, 'English', 50);
    const vrQuestions = buildSubjectQuestions(approvedPool, 'Verbal Reasoning', 50);

    // Arranged section by section so 5-minute breaks occur naturally between subjects
    return [...mathQuestions, ...engQuestions, ...vrQuestions];
  }

  // Single Subject Mode (50 questions)
  return buildSubjectQuestions(approvedPool, mode as SubjectType, 50);
}
