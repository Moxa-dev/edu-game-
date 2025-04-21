export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  order: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  codeExamples?: CodeExample[];
  nextLessonId?: string;
  estimatedTime?: number; // in minutes
}

export interface CodeExample {
  id: string;
  title: string;
  description: string;
  code: string;
  language: 'csharp';
  readOnly?: boolean;
  expectedOutput?: string;
  hints?: string[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  lessonId: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number; // in minutes
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'coding' | 'true-false';
  options?: QuizOption[];
  correctAnswer?: string;
  codeChallenge?: CodeChallenge;
  points: number;
}

export interface QuizOption {
  id: number;
  text: string;
}

export interface CodeChallenge {
  instructions: string;
  startingCode: string;
  testCases: TestCase[];
  timeLimit?: number; // in seconds
}

export interface TestCase {
  input?: string;
  expectedOutput: string;
  isHidden?: boolean;
  explanation?: string;
}

export interface UserProgress {
  userId: string;
  completedLessons: string[];
  completedQuizzes: Record<string, QuizResult>;
  codeSubmissions: Record<string, CodeSubmission[]>;
  lastActivity: Date;
}

export interface QuizResult {
  quizId: string;
  score: number;
  completedAt: Date;
  answers: Record<string, string | CodeSubmission>;
  timeSpent: number; // in seconds
  passed: boolean;
}

export interface CodeSubmission {
  challengeId: string;
  code: string;
  submittedAt: Date;
  passed: boolean;
  testResults?: TestResult[];
  executionTime?: number; // in milliseconds
}

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  output?: string;
  error?: string;
}

export interface UserSettings {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  codeEditorSettings: {
    fontSize: number;
    tabSize: number;
    autoComplete: boolean;
    wordWrap: boolean;
  };
  notifications: {
    email: boolean;
    inApp: boolean;
  };
}