import { Question, ExamMode, ExamDifficultyConfig, SubjectType } from '../types';
import { SEED_QUESTIONS } from '../data/seedQuestions';
import { sanitizeQuestion, normalizeQuestionText } from './questionSanitizer';

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates a specific number of strictly UNIQUE, balanced questions for a single subject.
 * - Enforces zero duplicate questions per session.
 * - Enforces exactly 4 distinct options per question.
 * - Draws from approvedPool and falls back seamlessly to the curated SEED_QUESTIONS bank.
 */
export function buildSubjectQuestions(
  approvedPool: Question[],
  subject: SubjectType,
  targetCount: number = 50,
  sessionUsedKeys: Set<string> = new Set<string>()
): Question[] {
  // Combine approvedPool with SEED_QUESTIONS for maximum variety
  const combinedCandidates: Question[] = [];
  const candidateKeys = new Set<string>();

  // Add from approvedPool first
  for (const q of approvedPool) {
    if (q && q.subject === subject) {
      const key = normalizeQuestionText(q.questionText);
      if (!candidateKeys.has(key) && !sessionUsedKeys.has(key)) {
        candidateKeys.add(key);
        combinedCandidates.push(sanitizeQuestion(q));
      }
    }
  }

  // Supplement from curated seed bank if needed
  for (const q of SEED_QUESTIONS) {
    if (q && q.subject === subject) {
      const key = normalizeQuestionText(q.questionText);
      if (!candidateKeys.has(key) && !sessionUsedKeys.has(key)) {
        candidateKeys.add(key);
        combinedCandidates.push(sanitizeQuestion(q));
      }
    }
  }

  // Randomize candidate pool
  const shuffledCandidates = shuffleArray(combinedCandidates);

  const selected: Question[] = [];
  for (const q of shuffledCandidates) {
    const key = normalizeQuestionText(q.questionText);
    if (!sessionUsedKeys.has(key)) {
      selected.push(sanitizeQuestion(q));
      sessionUsedKeys.add(key);
      if (selected.length === targetCount) break;
    }
  }

  // Robust procedural generator in the rare event targetCount > available pool
  let counter = 1;
  while (selected.length < targetCount) {
    let newQ: Question | null = null;

    if (subject === 'Mathematics') {
      const a = 12 + (counter * 3) + Math.floor(Math.random() * 25);
      const b = 6 + (counter * 2) + Math.floor(Math.random() * 15);
      const mult = a * b;
      const qText = `A school supplies depot packs stationery for local academies. If ${a} cartons are dispatched, each containing ${b} geometry sets, how many geometry sets are delivered in total? (Set ${counter})`;
      const key = normalizeQuestionText(qText);

      if (!sessionUsedKeys.has(key)) {
        sessionUsedKeys.add(key);
        newQ = {
          id: `dyn-math-${Date.now()}-${counter}`,
          subject: 'Mathematics',
          topic: 'Arithmetic & Problem Solving',
          difficulty: 'Hard',
          questionText: qText,
          options: shuffleArray([`${mult}`, `${mult + 12}`, `${mult - 10}`, `${mult + 24}`]),
          correctAnswer: `${mult}`,
          explanation: `Multiply cartons by items per carton: ${a} × ${b} = ${mult}.`,
          stepByStepSolution: `Step 1: Quantity of cartons = ${a}.\nStep 2: Sets per carton = ${b}.\nStep 3: Total = ${a} × ${b} = ${mult} geometry sets.`,
          sourceType: 'curated_seed',
          approved: true,
          createdAt: new Date().toISOString()
        };
      }
    } else if (subject === 'English') {
      const advancedVocabBank = [
        { word: 'SURREPTITIOUS', ans: 'Kept secret, especially because it would not be approved of', dist: ['Loud and celebratory', 'Open and transparent', 'Careless and sloppy'] },
        { word: 'UBIQUITOUS', ans: 'Present, appearing, or found everywhere', dist: ['Rare and scarce', 'Deeply buried', 'Ancient and prehistoric'] },
        { word: 'INDEFATIGABLE', ans: 'Persisting tirelessly; incapable of being fatigued', dist: ['Easily exhausted', 'Frail and sickly', 'Hesitant and doubtful'] },
        { word: 'SAGACITY', ans: 'The quality of having or showing keen mental discernment and good judgment', dist: ['Foolishness and gullibility', 'Cruelty and spite', 'Sluggishness'] },
        { word: 'PUGNACIOUS', ans: 'Eager or quick to argue, quarrel, or fight', dist: ['Peaceful and gentle', 'Timid and fearful', 'Generous and charitable'] },
        { word: 'EXACERBATE', ans: 'Make a problem, bad situation, or negative feeling worse', dist: ['To soothe and alleviate', 'To eliminate entirely', 'To praise openly'] },
        { word: 'PERFIDIOUS', ans: 'Deceitful and untrustworthy', dist: ['Extremely loyal', 'Humble and quiet', 'Energetic and lively'] },
        { word: 'EPHEMERAL', ans: 'Lasting for a very short time; transitory', dist: ['Everlasting and permanent', 'Heavy and dense', 'Ancient'] },
        { word: 'TACITURN', ans: 'Reserved or uncommunicative in speech; saying little', dist: ['Rambling and talkative', 'Furious and shouting', 'Jovial and laughing'] },
        { word: 'MAGNANIMOUS', ans: 'Generous or forgiving, especially towards a rival or less powerful person', dist: ['Petty and vindictive', 'Arrogant and haughty', 'Greedy and stingy'] },
        { word: 'SERENDIPITY', ans: 'The occurrence and development of events by chance in a happy or beneficial way', dist: ['Tragic misfortune', 'Careful deliberate planning', 'Sudden disaster'] },
        { word: 'LACONIC', ans: 'Using very few words; concise to the point of seeming rude', dist: ['Excessively verbose', 'Cheerfully singing', 'Fearful and trembling'] }
      ];

      const item = advancedVocabBank[(counter - 1) % advancedVocabBank.length];
      const qText = `Which definition most precisely conveys the meaning of the word "${item.word}" in formal English literature? (Reference #${counter})`;
      const key = normalizeQuestionText(qText);

      if (!sessionUsedKeys.has(key)) {
        sessionUsedKeys.add(key);
        newQ = {
          id: `dyn-eng-${Date.now()}-${counter}`,
          subject: 'English',
          topic: 'Advanced Vocabulary & Semantics',
          difficulty: 'Hard',
          questionText: qText,
          options: shuffleArray([item.ans, ...item.dist]),
          correctAnswer: item.ans,
          explanation: `"${item.word}" denotes ${item.ans.toLowerCase()}.`,
          stepByStepSolution: `Vocabulary root analysis: "${item.word}" accurately aligns with the definition "${item.ans}".`,
          sourceType: 'curated_seed',
          approved: true,
          createdAt: new Date().toISOString()
        };
      }
    } else {
      // Verbal Reasoning
      const step = 3 + (counter % 5);
      const start = 4 + (counter * 3);
      const n1 = start;
      const n2 = n1 + step;
      const n3 = n2 + step;
      const n4 = n3 + step;
      const correct = `${n4 + step}`;
      const qText = `Determine the missing value to continue the mathematical progression: ${n1}, ${n2}, ${n3}, ${n4}, ( ? ) (Progression #${counter})`;
      const key = normalizeQuestionText(qText);

      if (!sessionUsedKeys.has(key)) {
        sessionUsedKeys.add(key);
        newQ = {
          id: `dyn-vr-${Date.now()}-${counter}`,
          subject: 'Verbal Reasoning',
          topic: 'Number Sequences & Operations',
          difficulty: 'Hard',
          questionText: qText,
          options: shuffleArray([
            correct,
            `${n4 + step + 2}`,
            `${n4 + step - 3}`,
            `${n4 + step + 5}`
          ]),
          correctAnswer: correct,
          explanation: `The common step difference is +${step}: ${n4} + ${step} = ${correct}.`,
          stepByStepSolution: `Step 1: Calculate sequence interval: ${n2} - ${n1} = ${step}.\nStep 2: Add ${step} to the final term: ${n4} + ${step} = ${correct}.`,
          sourceType: 'curated_seed',
          approved: true,
          createdAt: new Date().toISOString()
        };
      }
    }

    if (newQ) {
      selected.push(sanitizeQuestion(newQ));
    }
    counter++;
  }

  // Final sanity check: ensure strictly targetCount and all sanitized
  return selected.slice(0, targetCount).map(sanitizeQuestion);
}

