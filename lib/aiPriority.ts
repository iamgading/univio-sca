import { Task } from '@/contexts/DataContext';

export type PriorityResult = {
  score: number;
  priority: 'high' | 'medium' | 'low';
  breakdown: {
    deadlineScore: number;
    complexityScore: number;
    gradeWeightScore: number;
  };
  reason: string;
  recommendation: string;
};

/**
 * Calculate AI Priority Score based on Activity Diagram formula:
 * - Deadline Weight: (Days remaining / 7) × 40%
 * - Grade Weight (Bobot Nilai): Grade importance × 35%
 * - Complexity Weight: Complexity × 25%
 * Total = Deadline + Grade + Complexity
 */
export function calculateAIPriority(task: Task): PriorityResult {
  // 1. Calculate Deadline Score (40% weight)
  const daysUntilDue = getDaysUntilDue(task.due);
  let deadlineScore = 0;
  
  if (daysUntilDue <= 1) {
    deadlineScore = 40; // Urgent - due today or tomorrow
  } else if (daysUntilDue <= 3) {
    deadlineScore = 35; // Very soon
  } else if (daysUntilDue <= 7) {
    deadlineScore = 25; // This week
  } else if (daysUntilDue <= 14) {
    deadlineScore = 15; // Next week
  } else {
    deadlineScore = 10; // Far away
  }

  // 2. Calculate Grade Weight Score (35% weight)
  // Estimate importance based on course and task type
  const gradeWeight = estimateGradeWeight(task.task, task.course);
  const gradeWeightScore = gradeWeight * 35;

  // 3. Calculate Complexity Score (25% weight)
  const complexity = estimateComplexity(task.description, task.task);
  const complexityScore = complexity * 25;

  // Total Score
  const totalScore = deadlineScore + gradeWeightScore + complexityScore;

  // Determine priority level
  let priority: 'high' | 'medium' | 'low';
  if (totalScore >= 70) {
    priority = 'high';
  } else if (totalScore >= 40) {
    priority = 'medium';
  } else {
    priority = 'low';
  }

  // Generate reason and recommendation
  const reason = generateReason(daysUntilDue, complexity, gradeWeight);
  const recommendation = generateRecommendation(priority, daysUntilDue, complexity);

  return {
    score: Math.round(totalScore),
    priority,
    breakdown: {
      deadlineScore: Math.round(deadlineScore),
      gradeWeightScore: Math.round(gradeWeightScore),
      complexityScore: Math.round(complexityScore),
    },
    reason,
    recommendation,
  };
}

