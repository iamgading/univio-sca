/**
 * NLP Text Extraction Utility
 * Simulates NLP processing to extract task information from raw text
 * Based on DFD Level 1 P3 (Ekstraksi & Parsing Data NLP)
 */

export type ExtractedTask = {
  title: string;
  course: string;
  description: string;
  dueDate: string;
  dueTime: string;
  priority: 'high' | 'medium' | 'low';
  confidence: number; // 0-100%
};

export type ExtractedSchedule = {
  courseName: string;
  day: string;
  startTime: string;
  endTime: string;
  location: string;
  confidence: number;
};

/**
 * Step 3.1: Preprocessing Text
 * Clean and normalize input text
 */
function preprocessText(rawText: string): string {
  let cleaned = rawText;
  
  // Remove extra whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  // Remove HTML tags if any
  cleaned = cleaned.replace(/<[^>]*>/g, '');
  
  // Normalize quotes
  cleaned = cleaned.replace(/[""]/g, '"');
  cleaned = cleaned.replace(/['']/g, "'");
  
  return cleaned;
}

/**
 * Step 3.2: Information Extraction
 * Extract entities from text
 */
function extractEntities(text: string) {
  const entities = {
    dates: [] as string[],
    times: [] as string[],
    courses: [] as string[],
    locations: [] as string[],
    actions: [] as string[],
  };
  
  // Extract dates (various formats)
  const datePatterns = [
    /(\d{1,2})\s+(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\s+(\d{4})/gi,
    /(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})/g,
    /(senin|selasa|rabu|kamis|jumat|sabtu|minggu),?\s+(\d{1,2})\s+(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)/gi,
  ];
  
  datePatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      entities.dates.push(...matches);
    }
  });
  
  // Extract times
  const timePattern = /(\d{1,2})[:.:](\d{2})\s*(am|pm|wib)?/gi;
  const timeMatches = text.match(timePattern);
  if (timeMatches) {
    entities.times.push(...timeMatches);
  }
  
  // Extract course names (common patterns)
  const courseKeywords = [
    'pemrograman web', 'basis data', 'algoritma', 'struktur data',
    'sistem informasi', 'desain ui/ux', 'metodologi penelitian',
    'kalkulus', 'statistika', 'jaringan komputer', 'machine learning',
    'artificial intelligence', 'mobile programming'
  ];
  
  courseKeywords.forEach(course => {
    if (text.toLowerCase().includes(course)) {
      entities.courses.push(course);
    }
  });
  
  // Extract locations
  const locationPattern = /(ruang|lab|laboratorium|gedung|auditorium)\s+([a-z0-9\s]+)/gi;
  const locationMatches = text.match(locationPattern);
  if (locationMatches) {
    entities.locations.push(...locationMatches);
  }
  
  // Extract action verbs
  const actionKeywords = [
    'kumpulkan', 'submit', 'kirim', 'buat', 'create', 'develop',
    'presentasi', 'present', 'kerjakan', 'selesaikan', 'complete'
  ];
  
  actionKeywords.forEach(action => {
    if (text.toLowerCase().includes(action)) {
      entities.actions.push(action);
    }
  });
  
  return entities;
}

/**
 * Step 3.3: Parse Task Information
 * Extract structured task data from text
 */
export function parseTaskFromText(rawText: string): ExtractedTask | null {
  // Step 3.1: Preprocess
  const cleanedText = preprocessText(rawText);
  
  // Step 3.2: Extract entities
  const entities = extractEntities(cleanedText);
  
  // Step 3.3: Parse task
  let confidence = 50; // Base confidence
  
  // Extract title (first line or sentence with action verb)
  let title = '';
  const firstLine = cleanedText.split('\n')[0];
  if (firstLine.length > 10 && firstLine.length < 100) {
    title = firstLine;
    confidence += 10;
  } else if (entities.actions.length > 0) {
    // Find sentence with action verb
    const sentences = cleanedText.split(/[.!?]/);
    for (const sentence of sentences) {
      if (entities.actions.some(action => sentence.toLowerCase().includes(action))) {
        title = sentence.trim();
        confidence += 10;
        break;
      }
    }
  }
  
  if (!title) {
    title = 'Tugas ' + (entities.courses[0] || 'Kuliah');
  }
  
  // Extract course
  let course = 'General';
  if (entities.courses.length > 0) {
    course = entities.courses[0];
    confidence += 15;
  }
  
  // Extract due date
  let dueDate = '';
  let dueTime = '23:59';
  
  if (entities.dates.length > 0) {
    dueDate = parseDateString(entities.dates[0]);
    confidence += 20;
  } else {
    // Default to 1 week from now
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    dueDate = nextWeek.toISOString().split('T')[0];
  }
  
  if (entities.times.length > 0) {
    dueTime = normalizeTime(entities.times[0]);
    confidence += 5;
  }
  
  // Determine priority based on keywords
  let priority: 'high' | 'medium' | 'low' = 'medium';
  const urgentKeywords = ['urgent', 'penting', 'segera', 'asap', 'deadline'];
  const lowPriorityKeywords = ['optional', 'opsional', 'bonus'];
  
  if (urgentKeywords.some(kw => cleanedText.toLowerCase().includes(kw))) {
    priority = 'high';
    confidence += 10;
  } else if (lowPriorityKeywords.some(kw => cleanedText.toLowerCase().includes(kw))) {
    priority = 'low';
  }
  
  // Extract description (remove title, keep rest)
  let description = cleanedText.replace(title, '').trim();
  if (description.length > 500) {
    description = description.substring(0, 500) + '...';
  }
  
  // Step 3.4: Data Validation
  if (!title || !dueDate) {
    return null; // Invalid data
  }
  
  return {
    title: title.substring(0, 100),
    course,
    description: description || 'No description provided',
    dueDate,
    dueTime,
    priority,
    confidence: Math.min(confidence, 100),
  };
}

