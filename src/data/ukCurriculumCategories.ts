import { SubjectType } from '../types';

export interface CurriculumCategory {
  id: string;
  name: string;
  description: string;
  examFocus: string;
  badgeColor?: string;
}

export const UK_CURRICULUM_CATEGORIES: Record<SubjectType, CurriculumCategory[]> = {
  Mathematics: [
    {
      id: 'math-num-pv',
      name: 'Numbers & Place Value',
      description: 'Rounding, negative numbers, ordering decimals, prime numbers, factors & multiples',
      examFocus: 'Core KS2/11+ Foundation',
      badgeColor: 'blue'
    },
    {
      id: 'math-frac-dec-pct',
      name: 'Fractions, Decimals & Percentages',
      description: 'Fraction arithmetic, mixed numbers, percentage increase/decrease & equivalence',
      examFocus: 'High Frequency 11+ Topic',
      badgeColor: 'indigo'
    },
    {
      id: 'math-ratio-prop',
      name: 'Ratio & Proportion',
      description: 'Sharing in given ratios, direct proportion, unitary method & recipe scaling',
      examFocus: 'Grammar School Multi-Step',
      badgeColor: 'emerald'
    },
    {
      id: 'math-alg-seq',
      name: 'Algebra & Sequences',
      description: 'Linear equations, nth term rules, function machines, unknowns & substitution',
      examFocus: 'Advanced 11+ CEM/GL',
      badgeColor: 'purple'
    },
    {
      id: 'math-geom-ang',
      name: 'Angles & Shape Properties',
      description: 'Angles on straight lines, parallel lines, triangles, quadrilaterals & polygons',
      examFocus: 'Visual Reasoning & Geometry',
      badgeColor: 'amber'
    },
    {
      id: 'math-perim-area-vol',
      name: 'Perimeter, Area & Volume',
      description: 'Compound L-shapes, shaded regions, surface area & cuboid liquid volumes',
      examFocus: 'High Frequency 11+ Topic',
      badgeColor: 'teal'
    },
    {
      id: 'math-sdt',
      name: 'Speed, Distance & Time',
      description: 'Average speed formula, 12h/24h bus/train timetables & unit conversions',
      examFocus: 'Word Problem Standard',
      badgeColor: 'rose'
    },
    {
      id: 'math-prob-stat',
      name: 'Probability & Statistics',
      description: 'Single-event probability, mean, median, mode, range, Venn & Carroll diagrams',
      examFocus: 'Data Handling',
      badgeColor: 'cyan'
    },
    {
      id: 'math-money-meas',
      name: 'Measurement & Currency',
      description: 'Metric conversions (kg/g, km/m/cm, litres/ml) & multi-step UK currency problems',
      examFocus: 'Real-World Word Problems',
      badgeColor: 'green'
    },
    {
      id: 'math-word-bodmas',
      name: 'BODMAS & Logical Word Problems',
      description: 'Order of operations, logical deduction, consecutive numbers & riddle arithmetic',
      examFocus: 'Elite Grammar School Discriminator',
      badgeColor: 'violet'
    }
  ],
  English: [
    {
      id: 'eng-comp-infer',
      name: 'Reading Comprehension & Inference',
      description: 'Deducing character motives, tone, atmosphere & evidence-backed inferences',
      examFocus: 'Literary Fiction & Non-Fiction',
      badgeColor: 'blue'
    },
    {
      id: 'eng-syn-ant',
      name: 'Advanced Synonyms & Antonyms',
      description: 'Nuanced 11+ vocabulary, subtle shades of meaning & contextual opposites',
      examFocus: 'Vocabulary Breadth',
      badgeColor: 'indigo'
    },
    {
      id: 'eng-cloze-words',
      name: 'Cloze Passages & Contextual Vocabulary',
      description: 'Selecting exact semantic words that complete literary paragraph blanks',
      examFocus: 'CEM Style Cloze Test',
      badgeColor: 'emerald'
    },
    {
      id: 'eng-gramm-syntax',
      name: 'Grammar, Clauses & Syntax',
      description: 'Subordinate clauses, relative pronouns, active vs passive voice & modal verbs',
      examFocus: 'KS2 SPaG Standard',
      badgeColor: 'purple'
    },
    {
      id: 'eng-punct',
      name: 'Punctuation & Sentence Mechanics',
      description: 'Apostrophes (possession vs omission), semicolons, colons, dashes & speech marks',
      examFocus: 'High Error Rate Topic',
      badgeColor: 'rose'
    },
    {
      id: 'eng-spell-homo',
      name: 'Spelling Patterns & Tricky Homophones',
      description: 'Double consonants, silent letters, -cious/-tious, -ough, their/there/they\'re',
      examFocus: 'Accurate Proofreading',
      badgeColor: 'amber'
    },
    {
      id: 'eng-lit-devices',
      name: 'Literary Devices & Figurative Language',
      description: 'Metaphors, similes, personification, alliteration, hyperbole & onomatopoeia',
      examFocus: 'Critical Analysis',
      badgeColor: 'teal'
    },
    {
      id: 'eng-seq-cohere',
      name: 'Sentence Ordering & Paragraph Cohesion',
      description: 'Rearranging jumbled sentences into a logical, chronologically coherent passage',
      examFocus: 'Structural Awareness',
      badgeColor: 'cyan'
    }
  ],
  'Verbal Reasoning': [
    {
      id: 'vr-ciphers-codes',
      name: 'Letter Ciphers & Secret Codes',
      description: 'Alphabet jumps (+/- shift), reverse alphabet pairing, word-to-number codes',
      examFocus: 'GL Assessment Core',
      badgeColor: 'blue'
    },
    {
      id: 'vr-analog-relat',
      name: 'Word Analogies & Conceptual Pairs',
      description: 'A is to B as C is to ( ? ); synonym/antonym and tool-to-action relationships',
      examFocus: 'Standard 11+ VR Question Type',
      badgeColor: 'indigo'
    },
    {
      id: 'vr-hidden-words',
      name: 'Hidden Words in Sentences',
      description: 'Spotting 4-letter real English words concealed across word boundaries',
      examFocus: 'Scanning & Pattern Recognition',
      badgeColor: 'emerald'
    },
    {
      id: 'vr-compound-words',
      name: 'Compound Words',
      description: 'Selecting one word from Set A and one from Set B to form a valid compound word',
      examFocus: 'Morphological Synthesis',
      badgeColor: 'purple'
    },
    {
      id: 'vr-move-letter',
      name: 'Move a Letter',
      description: 'Moving one letter from word 1 to word 2 so that both form valid new words',
      examFocus: 'Anagram & Spelling Agility',
      badgeColor: 'rose'
    },
    {
      id: 'vr-odd-one-out',
      name: 'Odd One Out / Semantic Classification',
      description: 'Identifying the single word that does not share the category or linguistic rule',
      examFocus: 'Classification & Logic',
      badgeColor: 'amber'
    },
    {
      id: 'vr-letter-seq',
      name: 'Letter Sequences & Alphabet Series',
      description: 'Predicting the next letter pair or triplet based on arithmetic alphabet positions',
      examFocus: 'Pattern Deduction',
      badgeColor: 'teal'
    },
    {
      id: 'vr-comp-two-words',
      name: 'Complete Two Words (Bridge Letters)',
      description: 'Finding letters that complete the end of word 1 and begin word 2',
      examFocus: 'Vocabulary & Spelling Intersection',
      badgeColor: 'cyan'
    },
    {
      id: 'vr-num-reasoning',
      name: 'Number Codes & Operations in Brackets',
      description: 'Discovering the mathematical relationship in outer pairs to solve the middle bracket',
      examFocus: 'Numerical-Verbal Hybrid',
      badgeColor: 'violet'
    }
  ]
};

export function getCategoriesForSubject(subject: SubjectType): CurriculumCategory[] {
  return UK_CURRICULUM_CATEGORIES[subject] || [];
}