/**
 * Builds the complete examination question set:
 * - For 'Mixed': Generates 150 questions organized into 3 sections:
 *   50 Mathematics (Q1-50) + 50 English (Q51-100) + 50 Verbal Reasoning (Q101-150)
 *   Enforces ZERO duplicate questions across the entire 150-question session.
 * - For single subjects: Generates 50 strictly unique questions for the selected subject.
 */
export function buildDynamic50Exam(
  approvedPool: Question[],
  mode: ExamMode,
  config?: ExamDifficultyConfig
): Question[] {
  // Session-wide registry to guarantee no question is repeated anywhere in this exam attempt
  const sessionUsedKeys = new Set<string>();

  if (mode === 'Mixed') {
    const mathQuestions = buildSubjectQuestions(approvedPool, 'Mathematics', 50, sessionUsedKeys);
    const engQuestions = buildSubjectQuestions(approvedPool, 'English', 50, sessionUsedKeys);
    const vrQuestions = buildSubjectQuestions(approvedPool, 'Verbal Reasoning', 50, sessionUsedKeys);

    // Arranged section by section so 5-minute breaks occur naturally between subjects
    return [...mathQuestions, ...engQuestions, ...vrQuestions];
  }

  // Single Subject Mode (50 questions)
  return buildSubjectQuestions(approvedPool, mode as SubjectType, 50, sessionUsedKeys);
}
