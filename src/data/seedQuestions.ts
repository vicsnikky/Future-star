import { Question } from '../types';
import { MATHS_QUESTIONS } from './questions/mathsQuestions';
import { ENGLISH_QUESTIONS } from './questions/englishQuestions';
import { VERBAL_QUESTIONS } from './questions/verbalQuestions';
import { UK_CURRICULUM_MATHS_QUESTIONS } from './questions/ukCurriculumMaths';
import { UK_CURRICULUM_ENGLISH_QUESTIONS } from './questions/ukCurriculumEnglish';
import { UK_CURRICULUM_VERBAL_QUESTIONS } from './questions/ukCurriculumVerbal';

// Combined authentic 11+ Selective Grammar School Entrance Question Bank (UK National Curriculum & Past Papers)
export const SEED_QUESTIONS: Question[] = [
  ...UK_CURRICULUM_MATHS_QUESTIONS,
  ...UK_CURRICULUM_ENGLISH_QUESTIONS,
  ...UK_CURRICULUM_VERBAL_QUESTIONS,
  ...MATHS_QUESTIONS,
  ...ENGLISH_QUESTIONS,
  ...VERBAL_QUESTIONS,
];
