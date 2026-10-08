import { Question } from '../types';
import { MATHS_QUESTIONS } from './questions/mathsQuestions';
import { ENGLISH_QUESTIONS } from './questions/englishQuestions';
import { VERBAL_QUESTIONS } from './questions/verbalQuestions';
import { UK_CURRICULUM_MATHS_QUESTIONS } from './questions/ukCurriculumMaths';
import { UK_CURRICULUM_ENGLISH_QUESTIONS } from './questions/ukCurriculumEnglish';
import { UK_CURRICULUM_VERBAL_QUESTIONS } from './questions/ukCurriculumVerbal';
import { SCHOOL_LEVEL_QUESTIONS } from './questions/schoolLevelQuestions';
import { ALL_AQA_QUESTIONS } from './questions/aqaQuestions';
import { deduplicateQuestions } from '../services/questionSanitizer';

// Combined authentic UK National Curriculum Question Bank (11+, Key Stage 3, GCSE AQA/Edexcel, A-Levels)
export const SEED_QUESTIONS: Question[] = deduplicateQuestions([
  ...ALL_AQA_QUESTIONS,
  ...SCHOOL_LEVEL_QUESTIONS,
  ...UK_CURRICULUM_MATHS_QUESTIONS,
  ...UK_CURRICULUM_ENGLISH_QUESTIONS,
  ...UK_CURRICULUM_VERBAL_QUESTIONS,
  ...MATHS_QUESTIONS,
  ...ENGLISH_QUESTIONS,
  ...VERBAL_QUESTIONS,
]);
