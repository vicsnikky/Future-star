import jsPDF from 'jspdf';
import { ExamAttempt } from '../types';

export function downloadExamResultPdf(attempt: ExamAttempt) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Header styling
  doc.setFillColor(30, 58, 138); // Deep Navy #1e3a8a
  doc.rect(0, 0, 210, 36, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('FUTURE STARS', 14, 18);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Official 11+ Examination Certificate & Report', 14, 27);

  // Student details section
  doc.setTextColor(30, 41, 59); // Slate-800
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('STUDENT RESULT SUMMARY', 14, 48);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Candidate Name: ${attempt.studentName || 'Student'}`, 14, 56);
  doc.text(`Subject: ${attempt.subject} Practice`, 14, 62);
  doc.text(`Date & Time: ${new Date(attempt.submittedAt || attempt.startTime).toLocaleString('en-GB')}`, 14, 68);
  const timeMinutes = Math.floor((attempt.timeUsedSeconds || 0) / 60);
  const timeSeconds = (attempt.timeUsedSeconds || 0) % 60;
  doc.text(`Duration Used: ${timeMinutes} mins ${timeSeconds} secs (Allowed: 40 mins)`, 14, 74);

  // Score Box
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, 82, 182, 38, 3, 3, 'F');

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Total Score: ${attempt.score} / ${attempt.totalQuestions}`, 22, 94);
  doc.setFontSize(22);
  doc.setTextColor(30, 58, 138);
  doc.text(`${attempt.percentage}%`, 150, 96, { align: 'right' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Correct Answers: ${attempt.correctCount}`, 22, 104);
  doc.text(`Incorrect Answers: ${attempt.incorrectCount}`, 75, 104);
  doc.text(`Unanswered Questions: ${attempt.unansweredCount}`, 135, 104);

  doc.setDrawColor(203, 213, 225);
  doc.line(14, 126, 196, 126);

  // Detailed Analysis Section
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Performance Breakdown by Topic', 14, 134);

  let curY = 142;
  if (attempt.topicBreakdown) {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    Object.entries(attempt.topicBreakdown).forEach(([topic, data]) => {
      const pct = Math.round((data.correct / (data.total || 1)) * 100);
      doc.text(`${topic}: ${data.correct}/${data.total} (${pct}%)`, 14, curY);
      curY += 6;
      if (curY > 260) {
        doc.addPage();
        curY = 20;
      }
    });
  }

  curY += 8;
  if (curY > 260) {
    doc.addPage();
    curY = 20;
  }

  // Mistakes / Review list (first 5 questions for quick review)
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Sample Questions Review & Explanations', 14, curY);
  curY += 8;

  attempt.questions.slice(0, 5).forEach((q, idx) => {
    const studentAns = attempt.studentAnswers[idx];
    const isCorrect = studentAns === q.correctAnswer;

    if (curY > 260) {
      doc.addPage();
      curY = 20;
    }

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(isCorrect ? 22 : 185, isCorrect ? 101 : 28, isCorrect ? 52 : 28);
    doc.text(`Q${idx + 1} (${q.subject} - ${q.topic}): ${isCorrect ? 'CORRECT' : 'INCORRECT / REVIEW'}`, 14, curY);
    curY += 5;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    const splitQ = doc.splitTextToSize(q.questionText, 180);
    doc.text(splitQ, 14, curY);
    curY += splitQ.length * 4.5;

    doc.text(`Your Answer: ${studentAns || 'Unanswered'} | Correct Answer: ${q.correctAnswer}`, 14, curY);
    curY += 5;

    const splitExp = doc.splitTextToSize(`Explanation: ${q.explanation}`, 180);
    doc.setTextColor(100, 116, 139);
    doc.text(splitExp, 14, curY);
    curY += splitExp.length * 4 + 4;
  });

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('FUTURE STARS 11+ Examination Practice Platform • Built for Academic Excellence', 105, 290, { align: 'center' });
  }

  // Save
  const safeName = (attempt.studentName || 'Student').replace(/\s+/g, '_');
  doc.save(`FUTURE_STARS_11Plus_Result_${safeName}.pdf`);
}
