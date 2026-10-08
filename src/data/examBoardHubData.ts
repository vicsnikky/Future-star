export interface ExamSpecification {
  code: string;
  title: string;
  board: 'AQA' | 'Edexcel' | 'OCR' | 'GL / CEM';
  level: string;
  assessmentStructure: string;
  keyTopics: string[];
}

export interface TimelineMilestone {
  period: string;
  stage: string;
  title: string;
  description: string;
  importance: 'critical' | 'milestone' | 'info';
}

export interface RevisionChecklistCategory {
  id: string;
  stageTitle: string;
  stageBadge: string;
  topics: {
    id: string;
    title: string;
    board: string;
    description: string;
  }[];
}

export const EXAM_SPECIFICATIONS: ExamSpecification[] = [
  {
    code: 'AQA 8300',
    title: 'GCSE Mathematics (Higher & Foundation)',
    board: 'AQA',
    level: 'GCSE (Years 10–11)',
    assessmentStructure: '3 Written Papers (Paper 1: Non-Calculator, Papers 2 & 3: Calculator) • 1h 30m each • 80 marks per paper',
    keyTopics: ['Number & Surds', 'Algebra & Quadratics', 'Ratio & Proportion', 'Geometry & Circle Theorems', 'Probability & Statistics']
  },
  {
    code: 'Edexcel 1MA1',
    title: 'Pearson Edexcel GCSE Mathematics (9–1)',
    board: 'Edexcel',
    level: 'GCSE (Years 10–11)',
    assessmentStructure: 'Paper 1 (Non-Calculator, 1h 30m) + Papers 2 & 3 (Calculator, 1h 30m each) • Graded 9–1',
    keyTopics: ['Algebraic Fractions', 'Trigonometric Sine/Cosine Rules', 'Vectors & Geometric Proofs', 'Compound Growth', 'Conditional Probability']
  },
  {
    code: 'AQA 8700 & 8702',
    title: 'GCSE English Language & English Literature',
    board: 'AQA',
    level: 'GCSE (Years 10–11)',
    assessmentStructure: 'Language: Paper 1 (Fiction & Creative Writing), Paper 2 (Non-Fiction & Viewpoints) • Literature: Shakespeare, 19th-C Novel, Poetry',
    keyTopics: ['Explorations in Creative Reading', 'Writers’ Viewpoints & Persuasive Writing', 'Shakespearean Tragedy Analysis', 'AQA Power & Conflict Poetry Anthology']
  },
  {
    code: 'AQA 8464',
    title: 'GCSE Combined Science: Trilogy',
    board: 'AQA',
    level: 'GCSE (Years 10–11)',
    assessmentStructure: '6 Papers (2 Biology, 2 Chemistry, 2 Physics) • 1h 15m each • Double GCSE Award (e.g., 9-9 to 1-1)',
    keyTopics: ['Bioenergetics & Genetics', 'Quantitative Chemistry & Periodic Trends', 'Forces, Energy & Radioactivity', '16 Required Practical Experiments']
  },
  {
    code: 'AQA 7357 / Edexcel 9MA0',
    title: 'GCE A-Level Mathematics',
    board: 'AQA',
    level: 'Sixth Form (Years 12–13)',
    assessmentStructure: '3 Terminal 2-Hour Papers (Paper 1 & 2: Pure Mathematics, Paper 3: Mechanics & Statistics) • Graded A* to E',
    keyTopics: ['Calculus (Differentiation & Integration)', 'Parametric Equations', '3D Coordinate Vectors', 'Newtonian Kinematics', 'Normal & Binomial Hypothesis Testing']
  },
  {
    code: 'GL Assessment & CEM',
    title: '11+ Selective Grammar School Entrance',
    board: 'GL / CEM',
    level: 'Primary (Years 5–6)',
    assessmentStructure: 'Standardised multiple-choice testing in Mathematics, English Comprehension, and Verbal/Non-Verbal Reasoning',
    keyTopics: ['Mental Fluency & Word Problems', 'Advanced Vocabulary & Punctuation', 'Letter & Code Ciphers', 'Spatial 2D/3D Rotations', 'Time & Distance']
  }
];

