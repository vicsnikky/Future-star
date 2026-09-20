import { Question } from '../types';
import { MATHS_QUESTIONS } from './questions/mathsQuestions';
import { ENGLISH_QUESTIONS } from './questions/englishQuestions';
import { VERBAL_QUESTIONS } from './questions/verbalQuestions';

// Combined authentic 11+ Selective Grammar School Entrance Question Bank (760+ Hard questions)
export const SEED_QUESTIONS: Question[] = [
  ...MATHS_QUESTIONS,
  ...ENGLISH_QUESTIONS,
  ...VERBAL_QUESTIONS,
];