function getDaysUntilDue(dueDate: string): number {
  const due = new Date(dueDate);
  const now = new Date();
  const diffTime = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function estimateGradeWeight(taskTitle: string, course: string): number {
  const title = taskTitle.toLowerCase();
  const courseName = course.toLowerCase();
  
  // High importance tasks (0.8-1.0)
  if (title.includes('ujian') || title.includes('uts') || title.includes('uas') || 
      title.includes('exam') || title.includes('final')) {
    return 1.0;
  }
  
  if (title.includes('tugas akhir') || title.includes('thesis') || 
      title.includes('skripsi') || title.includes('proposal')) {
    return 0.95;
  }
  
  if (title.includes('presentasi') || title.includes('presentation')) {
    return 0.85;
  }
  
  // Medium importance (0.5-0.7)
  if (title.includes('laporan') || title.includes('report') || 
      title.includes('essay') || title.includes('paper')) {
    return 0.7;
  }
  
  if (title.includes('quiz') || title.includes('kuis')) {
    return 0.6;
  }
  
  // Low importance (0.3-0.5)
  if (title.includes('latihan') || title.includes('practice') || 
      title.includes('exercise')) {
    return 0.4;
  }
  
  // Default medium-low
  return 0.5;
}

function estimateComplexity(description: string, title: string): number {
  const text = (description + ' ' + title).toLowerCase();
  
  let complexityScore = 0.3; // Base complexity
  
  // High complexity keywords
  const highComplexityKeywords = [
    'analisis', 'analysis', 'desain', 'design', 'implementasi', 'implementation',
    'coding', 'programming', 'develop', 'build', 'create', 'research',
    'penelitian', 'sistem', 'system', 'aplikasi', 'application'
  ];
  
  // Medium complexity keywords
  const mediumComplexityKeywords = [
    'laporan', 'report', 'presentasi', 'presentation', 'essay',
    'review', 'summary', 'rangkuman', 'study', 'belajar'
  ];
  
  // Low complexity keywords
  const lowComplexityKeywords = [
    'baca', 'read', 'latihan', 'practice', 'exercise', 'simple'
  ];
  
  // Count keyword matches
  let highCount = 0;
  let mediumCount = 0;
  let lowCount = 0;
  
  highComplexityKeywords.forEach(keyword => {
    if (text.includes(keyword)) highCount++;
  });
  
  mediumComplexityKeywords.forEach(keyword => {
    if (text.includes(keyword)) mediumCount++;
  });
  
  lowComplexityKeywords.forEach(keyword => {
    if (text.includes(keyword)) lowCount++;
  });
  
  // Calculate complexity based on matches
  if (highCount >= 2) {
    complexityScore = 0.9;
  } else if (highCount >= 1) {
    complexityScore = 0.75;
  } else if (mediumCount >= 2) {
    complexityScore = 0.6;
  } else if (mediumCount >= 1) {
    complexityScore = 0.5;
  } else if (lowCount >= 1) {
    complexityScore = 0.3;
  }
  
  // Adjust based on description length (longer = more complex)
  const wordCount = text.split(' ').length;
  if (wordCount > 50) {
    complexityScore += 0.1;
  }
  
  return Math.min(complexityScore, 1.0);
}

function generateReason(daysUntilDue: number, complexity: number, gradeWeight: number): string {
  const reasons = [];
  
  if (daysUntilDue <= 1) {
    reasons.push('Deadline sangat dekat (≤1 hari)');
  } else if (daysUntilDue <= 3) {
    reasons.push('Deadline mendekat (≤3 hari)');
  } else if (daysUntilDue <= 7) {
    reasons.push('Deadline minggu ini');
  }
  
  if (complexity >= 0.7) {
    reasons.push('Kompleksitas tinggi');
  } else if (complexity >= 0.5) {
    reasons.push('Kompleksitas sedang');
  }
  
  if (gradeWeight >= 0.8) {
    reasons.push('Bobot nilai sangat penting');
  } else if (gradeWeight >= 0.6) {
    reasons.push('Bobot nilai cukup penting');
  }
  
  return reasons.length > 0 ? reasons.join(' + ') : 'Tugas standar';
}

function generateRecommendation(
  priority: 'high' | 'medium' | 'low',
  daysUntilDue: number,
  complexity: number
): string {
  if (priority === 'high') {
    if (daysUntilDue <= 1) {
      return '🚨 Kerjakan SEKARANG! Deadline sangat dekat.';
    } else if (complexity >= 0.7) {
      return '⚡ Mulai hari ini! Tugas ini membutuhkan waktu signifikan.';
    } else {
      return '📌 Prioritaskan tugas ini dalam 1-2 hari ke depan.';
    }
  } else if (priority === 'medium') {
    if (daysUntilDue <= 3) {
      return '📅 Rencanakan untuk mulai dalam 1-2 hari.';
    } else {
      return '✅ Jadwalkan minggu ini, masih ada waktu cukup.';
    }
  } else {
    return '📝 Bisa dijadwalkan untuk minggu depan.';
  }
}

/**
 * Get estimated time to complete task
 */
export function estimateTimeToComplete(task: Task): string {
  const complexity = estimateComplexity(task.description, task.task);
  const gradeWeight = estimateGradeWeight(task.task, task.course);
  
  // Base time in hours
  let hours = 2;
  
  // Adjust based on complexity
  if (complexity >= 0.8) {
    hours = 6;
  } else if (complexity >= 0.6) {
    hours = 4;
  } else if (complexity >= 0.4) {
    hours = 3;
  }
  
  // Adjust based on importance
  if (gradeWeight >= 0.9) {
    hours += 2;
  } else if (gradeWeight >= 0.7) {
    hours += 1;
  }
  
  if (hours >= 6) {
    return `${hours} jam (spread over multiple days)`;
  } else {
    return `${hours} jam`;
  }
}

/**
 * Get best time to work on task
 */
export function getBestTimeToWork(): string {
  const hour = new Date().getHours();
  
  if (hour >= 6 && hour < 12) {
    return 'Pagi (9:00 - 11:00 AM) - Peak productivity time';
  } else if (hour >= 12 && hour < 18) {
    return 'Sore (14:00 - 16:00 PM) - Good focus time';
  } else {
    return 'Besok pagi (9:00 - 11:00 AM) - Fresh mind';
  }
}