export const EXAM_TIMELINE: TimelineMilestone[] = [
  {
    period: 'Year 5 Summer & Year 6 September',
    stage: 'Primary / 11+',
    title: '11+ Grammar School Entrance Examinations',
    description: 'Candidates sit GL Assessment or CEM entrance examinations for grammar schools across Kent, Essex, Bexley, Buckinghamshire, Trafford, and Birmingham.',
    importance: 'critical'
  },
  {
    period: 'Year 9 Spring Term (Jan – March)',
    stage: 'Key Stage 3',
    title: 'GCSE Options Selection & Pathway Banding',
    description: 'Students select their 8 to 10 GCSE subjects across English, Maths, Sciences, Humanities (History/Geography), and Modern Foreign Languages (EBacc).',
    importance: 'milestone'
  },
  {
    period: 'Year 10 Summer Term (June – July)',
    stage: 'GCSE / KS4',
    title: 'Year 10 Benchmark Summer Examinations',
    description: 'Formal internal examinations under JCQ hall conditions to evaluate syllabus retention across the first year of GCSE content.',
    importance: 'info'
  },
  {
    period: 'Year 11 Autumn/Winter (Nov – Dec)',
    stage: 'GCSE / KS4',
    title: 'Official Invigilated GCSE Mock Examinations',
    description: 'Crucial formal mocks used by secondary schools to set final tier entries (Higher vs. Foundation) and Sixth Form conditional acceptance offers.',
    importance: 'critical'
  },
  {
    period: 'Year 11 Summer (May – June)',
    stage: 'GCSE / KS4',
    title: 'JCQ National Terminal GCSE Written Papers',
    description: 'National examinations administered across England & Wales by AQA, Edexcel, and OCR. Strict invigilation guidelines under JCQ regulations.',
    importance: 'critical'
  },
  {
    period: 'Year 11 Late August',
    stage: 'GCSE / KS4',
    title: 'National GCSE Results Day (Graded 9–1)',
    description: 'Results released nationwide. Students confirm enrollment for Sixth Form, Grammar Sixth Forms, or Further Education colleges.',
    importance: 'milestone'
  },
  {
    period: 'Year 12 (October – January)',
    stage: 'Sixth Form / AS',
    title: 'University Exploration & Early UCAS Admissions',
    description: 'Researching Russell Group universities, Oxbridge Open Days, and drafting UCAS Personal Statements with predicted A-Level grades.',
    importance: 'info'
  },
  {
    period: 'Year 13 (May – June) & August',
    stage: 'Sixth Form / A-Levels',
    title: 'Terminal A-Level Exams & University Confirmation',
    description: 'Pupils sit terminal A-Level Papers 1, 2, and 3. August Results Day confirms firm university places, Insurance choices, or UCAS Clearing.',
    importance: 'critical'
  }
];

export const REVISION_CHECKLISTS: RevisionChecklistCategory[] = [
  {
    id: 'gcse-maths',
    stageTitle: 'GCSE Mathematics (Higher Tier 9–1)',
    stageBadge: 'AQA 8300 / Edexcel 1MA1',
    topics: [
      {
        id: 'chk-quad',
        title: 'Quadratic Equations (Factorising, Formula & Completing the Square)',
        board: 'AQA & Edexcel',
        description: 'Solving ax² + bx + c = 0, sketching parabolas, turning points, and roots.'
      },
      {
        id: 'chk-circle',
        title: 'Circle Theorems & Formal Geometric Proofs',
        board: 'AQA & Edexcel',
        description: 'Angle at centre is twice angle at circumference, alternate segment theorem, cyclic quadrilaterals.'
      },
      {
        id: 'chk-trig',
        title: 'Advanced Trigonometry (Sine Rule, Cosine Rule & Area = ½ab sin C)',
        board: 'AQA & Edexcel',
        description: 'Non-right angled triangles, 3D Pythagoras, and exact values of sin/cos/tan (0°, 30°, 45°, 60°, 90°).'
      },
      {
        id: 'chk-surds',
        title: 'Surds, Indices & Rationalising the Denominator',
        board: 'AQA & Edexcel',
        description: 'Simplifying radical expressions, fractional/negative indices, and multiplying conjugates.'
      },
      {
        id: 'chk-prob',
        title: 'Conditional Probability Trees & Venn Diagrams',
        board: 'AQA & Edexcel',
        description: 'Without replacement problems, set notation (A ∩ B, A ∪ B, A\'), and expected frequencies.'
      }
    ]
  },
  {
    id: 'gcse-english',
    stageTitle: 'GCSE English Language & Literature',
    stageBadge: 'AQA 8700 / 8702',
    topics: [
      {
        id: 'chk-lang-p1',
        title: 'Paper 1 Section A: Fiction Analysis (Implicit & Explicit Meaning, Structure & Evaluation)',
        board: 'AQA 8700',
        description: 'Mastering Question 2 (Language), Question 3 (Structure/Pacing), and Question 4 (Critical Evaluation).'
      },
      {
        id: 'chk-lang-p2',
        title: 'Paper 2 Section B: Transactional & Persuasive Writing (Articles, Speeches, Letters)',
        board: 'AQA 8700',
        description: 'DARE-style rhetorical devices, sophisticated vocabulary, counter-arguments, and structural variety.'
      },
      {
        id: 'chk-lit-shakes',
        title: 'Shakespearean Context & Character Trajectory (Macbeth / Romeo & Juliet)',
        board: 'AQA 8702',
        description: 'Jacobean audience context, hamartia, divine right of kings, and close language quotation analysis.'
      },
      {
        id: 'chk-lit-poetry',
        title: 'AQA Poetry Anthology Comparison (Power & Conflict)',
        board: 'AQA 8702',
        description: 'Cross-poem comparative essay structure, linking Ozymandias, London, Remains, Exposure, and Bayonet Charge.'
      }
    ]
  },
  {
    id: 'ks3-secondary',
    stageTitle: 'Key Stage 3 Secondary Core Mastery (Years 7–9)',
    stageBadge: 'Secondary Foundation',
    topics: [
      {
        id: 'chk-ks3-algebra',
        title: 'Linear Equations, Expanding Brackets & Factorising Single Terms',
        board: 'Secondary Banding',
        description: 'Fluency in solving 2-step and multi-bracket linear equations, forming expressions from word problems.'
      },
      {
        id: 'chk-ks3-ratio',
        title: 'Direct & Inverse Proportion, Unitary Method & Currency Conversion',
        board: 'Secondary Banding',
        description: 'Sharing in given ratios, comparing best buys, scale drawing, and compound units.'
      },
      {
        id: 'chk-ks3-science',
        title: 'Cell Organisation, Atoms, Elements & Energy Transfers',
        board: 'AQA KS3 Framework',
        description: 'Plant vs animal cell organelles, particle model of matter, forces, and chemical word equations.'
      }
    ]
  },
  {
    id: 'alevel-pure',
    stageTitle: 'A-Level Pure Mathematics (Years 12–13)',
    stageBadge: 'AQA 7357 / Edexcel 9MA0',
    topics: [
      {
        id: 'chk-diff',
        title: 'Advanced Differentiation (Chain Rule, Product Rule, Quotient Rule & Implicit)',
        board: 'AQA & Edexcel',
        description: 'First and second derivatives, finding normals and tangents, stationary points, and optimization.'
      },
      {
        id: 'chk-integ',
        title: 'Integration Techniques (Integration by Parts, Substitution & Partial Fractions)',
        board: 'AQA & Edexcel',
        description: 'Calculating areas under curves, solving first-order differential equations with separable variables.'
      },
      {
        id: 'chk-vectors',
        title: '3D Vector Geometry & Coordinate Space',
        board: 'AQA & Edexcel',
        description: 'Vector magnitude, dot product, collinear points, and geometric vector proofs in three dimensions.'
      }
    ]
  }
];

