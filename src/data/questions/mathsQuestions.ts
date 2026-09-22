import { Question } from '../../types';

export const MATHS_QUESTIONS: Question[] = [
  {
    "id": "math-sdt-1",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 48 mph. How far does the train travel in 1 hours and 15 minutes?",
    "options": [
      "84 miles",
      "60 miles",
      "63 miles",
      "48 miles"
    ],
    "correctAnswer": "60 miles",
    "explanation": "Convert 15 minutes to hours (15/60 = 0.25 h). Total time = 1.25 h. Distance = Speed × Time = 48 × 1.25 = 60 miles.",
    "stepByStepSolution": "Step 1: Convert 15 mins to hours: 15 ÷ 60 = 0.25.\nStep 2: Total time = 1 + 0.25 = 1.25 hours.\nStep 3: Distance = Speed × Time = 48 × 1.25 = 60 miles.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-2",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 15%. The sale price is £42.50. What was the original price before the discount?",
    "options": [
      "£50.00",
      "£48.87",
      "£65.00",
      "£57.50"
    ],
    "correctAnswer": "£50.00",
    "explanation": "The sale price represents 85% of the original price. Divide the sale price by 0.85 to calculate the original price: £42.50 ÷ 0.85 = £50.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 15% = 85% of original value.\nStep 2: 85% = £42.50.\nStep 3: 1% = £42.50 ÷ 85 = £0.5000.\nStep 4: 100% = £50.00.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-ratio-3",
    "subject": "Mathematics",
    "topic": "Ratio & Proportion",
    "difficulty": "Hard",
    "questionText": "A lottery prize of £288 is shared among Anna, Ben, and Chloe in the ratio 4 : 6 : 6. How much more money does Chloe receive than Anna?",
    "options": [
      "£36",
      "£54",
      "£108",
      "£46"
    ],
    "correctAnswer": "£36",
    "explanation": "Total parts = 4 + 6 + 6 = 16. One part = £288 ÷ 16 = £18. Chloe has 6 parts (£108) and Anna has 4 parts (£72). Difference = £108 - £72 = £36.",
    "stepByStepSolution": "Step 1: Sum the ratio parts: 4 + 6 + 6 = 16 parts.\nStep 2: Calculate value per part: £288 ÷ 16 = £18.\nStep 3: Chloe's share = 6 × £18 = £108.\nStep 4: Anna's share = 4 × £18 = £72.\nStep 5: Difference = £108 - £72 = £36.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-alg-4",
    "subject": "Mathematics",
    "topic": "Algebra & Linear Equations",
    "difficulty": "Hard",
    "questionText": "Solve for x: 6(x + 5) = 54",
    "options": [
      "7",
      "6",
      "3",
      "4"
    ],
    "correctAnswer": "4",
    "explanation": "Expand or divide both sides by 6: x + 5 = 9. Subtract 5: x = 9 - 5 = 4.",
    "stepByStepSolution": "Step 1: Divide both sides by 6: (x + 5) = 54 ÷ 6 = 9.\nStep 2: Subtract 5 from both sides: x = 9 - 5 = 4.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-geom-5",
    "subject": "Mathematics",
    "topic": "Perimeter, Area & Volume",
    "difficulty": "Hard",
    "questionText": "An L-shaped lawn is created by taking a large rectangle measuring 16 m by 14 m and removing a rectangular corner patch measuring 5 m by 3 m. What is the total area of the remaining lawn?",
    "options": [
      "209 cm²",
      "224 cm²",
      "219 cm²",
      "200 cm²"
    ],
    "correctAnswer": "209 cm²",
    "explanation": "Calculate original rectangle area: 16 × 14 = 224 m². Subtract cut-out area: 5 × 3 = 15 m². Remaining area = 224 - 15 = 209 m².",
    "stepByStepSolution": "Step 1: Total bounding area = 16 × 14 = 224 m².\nStep 2: Corner cut-out area = 5 × 3 = 15 m².\nStep 3: Area of lawn = 224 - 15 = 209 m².\nAnswer: 209 cm² equivalent.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-frac-6",
    "subject": "Mathematics",
    "topic": "Fractions & Multi-Step Problems",
    "difficulty": "Hard",
    "questionText": "Marcus is reading a book containing 280 pages. On Saturday, he reads 1/5 of the entire book. On Sunday, he reads 2/5 of the REMAINING pages. How many pages does he still have left to read?",
    "options": [
      "134.4 pages",
      "149.4 pages",
      "124.4 pages",
      "112 pages"
    ],
    "correctAnswer": "134.4 pages",
    "explanation": "Saturday: 1/5 of 280 = 56 pages. Remaining = 280 - 56 = 224 pages. Sunday: 2/5 of 224 = 89.6 pages. Left to read = 224 - 89.6 = 134.4 pages.",
    "stepByStepSolution": "Step 1: Pages read on Saturday: 280 ÷ 5 = 56.\nStep 2: Pages remaining after Saturday: 280 - 56 = 224.\nStep 3: Pages read on Sunday: (2/5) × 224 = 89.6.\nStep 4: Pages still unread: 224 - 89.6 = 134.4 pages.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-prob-7",
    "subject": "Mathematics",
    "topic": "Probability & Data Analysis",
    "difficulty": "Hard",
    "questionText": "An opaque bag contains 5 red marbles, 8 blue marbles, and 4 yellow marbles. If one marble is drawn at random, what is the probability of selecting a red marble in its simplest fractional form?",
    "options": [
      "8/17",
      "4/17",
      "5/17",
      "6/17"
    ],
    "correctAnswer": "5/17",
    "explanation": "Total marbles = 5 + 8 + 4 = 17. Favorable outcomes = 5. Fraction = 5/17, which simplifies to 5/17.",
    "stepByStepSolution": "Step 1: Find total number of outcomes: 5 + 8 + 4 = 17.\nStep 2: Number of red marbles = 5.\nStep 3: Probability = 5/17.\nStep 4: Divide numerator and denominator by common factor 1: 5/17.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-mean-8",
    "subject": "Mathematics",
    "topic": "Statistics & Averages",
    "difficulty": "Hard",
    "questionText": "The mean score of 5 test papers is 25. Four of the paper scores are 21, 31, 23, and 30. What is the score on the fifth test paper?",
    "options": [
      "20",
      "23",
      "26",
      "16"
    ],
    "correctAnswer": "20",
    "explanation": "Total sum of 5 tests = 5 × 25 = 125. Sum of 4 known tests = 21 + 31 + 23 + 30 = 105. Fifth test = 125 - 105 = 20.",
    "stepByStepSolution": "Step 1: Total sum = Number of items × Mean = 5 × 25 = 125.\nStep 2: Sum of known scores = 21 + 31 + 23 + 30 = 105.\nStep 3: Fifth score = 125 - 105 = 20.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-9",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 54 mph. How far does the train travel in 3 hours and 40 minutes?",
    "options": [
      "198 miles",
      "186 miles",
      "225 miles",
      "202 miles"
    ],
    "correctAnswer": "198 miles",
    "explanation": "Convert 40 minutes to hours (40/60 = 0.6666666666666666 h). Total time = 3.6666666666666665 h. Distance = Speed × Time = 54 × 3.6666666666666665 = 198 miles.",
    "stepByStepSolution": "Step 1: Convert 40 mins to hours: 40 ÷ 60 = 0.6666666666666666.\nStep 2: Total time = 3 + 0.6666666666666666 = 3.6666666666666665 hours.\nStep 3: Distance = Speed × Time = 54 × 3.6666666666666665 = 198 miles.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-10",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 25%. The sale price is £180.00. What was the original price before the discount?",
    "options": [
      "£240.00",
      "£225.00",
      "£255.00",
      "£205.00"
    ],
    "correctAnswer": "£240.00",
    "explanation": "The sale price represents 75% of the original price. Divide the sale price by 0.75 to calculate the original price: £180.00 ÷ 0.75 = £240.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 25% = 75% of original value.\nStep 2: 75% = £180.00.\nStep 3: 1% = £180.00 ÷ 75 = £2.4000.\nStep 4: 100% = £240.00.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-ratio-11",
    "subject": "Mathematics",
    "topic": "Ratio & Proportion",
    "difficulty": "Hard",
    "questionText": "A lottery prize of £252 is shared among Anna, Ben, and Chloe in the ratio 3 : 6 : 5. How much more money does Chloe receive than Anna?",
    "options": [
      "£36",
      "£90",
      "£54",
      "£46"
    ],
    "correctAnswer": "£36",
    "explanation": "Total parts = 3 + 6 + 5 = 14. One part = £252 ÷ 14 = £18. Chloe has 5 parts (£90) and Anna has 3 parts (£54). Difference = £90 - £54 = £36.",
    "stepByStepSolution": "Step 1: Sum the ratio parts: 3 + 6 + 5 = 14 parts.\nStep 2: Calculate value per part: £252 ÷ 14 = £18.\nStep 3: Chloe's share = 5 × £18 = £90.\nStep 4: Anna's share = 3 × £18 = £54.\nStep 5: Difference = £90 - £54 = £36.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-alg-12",
    "subject": "Mathematics",
    "topic": "Algebra & Linear Equations",
    "difficulty": "Hard",
    "questionText": "Solve for x: 4(x + 7) = 68",
    "options": [
      "9",
      "10",
      "12",
      "13"
    ],
    "correctAnswer": "10",
    "explanation": "Expand or divide both sides by 4: x + 7 = 17. Subtract 7: x = 17 - 7 = 10.",
    "stepByStepSolution": "Step 1: Divide both sides by 4: (x + 7) = 68 ÷ 4 = 17.\nStep 2: Subtract 7 from both sides: x = 17 - 7 = 10.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-geom-13",
    "subject": "Mathematics",
    "topic": "Perimeter, Area & Volume",
    "difficulty": "Hard",
    "questionText": "An L-shaped lawn is created by taking a large rectangle measuring 12 m by 12 m and removing a rectangular corner patch measuring 4 m by 3 m. What is the total area of the remaining lawn?",
    "options": [
      "132 cm²",
      "144 cm²",
      "140 cm²",
      "123 cm²"
    ],
    "correctAnswer": "132 cm²",
    "explanation": "Calculate original rectangle area: 12 × 12 = 144 m². Subtract cut-out area: 4 × 3 = 12 m². Remaining area = 144 - 12 = 132 m².",
    "stepByStepSolution": "Step 1: Total bounding area = 12 × 12 = 144 m².\nStep 2: Corner cut-out area = 4 × 3 = 12 m².\nStep 3: Area of lawn = 144 - 12 = 132 m².\nAnswer: 132 cm² equivalent.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-frac-14",
    "subject": "Mathematics",
    "topic": "Fractions & Multi-Step Problems",
    "difficulty": "Hard",
    "questionText": "Marcus is reading a book containing 240 pages. On Saturday, he reads 1/4 of the entire book. On Sunday, he reads 2/5 of the REMAINING pages. How many pages does he still have left to read?",
    "options": [
      "108 pages",
      "123 pages",
      "90 pages",
      "98 pages"
    ],
    "correctAnswer": "108 pages",
    "explanation": "Saturday: 1/4 of 240 = 60 pages. Remaining = 240 - 60 = 180 pages. Sunday: 2/5 of 180 = 72 pages. Left to read = 180 - 72 = 108 pages.",
    "stepByStepSolution": "Step 1: Pages read on Saturday: 240 ÷ 4 = 60.\nStep 2: Pages remaining after Saturday: 240 - 60 = 180.\nStep 3: Pages read on Sunday: (2/5) × 180 = 72.\nStep 4: Pages still unread: 180 - 72 = 108 pages.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-prob-15",
    "subject": "Mathematics",
    "topic": "Probability & Data Analysis",
    "difficulty": "Hard",
    "questionText": "An opaque bag contains 8 red marbles, 10 blue marbles, and 4 yellow marbles. If one marble is drawn at random, what is the probability of selecting a red marble in its simplest fractional form?",
    "options": [
      "4.5/11",
      "2/11",
      "5/11",
      "4/11"
    ],
    "correctAnswer": "4/11",
    "explanation": "Total marbles = 8 + 10 + 4 = 22. Favorable outcomes = 8. Fraction = 8/22, which simplifies to 4/11.",
    "stepByStepSolution": "Step 1: Find total number of outcomes: 8 + 10 + 4 = 22.\nStep 2: Number of red marbles = 8.\nStep 3: Probability = 8/22.\nStep 4: Divide numerator and denominator by common factor 2: 4/11.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-mean-16",
    "subject": "Mathematics",
    "topic": "Statistics & Averages",
    "difficulty": "Hard",
    "questionText": "The mean score of 5 test papers is 21. Four of the paper scores are 17, 27, 19, and 26. What is the score on the fifth test paper?",
    "options": [
      "16",
      "19",
      "12",
      "22"
    ],
    "correctAnswer": "16",
    "explanation": "Total sum of 5 tests = 5 × 21 = 105. Sum of 4 known tests = 17 + 27 + 19 + 26 = 89. Fifth test = 105 - 89 = 16.",
    "stepByStepSolution": "Step 1: Total sum = Number of items × Mean = 5 × 21 = 105.\nStep 2: Sum of known scores = 17 + 27 + 19 + 26 = 89.\nStep 3: Fifth score = 105 - 89 = 16.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-17",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 60 mph. How far does the train travel in 2 hours and 20 minutes?",
    "options": [
      "140 miles",
      "170 miles",
      "128 miles",
      "190 miles"
    ],
    "correctAnswer": "140 miles",
    "explanation": "Convert 20 minutes to hours (20/60 = 0.3333333333333333 h). Total time = 2.3333333333333335 h. Distance = Speed × Time = 60 × 2.3333333333333335 = 140 miles.",
    "stepByStepSolution": "Step 1: Convert 20 mins to hours: 20 ÷ 60 = 0.3333333333333333.\nStep 2: Total time = 2 + 0.3333333333333333 = 2.3333333333333335 hours.\nStep 3: Distance = Speed × Time = 60 × 2.3333333333333335 = 140 miles.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-18",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 40%. The sale price is £72.00. What was the original price before the discount?",
    "options": [
      "£120.00",
      "£100.80",
      "£135.00",
      "£112.00"
    ],
    "correctAnswer": "£120.00",
    "explanation": "The sale price represents 60% of the original price. Divide the sale price by 0.6 to calculate the original price: £72.00 ÷ 0.6 = £120.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 40% = 60% of original value.\nStep 2: 60% = £72.00.\nStep 3: 1% = £72.00 ÷ 60 = £1.2000.\nStep 4: 100% = £120.00.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-ratio-19",
    "subject": "Mathematics",
    "topic": "Ratio & Proportion",
    "difficulty": "Hard",
    "questionText": "A lottery prize of £270 is shared among Anna, Ben, and Chloe in the ratio 2 : 6 : 7. How much more money does Chloe receive than Anna?",
    "options": [
      "£90",
      "£72",
      "£126",
      "£108"
    ],
    "correctAnswer": "£90",
    "explanation": "Total parts = 2 + 6 + 7 = 15. One part = £270 ÷ 15 = £18. Chloe has 7 parts (£126) and Anna has 2 parts (£36). Difference = £126 - £36 = £90.",
    "stepByStepSolution": "Step 1: Sum the ratio parts: 2 + 6 + 7 = 15 parts.\nStep 2: Calculate value per part: £270 ÷ 15 = £18.\nStep 3: Chloe's share = 7 × £18 = £126.\nStep 4: Anna's share = 2 × £18 = £36.\nStep 5: Difference = £126 - £36 = £90.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-alg-20",
    "subject": "Mathematics",
    "topic": "Algebra & Linear Equations",
    "difficulty": "Hard",
    "questionText": "Solve for x: 7(x + 3) = 70",
    "options": [
      "7",
      "9",
      "6",
      "10"
    ],
    "correctAnswer": "7",
    "explanation": "Expand or divide both sides by 7: x + 3 = 10. Subtract 3: x = 10 - 3 = 7.",
    "stepByStepSolution": "Step 1: Divide both sides by 7: (x + 3) = 70 ÷ 7 = 10.\nStep 2: Subtract 3 from both sides: x = 10 - 3 = 7.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-geom-21",
    "subject": "Mathematics",
    "topic": "Perimeter, Area & Volume",
    "difficulty": "Hard",
    "questionText": "An L-shaped lawn is created by taking a large rectangle measuring 14 m by 10 m and removing a rectangular corner patch measuring 6 m by 3 m. What is the total area of the remaining lawn?",
    "options": [
      "122 cm²",
      "140 cm²",
      "134 cm²",
      "113 cm²"
    ],
    "correctAnswer": "122 cm²",
    "explanation": "Calculate original rectangle area: 14 × 10 = 140 m². Subtract cut-out area: 6 × 3 = 18 m². Remaining area = 140 - 18 = 122 m².",
    "stepByStepSolution": "Step 1: Total bounding area = 14 × 10 = 140 m².\nStep 2: Corner cut-out area = 6 × 3 = 18 m².\nStep 3: Area of lawn = 140 - 18 = 122 m².\nAnswer: 122 cm² equivalent.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-frac-22",
    "subject": "Mathematics",
    "topic": "Fractions & Multi-Step Problems",
    "difficulty": "Hard",
    "questionText": "Marcus is reading a book containing 200 pages. On Saturday, he reads 1/3 of the entire book. On Sunday, he reads 2/5 of the REMAINING pages. How many pages does he still have left to read?",
    "options": [
      "67 pages",
      "79.99999999999999 pages",
      "69.99999999999999 pages",
      "94.99999999999999 pages"
    ],
    "correctAnswer": "79.99999999999999 pages",
    "explanation": "Saturday: 1/3 of 200 = 66.66666666666667 pages. Remaining = 200 - 66.66666666666667 = 133.33333333333331 pages. Sunday: 2/5 of 133.33333333333331 = 53.33333333333333 pages. Left to read = 133.33333333333331 - 53.33333333333333 = 79.99999999999999 pages.",
    "stepByStepSolution": "Step 1: Pages read on Saturday: 200 ÷ 3 = 66.66666666666667.\nStep 2: Pages remaining after Saturday: 200 - 66.66666666666667 = 133.33333333333331.\nStep 3: Pages read on Sunday: (2/5) × 133.33333333333331 = 53.33333333333333.\nStep 4: Pages still unread: 133.33333333333331 - 53.33333333333333 = 79.99999999999999 pages.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-prob-23",
    "subject": "Mathematics",
    "topic": "Probability & Data Analysis",
    "difficulty": "Hard",
    "questionText": "An opaque bag contains 6 red marbles, 6 blue marbles, and 4 yellow marbles. If one marble is drawn at random, what is the probability of selecting a red marble in its simplest fractional form?",
    "options": [
      "3.5/8",
      "1/4",
      "3/8",
      "13/8"
    ],
    "correctAnswer": "3/8",
    "explanation": "Total marbles = 6 + 6 + 4 = 16. Favorable outcomes = 6. Fraction = 6/16, which simplifies to 3/8.",
    "stepByStepSolution": "Step 1: Find total number of outcomes: 6 + 6 + 4 = 16.\nStep 2: Number of red marbles = 6.\nStep 3: Probability = 6/16.\nStep 4: Divide numerator and denominator by common factor 2: 3/8.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-mean-24",
    "subject": "Mathematics",
    "topic": "Statistics & Averages",
    "difficulty": "Hard",
    "questionText": "The mean score of 5 test papers is 29. Four of the paper scores are 25, 35, 27, and 34. What is the score on the fifth test paper?",
    "options": [
      "30",
      "24",
      "27",
      "20"
    ],
    "correctAnswer": "24",
    "explanation": "Total sum of 5 tests = 5 × 29 = 145. Sum of 4 known tests = 25 + 35 + 27 + 34 = 121. Fifth test = 145 - 121 = 24.",
    "stepByStepSolution": "Step 1: Total sum = Number of items × Mean = 5 × 29 = 145.\nStep 2: Sum of known scores = 25 + 35 + 27 + 34 = 121.\nStep 3: Fifth score = 145 - 121 = 24.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-25",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 66 mph. How far does the train travel in 1 hours and 45 minutes?",
    "options": [
      "115.5 miles",
      "148.5 miles",
      "103.5 miles",
      "111 miles"
    ],
    "correctAnswer": "115.5 miles",
    "explanation": "Convert 45 minutes to hours (45/60 = 0.75 h). Total time = 1.75 h. Distance = Speed × Time = 66 × 1.75 = 115.5 miles.",
    "stepByStepSolution": "Step 1: Convert 45 mins to hours: 45 ÷ 60 = 0.75.\nStep 2: Total time = 1 + 0.75 = 1.75 hours.\nStep 3: Distance = Speed × Time = 66 × 1.75 = 115.5 miles.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-26",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 15%. The sale price is £63.75. What was the original price before the discount?",
    "options": [
      "£75.00",
      "£73.31",
      "£90.00",
      "£78.75"
    ],
    "correctAnswer": "£75.00",
    "explanation": "The sale price represents 85% of the original price. Divide the sale price by 0.85 to calculate the original price: £63.75 ÷ 0.85 = £75.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 15% = 85% of original value.\nStep 2: 85% = £63.75.\nStep 3: 1% = £63.75 ÷ 85 = £0.7500.\nStep 4: 100% = £75.00.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-alg-28",
    "subject": "Mathematics",
    "topic": "Algebra & Linear Equations",
    "difficulty": "Hard",
    "questionText": "Solve for x: 5(x + 5) = 45",
    "options": [
      "7",
      "3",
      "4",
      "6"
    ],
    "correctAnswer": "4",
    "explanation": "Expand or divide both sides by 5: x + 5 = 9. Subtract 5: x = 9 - 5 = 4.",
    "stepByStepSolution": "Step 1: Divide both sides by 5: (x + 5) = 45 ÷ 5 = 9.\nStep 2: Subtract 5 from both sides: x = 9 - 5 = 4.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-geom-29",
    "subject": "Mathematics",
    "topic": "Perimeter, Area & Volume",
    "difficulty": "Hard",
    "questionText": "An L-shaped lawn is created by taking a large rectangle measuring 16 m by 13 m and removing a rectangular corner patch measuring 5 m by 3 m. What is the total area of the remaining lawn?",
    "options": [
      "208 cm²",
      "203 cm²",
      "193 cm²",
      "184 cm²"
    ],
    "correctAnswer": "193 cm²",
    "explanation": "Calculate original rectangle area: 16 × 13 = 208 m². Subtract cut-out area: 5 × 3 = 15 m². Remaining area = 208 - 15 = 193 m².",
    "stepByStepSolution": "Step 1: Total bounding area = 16 × 13 = 208 m².\nStep 2: Corner cut-out area = 5 × 3 = 15 m².\nStep 3: Area of lawn = 208 - 15 = 193 m².\nAnswer: 193 cm² equivalent.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-frac-30",
    "subject": "Mathematics",
    "topic": "Fractions & Multi-Step Problems",
    "difficulty": "Hard",
    "questionText": "Marcus is reading a book containing 180 pages. On Saturday, he reads 1/5 of the entire book. On Sunday, he reads 2/5 of the REMAINING pages. How many pages does he still have left to read?",
    "options": [
      "101.4 pages",
      "72 pages",
      "86.4 pages",
      "76.4 pages"
    ],
    "correctAnswer": "86.4 pages",
    "explanation": "Saturday: 1/5 of 180 = 36 pages. Remaining = 180 - 36 = 144 pages. Sunday: 2/5 of 144 = 57.6 pages. Left to read = 144 - 57.6 = 86.4 pages.",
    "stepByStepSolution": "Step 1: Pages read on Saturday: 180 ÷ 5 = 36.\nStep 2: Pages remaining after Saturday: 180 - 36 = 144.\nStep 3: Pages read on Sunday: (2/5) × 144 = 57.6.\nStep 4: Pages still unread: 144 - 57.6 = 86.4 pages.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-prob-31",
    "subject": "Mathematics",
    "topic": "Probability & Data Analysis",
    "difficulty": "Hard",
    "questionText": "An opaque bag contains 4 red marbles, 8 blue marbles, and 4 yellow marbles. If one marble is drawn at random, what is the probability of selecting a red marble in its simplest fractional form?",
    "options": [
      "1/4",
      "1/2",
      "1.25/4",
      "11/4"
    ],
    "correctAnswer": "1/4",
    "explanation": "Total marbles = 4 + 8 + 4 = 16. Favorable outcomes = 4. Fraction = 4/16, which simplifies to 1/4.",
    "stepByStepSolution": "Step 1: Find total number of outcomes: 4 + 8 + 4 = 16.\nStep 2: Number of red marbles = 4.\nStep 3: Probability = 4/16.\nStep 4: Divide numerator and denominator by common factor 4: 1/4.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-33",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 72 mph. How far does the train travel in 3 hours and 30 minutes?",
    "options": [
      "252 miles",
      "288 miles",
      "240 miles",
      "246 miles"
    ],
    "correctAnswer": "252 miles",
    "explanation": "Convert 30 minutes to hours (30/60 = 0.5 h). Total time = 3.5 h. Distance = Speed × Time = 72 × 3.5 = 252 miles.",
    "stepByStepSolution": "Step 1: Convert 30 mins to hours: 30 ÷ 60 = 0.5.\nStep 2: Total time = 3 + 0.5 = 3.5 hours.\nStep 3: Distance = Speed × Time = 72 × 3.5 = 252 miles.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-34",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 25%. The sale price is £30.00. What was the original price before the discount?",
    "options": [
      "£40.00",
      "£37.50",
      "£55.00",
      "£50"
    ],
    "correctAnswer": "£40.00",
    "explanation": "The sale price represents 75% of the original price. Divide the sale price by 0.75 to calculate the original price: £30.00 ÷ 0.75 = £40.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 25% = 75% of original value.\nStep 2: 75% = £30.00.\nStep 3: 1% = £30.00 ÷ 75 = £0.4000.\nStep 4: 100% = £40.00.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-alg-36",
    "subject": "Mathematics",
    "topic": "Algebra & Linear Equations",
    "difficulty": "Hard",
    "questionText": "Solve for x: 3(x + 7) = 51",
    "options": [
      "10",
      "12",
      "13",
      "9"
    ],
    "correctAnswer": "10",
    "explanation": "Expand or divide both sides by 3: x + 7 = 17. Subtract 7: x = 17 - 7 = 10.",
    "stepByStepSolution": "Step 1: Divide both sides by 3: (x + 7) = 51 ÷ 3 = 17.\nStep 2: Subtract 7 from both sides: x = 17 - 7 = 10.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-geom-37",
    "subject": "Mathematics",
    "topic": "Perimeter, Area & Volume",
    "difficulty": "Hard",
    "questionText": "An L-shaped lawn is created by taking a large rectangle measuring 12 m by 11 m and removing a rectangular corner patch measuring 4 m by 3 m. What is the total area of the remaining lawn?",
    "options": [
      "120 cm²",
      "132 cm²",
      "128 cm²",
      "111 cm²"
    ],
    "correctAnswer": "120 cm²",
    "explanation": "Calculate original rectangle area: 12 × 11 = 132 m². Subtract cut-out area: 4 × 3 = 12 m². Remaining area = 132 - 12 = 120 m².",
    "stepByStepSolution": "Step 1: Total bounding area = 12 × 11 = 132 m².\nStep 2: Corner cut-out area = 4 × 3 = 12 m².\nStep 3: Area of lawn = 132 - 12 = 120 m².\nAnswer: 120 cm² equivalent.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-frac-38",
    "subject": "Mathematics",
    "topic": "Fractions & Multi-Step Problems",
    "difficulty": "Hard",
    "questionText": "Marcus is reading a book containing 160 pages. On Saturday, he reads 1/4 of the entire book. On Sunday, he reads 2/5 of the REMAINING pages. How many pages does he still have left to read?",
    "options": [
      "72 pages",
      "60 pages",
      "62 pages",
      "87 pages"
    ],
    "correctAnswer": "72 pages",
    "explanation": "Saturday: 1/4 of 160 = 40 pages. Remaining = 160 - 40 = 120 pages. Sunday: 2/5 of 120 = 48 pages. Left to read = 120 - 48 = 72 pages.",
    "stepByStepSolution": "Step 1: Pages read on Saturday: 160 ÷ 4 = 40.\nStep 2: Pages remaining after Saturday: 160 - 40 = 120.\nStep 3: Pages read on Sunday: (2/5) × 120 = 48.\nStep 4: Pages still unread: 120 - 48 = 72 pages.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-prob-39",
    "subject": "Mathematics",
    "topic": "Probability & Data Analysis",
    "difficulty": "Hard",
    "questionText": "An opaque bag contains 7 red marbles, 10 blue marbles, and 4 yellow marbles. If one marble is drawn at random, what is the probability of selecting a red marble in its simplest fractional form?",
    "options": [
      "1/3",
      "10/21",
      "4/21",
      "1.1428571428571428/3"
    ],
    "correctAnswer": "1/3",
    "explanation": "Total marbles = 7 + 10 + 4 = 21. Favorable outcomes = 7. Fraction = 7/21, which simplifies to 1/3.",
    "stepByStepSolution": "Step 1: Find total number of outcomes: 7 + 10 + 4 = 21.\nStep 2: Number of red marbles = 7.\nStep 3: Probability = 7/21.\nStep 4: Divide numerator and denominator by common factor 7: 1/3.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-41",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 80 mph. How far does the train travel in 2 hours and 15 minutes?",
    "options": [
      "180 miles",
      "168 miles",
      "175 miles",
      "220 miles"
    ],
    "correctAnswer": "180 miles",
    "explanation": "Convert 15 minutes to hours (15/60 = 0.25 h). Total time = 2.25 h. Distance = Speed × Time = 80 × 2.25 = 180 miles.",
    "stepByStepSolution": "Step 1: Convert 15 mins to hours: 15 ÷ 60 = 0.25.\nStep 2: Total time = 2 + 0.25 = 2.25 hours.\nStep 3: Distance = Speed × Time = 80 × 2.25 = 180 miles.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-42",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 40%. The sale price is £108.00. What was the original price before the discount?",
    "options": [
      "£180.00",
      "£151.20",
      "£195.00",
      "£148.00"
    ],
    "correctAnswer": "£180.00",
    "explanation": "The sale price represents 60% of the original price. Divide the sale price by 0.6 to calculate the original price: £108.00 ÷ 0.6 = £180.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 40% = 60% of original value.\nStep 2: 60% = £108.00.\nStep 3: 1% = £108.00 ÷ 60 = £1.8000.\nStep 4: 100% = £180.00.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-alg-44",
    "subject": "Mathematics",
    "topic": "Algebra & Linear Equations",
    "difficulty": "Hard",
    "questionText": "Solve for x: 6(x + 3) = 60",
    "options": [
      "9",
      "7",
      "6",
      "10"
    ],
    "correctAnswer": "7",
    "explanation": "Expand or divide both sides by 6: x + 3 = 10. Subtract 3: x = 10 - 3 = 7.",
    "stepByStepSolution": "Step 1: Divide both sides by 6: (x + 3) = 60 ÷ 6 = 10.\nStep 2: Subtract 3 from both sides: x = 10 - 3 = 7.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-geom-45",
    "subject": "Mathematics",
    "topic": "Perimeter, Area & Volume",
    "difficulty": "Hard",
    "questionText": "An L-shaped lawn is created by taking a large rectangle measuring 14 m by 14 m and removing a rectangular corner patch measuring 6 m by 3 m. What is the total area of the remaining lawn?",
    "options": [
      "178 cm²",
      "196 cm²",
      "190 cm²",
      "169 cm²"
    ],
    "correctAnswer": "178 cm²",
    "explanation": "Calculate original rectangle area: 14 × 14 = 196 m². Subtract cut-out area: 6 × 3 = 18 m². Remaining area = 196 - 18 = 178 m².",
    "stepByStepSolution": "Step 1: Total bounding area = 14 × 14 = 196 m².\nStep 2: Corner cut-out area = 6 × 3 = 18 m².\nStep 3: Area of lawn = 196 - 18 = 178 m².\nAnswer: 178 cm² equivalent.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-frac-46",
    "subject": "Mathematics",
    "topic": "Fractions & Multi-Step Problems",
    "difficulty": "Hard",
    "questionText": "Marcus is reading a book containing 120 pages. On Saturday, he reads 1/3 of the entire book. On Sunday, he reads 2/5 of the REMAINING pages. How many pages does he still have left to read?",
    "options": [
      "48 pages",
      "40 pages",
      "63 pages",
      "38 pages"
    ],
    "correctAnswer": "48 pages",
    "explanation": "Saturday: 1/3 of 120 = 40 pages. Remaining = 120 - 40 = 80 pages. Sunday: 2/5 of 80 = 32 pages. Left to read = 80 - 32 = 48 pages.",
    "stepByStepSolution": "Step 1: Pages read on Saturday: 120 ÷ 3 = 40.\nStep 2: Pages remaining after Saturday: 120 - 40 = 80.\nStep 3: Pages read on Sunday: (2/5) × 80 = 32.\nStep 4: Pages still unread: 80 - 32 = 48 pages.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-prob-47",
    "subject": "Mathematics",
    "topic": "Probability & Data Analysis",
    "difficulty": "Hard",
    "questionText": "An opaque bag contains 5 red marbles, 6 blue marbles, and 4 yellow marbles. If one marble is drawn at random, what is the probability of selecting a red marble in its simplest fractional form?",
    "options": [
      "1.2/3",
      "4/15",
      "1/3",
      "2/5"
    ],
    "correctAnswer": "1/3",
    "explanation": "Total marbles = 5 + 6 + 4 = 15. Favorable outcomes = 5. Fraction = 5/15, which simplifies to 1/3.",
    "stepByStepSolution": "Step 1: Find total number of outcomes: 5 + 6 + 4 = 15.\nStep 2: Number of red marbles = 5.\nStep 3: Probability = 5/15.\nStep 4: Divide numerator and denominator by common factor 5: 1/3.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-49",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 90 mph. How far does the train travel in 1 hours and 40 minutes?",
    "options": [
      "150 miles",
      "195 miles",
      "138 miles",
      "130 miles"
    ],
    "correctAnswer": "150 miles",
    "explanation": "Convert 40 minutes to hours (40/60 = 0.6666666666666666 h). Total time = 1.6666666666666665 h. Distance = Speed × Time = 90 × 1.6666666666666665 = 150 miles.",
    "stepByStepSolution": "Step 1: Convert 40 mins to hours: 40 ÷ 60 = 0.6666666666666666.\nStep 2: Total time = 1 + 0.6666666666666666 = 1.6666666666666665 hours.\nStep 3: Distance = Speed × Time = 90 × 1.6666666666666665 = 150 miles.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-50",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 15%. The sale price is £76.50. What was the original price before the discount?",
    "options": [
      "£90.00",
      "£87.97",
      "£91.50",
      "£105.00"
    ],
    "correctAnswer": "£90.00",
    "explanation": "The sale price represents 85% of the original price. Divide the sale price by 0.85 to calculate the original price: £76.50 ÷ 0.85 = £90.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 15% = 85% of original value.\nStep 2: 85% = £76.50.\nStep 3: 1% = £76.50 ÷ 85 = £0.9000.\nStep 4: 100% = £90.00.",
    "sourceType": "past_paper",
    "sourcePdfName": "GL_Assessment_11Plus_Mathematics_Sample_Paper_2024.pdf",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-alg-52",
    "subject": "Mathematics",
    "topic": "Algebra & Linear Equations",
    "difficulty": "Hard",
    "questionText": "Solve for x: 4(x + 5) = 36",
    "options": [
      "6",
      "4",
      "3",
      "7"
    ],
    "correctAnswer": "4",
    "explanation": "Expand or divide both sides by 4: x + 5 = 9. Subtract 5: x = 9 - 5 = 4.",
    "stepByStepSolution": "Step 1: Divide both sides by 4: (x + 5) = 36 ÷ 4 = 9.\nStep 2: Subtract 5 from both sides: x = 9 - 5 = 4.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-geom-53",
    "subject": "Mathematics",
    "topic": "Perimeter, Area & Volume",
    "difficulty": "Hard",
    "questionText": "An L-shaped lawn is created by taking a large rectangle measuring 16 m by 12 m and removing a rectangular corner patch measuring 5 m by 3 m. What is the total area of the remaining lawn?",
    "options": [
      "177 cm²",
      "192 cm²",
      "187 cm²",
      "168 cm²"
    ],
    "correctAnswer": "177 cm²",
    "explanation": "Calculate original rectangle area: 16 × 12 = 192 m². Subtract cut-out area: 5 × 3 = 15 m². Remaining area = 192 - 15 = 177 m².",
    "stepByStepSolution": "Step 1: Total bounding area = 16 × 12 = 192 m².\nStep 2: Corner cut-out area = 5 × 3 = 15 m².\nStep 3: Area of lawn = 192 - 15 = 177 m².\nAnswer: 177 cm² equivalent.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-frac-54",
    "subject": "Mathematics",
    "topic": "Fractions & Multi-Step Problems",
    "difficulty": "Hard",
    "questionText": "Marcus is reading a book containing 400 pages. On Saturday, he reads 1/5 of the entire book. On Sunday, he reads 2/5 of the REMAINING pages. How many pages does he still have left to read?",
    "options": [
      "207 pages",
      "192 pages",
      "160 pages",
      "182 pages"
    ],
    "correctAnswer": "192 pages",
    "explanation": "Saturday: 1/5 of 400 = 80 pages. Remaining = 400 - 80 = 320 pages. Sunday: 2/5 of 320 = 128 pages. Left to read = 320 - 128 = 192 pages.",
    "stepByStepSolution": "Step 1: Pages read on Saturday: 400 ÷ 5 = 80.\nStep 2: Pages remaining after Saturday: 400 - 80 = 320.\nStep 3: Pages read on Sunday: (2/5) × 320 = 128.\nStep 4: Pages still unread: 320 - 128 = 192 pages.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-prob-55",
    "subject": "Mathematics",
    "topic": "Probability & Data Analysis",
    "difficulty": "Hard",
    "questionText": "An opaque bag contains 8 red marbles, 8 blue marbles, and 4 yellow marbles. If one marble is drawn at random, what is the probability of selecting a red marble in its simplest fractional form?",
    "options": [
      "2/5",
      "1/5",
      "2.25/5",
      "12/5"
    ],
    "correctAnswer": "2/5",
    "explanation": "Total marbles = 8 + 8 + 4 = 20. Favorable outcomes = 8. Fraction = 8/20, which simplifies to 2/5.",
    "stepByStepSolution": "Step 1: Find total number of outcomes: 8 + 8 + 4 = 20.\nStep 2: Number of red marbles = 8.\nStep 3: Probability = 8/20.\nStep 4: Divide numerator and denominator by common factor 4: 2/5.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-57",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 48 mph. How far does the train travel in 3 hours and 20 minutes?",
    "options": [
      "160 miles",
      "184 miles",
      "148 miles",
      "164 miles"
    ],
    "correctAnswer": "160 miles",
    "explanation": "Convert 20 minutes to hours (20/60 = 0.3333333333333333 h). Total time = 3.3333333333333335 h. Distance = Speed × Time = 48 × 3.3333333333333335 = 160 miles.",
    "stepByStepSolution": "Step 1: Convert 20 mins to hours: 20 ÷ 60 = 0.3333333333333333.\nStep 2: Total time = 3 + 0.3333333333333333 = 3.3333333333333335 hours.\nStep 3: Distance = Speed × Time = 48 × 3.3333333333333335 = 160 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-58",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 25%. The sale price is £45.00. What was the original price before the discount?",
    "options": [
      "£60.00",
      "£56.25",
      "£75.00",
      "£70.00"
    ],
    "correctAnswer": "£60.00",
    "explanation": "The sale price represents 75% of the original price. Divide the sale price by 0.75 to calculate the original price: £45.00 ÷ 0.75 = £60.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 25% = 75% of original value.\nStep 2: 75% = £45.00.\nStep 3: 1% = £45.00 ÷ 75 = £0.6000.\nStep 4: 100% = £60.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-alg-60",
    "subject": "Mathematics",
    "topic": "Algebra & Linear Equations",
    "difficulty": "Hard",
    "questionText": "Solve for x: 7(x + 7) = 119",
    "options": [
      "9",
      "10",
      "12",
      "13"
    ],
    "correctAnswer": "10",
    "explanation": "Expand or divide both sides by 7: x + 7 = 17. Subtract 7: x = 17 - 7 = 10.",
    "stepByStepSolution": "Step 1: Divide both sides by 7: (x + 7) = 119 ÷ 7 = 17.\nStep 2: Subtract 7 from both sides: x = 17 - 7 = 10.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-geom-61",
    "subject": "Mathematics",
    "topic": "Perimeter, Area & Volume",
    "difficulty": "Hard",
    "questionText": "An L-shaped lawn is created by taking a large rectangle measuring 12 m by 10 m and removing a rectangular corner patch measuring 4 m by 3 m. What is the total area of the remaining lawn?",
    "options": [
      "99 cm²",
      "108 cm²",
      "120 cm²",
      "116 cm²"
    ],
    "correctAnswer": "108 cm²",
    "explanation": "Calculate original rectangle area: 12 × 10 = 120 m². Subtract cut-out area: 4 × 3 = 12 m². Remaining area = 120 - 12 = 108 m².",
    "stepByStepSolution": "Step 1: Total bounding area = 12 × 10 = 120 m².\nStep 2: Corner cut-out area = 4 × 3 = 12 m².\nStep 3: Area of lawn = 120 - 12 = 108 m².\nAnswer: 108 cm² equivalent.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-frac-62",
    "subject": "Mathematics",
    "topic": "Fractions & Multi-Step Problems",
    "difficulty": "Hard",
    "questionText": "Marcus is reading a book containing 360 pages. On Saturday, he reads 1/4 of the entire book. On Sunday, he reads 2/5 of the REMAINING pages. How many pages does he still have left to read?",
    "options": [
      "162 pages",
      "177 pages",
      "135 pages",
      "152 pages"
    ],
    "correctAnswer": "162 pages",
    "explanation": "Saturday: 1/4 of 360 = 90 pages. Remaining = 360 - 90 = 270 pages. Sunday: 2/5 of 270 = 108 pages. Left to read = 270 - 108 = 162 pages.",
    "stepByStepSolution": "Step 1: Pages read on Saturday: 360 ÷ 4 = 90.\nStep 2: Pages remaining after Saturday: 360 - 90 = 270.\nStep 3: Pages read on Sunday: (2/5) × 270 = 108.\nStep 4: Pages still unread: 270 - 108 = 162 pages.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-prob-63",
    "subject": "Mathematics",
    "topic": "Probability & Data Analysis",
    "difficulty": "Hard",
    "questionText": "An opaque bag contains 6 red marbles, 10 blue marbles, and 4 yellow marbles. If one marble is drawn at random, what is the probability of selecting a red marble in its simplest fractional form?",
    "options": [
      "3/10",
      "1/2",
      "1/5",
      "3.5/10"
    ],
    "correctAnswer": "3/10",
    "explanation": "Total marbles = 6 + 10 + 4 = 20. Favorable outcomes = 6. Fraction = 6/20, which simplifies to 3/10.",
    "stepByStepSolution": "Step 1: Find total number of outcomes: 6 + 10 + 4 = 20.\nStep 2: Number of red marbles = 6.\nStep 3: Probability = 6/20.\nStep 4: Divide numerator and denominator by common factor 2: 3/10.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-65",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 54 mph. How far does the train travel in 2 hours and 45 minutes?",
    "options": [
      "148.5 miles",
      "175.5 miles",
      "136.5 miles",
      "153 miles"
    ],
    "correctAnswer": "148.5 miles",
    "explanation": "Convert 45 minutes to hours (45/60 = 0.75 h). Total time = 2.75 h. Distance = Speed × Time = 54 × 2.75 = 148.5 miles.",
    "stepByStepSolution": "Step 1: Convert 45 mins to hours: 45 ÷ 60 = 0.75.\nStep 2: Total time = 2 + 0.75 = 2.75 hours.\nStep 3: Distance = Speed × Time = 54 × 2.75 = 148.5 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-66",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 40%. The sale price is £192.00. What was the original price before the discount?",
    "options": [
      "£320.00",
      "£268.80",
      "£335.00",
      "£232.00"
    ],
    "correctAnswer": "£320.00",
    "explanation": "The sale price represents 60% of the original price. Divide the sale price by 0.6 to calculate the original price: £192.00 ÷ 0.6 = £320.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 40% = 60% of original value.\nStep 2: 60% = £192.00.\nStep 3: 1% = £192.00 ÷ 60 = £3.2000.\nStep 4: 100% = £320.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-alg-68",
    "subject": "Mathematics",
    "topic": "Algebra & Linear Equations",
    "difficulty": "Hard",
    "questionText": "Solve for x: 5(x + 3) = 50",
    "options": [
      "10",
      "6",
      "7",
      "9"
    ],
    "correctAnswer": "7",
    "explanation": "Expand or divide both sides by 5: x + 3 = 10. Subtract 3: x = 10 - 3 = 7.",
    "stepByStepSolution": "Step 1: Divide both sides by 5: (x + 3) = 50 ÷ 5 = 10.\nStep 2: Subtract 3 from both sides: x = 10 - 3 = 7.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-geom-69",
    "subject": "Mathematics",
    "topic": "Perimeter, Area & Volume",
    "difficulty": "Hard",
    "questionText": "An L-shaped lawn is created by taking a large rectangle measuring 14 m by 13 m and removing a rectangular corner patch measuring 6 m by 3 m. What is the total area of the remaining lawn?",
    "options": [
      "164 cm²",
      "182 cm²",
      "176 cm²",
      "155 cm²"
    ],
    "correctAnswer": "164 cm²",
    "explanation": "Calculate original rectangle area: 14 × 13 = 182 m². Subtract cut-out area: 6 × 3 = 18 m². Remaining area = 182 - 18 = 164 m².",
    "stepByStepSolution": "Step 1: Total bounding area = 14 × 13 = 182 m².\nStep 2: Corner cut-out area = 6 × 3 = 18 m².\nStep 3: Area of lawn = 182 - 18 = 164 m².\nAnswer: 164 cm² equivalent.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-frac-70",
    "subject": "Mathematics",
    "topic": "Fractions & Multi-Step Problems",
    "difficulty": "Hard",
    "questionText": "Marcus is reading a book containing 300 pages. On Saturday, he reads 1/3 of the entire book. On Sunday, he reads 2/5 of the REMAINING pages. How many pages does he still have left to read?",
    "options": [
      "120 pages",
      "135 pages",
      "100 pages",
      "110 pages"
    ],
    "correctAnswer": "120 pages",
    "explanation": "Saturday: 1/3 of 300 = 100 pages. Remaining = 300 - 100 = 200 pages. Sunday: 2/5 of 200 = 80 pages. Left to read = 200 - 80 = 120 pages.",
    "stepByStepSolution": "Step 1: Pages read on Saturday: 300 ÷ 3 = 100.\nStep 2: Pages remaining after Saturday: 300 - 100 = 200.\nStep 3: Pages read on Sunday: (2/5) × 200 = 80.\nStep 4: Pages still unread: 200 - 80 = 120 pages.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-prob-71",
    "subject": "Mathematics",
    "topic": "Probability & Data Analysis",
    "difficulty": "Hard",
    "questionText": "An opaque bag contains 4 red marbles, 6 blue marbles, and 4 yellow marbles. If one marble is drawn at random, what is the probability of selecting a red marble in its simplest fractional form?",
    "options": [
      "2/7",
      "3/7",
      "2.5/7",
      "12/7"
    ],
    "correctAnswer": "2/7",
    "explanation": "Total marbles = 4 + 6 + 4 = 14. Favorable outcomes = 4. Fraction = 4/14, which simplifies to 2/7.",
    "stepByStepSolution": "Step 1: Find total number of outcomes: 4 + 6 + 4 = 14.\nStep 2: Number of red marbles = 4.\nStep 3: Probability = 4/14.\nStep 4: Divide numerator and denominator by common factor 2: 2/7.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-73",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 60 mph. How far does the train travel in 1 hours and 30 minutes?",
    "options": [
      "78 miles",
      "90 miles",
      "120 miles",
      "100 miles"
    ],
    "correctAnswer": "90 miles",
    "explanation": "Convert 30 minutes to hours (30/60 = 0.5 h). Total time = 1.5 h. Distance = Speed × Time = 60 × 1.5 = 90 miles.",
    "stepByStepSolution": "Step 1: Convert 30 mins to hours: 30 ÷ 60 = 0.5.\nStep 2: Total time = 1 + 0.5 = 1.5 hours.\nStep 3: Distance = Speed × Time = 60 × 1.5 = 90 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-74",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 15%. The sale price is £127.50. What was the original price before the discount?",
    "options": [
      "£150.00",
      "£146.63",
      "£165.00",
      "£142.50"
    ],
    "correctAnswer": "£150.00",
    "explanation": "The sale price represents 85% of the original price. Divide the sale price by 0.85 to calculate the original price: £127.50 ÷ 0.85 = £150.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 15% = 85% of original value.\nStep 2: 85% = £127.50.\nStep 3: 1% = £127.50 ÷ 85 = £1.5000.\nStep 4: 100% = £150.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-alg-76",
    "subject": "Mathematics",
    "topic": "Algebra & Linear Equations",
    "difficulty": "Hard",
    "questionText": "Solve for x: 3(x + 5) = 27",
    "options": [
      "7",
      "4",
      "3",
      "6"
    ],
    "correctAnswer": "4",
    "explanation": "Expand or divide both sides by 3: x + 5 = 9. Subtract 5: x = 9 - 5 = 4.",
    "stepByStepSolution": "Step 1: Divide both sides by 3: (x + 5) = 27 ÷ 3 = 9.\nStep 2: Subtract 5 from both sides: x = 9 - 5 = 4.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-geom-77",
    "subject": "Mathematics",
    "topic": "Perimeter, Area & Volume",
    "difficulty": "Hard",
    "questionText": "An L-shaped lawn is created by taking a large rectangle measuring 16 m by 11 m and removing a rectangular corner patch measuring 5 m by 3 m. What is the total area of the remaining lawn?",
    "options": [
      "161 cm²",
      "176 cm²",
      "171 cm²",
      "152 cm²"
    ],
    "correctAnswer": "161 cm²",
    "explanation": "Calculate original rectangle area: 16 × 11 = 176 m². Subtract cut-out area: 5 × 3 = 15 m². Remaining area = 176 - 15 = 161 m².",
    "stepByStepSolution": "Step 1: Total bounding area = 16 × 11 = 176 m².\nStep 2: Corner cut-out area = 5 × 3 = 15 m².\nStep 3: Area of lawn = 176 - 15 = 161 m².\nAnswer: 161 cm² equivalent.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-prob-79",
    "subject": "Mathematics",
    "topic": "Probability & Data Analysis",
    "difficulty": "Hard",
    "questionText": "An opaque bag contains 7 red marbles, 8 blue marbles, and 4 yellow marbles. If one marble is drawn at random, what is the probability of selecting a red marble in its simplest fractional form?",
    "options": [
      "8/19",
      "4/19",
      "7/19",
      "17/19"
    ],
    "correctAnswer": "7/19",
    "explanation": "Total marbles = 7 + 8 + 4 = 19. Favorable outcomes = 7. Fraction = 7/19, which simplifies to 7/19.",
    "stepByStepSolution": "Step 1: Find total number of outcomes: 7 + 8 + 4 = 19.\nStep 2: Number of red marbles = 7.\nStep 3: Probability = 7/19.\nStep 4: Divide numerator and denominator by common factor 1: 7/19.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-81",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 66 mph. How far does the train travel in 3 hours and 15 minutes?",
    "options": [
      "213 miles",
      "214.5 miles",
      "247.5 miles",
      "202.5 miles"
    ],
    "correctAnswer": "214.5 miles",
    "explanation": "Convert 15 minutes to hours (15/60 = 0.25 h). Total time = 3.25 h. Distance = Speed × Time = 66 × 3.25 = 214.5 miles.",
    "stepByStepSolution": "Step 1: Convert 15 mins to hours: 15 ÷ 60 = 0.25.\nStep 2: Total time = 3 + 0.25 = 3.25 hours.\nStep 3: Distance = Speed × Time = 66 × 3.25 = 214.5 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-82",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 25%. The sale price is £60.00. What was the original price before the discount?",
    "options": [
      "£80.00",
      "£75.00",
      "£95.00",
      "£85.00"
    ],
    "correctAnswer": "£80.00",
    "explanation": "The sale price represents 75% of the original price. Divide the sale price by 0.75 to calculate the original price: £60.00 ÷ 0.75 = £80.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 25% = 75% of original value.\nStep 2: 75% = £60.00.\nStep 3: 1% = £60.00 ÷ 75 = £0.8000.\nStep 4: 100% = £80.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-alg-84",
    "subject": "Mathematics",
    "topic": "Algebra & Linear Equations",
    "difficulty": "Hard",
    "questionText": "Solve for x: 6(x + 7) = 102",
    "options": [
      "9",
      "10",
      "12",
      "13"
    ],
    "correctAnswer": "10",
    "explanation": "Expand or divide both sides by 6: x + 7 = 17. Subtract 7: x = 17 - 7 = 10.",
    "stepByStepSolution": "Step 1: Divide both sides by 6: (x + 7) = 102 ÷ 6 = 17.\nStep 2: Subtract 7 from both sides: x = 17 - 7 = 10.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-geom-85",
    "subject": "Mathematics",
    "topic": "Perimeter, Area & Volume",
    "difficulty": "Hard",
    "questionText": "An L-shaped lawn is created by taking a large rectangle measuring 12 m by 14 m and removing a rectangular corner patch measuring 4 m by 3 m. What is the total area of the remaining lawn?",
    "options": [
      "156 cm²",
      "168 cm²",
      "164 cm²",
      "147 cm²"
    ],
    "correctAnswer": "156 cm²",
    "explanation": "Calculate original rectangle area: 12 × 14 = 168 m². Subtract cut-out area: 4 × 3 = 12 m². Remaining area = 168 - 12 = 156 m².",
    "stepByStepSolution": "Step 1: Total bounding area = 12 × 14 = 168 m².\nStep 2: Corner cut-out area = 4 × 3 = 12 m².\nStep 3: Area of lawn = 168 - 12 = 156 m².\nAnswer: 156 cm² equivalent.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-prob-87",
    "subject": "Mathematics",
    "topic": "Probability & Data Analysis",
    "difficulty": "Hard",
    "questionText": "An opaque bag contains 5 red marbles, 10 blue marbles, and 4 yellow marbles. If one marble is drawn at random, what is the probability of selecting a red marble in its simplest fractional form?",
    "options": [
      "10/19",
      "6/19",
      "4/19",
      "5/19"
    ],
    "correctAnswer": "5/19",
    "explanation": "Total marbles = 5 + 10 + 4 = 19. Favorable outcomes = 5. Fraction = 5/19, which simplifies to 5/19.",
    "stepByStepSolution": "Step 1: Find total number of outcomes: 5 + 10 + 4 = 19.\nStep 2: Number of red marbles = 5.\nStep 3: Probability = 5/19.\nStep 4: Divide numerator and denominator by common factor 1: 5/19.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-89",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 72 mph. How far does the train travel in 2 hours and 40 minutes?",
    "options": [
      "192 miles",
      "180 miles",
      "184 miles",
      "228 miles"
    ],
    "correctAnswer": "192 miles",
    "explanation": "Convert 40 minutes to hours (40/60 = 0.6666666666666666 h). Total time = 2.6666666666666665 h. Distance = Speed × Time = 72 × 2.6666666666666665 = 192 miles.",
    "stepByStepSolution": "Step 1: Convert 40 mins to hours: 40 ÷ 60 = 0.6666666666666666.\nStep 2: Total time = 2 + 0.6666666666666666 = 2.6666666666666665 hours.\nStep 3: Distance = Speed × Time = 72 × 2.6666666666666665 = 192 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-90",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 40%. The sale price is £30.00. What was the original price before the discount?",
    "options": [
      "£50.00",
      "£42.00",
      "£65.00",
      "£70.00"
    ],
    "correctAnswer": "£50.00",
    "explanation": "The sale price represents 60% of the original price. Divide the sale price by 0.6 to calculate the original price: £30.00 ÷ 0.6 = £50.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 40% = 60% of original value.\nStep 2: 60% = £30.00.\nStep 3: 1% = £30.00 ÷ 60 = £0.5000.\nStep 4: 100% = £50.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-alg-92",
    "subject": "Mathematics",
    "topic": "Algebra & Linear Equations",
    "difficulty": "Hard",
    "questionText": "Solve for x: 4(x + 3) = 40",
    "options": [
      "10",
      "9",
      "7",
      "6"
    ],
    "correctAnswer": "7",
    "explanation": "Expand or divide both sides by 4: x + 3 = 10. Subtract 3: x = 10 - 3 = 7.",
    "stepByStepSolution": "Step 1: Divide both sides by 4: (x + 3) = 40 ÷ 4 = 10.\nStep 2: Subtract 3 from both sides: x = 10 - 3 = 7.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-geom-93",
    "subject": "Mathematics",
    "topic": "Perimeter, Area & Volume",
    "difficulty": "Hard",
    "questionText": "An L-shaped lawn is created by taking a large rectangle measuring 14 m by 12 m and removing a rectangular corner patch measuring 6 m by 3 m. What is the total area of the remaining lawn?",
    "options": [
      "150 cm²",
      "168 cm²",
      "162 cm²",
      "141 cm²"
    ],
    "correctAnswer": "150 cm²",
    "explanation": "Calculate original rectangle area: 14 × 12 = 168 m². Subtract cut-out area: 6 × 3 = 18 m². Remaining area = 168 - 18 = 150 m².",
    "stepByStepSolution": "Step 1: Total bounding area = 14 × 12 = 168 m².\nStep 2: Corner cut-out area = 6 × 3 = 18 m².\nStep 3: Area of lawn = 168 - 18 = 150 m².\nAnswer: 150 cm² equivalent.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-prob-95",
    "subject": "Mathematics",
    "topic": "Probability & Data Analysis",
    "difficulty": "Hard",
    "questionText": "An opaque bag contains 8 red marbles, 6 blue marbles, and 4 yellow marbles. If one marble is drawn at random, what is the probability of selecting a red marble in its simplest fractional form?",
    "options": [
      "4/9",
      "2/9",
      "1/3",
      "4.5/9"
    ],
    "correctAnswer": "4/9",
    "explanation": "Total marbles = 8 + 6 + 4 = 18. Favorable outcomes = 8. Fraction = 8/18, which simplifies to 4/9.",
    "stepByStepSolution": "Step 1: Find total number of outcomes: 8 + 6 + 4 = 18.\nStep 2: Number of red marbles = 8.\nStep 3: Probability = 8/18.\nStep 4: Divide numerator and denominator by common factor 2: 4/9.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-97",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 80 mph. How far does the train travel in 1 hours and 20 minutes?",
    "options": [
      "106.7 miles",
      "146.7 miles",
      "100 miles",
      "94.7 miles"
    ],
    "correctAnswer": "106.7 miles",
    "explanation": "Convert 20 minutes to hours (20/60 = 0.3333333333333333 h). Total time = 1.3333333333333333 h. Distance = Speed × Time = 80 × 1.3333333333333333 = 106.7 miles.",
    "stepByStepSolution": "Step 1: Convert 20 mins to hours: 20 ÷ 60 = 0.3333333333333333.\nStep 2: Total time = 1 + 0.3333333333333333 = 1.3333333333333333 hours.\nStep 3: Distance = Speed × Time = 80 × 1.3333333333333333 = 106.7 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-98",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 15%. The sale price is £204.00. What was the original price before the discount?",
    "options": [
      "£240.00",
      "£234.60",
      "£255.00",
      "£219.00"
    ],
    "correctAnswer": "£240.00",
    "explanation": "The sale price represents 85% of the original price. Divide the sale price by 0.85 to calculate the original price: £204.00 ÷ 0.85 = £240.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 15% = 85% of original value.\nStep 2: 85% = £204.00.\nStep 3: 1% = £204.00 ÷ 85 = £2.4000.\nStep 4: 100% = £240.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-alg-100",
    "subject": "Mathematics",
    "topic": "Algebra & Linear Equations",
    "difficulty": "Hard",
    "questionText": "Solve for x: 7(x + 5) = 63",
    "options": [
      "6",
      "4",
      "3",
      "7"
    ],
    "correctAnswer": "4",
    "explanation": "Expand or divide both sides by 7: x + 5 = 9. Subtract 5: x = 9 - 5 = 4.",
    "stepByStepSolution": "Step 1: Divide both sides by 7: (x + 5) = 63 ÷ 7 = 9.\nStep 2: Subtract 5 from both sides: x = 9 - 5 = 4.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-geom-101",
    "subject": "Mathematics",
    "topic": "Perimeter, Area & Volume",
    "difficulty": "Hard",
    "questionText": "An L-shaped lawn is created by taking a large rectangle measuring 16 m by 10 m and removing a rectangular corner patch measuring 5 m by 3 m. What is the total area of the remaining lawn?",
    "options": [
      "145 cm²",
      "160 cm²",
      "155 cm²",
      "136 cm²"
    ],
    "correctAnswer": "145 cm²",
    "explanation": "Calculate original rectangle area: 16 × 10 = 160 m². Subtract cut-out area: 5 × 3 = 15 m². Remaining area = 160 - 15 = 145 m².",
    "stepByStepSolution": "Step 1: Total bounding area = 16 × 10 = 160 m².\nStep 2: Corner cut-out area = 5 × 3 = 15 m².\nStep 3: Area of lawn = 160 - 15 = 145 m².\nAnswer: 145 cm² equivalent.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-prob-103",
    "subject": "Mathematics",
    "topic": "Probability & Data Analysis",
    "difficulty": "Hard",
    "questionText": "An opaque bag contains 6 red marbles, 8 blue marbles, and 4 yellow marbles. If one marble is drawn at random, what is the probability of selecting a red marble in its simplest fractional form?",
    "options": [
      "2/9",
      "1/3",
      "4/9",
      "1.1666666666666667/3"
    ],
    "correctAnswer": "1/3",
    "explanation": "Total marbles = 6 + 8 + 4 = 18. Favorable outcomes = 6. Fraction = 6/18, which simplifies to 1/3.",
    "stepByStepSolution": "Step 1: Find total number of outcomes: 6 + 8 + 4 = 18.\nStep 2: Number of red marbles = 6.\nStep 3: Probability = 6/18.\nStep 4: Divide numerator and denominator by common factor 6: 1/3.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-105",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 90 mph. How far does the train travel in 3 hours and 45 minutes?",
    "options": [
      "315 miles",
      "337.5 miles",
      "382.5 miles",
      "325.5 miles"
    ],
    "correctAnswer": "337.5 miles",
    "explanation": "Convert 45 minutes to hours (45/60 = 0.75 h). Total time = 3.75 h. Distance = Speed × Time = 90 × 3.75 = 337.5 miles.",
    "stepByStepSolution": "Step 1: Convert 45 mins to hours: 45 ÷ 60 = 0.75.\nStep 2: Total time = 3 + 0.75 = 3.75 hours.\nStep 3: Distance = Speed × Time = 90 × 3.75 = 337.5 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-106",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 25%. The sale price is £90.00. What was the original price before the discount?",
    "options": [
      "£120.00",
      "£112.50",
      "£135.00",
      "£115.00"
    ],
    "correctAnswer": "£120.00",
    "explanation": "The sale price represents 75% of the original price. Divide the sale price by 0.75 to calculate the original price: £90.00 ÷ 0.75 = £120.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 25% = 75% of original value.\nStep 2: 75% = £90.00.\nStep 3: 1% = £90.00 ÷ 75 = £1.2000.\nStep 4: 100% = £120.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-alg-108",
    "subject": "Mathematics",
    "topic": "Algebra & Linear Equations",
    "difficulty": "Hard",
    "questionText": "Solve for x: 5(x + 7) = 85",
    "options": [
      "9",
      "10",
      "12",
      "13"
    ],
    "correctAnswer": "10",
    "explanation": "Expand or divide both sides by 5: x + 7 = 17. Subtract 7: x = 17 - 7 = 10.",
    "stepByStepSolution": "Step 1: Divide both sides by 5: (x + 7) = 85 ÷ 5 = 17.\nStep 2: Subtract 7 from both sides: x = 17 - 7 = 10.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-geom-109",
    "subject": "Mathematics",
    "topic": "Perimeter, Area & Volume",
    "difficulty": "Hard",
    "questionText": "An L-shaped lawn is created by taking a large rectangle measuring 12 m by 13 m and removing a rectangular corner patch measuring 4 m by 3 m. What is the total area of the remaining lawn?",
    "options": [
      "144 cm²",
      "156 cm²",
      "152 cm²",
      "135 cm²"
    ],
    "correctAnswer": "144 cm²",
    "explanation": "Calculate original rectangle area: 12 × 13 = 156 m². Subtract cut-out area: 4 × 3 = 12 m². Remaining area = 156 - 12 = 144 m².",
    "stepByStepSolution": "Step 1: Total bounding area = 12 × 13 = 156 m².\nStep 2: Corner cut-out area = 4 × 3 = 12 m².\nStep 3: Area of lawn = 156 - 12 = 144 m².\nAnswer: 144 cm² equivalent.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-prob-111",
    "subject": "Mathematics",
    "topic": "Probability & Data Analysis",
    "difficulty": "Hard",
    "questionText": "An opaque bag contains 4 red marbles, 10 blue marbles, and 4 yellow marbles. If one marble is drawn at random, what is the probability of selecting a red marble in its simplest fractional form?",
    "options": [
      "2.5/9",
      "5/9",
      "2/9",
      "12/9"
    ],
    "correctAnswer": "2/9",
    "explanation": "Total marbles = 4 + 10 + 4 = 18. Favorable outcomes = 4. Fraction = 4/18, which simplifies to 2/9.",
    "stepByStepSolution": "Step 1: Find total number of outcomes: 4 + 10 + 4 = 18.\nStep 2: Number of red marbles = 4.\nStep 3: Probability = 4/18.\nStep 4: Divide numerator and denominator by common factor 2: 2/9.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-113",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 48 mph. How far does the train travel in 2 hours and 30 minutes?",
    "options": [
      "120 miles",
      "144 miles",
      "108 miles",
      "126 miles"
    ],
    "correctAnswer": "120 miles",
    "explanation": "Convert 30 minutes to hours (30/60 = 0.5 h). Total time = 2.5 h. Distance = Speed × Time = 48 × 2.5 = 120 miles.",
    "stepByStepSolution": "Step 1: Convert 30 mins to hours: 30 ÷ 60 = 0.5.\nStep 2: Total time = 2 + 0.5 = 2.5 hours.\nStep 3: Distance = Speed × Time = 48 × 2.5 = 120 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-114",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 40%. The sale price is £45.00. What was the original price before the discount?",
    "options": [
      "£75.00",
      "£63.00",
      "£90.00",
      "£85.00"
    ],
    "correctAnswer": "£75.00",
    "explanation": "The sale price represents 60% of the original price. Divide the sale price by 0.6 to calculate the original price: £45.00 ÷ 0.6 = £75.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 40% = 60% of original value.\nStep 2: 60% = £45.00.\nStep 3: 1% = £45.00 ÷ 60 = £0.7500.\nStep 4: 100% = £75.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-alg-116",
    "subject": "Mathematics",
    "topic": "Algebra & Linear Equations",
    "difficulty": "Hard",
    "questionText": "Solve for x: 3(x + 3) = 30",
    "options": [
      "6",
      "7",
      "9",
      "10"
    ],
    "correctAnswer": "7",
    "explanation": "Expand or divide both sides by 3: x + 3 = 10. Subtract 3: x = 10 - 3 = 7.",
    "stepByStepSolution": "Step 1: Divide both sides by 3: (x + 3) = 30 ÷ 3 = 10.\nStep 2: Subtract 3 from both sides: x = 10 - 3 = 7.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-geom-117",
    "subject": "Mathematics",
    "topic": "Perimeter, Area & Volume",
    "difficulty": "Hard",
    "questionText": "An L-shaped lawn is created by taking a large rectangle measuring 14 m by 11 m and removing a rectangular corner patch measuring 6 m by 3 m. What is the total area of the remaining lawn?",
    "options": [
      "136 cm²",
      "154 cm²",
      "148 cm²",
      "127 cm²"
    ],
    "correctAnswer": "136 cm²",
    "explanation": "Calculate original rectangle area: 14 × 11 = 154 m². Subtract cut-out area: 6 × 3 = 18 m². Remaining area = 154 - 18 = 136 m².",
    "stepByStepSolution": "Step 1: Total bounding area = 14 × 11 = 154 m².\nStep 2: Corner cut-out area = 6 × 3 = 18 m².\nStep 3: Area of lawn = 154 - 18 = 136 m².\nAnswer: 136 cm² equivalent.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-prob-119",
    "subject": "Mathematics",
    "topic": "Probability & Data Analysis",
    "difficulty": "Hard",
    "questionText": "An opaque bag contains 7 red marbles, 6 blue marbles, and 4 yellow marbles. If one marble is drawn at random, what is the probability of selecting a red marble in its simplest fractional form?",
    "options": [
      "8/17",
      "6/17",
      "7/17",
      "4/17"
    ],
    "correctAnswer": "7/17",
    "explanation": "Total marbles = 7 + 6 + 4 = 17. Favorable outcomes = 7. Fraction = 7/17, which simplifies to 7/17.",
    "stepByStepSolution": "Step 1: Find total number of outcomes: 7 + 6 + 4 = 17.\nStep 2: Number of red marbles = 7.\nStep 3: Probability = 7/17.\nStep 4: Divide numerator and denominator by common factor 1: 7/17.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-121",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 54 mph. How far does the train travel in 1 hours and 15 minutes?",
    "options": [
      "55.5 miles",
      "67.5 miles",
      "94.5 miles",
      "69 miles"
    ],
    "correctAnswer": "67.5 miles",
    "explanation": "Convert 15 minutes to hours (15/60 = 0.25 h). Total time = 1.25 h. Distance = Speed × Time = 54 × 1.25 = 67.5 miles.",
    "stepByStepSolution": "Step 1: Convert 15 mins to hours: 15 ÷ 60 = 0.25.\nStep 2: Total time = 1 + 0.25 = 1.25 hours.\nStep 3: Distance = Speed × Time = 54 × 1.25 = 67.5 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-122",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 15%. The sale price is £34.00. What was the original price before the discount?",
    "options": [
      "£40.00",
      "£39.10",
      "£55.00",
      "£49.00"
    ],
    "correctAnswer": "£40.00",
    "explanation": "The sale price represents 85% of the original price. Divide the sale price by 0.85 to calculate the original price: £34.00 ÷ 0.85 = £40.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 15% = 85% of original value.\nStep 2: 85% = £34.00.\nStep 3: 1% = £34.00 ÷ 85 = £0.4000.\nStep 4: 100% = £40.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-129",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 60 mph. How far does the train travel in 3 hours and 40 minutes?",
    "options": [
      "220 miles",
      "250 miles",
      "208 miles",
      "270 miles"
    ],
    "correctAnswer": "220 miles",
    "explanation": "Convert 40 minutes to hours (40/60 = 0.6666666666666666 h). Total time = 3.6666666666666665 h. Distance = Speed × Time = 60 × 3.6666666666666665 = 220 miles.",
    "stepByStepSolution": "Step 1: Convert 40 mins to hours: 40 ÷ 60 = 0.6666666666666666.\nStep 2: Total time = 3 + 0.6666666666666666 = 3.6666666666666665 hours.\nStep 3: Distance = Speed × Time = 60 × 3.6666666666666665 = 220 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-130",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 25%. The sale price is £135.00. What was the original price before the discount?",
    "options": [
      "£180.00",
      "£168.75",
      "£195.00",
      "£160.00"
    ],
    "correctAnswer": "£180.00",
    "explanation": "The sale price represents 75% of the original price. Divide the sale price by 0.75 to calculate the original price: £135.00 ÷ 0.75 = £180.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 25% = 75% of original value.\nStep 2: 75% = £135.00.\nStep 3: 1% = £135.00 ÷ 75 = £1.8000.\nStep 4: 100% = £180.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-137",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 66 mph. How far does the train travel in 2 hours and 20 minutes?",
    "options": [
      "154 miles",
      "187 miles",
      "142 miles",
      "152 miles"
    ],
    "correctAnswer": "154 miles",
    "explanation": "Convert 20 minutes to hours (20/60 = 0.3333333333333333 h). Total time = 2.3333333333333335 h. Distance = Speed × Time = 66 × 2.3333333333333335 = 154 miles.",
    "stepByStepSolution": "Step 1: Convert 20 mins to hours: 20 ÷ 60 = 0.3333333333333333.\nStep 2: Total time = 2 + 0.3333333333333333 = 2.3333333333333335 hours.\nStep 3: Distance = Speed × Time = 66 × 2.3333333333333335 = 154 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-138",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 40%. The sale price is £54.00. What was the original price before the discount?",
    "options": [
      "£105.00",
      "£90.00",
      "£75.60",
      "£94.00"
    ],
    "correctAnswer": "£90.00",
    "explanation": "The sale price represents 60% of the original price. Divide the sale price by 0.6 to calculate the original price: £54.00 ÷ 0.6 = £90.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 40% = 60% of original value.\nStep 2: 60% = £54.00.\nStep 3: 1% = £54.00 ÷ 60 = £0.9000.\nStep 4: 100% = £90.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-145",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 72 mph. How far does the train travel in 1 hours and 45 minutes?",
    "options": [
      "126 miles",
      "162 miles",
      "114 miles",
      "117 miles"
    ],
    "correctAnswer": "126 miles",
    "explanation": "Convert 45 minutes to hours (45/60 = 0.75 h). Total time = 1.75 h. Distance = Speed × Time = 72 × 1.75 = 126 miles.",
    "stepByStepSolution": "Step 1: Convert 45 mins to hours: 45 ÷ 60 = 0.75.\nStep 2: Total time = 1 + 0.75 = 1.75 hours.\nStep 3: Distance = Speed × Time = 72 × 1.75 = 126 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-146",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 15%. The sale price is £51.00. What was the original price before the discount?",
    "options": [
      "£60.00",
      "£58.65",
      "£75.00",
      "£66.00"
    ],
    "correctAnswer": "£60.00",
    "explanation": "The sale price represents 85% of the original price. Divide the sale price by 0.85 to calculate the original price: £51.00 ÷ 0.85 = £60.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 15% = 85% of original value.\nStep 2: 85% = £51.00.\nStep 3: 1% = £51.00 ÷ 85 = £0.6000.\nStep 4: 100% = £60.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-153",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 80 mph. How far does the train travel in 3 hours and 30 minutes?",
    "options": [
      "280 miles",
      "268 miles",
      "270 miles",
      "320 miles"
    ],
    "correctAnswer": "280 miles",
    "explanation": "Convert 30 minutes to hours (30/60 = 0.5 h). Total time = 3.5 h. Distance = Speed × Time = 80 × 3.5 = 280 miles.",
    "stepByStepSolution": "Step 1: Convert 30 mins to hours: 30 ÷ 60 = 0.5.\nStep 2: Total time = 3 + 0.5 = 3.5 hours.\nStep 3: Distance = Speed × Time = 80 × 3.5 = 280 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-154",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 25%. The sale price is £240.00. What was the original price before the discount?",
    "options": [
      "£320.00",
      "£300.00",
      "£335.00",
      "£265.00"
    ],
    "correctAnswer": "£320.00",
    "explanation": "The sale price represents 75% of the original price. Divide the sale price by 0.75 to calculate the original price: £240.00 ÷ 0.75 = £320.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 25% = 75% of original value.\nStep 2: 75% = £240.00.\nStep 3: 1% = £240.00 ÷ 75 = £3.2000.\nStep 4: 100% = £320.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-161",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 90 mph. How far does the train travel in 2 hours and 15 minutes?",
    "options": [
      "202.5 miles",
      "247.5 miles",
      "190.5 miles",
      "195 miles"
    ],
    "correctAnswer": "202.5 miles",
    "explanation": "Convert 15 minutes to hours (15/60 = 0.25 h). Total time = 2.25 h. Distance = Speed × Time = 90 × 2.25 = 202.5 miles.",
    "stepByStepSolution": "Step 1: Convert 15 mins to hours: 15 ÷ 60 = 0.25.\nStep 2: Total time = 2 + 0.25 = 2.25 hours.\nStep 3: Distance = Speed × Time = 90 × 2.25 = 202.5 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-162",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 40%. The sale price is £90.00. What was the original price before the discount?",
    "options": [
      "£150.00",
      "£126.00",
      "£165.00",
      "£130.00"
    ],
    "correctAnswer": "£150.00",
    "explanation": "The sale price represents 60% of the original price. Divide the sale price by 0.6 to calculate the original price: £90.00 ÷ 0.6 = £150.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 40% = 60% of original value.\nStep 2: 60% = £90.00.\nStep 3: 1% = £90.00 ÷ 60 = £1.5000.\nStep 4: 100% = £150.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-169",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 48 mph. How far does the train travel in 1 hours and 40 minutes?",
    "options": [
      "104 miles",
      "80 miles",
      "88 miles",
      "68 miles"
    ],
    "correctAnswer": "80 miles",
    "explanation": "Convert 40 minutes to hours (40/60 = 0.6666666666666666 h). Total time = 1.6666666666666665 h. Distance = Speed × Time = 48 × 1.6666666666666665 = 80 miles.",
    "stepByStepSolution": "Step 1: Convert 40 mins to hours: 40 ÷ 60 = 0.6666666666666666.\nStep 2: Total time = 1 + 0.6666666666666666 = 1.6666666666666665 hours.\nStep 3: Distance = Speed × Time = 48 × 1.6666666666666665 = 80 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-170",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 15%. The sale price is £68.00. What was the original price before the discount?",
    "options": [
      "£80.00",
      "£78.20",
      "£95.00",
      "£83.00"
    ],
    "correctAnswer": "£80.00",
    "explanation": "The sale price represents 85% of the original price. Divide the sale price by 0.85 to calculate the original price: £68.00 ÷ 0.85 = £80.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 15% = 85% of original value.\nStep 2: 85% = £68.00.\nStep 3: 1% = £68.00 ÷ 85 = £0.8000.\nStep 4: 100% = £80.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-177",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 54 mph. How far does the train travel in 3 hours and 20 minutes?",
    "options": [
      "180 miles",
      "168 miles",
      "182 miles",
      "207 miles"
    ],
    "correctAnswer": "180 miles",
    "explanation": "Convert 20 minutes to hours (20/60 = 0.3333333333333333 h). Total time = 3.3333333333333335 h. Distance = Speed × Time = 54 × 3.3333333333333335 = 180 miles.",
    "stepByStepSolution": "Step 1: Convert 20 mins to hours: 20 ÷ 60 = 0.3333333333333333.\nStep 2: Total time = 3 + 0.3333333333333333 = 3.3333333333333335 hours.\nStep 3: Distance = Speed × Time = 54 × 3.3333333333333335 = 180 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-178",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 25%. The sale price is £37.50. What was the original price before the discount?",
    "options": [
      "£50.00",
      "£46.88",
      "£65.00",
      "£62.50"
    ],
    "correctAnswer": "£50.00",
    "explanation": "The sale price represents 75% of the original price. Divide the sale price by 0.75 to calculate the original price: £37.50 ÷ 0.75 = £50.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 25% = 75% of original value.\nStep 2: 75% = £37.50.\nStep 3: 1% = £37.50 ÷ 75 = £0.5000.\nStep 4: 100% = £50.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-185",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 60 mph. How far does the train travel in 2 hours and 45 minutes?",
    "options": [
      "165 miles",
      "195 miles",
      "153 miles",
      "215 miles"
    ],
    "correctAnswer": "165 miles",
    "explanation": "Convert 45 minutes to hours (45/60 = 0.75 h). Total time = 2.75 h. Distance = Speed × Time = 60 × 2.75 = 165 miles.",
    "stepByStepSolution": "Step 1: Convert 45 mins to hours: 45 ÷ 60 = 0.75.\nStep 2: Total time = 2 + 0.75 = 2.75 hours.\nStep 3: Distance = Speed × Time = 60 × 2.75 = 165 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-186",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 40%. The sale price is £144.00. What was the original price before the discount?",
    "options": [
      "£240.00",
      "£201.60",
      "£255.00",
      "£184.00"
    ],
    "correctAnswer": "£240.00",
    "explanation": "The sale price represents 60% of the original price. Divide the sale price by 0.6 to calculate the original price: £144.00 ÷ 0.6 = £240.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 40% = 60% of original value.\nStep 2: 60% = £144.00.\nStep 3: 1% = £144.00 ÷ 60 = £2.4000.\nStep 4: 100% = £240.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-193",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 66 mph. How far does the train travel in 1 hours and 30 minutes?",
    "options": [
      "132 miles",
      "87 miles",
      "99 miles",
      "96 miles"
    ],
    "correctAnswer": "99 miles",
    "explanation": "Convert 30 minutes to hours (30/60 = 0.5 h). Total time = 1.5 h. Distance = Speed × Time = 66 × 1.5 = 99 miles.",
    "stepByStepSolution": "Step 1: Convert 30 mins to hours: 30 ÷ 60 = 0.5.\nStep 2: Total time = 1 + 0.5 = 1.5 hours.\nStep 3: Distance = Speed × Time = 66 × 1.5 = 99 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-194",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 15%. The sale price is £102.00. What was the original price before the discount?",
    "options": [
      "£120.00",
      "£117.30",
      "£135.00",
      "£117.00"
    ],
    "correctAnswer": "£120.00",
    "explanation": "The sale price represents 85% of the original price. Divide the sale price by 0.85 to calculate the original price: £102.00 ÷ 0.85 = £120.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 15% = 85% of original value.\nStep 2: 85% = £102.00.\nStep 3: 1% = £102.00 ÷ 85 = £1.2000.\nStep 4: 100% = £120.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-201",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 72 mph. How far does the train travel in 3 hours and 15 minutes?",
    "options": [
      "234 miles",
      "270 miles",
      "222 miles",
      "231 miles"
    ],
    "correctAnswer": "234 miles",
    "explanation": "Convert 15 minutes to hours (15/60 = 0.25 h). Total time = 3.25 h. Distance = Speed × Time = 72 × 3.25 = 234 miles.",
    "stepByStepSolution": "Step 1: Convert 15 mins to hours: 15 ÷ 60 = 0.25.\nStep 2: Total time = 3 + 0.25 = 3.25 hours.\nStep 3: Distance = Speed × Time = 72 × 3.25 = 234 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-202",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 25%. The sale price is £56.25. What was the original price before the discount?",
    "options": [
      "£75.00",
      "£70.31",
      "£90.00",
      "£81.25"
    ],
    "correctAnswer": "£75.00",
    "explanation": "The sale price represents 75% of the original price. Divide the sale price by 0.75 to calculate the original price: £56.25 ÷ 0.75 = £75.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 25% = 75% of original value.\nStep 2: 75% = £56.25.\nStep 3: 1% = £56.25 ÷ 75 = £0.7500.\nStep 4: 100% = £75.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-209",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 80 mph. How far does the train travel in 2 hours and 40 minutes?",
    "options": [
      "213.3 miles",
      "253.3 miles",
      "201.3 miles",
      "200 miles"
    ],
    "correctAnswer": "213.3 miles",
    "explanation": "Convert 40 minutes to hours (40/60 = 0.6666666666666666 h). Total time = 2.6666666666666665 h. Distance = Speed × Time = 80 × 2.6666666666666665 = 213.3 miles.",
    "stepByStepSolution": "Step 1: Convert 40 mins to hours: 40 ÷ 60 = 0.6666666666666666.\nStep 2: Total time = 2 + 0.6666666666666666 = 2.6666666666666665 hours.\nStep 3: Distance = Speed × Time = 80 × 2.6666666666666665 = 213.3 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-210",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 40%. The sale price is £24.00. What was the original price before the discount?",
    "options": [
      "£40.00",
      "£33.60",
      "£55.00",
      "£64.00"
    ],
    "correctAnswer": "£40.00",
    "explanation": "The sale price represents 60% of the original price. Divide the sale price by 0.6 to calculate the original price: £24.00 ÷ 0.6 = £40.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 40% = 60% of original value.\nStep 2: 60% = £24.00.\nStep 3: 1% = £24.00 ÷ 60 = £0.4000.\nStep 4: 100% = £40.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-217",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 90 mph. How far does the train travel in 1 hours and 20 minutes?",
    "options": [
      "120 miles",
      "165 miles",
      "108 miles",
      "110 miles"
    ],
    "correctAnswer": "120 miles",
    "explanation": "Convert 20 minutes to hours (20/60 = 0.3333333333333333 h). Total time = 1.3333333333333333 h. Distance = Speed × Time = 90 × 1.3333333333333333 = 120 miles.",
    "stepByStepSolution": "Step 1: Convert 20 mins to hours: 20 ÷ 60 = 0.3333333333333333.\nStep 2: Total time = 1 + 0.3333333333333333 = 1.3333333333333333 hours.\nStep 3: Distance = Speed × Time = 90 × 1.3333333333333333 = 120 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-218",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 15%. The sale price is £153.00. What was the original price before the discount?",
    "options": [
      "£180.00",
      "£175.95",
      "£195.00",
      "£168.00"
    ],
    "correctAnswer": "£180.00",
    "explanation": "The sale price represents 85% of the original price. Divide the sale price by 0.85 to calculate the original price: £153.00 ÷ 0.85 = £180.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 15% = 85% of original value.\nStep 2: 85% = £153.00.\nStep 3: 1% = £153.00 ÷ 85 = £1.8000.\nStep 4: 100% = £180.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-225",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 48 mph. How far does the train travel in 3 hours and 45 minutes?",
    "options": [
      "180 miles",
      "168 miles",
      "189 miles",
      "204 miles"
    ],
    "correctAnswer": "180 miles",
    "explanation": "Convert 45 minutes to hours (45/60 = 0.75 h). Total time = 3.75 h. Distance = Speed × Time = 48 × 3.75 = 180 miles.",
    "stepByStepSolution": "Step 1: Convert 45 mins to hours: 45 ÷ 60 = 0.75.\nStep 2: Total time = 3 + 0.75 = 3.75 hours.\nStep 3: Distance = Speed × Time = 48 × 3.75 = 180 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-226",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 25%. The sale price is £67.50. What was the original price before the discount?",
    "options": [
      "£105.00",
      "£90.00",
      "£84.38",
      "£92.50"
    ],
    "correctAnswer": "£90.00",
    "explanation": "The sale price represents 75% of the original price. Divide the sale price by 0.75 to calculate the original price: £67.50 ÷ 0.75 = £90.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 25% = 75% of original value.\nStep 2: 75% = £67.50.\nStep 3: 1% = £67.50 ÷ 75 = £0.9000.\nStep 4: 100% = £90.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-233",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 54 mph. How far does the train travel in 2 hours and 30 minutes?",
    "options": [
      "135 miles",
      "162 miles",
      "123 miles",
      "138 miles"
    ],
    "correctAnswer": "135 miles",
    "explanation": "Convert 30 minutes to hours (30/60 = 0.5 h). Total time = 2.5 h. Distance = Speed × Time = 54 × 2.5 = 135 miles.",
    "stepByStepSolution": "Step 1: Convert 30 mins to hours: 30 ÷ 60 = 0.5.\nStep 2: Total time = 2 + 0.5 = 2.5 hours.\nStep 3: Distance = Speed × Time = 54 × 2.5 = 135 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-234",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 40%. The sale price is £36.00. What was the original price before the discount?",
    "options": [
      "£60.00",
      "£50.40",
      "£75.00",
      "£76.00"
    ],
    "correctAnswer": "£60.00",
    "explanation": "The sale price represents 60% of the original price. Divide the sale price by 0.6 to calculate the original price: £36.00 ÷ 0.6 = £60.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 40% = 60% of original value.\nStep 2: 60% = £36.00.\nStep 3: 1% = £36.00 ÷ 60 = £0.6000.\nStep 4: 100% = £60.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-241",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 60 mph. How far does the train travel in 1 hours and 15 minutes?",
    "options": [
      "105 miles",
      "63 miles",
      "75 miles",
      "85 miles"
    ],
    "correctAnswer": "75 miles",
    "explanation": "Convert 15 minutes to hours (15/60 = 0.25 h). Total time = 1.25 h. Distance = Speed × Time = 60 × 1.25 = 75 miles.",
    "stepByStepSolution": "Step 1: Convert 15 mins to hours: 15 ÷ 60 = 0.25.\nStep 2: Total time = 1 + 0.25 = 1.25 hours.\nStep 3: Distance = Speed × Time = 60 × 1.25 = 75 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-242",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 15%. The sale price is £272.00. What was the original price before the discount?",
    "options": [
      "£320.00",
      "£312.80",
      "£335.00",
      "£287.00"
    ],
    "correctAnswer": "£320.00",
    "explanation": "The sale price represents 85% of the original price. Divide the sale price by 0.85 to calculate the original price: £272.00 ÷ 0.85 = £320.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 15% = 85% of original value.\nStep 2: 85% = £272.00.\nStep 3: 1% = £272.00 ÷ 85 = £3.2000.\nStep 4: 100% = £320.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-249",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 66 mph. How far does the train travel in 3 hours and 40 minutes?",
    "options": [
      "242 miles",
      "275 miles",
      "230 miles",
      "238 miles"
    ],
    "correctAnswer": "242 miles",
    "explanation": "Convert 40 minutes to hours (40/60 = 0.6666666666666666 h). Total time = 3.6666666666666665 h. Distance = Speed × Time = 66 × 3.6666666666666665 = 242 miles.",
    "stepByStepSolution": "Step 1: Convert 40 mins to hours: 40 ÷ 60 = 0.6666666666666666.\nStep 2: Total time = 3 + 0.6666666666666666 = 3.6666666666666665 hours.\nStep 3: Distance = Speed × Time = 66 × 3.6666666666666665 = 242 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-250",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 25%. The sale price is £112.50. What was the original price before the discount?",
    "options": [
      "£150.00",
      "£140.63",
      "£165.00",
      "£137.50"
    ],
    "correctAnswer": "£150.00",
    "explanation": "The sale price represents 75% of the original price. Divide the sale price by 0.75 to calculate the original price: £112.50 ÷ 0.75 = £150.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 25% = 75% of original value.\nStep 2: 75% = £112.50.\nStep 3: 1% = £112.50 ÷ 75 = £1.5000.\nStep 4: 100% = £150.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-sdt-257",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "An express train travels at an average speed of 72 mph. How far does the train travel in 2 hours and 20 minutes?",
    "options": [
      "204 miles",
      "168 miles",
      "156 miles",
      "164 miles"
    ],
    "correctAnswer": "168 miles",
    "explanation": "Convert 20 minutes to hours (20/60 = 0.3333333333333333 h). Total time = 2.3333333333333335 h. Distance = Speed × Time = 72 × 2.3333333333333335 = 168 miles.",
    "stepByStepSolution": "Step 1: Convert 20 mins to hours: 20 ÷ 60 = 0.3333333333333333.\nStep 2: Total time = 2 + 0.3333333333333333 = 2.3333333333333335 hours.\nStep 3: Distance = Speed × Time = 72 × 2.3333333333333335 = 168 miles.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-revpct-258",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an annual clearance sale, a coat was reduced by 40%. The sale price is £48.00. What was the original price before the discount?",
    "options": [
      "£80.00",
      "£67.20",
      "£95.00",
      "£88.00"
    ],
    "correctAnswer": "£80.00",
    "explanation": "The sale price represents 60% of the original price. Divide the sale price by 0.6 to calculate the original price: £48.00 ÷ 0.6 = £80.00.",
    "stepByStepSolution": "Step 1: The discounted price is 100% - 40% = 60% of original value.\nStep 2: 60% = £48.00.\nStep 3: 1% = £48.00 ÷ 60 = £0.8000.\nStep 4: 100% = £80.00.",
    "sourceType": "curated_seed",
    "approved": true,
    "createdAt": "2026-09-20T00:00:00.000Z"
  },
  {
    "id": "math-cur-new-1",
    "subject": "Mathematics",
    "topic": "Fractions & Multi-Step Problems",
    "difficulty": "Hard",
    "questionText": "A baker bakes 240 scones. He sells 3/8 of them in the morning and 2/5 of the remainder in the afternoon. How many scones are left unsold?",
    "options": [
      "90",
      "75",
      "60",
      "105"
    ],
    "correctAnswer": "90",
    "explanation": "Morning: 3/8 of 240 = 90 scones sold. Remainder = 240 - 90 = 150. Afternoon: 2/5 of 150 = 60 scones sold. Left unsold = 150 - 60 = 90 scones.",
    "stepByStepSolution": "Step 1: Morning sales = (3/8) × 240 = 90.\nStep 2: Remainder = 240 - 90 = 150.\nStep 3: Afternoon sales = (2/5) × 150 = 60.\nStep 4: Unsold = 150 - 60 = 90 scones.",
    "sourceType": "past_paper",
    "sourcePdfName": "UK_National_Curriculum_11Plus_Mastery.pdf",
    "approved": true,
    "createdAt": "2026-09-22T14:53:47.533Z"
  },
  {
    "id": "math-cur-new-2",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "A cylindrical water tank has a capacity of 1,800 litres. A tap drains water at 45 litres per minute while an inlet pipe fills it at 20 litres per minute. If the tank is full, how long will it take to empty completely?",
    "options": [
      "72 minutes",
      "60 minutes",
      "80 minutes",
      "90 minutes"
    ],
    "correctAnswer": "72 minutes",
    "explanation": "Net drainage rate = 45 - 20 = 25 litres per minute. Time to empty = 1,800 ÷ 25 = 72 minutes.",
    "stepByStepSolution": "Step 1: Net loss per minute = 45 - 20 = 25 L/min.\nStep 2: Total volume to empty = 1,800 litres.\nStep 3: Time = 1,800 ÷ 25 = 72 minutes.",
    "sourceType": "past_paper",
    "sourcePdfName": "UK_National_Curriculum_11Plus_Mastery.pdf",
    "approved": true,
    "createdAt": "2026-09-22T14:53:47.534Z"
  },
  {
    "id": "math-cur-new-3",
    "subject": "Mathematics",
    "topic": "Perimeter, Area & Volume",
    "difficulty": "Hard",
    "questionText": "The interior angles of a quadrilateral are in the ratio 2 : 3 : 4 : 6. What is the measure of the largest angle?",
    "options": [
      "144°",
      "120°",
      "136°",
      "150°"
    ],
    "correctAnswer": "144°",
    "explanation": "Sum of angles in a quadrilateral = 360°. Total parts = 2 + 3 + 4 + 6 = 15. Value per part = 360° ÷ 15 = 24°. Largest angle = 6 × 24° = 144°.",
    "stepByStepSolution": "Step 1: Quadrilateral angle sum = 360°.\nStep 2: Total parts = 2 + 3 + 4 + 6 = 15 parts.\nStep 3: One part = 360 ÷ 15 = 24°.\nStep 4: Largest angle (6 parts) = 6 × 24 = 144°.",
    "sourceType": "past_paper",
    "sourcePdfName": "UK_National_Curriculum_11Plus_Mastery.pdf",
    "approved": true,
    "createdAt": "2026-09-22T14:53:47.534Z"
  },
  {
    "id": "math-cur-new-4",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "A cyclist travels at 18 km/h for 40 minutes, and then at 24 km/h for 30 minutes. What is the total distance covered?",
    "options": [
      "24 km",
      "22 km",
      "20 km",
      "26 km"
    ],
    "correctAnswer": "24 km",
    "explanation": "Part 1: 18 km/h × (40/60) h = 12 km. Part 2: 24 km/h × (30/60) h = 12 km. Total distance = 12 + 12 = 24 km.",
    "stepByStepSolution": "Step 1: Convert 40 mins to hours: 40/60 = 2/3 hour.\nStep 2: Distance 1 = 18 × (2/3) = 12 km.\nStep 3: Convert 30 mins to hours: 30/60 = 1/2 hour.\nStep 4: Distance 2 = 24 × (1/2) = 12 km.\nStep 5: Total = 12 + 12 = 24 km.",
    "sourceType": "past_paper",
    "sourcePdfName": "UK_National_Curriculum_11Plus_Mastery.pdf",
    "approved": true,
    "createdAt": "2026-09-22T14:53:47.534Z"
  },
  {
    "id": "math-cur-new-5",
    "subject": "Mathematics",
    "topic": "Perimeter, Area & Volume",
    "difficulty": "Hard",
    "questionText": "A rectangular garden measuring 14 m by 10 m is surrounded on all sides by a paved path 1.5 m wide. What is the area of the paved path?",
    "options": [
      "81 m²",
      "72 m²",
      "90 m²",
      "96 m²"
    ],
    "correctAnswer": "81 m²",
    "explanation": "Inner area = 14 × 10 = 140 m². Outer dimensions = (14 + 3) × (10 + 3) = 17 × 13 = 221 m². Path area = 221 - 140 = 81 m².",
    "stepByStepSolution": "Step 1: Inner garden area = 14 × 10 = 140 m².\nStep 2: Outer length = 14 + 1.5 + 1.5 = 17 m; Outer width = 10 + 1.5 + 1.5 = 13 m.\nStep 3: Outer area = 17 × 13 = 221 m².\nStep 4: Path area = 221 - 140 = 81 m².",
    "sourceType": "past_paper",
    "sourcePdfName": "UK_National_Curriculum_11Plus_Mastery.pdf",
    "approved": true,
    "createdAt": "2026-09-22T14:53:47.534Z"
  },
  {
    "id": "math-cur-new-6",
    "subject": "Mathematics",
    "topic": "Statistics & Averages",
    "difficulty": "Hard",
    "questionText": "The mean of five positive integers is 18. When a sixth integer is added, the new mean becomes 21. What is the value of the sixth integer?",
    "options": [
      "36",
      "33",
      "30",
      "39"
    ],
    "correctAnswer": "36",
    "explanation": "Sum of 5 numbers = 5 × 18 = 90. Sum of 6 numbers = 6 × 21 = 126. Sixth number = 126 - 90 = 36.",
    "stepByStepSolution": "Step 1: Total of first 5 numbers = 5 × 18 = 90.\nStep 2: Total of all 6 numbers = 6 × 21 = 126.\nStep 3: Sixth number = 126 - 90 = 36.",
    "sourceType": "past_paper",
    "sourcePdfName": "UK_National_Curriculum_11Plus_Mastery.pdf",
    "approved": true,
    "createdAt": "2026-09-22T14:53:47.534Z"
  },
  {
    "id": "math-cur-new-7",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "A shop offers a 20% discount on a television during a winter sale, followed by an additional 10% off the discounted price. If the original price was £450, what is the final price?",
    "options": [
      "£324",
      "£315",
      "£330",
      "£342"
    ],
    "correctAnswer": "£324",
    "explanation": "After 20% off: £450 × 0.80 = £360. After second 10% off: £360 × 0.90 = £324.",
    "stepByStepSolution": "Step 1: First discount of 20%: £450 - £90 = £360.\nStep 2: Second discount of 10% on £360: £360 - £36 = £324.\nStep 3: Final payable price = £324.",
    "sourceType": "past_paper",
    "sourcePdfName": "UK_National_Curriculum_11Plus_Mastery.pdf",
    "approved": true,
    "createdAt": "2026-09-22T14:53:47.534Z"
  },
  {
    "id": "math-cur-new-8",
    "subject": "Mathematics",
    "topic": "Ratio & Proportion",
    "difficulty": "Hard",
    "questionText": "A map has a scale of 1 : 50,000. On the map, two railway stations are 6.4 cm apart. What is the actual distance between them in kilometres?",
    "options": [
      "3.2 km",
      "3.6 km",
      "2.8 km",
      "32 km"
    ],
    "correctAnswer": "3.2 km",
    "explanation": "6.4 cm × 50,000 = 320,000 cm = 3,200 m = 3.2 km.",
    "stepByStepSolution": "Step 1: Distance on map = 6.4 cm.\nStep 2: Real distance in cm = 6.4 × 50,000 = 320,000 cm.\nStep 3: Convert to metres: 320,000 ÷ 100 = 3,200 m.\nStep 4: Convert to kilometres: 3,200 ÷ 1,000 = 3.2 km.",
    "sourceType": "past_paper",
    "sourcePdfName": "UK_National_Curriculum_11Plus_Mastery.pdf",
    "approved": true,
    "createdAt": "2026-09-22T14:53:47.534Z"
  },
  {
    "id": "math-cur-new-9",
    "subject": "Mathematics",
    "topic": "Algebra & Linear Equations",
    "difficulty": "Hard",
    "questionText": "Solve the linear equation for y: 4(2y - 3) = 3(y + 6)",
    "options": [
      "y = 6",
      "y = 5",
      "y = 7",
      "y = 4"
    ],
    "correctAnswer": "y = 6",
    "explanation": "Expand both sides: 8y - 12 = 3y + 18. Subtract 3y: 5y - 12 = 18. Add 12: 5y = 30, so y = 6.",
    "stepByStepSolution": "Step 1: Expand brackets: 8y - 12 = 3y + 18.\nStep 2: Collect y terms: 8y - 3y = 18 + 12.\nStep 3: 5y = 30.\nStep 4: y = 30 ÷ 5 = 6.",
    "sourceType": "past_paper",
    "sourcePdfName": "UK_National_Curriculum_11Plus_Mastery.pdf",
    "approved": true,
    "createdAt": "2026-09-22T14:53:47.534Z"
  },
  {
    "id": "math-cur-new-10",
    "subject": "Mathematics",
    "topic": "Probability & Data Analysis",
    "difficulty": "Hard",
    "questionText": "A spinner is divided into 8 equal sectors numbered 1 to 8. What is the probability of spinning a prime number or a multiple of 4?",
    "options": [
      "3/4",
      "5/8",
      "1/2",
      "7/8"
    ],
    "correctAnswer": "3/4",
    "explanation": "Numbers are {1, 2, 3, 4, 5, 6, 7, 8}. Primes are {2, 3, 5, 7} (4 numbers). Multiples of 4 are {4, 8} (2 numbers). Favourable set = {2, 3, 4, 5, 7, 8} (6 numbers). Probability = 6/8 = 3/4.",
    "stepByStepSolution": "Step 1: Identify prime outcomes: 2, 3, 5, 7 (4 outcomes).\nStep 2: Identify multiples of 4: 4, 8 (2 outcomes).\nStep 3: Combined unique favourable outcomes: {2, 3, 4, 5, 7, 8} = 6 outcomes.\nStep 4: Probability = 6/8 = 3/4.",
    "sourceType": "past_paper",
    "sourcePdfName": "UK_National_Curriculum_11Plus_Mastery.pdf",
    "approved": true,
    "createdAt": "2026-09-22T14:53:47.534Z"
  },
  {
    "id": "math-cur-new-11",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "A car journey of 195 miles takes 3 hours and 15 minutes. What is the average speed of the car in miles per hour?",
    "options": [
      "60 mph",
      "58 mph",
      "62 mph",
      "65 mph"
    ],
    "correctAnswer": "60 mph",
    "explanation": "Convert 3 hours 15 mins to hours: 3.25 hours. Average speed = 195 ÷ 3.25 = 60 mph.",
    "stepByStepSolution": "Step 1: Convert time: 15 mins = 0.25 hours, total = 3.25 hours.\nStep 2: Speed = Distance ÷ Time = 195 ÷ 3.25.\nStep 3: 195 ÷ (13/4) = 195 × 4 ÷ 13 = 15 × 4 = 60 mph.",
    "sourceType": "past_paper",
    "sourcePdfName": "UK_National_Curriculum_11Plus_Mastery.pdf",
    "approved": true,
    "createdAt": "2026-09-22T14:53:47.534Z"
  },
  {
    "id": "math-cur-new-12",
    "subject": "Mathematics",
    "topic": "Arithmetic & Problem Solving",
    "difficulty": "Hard",
    "questionText": "Two numbers have a sum of 84 and a difference of 18. What is the product of the two numbers?",
    "options": [
      "1,683",
      "1,728",
      "1,650",
      "1,716"
    ],
    "correctAnswer": "1,683",
    "explanation": "Let numbers be x and y. x + y = 84, x - y = 18. Adding equations: 2x = 102 => x = 51. y = 84 - 51 = 33. Product = 51 × 33 = 1,683.",
    "stepByStepSolution": "Step 1: Larger number = (84 + 18) ÷ 2 = 102 ÷ 2 = 51.\nStep 2: Smaller number = 84 - 51 = 33.\nStep 3: Product = 51 × 33 = 1,683.",
    "sourceType": "past_paper",
    "sourcePdfName": "UK_National_Curriculum_11Plus_Mastery.pdf",
    "approved": true,
    "createdAt": "2026-09-22T14:53:47.534Z"
  },
  {
    "id": "math-cur-new-13",
    "subject": "Mathematics",
    "topic": "Perimeter, Area & Volume",
    "difficulty": "Hard",
    "questionText": "A cuboid has a length of 12 cm, a width of 8 cm, and a height of 5 cm. What is its total surface area?",
    "options": [
      "392 cm²",
      "380 cm²",
      "412 cm²",
      "400 cm²"
    ],
    "correctAnswer": "392 cm²",
    "explanation": "Total surface area = 2(lw + lh + wh) = 2(12×8 + 12×5 + 8×5) = 2(96 + 60 + 40) = 2(196) = 392 cm².",
    "stepByStepSolution": "Step 1: Face pairs: 2 × (12 × 8) = 192 cm².\nStep 2: Face pairs: 2 × (12 × 5) = 120 cm².\nStep 3: Face pairs: 2 × (8 × 5) = 80 cm².\nStep 4: Total surface area = 192 + 120 + 80 = 392 cm².",
    "sourceType": "past_paper",
    "sourcePdfName": "UK_National_Curriculum_11Plus_Mastery.pdf",
    "approved": true,
    "createdAt": "2026-09-22T14:53:47.534Z"
  },
  {
    "id": "math-cur-new-14",
    "subject": "Mathematics",
    "topic": "Ratio & Proportion",
    "difficulty": "Hard",
    "questionText": "If 15 men can build a brick wall in 8 days, how many days would it take 12 men working at the exact same rate to build the same wall?",
    "options": [
      "10 days",
      "9 days",
      "11 days",
      "12 days"
    ],
    "correctAnswer": "10 days",
    "explanation": "Total man-days required = 15 × 8 = 120 man-days. With 12 men: 120 ÷ 12 = 10 days.",
    "stepByStepSolution": "Step 1: Total work in man-days = 15 × 8 = 120.\nStep 2: Divide by new workforce: 120 ÷ 12 = 10 days.",
    "sourceType": "past_paper",
    "sourcePdfName": "UK_National_Curriculum_11Plus_Mastery.pdf",
    "approved": true,
    "createdAt": "2026-09-22T14:53:47.534Z"
  },
  {
    "id": "math-cur-new-15",
    "subject": "Mathematics",
    "topic": "Number Sequences & Operations",
    "difficulty": "Hard",
    "questionText": "A sequence follows the rule 'multiply by 2 and then subtract 3'. If the third term is 19, what was the first term?",
    "options": [
      "7",
      "8",
      "6",
      "9"
    ],
    "correctAnswer": "7",
    "explanation": "Working backwards from term 3 (19): Second term = (19 + 3) ÷ 2 = 22 ÷ 2 = 11. First term = (11 + 3) ÷ 2 = 14 ÷ 2 = 7.",
    "stepByStepSolution": "Step 1: Inverse operation of '×2 then -3' is '+3 then ÷2'.\nStep 2: Term 2 = (19 + 3) ÷ 2 = 11.\nStep 3: Term 1 = (11 + 3) ÷ 2 = 7.",
    "sourceType": "past_paper",
    "sourcePdfName": "UK_National_Curriculum_11Plus_Mastery.pdf",
    "approved": true,
    "createdAt": "2026-09-22T14:53:47.534Z"
  },
  {
    "id": "math-cur-new-16",
    "subject": "Mathematics",
    "topic": "Arithmetic & Problem Solving",
    "difficulty": "Hard",
    "questionText": "Three bells toll at intervals of 12 minutes, 15 minutes, and 20 minutes respectively. If they toll together at 09:00, at what time will they next toll together?",
    "options": [
      "10:00",
      "10:15",
      "10:30",
      "11:00"
    ],
    "correctAnswer": "10:00",
    "explanation": "Find the lowest common multiple (LCM) of 12, 15, and 20. 12 = 2² × 3, 15 = 3 × 5, 20 = 2² × 5. LCM = 2² × 3 × 5 = 60 minutes = 1 hour. 09:00 + 1 hour = 10:00.",
    "stepByStepSolution": "Step 1: Prime factorise: 12 = 2² × 3; 15 = 3 × 5; 20 = 2² × 5.\nStep 2: LCM = 2² × 3 × 5 = 60 minutes (1 hour).\nStep 3: 09:00 + 1 hour = 10:00.",
    "sourceType": "past_paper",
    "sourcePdfName": "UK_National_Curriculum_11Plus_Mastery.pdf",
    "approved": true,
    "createdAt": "2026-09-22T14:53:47.534Z"
  },
  {
    "id": "math-cur-new-17",
    "subject": "Mathematics",
    "topic": "Percentages & Reverse Percentages",
    "difficulty": "Hard",
    "questionText": "In an examination of 60 questions, Jessica scored 85%. Each correct answer was worth 1 mark, with no penalties for incorrect answers. How many questions did Jessica answer incorrectly?",
    "options": [
      "9",
      "8",
      "10",
      "12"
    ],
    "correctAnswer": "9",
    "explanation": "Jessica scored 85%, meaning she got 15% incorrect. 15% of 60 = 0.15 × 60 = 9 questions.",
    "stepByStepSolution": "Step 1: Incorrect percentage = 100% - 85% = 15%.\nStep 2: 15% of 60 = (15/100) × 60 = 9 questions.",
    "sourceType": "past_paper",
    "sourcePdfName": "UK_National_Curriculum_11Plus_Mastery.pdf",
    "approved": true,
    "createdAt": "2026-09-22T14:53:47.534Z"
  },
  {
    "id": "math-cur-new-18",
    "subject": "Mathematics",
    "topic": "Perimeter, Area & Volume",
    "difficulty": "Hard",
    "questionText": "A triangle has vertices at coordinates (2, 3), (8, 3), and (5, 9). What is the area of this triangle?",
    "options": [
      "18 square units",
      "16 square units",
      "20 square units",
      "24 square units"
    ],
    "correctAnswer": "18 square units",
    "explanation": "Base runs along y = 3 from x = 2 to x = 8: base length = 8 - 2 = 6 units. Height is the vertical distance from y = 3 to y = 9: height = 9 - 3 = 6 units. Area = 1/2 × base × height = 1/2 × 6 × 6 = 18 square units.",
    "stepByStepSolution": "Step 1: Base length = 8 - 2 = 6 units.\nStep 2: Perpendicular height = 9 - 3 = 6 units.\nStep 3: Area = (1/2) × 6 × 6 = 18 square units.",
    "sourceType": "past_paper",
    "sourcePdfName": "UK_National_Curriculum_11Plus_Mastery.pdf",
    "approved": true,
    "createdAt": "2026-09-22T14:53:47.534Z"
  },
  {
    "id": "math-cur-new-19",
    "subject": "Mathematics",
    "topic": "Speed, Distance & Time",
    "difficulty": "Hard",
    "questionText": "A train 180 metres long is travelling at 72 km/h. How many seconds does it take for the entire train to completely pass through a tunnel 420 metres long?",
    "options": [
      "30 seconds",
      "25 seconds",
      "35 seconds",
      "40 seconds"
    ],
    "correctAnswer": "30 seconds",
    "explanation": "Convert speed: 72 km/h = 72 × (1,000/3,600) = 20 m/s. Total distance to clear tunnel = length of train + length of tunnel = 180 + 420 = 600 metres. Time = 600 ÷ 20 = 30 seconds.",
    "stepByStepSolution": "Step 1: Convert 72 km/h to m/s: 72 × 5/18 = 20 m/s.\nStep 2: Total distance = 180 m + 420 m = 600 m.\nStep 3: Time = 600 ÷ 20 = 30 seconds.",
    "sourceType": "past_paper",
    "sourcePdfName": "UK_National_Curriculum_11Plus_Mastery.pdf",
    "approved": true,
    "createdAt": "2026-09-22T14:53:47.534Z"
  },
  {
    "id": "math-cur-new-20",
    "subject": "Mathematics",
    "topic": "Probability & Data Analysis",
    "difficulty": "Hard",
    "questionText": "A bag contains 5 red, 7 blue, and 8 green counters. Two counters are picked one after the other without replacement. What is the probability that both counters are red?",
    "options": [
      "1/19",
      "2/19",
      "1/20",
      "3/38"
    ],
    "correctAnswer": "1/19",
    "explanation": "Total counters = 5 + 7 + 8 = 20. P(first red) = 5/20 = 1/4. Counters remaining = 19, reds remaining = 4. P(second red) = 4/19. P(both red) = (5/20) × (4/19) = (1/4) × (4/19) = 1/19.",
    "stepByStepSolution": "Step 1: Initial probability of red = 5/20 = 1/4.\nStep 2: After 1 red is removed: 4 reds out of 19 counters.\nStep 3: P(both red) = (5/20) × (4/19) = 1/19.",
    "sourceType": "past_paper",
    "sourcePdfName": "UK_National_Curriculum_11Plus_Mastery.pdf",
    "approved": true,
    "createdAt": "2026-09-22T14:53:47.534Z"
  }
];
