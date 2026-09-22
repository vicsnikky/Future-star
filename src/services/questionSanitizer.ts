import { Question } from '../types';

/**
 * Normalizes question text for deduplication checks:
 * strips punctuation, whitespace, and converts to lowercase.
 */
export function normalizeQuestionText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

/**
 * Sanitizes a question to guarantee:
 * 1. Exactly 4 distinct options (no duplicate strings, case-insensitive).
 * 2. The correctAnswer is present in the options.
 * 3. All options are non-empty and trimmed.
 */
export function sanitizeQuestion(q: Question): Question {
  const rawCorrect = String(q.correctAnswer ?? '').trim();
  const rawOptions = Array.isArray(q.options)
    ? q.options.map(o => String(o ?? '').trim()).filter(o => o.length > 0)
    : [];

  const uniqueOptions: string[] = [];
  const seenLower = new Set<string>();

  // Add options while filtering out duplicates
  for (const opt of rawOptions) {
    const lower = opt.toLowerCase();
    if (!seenLower.has(lower)) {
      seenLower.add(lower);
      uniqueOptions.push(opt);
    }
  }

  // Ensure correctAnswer is included
  const correctLower = rawCorrect.toLowerCase();
  if (rawCorrect && !seenLower.has(correctLower)) {
    if (uniqueOptions.length >= 4) {
      uniqueOptions[uniqueOptions.length - 1] = rawCorrect;
      seenLower.add(correctLower);
    } else {
      uniqueOptions.push(rawCorrect);
      seenLower.add(correctLower);
    }
  }

  // If fewer than 4 unique options, synthesize plausible distinct options
  let fillCounter = 1;
  while (uniqueOptions.length < 4) {
    const isCurrency = rawCorrect.startsWith('£') || rawCorrect.startsWith('$');
    const numericMatch = rawCorrect.match(/[-+]?[0-9]*\.?[0-9]+/);
    const num = numericMatch ? parseFloat(numericMatch[0]) : NaN;

    if (!isNaN(num) && num !== 0) {
      const prefix = isCurrency ? rawCorrect[0] : '';
      const suffix = rawCorrect.replace(/^[£$]/, '').replace(/[-+]?[0-9]*\.?[0-9]+/, '');
      const offsets = [10, -10, 15, -15, 20, -20, 5, -5, 25, 30, 2, -2, 1, -1];
      const offset = offsets[(fillCounter - 1) % offsets.length] * (num > 100 ? 5 : 1);
      const newNum = Math.max(1, Math.round((num + offset) * 100) / 100);
      const candidate = `${prefix}${newNum}${suffix}`;

      if (!seenLower.has(candidate.toLowerCase())) {
        uniqueOptions.push(candidate);
        seenLower.add(candidate.toLowerCase());
      }
    } else {
      const wordFallbacks = [
        'None of the above',
        'Cannot be determined from the passage',
        'Both statements are correct',
        'Neither statement is correct',
        'Insufficient contextual information',
        'Partially accurate',
        'Inconclusive evidence'
      ];
      const candidate = wordFallbacks[(fillCounter - 1) % wordFallbacks.length];
      if (!seenLower.has(candidate.toLowerCase())) {
        uniqueOptions.push(candidate);
        seenLower.add(candidate.toLowerCase());
      }
    }
    fillCounter++;
  }

  // Guarantee exactly 4 options
  const finalOptions = uniqueOptions.slice(0, 4);

  // Final check: is correctAnswer definitely in finalOptions?
  if (rawCorrect && !finalOptions.some(o => o.toLowerCase() === correctLower)) {
    finalOptions[0] = rawCorrect;
  }

  return {
    ...q,
    options: finalOptions,
    correctAnswer: rawCorrect || finalOptions[0]
  };
}

/**
 * Deduplicates an array of questions:
 * - Ensures each question text is unique.
 * - Ensures every question's options are sanitized (no duplicates).
 */
export function deduplicateQuestions(questions: Question[]): Question[] {
  const result: Question[] = [];
  const seenTexts = new Set<string>();

  for (const q of questions) {
    if (!q || !q.questionText) continue;
    const key = normalizeQuestionText(q.questionText);
    if (!seenTexts.has(key)) {
      seenTexts.add(key);
      result.push(sanitizeQuestion(q));
    }
  }

  return result;
}