export const LEVEL_TUTORING_OFFERS = [
  {
    id: 'tutoring-primary-11plus',
    stageName: 'Primary & 11+ Grammar School Entrance',
    badge: 'Ages 5–11 • Key Stage 1 & 2',
    headline: '11+ Grammar Entrance & SATs Coaching',
    description: 'Expert 1-on-1 preparation for GL Assessment and CEM Grammar School Entrance tests, CSSE Essex, Kent Test, and Bexley selective examinations. Weekly diagnostic feedback for parents.',
    whatsappQuery: 'Hello FUTURE STARS, I would like to inquire about 11+ Grammar School Entrance one-on-one tutorials for my child.',
    actionLabel: 'Book 11+ Tutorial',
    features: ['GL & CEM exam technique', 'Mental maths & VR ciphers', 'Weekly parent progress reports']
  },
  {
    id: 'tutoring-ks3',
    stageName: 'Key Stage 3 Secondary Transition (Years 7–9)',
    badge: 'Ages 11–14 • Key Stage 3',
    headline: 'Secondary Foundation & Top Set Placement',
    description: 'Build robust academic confidence in secondary mathematics, analytical English, and laboratory sciences. Ensure your child secures placement in top academic sets ahead of Year 9 GCSE options.',
    whatsappQuery: 'Hello FUTURE STARS, I would like to inquire about Key Stage 3 (Years 7-9) one-on-one tutorials for my child.',
    actionLabel: 'Book KS3 Tutorial',
    features: ['Top secondary set acceleration', 'Formal algebra & proofs', 'Essay writing & text analysis']
  },
  {
    id: 'tutoring-gcse',
    stageName: 'GCSE & Key Stage 4 (Years 10–11)',
    badge: 'Ages 14–16 • AQA & Edexcel',
    headline: 'GCSE Target Grade 8/9 Specialist Tutoring',
    description: 'Rigorous 1-on-1 coaching for AQA 8300 and Edexcel 1MA1 Mathematics, AQA 8700 English Language & Literature, and Combined/Separate Sciences. Master exam technique and mark schemes.',
    whatsappQuery: 'Hello FUTURE STARS, I would like to inquire about GCSE (AQA/Edexcel) one-on-one tutorials for my child.',
    actionLabel: 'Book GCSE Tutorial',
    features: ['AQA & Edexcel mark schemes', 'Targeting Grades 7, 8 & 9', 'Past paper timing & technique']
  },
  {
    id: 'tutoring-alevel',
    stageName: 'Sixth Form & A-Levels (Years 12–13)',
    badge: 'Ages 16–18 • GCE Advanced Level',
    headline: 'A-Level & University Admissions (Oxbridge / Russell Group)',
    description: 'High-level undergraduate-aligned tutorial coaching for AS & A-Level Pure Mathematics, Further Maths, Sciences, and university entrance tests including MAT, STEP, TMUA, and UCAT.',
    whatsappQuery: 'Hello FUTURE STARS, I would like to inquire about A-Level and University Admissions tutorials.',
    actionLabel: 'Book A-Level Tutorial',
    features: ['Calculus & mathematical proof', 'MAT / STEP / UCAT admissions coaching', 'UCAS personal statement review']
  }
];
