export interface CurriculumStage {
  id: string;
  stageNumber: number;
  name: string;
  ukStageName: string;
  ukYears: string;
  ageRange: string;
  examBoards: string;
  benchmarkQualifications: {
    primaryAward: string;
    assessmentStandard: string;
  };
  summary: string;
  coreSubjects: {
    name: string;
    topics: string[];
    description: string;
  }[];
  keyMilestones: string[];
  sampleQuestions: {
    subject: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
  assessmentFormat: string;
  callToAction: {
    label: string;
    actionType: 'exam_mode' | 'modal';
    subject?: 'Mathematics' | 'English' | 'Verbal Reasoning' | 'Mixed';
  };
}

export const CURRICULUM_STAGES: CurriculumStage[] = [
  {
    id: 'primary-education',
    stageNumber: 1,
    name: 'Primary Education (Years 1–6)',
    ukStageName: 'Key Stage 1 & Key Stage 2',
    ukYears: 'Years 1–6',
    ageRange: '5 – 11 years',
    examBoards: 'GL Assessment, CEM, Standards & Testing Agency (STA)',
    benchmarkQualifications: {
      primaryAward: 'National KS2 SATs & 11+ Selective Grammar School Entrance',
      assessmentStandard: 'Department for Education (DfE) National Curriculum Standards'
    },
    summary: 'Foundational primary curriculum covering core arithmetic, literary comprehension, grammar, punctuation, and cognitive reasoning abilities assessed through statutory KS2 SATs and competitive 11+ Grammar School Entrance examinations.',
    coreSubjects: [
      {
        name: 'Mathematics (KS1 & KS2)',
        topics: ['Mental Arithmetic & Fluency', 'Fractions, Decimals & Percentages', 'Ratio & Proportion', 'Early Algebraic Reasoning', 'Perimeter, Area & Angles', 'Multi-Step Word Problems'],
        description: 'Rigorous numeracy emphasizing arithmetic fluency, geometric problem-solving, and non-calculator mental mathematical agility.'
      },
      {
        name: 'English Language & Reading',
        topics: ['Reading Comprehension & Inference', 'Grammar & Syntax (GPS)', 'Spelling Rules & Etymology', 'Punctuation (Colons, Semi-colons, Dashes)', 'Advanced Vocabulary in Context'],
        description: 'Deep textual comprehension of classical and modern prose, rigorous grammatical analysis, and sophisticated punctuation mastery.'
      },
      {
        name: 'Verbal & Non-Verbal Reasoning',
        topics: ['Letter & Number Ciphers', 'Analogy Pairs & Antonyms', 'Hidden Words & Compound Words', 'Spatial Rotations & 2D/3D Nets', 'Cube Nets & Matrices'],
        description: 'Comprehensive cognitive and perceptual reasoning skills developed for GL Assessment and CEM grammar school entrance tests.'
      }
    ],
    keyMilestones: [
      'Year 1: National Phonics Screening Check',
      'Year 2: End of Key Stage 1 Teacher Assessment Framework',
      'Year 4: National Multiplication Tables Check (MTC - 25 questions in 6 seconds per question)',
      'Year 6: National Key Stage 2 SATs (Reading, GPS, Mathematics Paper 1, 2, 3) and 11+ Grammar School Entrance Tests'
    ],
    assessmentFormat: '50 multiple-choice questions in 40 minutes per subject, or a full 150-question 11+ mock examination in 90 minutes with 5-minute paused subject breaks.',
    sampleQuestions: [
      {
        subject: '11+ Mathematics (GL / CEM Standard)',
        question: 'A train 120 metres long passes a signal post in 6 seconds. How long will it take the same train, travelling at the same constant speed, to completely cross a bridge 280 metres long?',
        options: ['20 seconds', '18 seconds', '24 seconds', '14 seconds'],
        correctAnswer: '20 seconds',
        explanation: 'Speed = 120 m ÷ 6 s = 20 m/s. Total distance to clear the bridge = 280 m + 120 m = 400 m. Time required = 400 m ÷ 20 m/s = 20 seconds.'
      },
      {
        subject: '11+ English & Grammar',
        question: 'Which sentence correctly employs the subjunctive mood according to formal British grammatical rules?',
        options: [
          'If the headteacher were to inspect our work today, he would be exceedingly pleased.',
          'If the headteacher was to inspect our work today, he would be exceedingly pleased.',
          'If the headteacher is inspecting our work today, he would be exceedingly pleased.',
          'If the headteacher will inspect our work today, he would be exceedingly pleased.'
        ],
        correctAnswer: 'If the headteacher were to inspect our work today, he would be exceedingly pleased.',
        explanation: 'In formal British English, hypothetical or counterfactual clauses take the subjunctive "were" even with a singular subject.'
      },
      {
        subject: '11+ Verbal Reasoning (GL Assessment Format)',
        question: 'If the code for CRANE is FUDQH, what is the code for STAMP using the exact same cipher rule?',
        options: ['VWDPS', 'VWDPP', 'UXDOR', 'VWDPR'],
        correctAnswer: 'VWDPS',
        explanation: 'Each letter is shifted forward by 3 positions in the alphabet: S(+3)=V, T(+3)=W, A(+3)=D, M(+3)=P, P(+3)=S.'
      }
    ],
    callToAction: {
      label: 'Start 11+ / KS2 Practice Exams',
      actionType: 'exam_mode',
      subject: 'Mixed'
    }
  },
  {
    id: 'junior-secondary',
    stageNumber: 2,
    name: 'Secondary Education (Key Stage 3: Years 7–9)',
    ukStageName: 'Secondary School (Key Stage 3)',
    ukYears: 'Years 7–9',
    ageRange: '11 – 14 years',
    examBoards: 'AQA, Pearson Edexcel, OCR (KS3 Curriculum Frameworks)',
    benchmarkQualifications: {
      primaryAward: 'Key Stage 3 Progress Checkpoints & GCSE Foundation Preparation',
      assessmentStandard: 'National Curriculum Secondary Progress 8 Benchmark'
    },
    summary: 'Secondary education phase bridging primary arithmetic to formal mathematical proof, laboratory sciences, literary analysis, and structured essay writing in direct alignment with AQA, Edexcel, and OCR GCSE specifications.',
    coreSubjects: [
      {
        name: 'KS3 Mathematics (AQA & Edexcel Aligned)',
        topics: ['Linear Equations & Rearranging Formulae', 'Pythagoras’ Theorem & Trigonometric Ratios', 'Compound Probability & Venn Diagrams', 'Transformations & Vector Notation', 'Direct & Inverse Proportion'],
        description: 'Transition to formal algebraic methods, geometric proofs, and rigorous statistical reasoning across Years 7 to 9.'
      },
      {
        name: 'KS3 English Language & Literature',
        topics: ['Shakespearean Drama & Rhetoric', '19th Century Heritage Texts', 'Creative & Transactional Writing', 'Poetry Analysis & Comparative Essay Structure'],
        description: 'In-depth textual interpretation, structural commentary, and persuasive writing techniques preparing pupils for GCSE English.'
      },
      {
        name: 'KS3 Science (Biology, Chemistry, Physics)',
        topics: ['Cell Biology & Genetics', 'The Periodic Table & Chemical Energetics', 'Forces, Energy Transfers & Particle Model', 'Scientific Enquiry & Lab Practical Skills'],
        description: 'Foundational laboratory disciplines in biology, chemistry, and physics establishing the core knowledge required for GCSE Combined or Separate Sciences.'
      }
    ],
    keyMilestones: [
      'Year 7: Secondary baseline assessments, academic set banding, and transition adaptation',
      'Year 8: Intermediate curriculum extension, STEM challenges, and analytical essays',
      'Year 9: End of Key Stage 3 checkpoints and formal GCSE Options Selection (choosing 8–10 GCSE subjects across AQA, Edexcel, and OCR)'
    ],
    assessmentFormat: 'Standardised examination papers (1h to 1h 30m), end-of-year checkpoints, and topic mastery assessments.',
    sampleQuestions: [
      {
        subject: 'KS3 Mathematics (AQA Framework)',
        question: 'Solve the algebraic equation: 5(2x - 3) = 3(x + 9).',
        options: ['x = 6', 'x = 4', 'x = 8', 'x = 5'],
        correctAnswer: 'x = 6',
        explanation: 'Expand brackets on both sides: 10x - 15 = 3x + 27. Subtract 3x: 7x - 15 = 27. Add 15: 7x = 42. Divide by 7: x = 6.'
      },
      {
        subject: 'KS3 Science (AQA / Edexcel Aligned)',
        question: 'Which subatomic particles are situated in the nucleus of a standard atom?',
        options: ['Protons and Neutrons', 'Electrons and Protons', 'Neutrons and Electrons', 'Electrons only'],
        correctAnswer: 'Protons and Neutrons',
        explanation: 'The nucleus consists of positively charged protons and uncharged neutrons; electrons orbit the nucleus in energy shells.'
      }
    ],
    callToAction: {
      label: 'Explore KS3 Practice Modules',
      actionType: 'exam_mode',
      subject: 'Mathematics'
    }
  },
  {
    id: 'senior-secondary-ks4',
    stageNumber: 3,
    name: 'Secondary Education (Key Stage 4 / GCSE: Years 10–11)',
    ukStageName: 'Secondary School (Key Stage 4)',
    ukYears: 'Years 10–11',
    ageRange: '14 – 16 years',
    examBoards: 'AQA, Pearson Edexcel, OCR, Eduqas',
    benchmarkQualifications: {
      primaryAward: 'GCSEs & IGCSEs (General Certificate of Secondary Education, Graded 9–1)',
      assessmentStandard: 'Ofqual Regulated National Secondary Qualifications'
    },
    summary: 'The primary terminal secondary qualifications in England and Wales. Pupils study 8 to 10 GCSE subjects examined by major UK boards including AQA (8300 Maths, 8700 English), Pearson Edexcel (1MA1), and OCR, graded on the 9–1 scale where Grade 9 signifies exceptional top-percentile performance.',
    coreSubjects: [
      {
        name: 'GCSE Mathematics (AQA 8300 / Edexcel 1MA1)',
        topics: ['Quadratic Equations & Graphs', 'Trigonometry & Sine/Cosine Rules', 'Circle Theorems & Geometric Proof', 'Histograms & Cumulative Frequency', 'Surds, Indices & Algebraic Fractions'],
        description: 'Advanced problem-solving across Paper 1 (Non-Calculator) and Papers 2 & 3 (Calculator), testing mathematical fluency and multi-step reasoning.'
      },
      {
        name: 'GCSE English Language & Literature (AQA 8700 / 8702)',
        topics: ['Explorations in Creative Reading & Writing (Paper 1)', 'Writers’ Viewpoints & Perspectives (Paper 2)', 'Shakespeare & the 19th Century Novel', 'Modern Texts & AQA Poetry Anthology Comparison'],
        description: 'Two independent GCSE awards evaluating critical literary evaluation, contextual social analysis, and transactional writing.'
      },
      {
        name: 'GCSE Sciences (AQA Trilogy / Separate Sciences)',
        topics: ['Bioenergetics, Homeostasis & Genetics', 'Quantitative Chemistry, Bonding & Organic Reactions', 'Electromagnetism, Wave Mechanics & Nuclear Physics', 'Required Practical Experiments'],
        description: 'Rigorous experimental methods, chemical calculations, and mathematical physics across Higher and Foundation tiers.'
      }
    ],
    keyMilestones: [
      'Year 10: In-depth syllabus completion and internal summer mock series',
      'Year 11 (November/December): Formal Invigilated GCSE Mock Examinations',
      'Year 11 (May/June): National terminal GCSE examinations administered by AQA, Edexcel, and OCR under strict JCQ regulations',
      'Year 11 (August): National GCSE Results Day and Sixth Form / College Admissions Enrolment'
    ],
    assessmentFormat: 'Terminal written examination papers (1h 30m to 2h per paper), graded Grade 9 (highest) to Grade 1.',
    sampleQuestions: [
      {
        subject: 'GCSE Mathematics (AQA 8300 / Edexcel 1MA1 Higher)',
        question: 'Solve by factorisation: 2x² + 7x + 3 = 0.',
        options: ['x = -1/2 or x = -3', 'x = 1/2 or x = 3', 'x = -2 or x = -3', 'x = 1/2 or x = -3'],
        correctAnswer: 'x = -1/2 or x = -3',
        explanation: 'Factorise into two binomials: (2x + 1)(x + 3) = 0. Either 2x + 1 = 0 => x = -1/2, or x + 3 = 0 => x = -3.'
      },
      {
        subject: 'GCSE English Literature (AQA 8702)',
        question: 'What is the term for a recurring visual motif, symbol, or theme that deliberately appears throughout a literary text to reinforce central meaning?',
        options: ['Motif', 'Soliloquy', 'Juxtaposition', 'Oxymoron'],
        correctAnswer: 'Motif',
        explanation: 'A motif is an established recurring element, symbol, or concept that assists in developing the overarching themes of a text.'
      }
    ],
    callToAction: {
      label: 'Explore GCSE / AQA Practice',
      actionType: 'exam_mode',
      subject: 'Mathematics'
    }
  },
  {
    id: 'sixth-form-year12',
    stageNumber: 4,
    name: 'Further Education / Sixth Form (Year 12 / Lower Sixth)',
    ukStageName: 'Further Education (Year 12 / Lower Sixth)',
    ukYears: 'Year 12 (Lower Sixth)',
    ageRange: '16 – 17 years',
    examBoards: 'AQA, Pearson Edexcel, OCR (GCE Advanced Subsidiary)',
    benchmarkQualifications: {
      primaryAward: 'AS-Levels (GCE Advanced Subsidiary), T-Levels & BTEC Nationals Level 3',
      assessmentStandard: 'Level 3 National Qualification Framework (NQF)'
    },
    summary: 'Post-16 specialized academic study where students narrow their academic focus to 3–4 rigorous subjects. Administered by major boards including AQA, Edexcel, and OCR, Year 12 establishes foundational A-Level theory, coursework, and UCAS predicted grades for university applications.',
    coreSubjects: [
      {
        name: 'AS-Level Mathematics (AQA 7356 / Edexcel 8MA0)',
        topics: ['Calculus (Differentiation & Integration from First Principles)', 'Binomial Expansion & Trigonometric Identities', '2D Vectors & Coordinate Geometry', 'Newtonian Kinematics & Mechanics', 'Statistical Hypothesis Testing & Large Data Set'],
        description: 'Comprehensive pure mathematics integrated with applied mechanics and real-world statistical analysis.'
      },
      {
        name: 'AS Sciences & Economics (AQA / Edexcel)',
        topics: ['Biological Molecules, Enzymes & Cell Membranes', 'Atomic Structure, Energetics & Organic Mechanisms', 'Circuit Electricity, Quantum Phenomena & Wave Optics', 'Macroeconomic Policy & Market Failure'],
        description: 'Rigorous theoretical principles, quantitative modelling, and certified laboratory practical endorsements.'
      },
      {
        name: 'Advanced Humanities, History & Literature',
        topics: ['Historical Source Historiography', 'Comparative Prose & Literary Criticism', 'Moral Philosophy & Applied Ethics', 'EPQ (Extended Project Qualification)'],
        description: 'Independent research, extended analytical essay construction, and academic dissertation methodologies.'
      }
    ],
    keyMilestones: [
      'Autumn Term: Transition to Sixth Form seminar learning and independent study periods',
      'Spring Term: University course research, Open Days, and preliminary UCAS profile creation',
      'Summer Term: Lower Sixth internal examinations, AS-Level assessments, and official UCAS predicted grades assignment'
    ],
    assessmentFormat: 'Rigorous written papers (1h 30m to 2h) demanding multi-stage mathematical derivations, formal proofs, and extended essay responses.',
    sampleQuestions: [
      {
        subject: 'AS Mathematics (AQA 7356 / Edexcel)',
        question: 'Differentiate f(x) = 3x⁴ - 5x² + 7x - 2 with respect to x.',
        options: ['f\'(x) = 12x³ - 10x + 7', 'f\'(x) = 12x³ - 10x', 'f\'(x) = 7x³ - 10x + 7', 'f\'(x) = 12x⁴ - 10x² + 7'],
        correctAnswer: 'f\'(x) = 12x³ - 10x + 7',
        explanation: 'Applying the power rule d/dx[axⁿ] = a·n·xⁿ⁻¹ yields: d/dx(3x⁴) = 12x³, d/dx(-5x²) = -10x, d/dx(7x) = 7, d/dx(-2) = 0. Result: 12x³ - 10x + 7.'
      }
    ],
    callToAction: {
      label: 'Explore Year 12 / AS Pathways',
      actionType: 'exam_mode',
      subject: 'Mathematics'
    }
  },
  {
    id: 'sixth-form-year13',
    stageNumber: 5,
    name: 'Further Education / Sixth Form (Year 13 / Upper Sixth)',
    ukStageName: 'Further Education (Year 13 / Upper Sixth)',
    ukYears: 'Year 13 (Upper Sixth)',
    ageRange: '17 – 18 years',
    examBoards: 'AQA, Pearson Edexcel, OCR, Cambridge Assessment',
    benchmarkQualifications: {
      primaryAward: 'A-Levels (GCE Advanced Level, Graded A*–E) & BTEC Level 3 National Extended Diploma',
      assessmentStandard: 'UCAS Tariff University Matriculation Standard'
    },
    summary: 'The pinnacle UK school qualification recognised by universities worldwide, including Oxford, Cambridge, and the Russell Group. Awarded by AQA, Edexcel, and OCR, full A-Levels evaluate deep theoretical command, independent academic research, and complex problem-solving.',
    coreSubjects: [
      {
        name: 'Full A-Level Mathematics & Further Maths (AQA 7357 / Edexcel 9MA0)',
        topics: ['Integration by Parts & Partial Fractions', 'Differential Equations & Parametric Equations', 'Complex Numbers, De Moivre’s Theorem & Matrices', 'Vectors in 3D Space & Dot Product', 'Continuous Probability Distributions (Normal & Poisson)'],
        description: 'Comprehensive undergraduate-level mathematical reasoning, complex proofs, and applied physical and statistical modeling.'
      },
      {
        name: 'Full A-Level Sciences (AQA Biology, Chemistry, Physics)',
        topics: ['Biochemical Pathways, Respiration & Photosynthesis', 'Thermodynamics, Transition Metals & NMR Spectroscopy', 'Gravitational, Electric & Magnetic Fields', 'Nuclear Physics & Medical Applications', 'Full Practical Endorsement'],
        description: 'Deep scientific synthesis, high-precision laboratory practicals, and mathematical physics.'
      },
      {
        name: 'University Admissions & Competitive Entrance Examinations',
        topics: ['UCAS Personal Statement Development', 'MAT (Mathematics Admissions Test - Oxford / Imperial)', 'STEP (Sixth Term Examination Paper - Cambridge)', 'TMUA & UCAT (Medicine & Dentistry Admissions)', 'Oxbridge Academic Interview Preparation'],
        description: 'Specialised diagnostic preparation for competitive degree programmes in Medicine, STEM, Law, and Economics.'
      }
    ],
    keyMilestones: [
      '15 October: Oxbridge (Oxford & Cambridge), Medicine, Dentistry, and Veterinary UCAS Application Deadline',
      'Late January: Standard UCAS Equal Consideration National University Application Deadline',
      'May/June: Terminal GCE A-Level National Examinations across 3–4 subjects (Papers 1, 2, and 3)',
      'Mid-August: National A-Level Results Day, UCAS Confirmation, and Clearing'
    ],
    assessmentFormat: 'Three comprehensive 2-hour terminal papers per subject graded A*, A, B, C, D, E. Tariff scores determine university offers.',
    sampleQuestions: [
      {
        subject: 'A-Level Mathematics (AQA 7357 / Edexcel 9MA0)',
        question: 'Evaluate the definite integral ∫ from 0 to 1 of (2x · e^(x²)) dx.',
        options: ['e - 1', 'e + 1', '2e - 1', 'e² - 1'],
        correctAnswer: 'e - 1',
        explanation: 'Using the substitution u = x², du = 2x dx. When x = 0, u = 0; when x = 1, u = 1. The integral transforms to ∫ from 0 to 1 of e^u du = [e^u] from 0 to 1 = e¹ - e⁰ = e - 1.'
      }
    ],
    callToAction: {
      label: 'Explore A-Level University Prep',
      actionType: 'exam_mode',
      subject: 'Mathematics'
    }
  }
];