/**
 * Step 3.4: Parse Schedule Information
 * Extract structured schedule data from text
 */
export function parseScheduleFromText(rawText: string): ExtractedSchedule | null {
  const cleanedText = preprocessText(rawText);
  const entities = extractEntities(cleanedText);
  
  let confidence = 50;
  
  // Extract course name
  let courseName = 'Unknown Course';
  if (entities.courses.length > 0) {
    courseName = entities.courses[0];
    confidence += 20;
  }
  
  // Extract day
  const dayPattern = /(senin|selasa|rabu|kamis|jumat|sabtu|minggu)/gi;
  const dayMatch = cleanedText.match(dayPattern);
  let day = '';
  if (dayMatch) {
    day = dayMatch[0];
    confidence += 15;
  }
  
  // Extract times
  let startTime = '08:00';
  let endTime = '10:00';
  if (entities.times.length >= 2) {
    startTime = normalizeTime(entities.times[0]);
    endTime = normalizeTime(entities.times[1]);
    confidence += 15;
  } else if (entities.times.length === 1) {
    startTime = normalizeTime(entities.times[0]);
  }
  
  // Extract location
  let location = 'TBA';
  if (entities.locations.length > 0) {
    location = entities.locations[0];
    confidence += 10;
  }
  
  if (!day) {
    return null;
  }
  
  return {
    courseName,
    day,
    startTime,
    endTime,
    location,
    confidence: Math.min(confidence, 100),
  };
}

/**
 * Helper: Parse date string to ISO format
 */
function parseDateString(dateStr: string): string {
  const monthMap: Record<string, number> = {
    'januari': 0, 'februari': 1, 'maret': 2, 'april': 3,
    'mei': 4, 'juni': 5, 'juli': 6, 'agustus': 7,
    'september': 8, 'oktober': 9, 'november': 10, 'desember': 11,
  };
  
  // Try Indonesian format: "15 Desember 2025"
  const indonesianPattern = /(\d{1,2})\s+(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\s+(\d{4})/i;
  const match = dateStr.match(indonesianPattern);
  
  if (match) {
    const day = parseInt(match[1]);
    const month = monthMap[match[2].toLowerCase()];
    const year = parseInt(match[3]);
    const date = new Date(year, month, day);
    return date.toISOString().split('T')[0];
  }
  
  // Try numeric format: "15/12/2025" or "15-12-2025"
  const numericPattern = /(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})/;
  const numMatch = dateStr.match(numericPattern);
  
  if (numMatch) {
    const day = parseInt(numMatch[1]);
    const month = parseInt(numMatch[2]) - 1;
    const year = parseInt(numMatch[3]);
    const date = new Date(year, month, day);
    return date.toISOString().split('T')[0];
  }
  
  // Default to 1 week from now
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  return nextWeek.toISOString().split('T')[0];
}

/**
 * Helper: Normalize time to HH:MM format
 */
function normalizeTime(timeStr: string): string {
  // Remove spaces and convert to lowercase
  let time = timeStr.toLowerCase().replace(/\s/g, '');
  
  // Extract hour and minute
  const match = time.match(/(\d{1,2})[:.:](\d{2})/);
  if (!match) return '23:59';
  
  let hour = parseInt(match[1]);
  const minute = match[2];
  
  // Handle AM/PM
  if (time.includes('pm') && hour < 12) {
    hour += 12;
  } else if (time.includes('am') && hour === 12) {
    hour = 0;
  }
  
  return `${hour.toString().padStart(2, '0')}:${minute}`;
}

/**
 * Detect text type (task or schedule)
 */
export function detectTextType(text: string): 'task' | 'schedule' | 'unknown' {
  const lowerText = text.toLowerCase();
  
  const taskKeywords = ['tugas', 'task', 'assignment', 'kumpulkan', 'submit', 'deadline'];
  const scheduleKeywords = ['jadwal', 'schedule', 'kelas', 'class', 'kuliah', 'lecture'];
  
  const taskScore = taskKeywords.filter(kw => lowerText.includes(kw)).length;
  const scheduleScore = scheduleKeywords.filter(kw => lowerText.includes(kw)).length;
  
  if (taskScore > scheduleScore) return 'task';
  if (scheduleScore > taskScore) return 'schedule';
  return 'unknown';
}
