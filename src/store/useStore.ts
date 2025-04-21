import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Lesson, Quiz, UserProgress, QuizResult, CodeSubmission } from '../types';
import { lessons } from '../data/lessons';
import { quizzes } from '../data/quizzes';

interface StoreState {
  // Data
  lessons: Lesson[];
  quizzes: Quiz[];
  
  // User progress
  userProgress: UserProgress;
  
  // Actions
  completeLesson: (lessonId: string) => void;
  completeQuiz: (quizId: string, result: QuizResult) => void;
  saveCodeSubmission: (challengeId: string, submission: CodeSubmission) => void;
  resetProgress: () => void;
}

const defaultUserProgress: UserProgress = {
  userId: 'default-user', // In a real app, this would be the authenticated user's ID
  completedLessons: [],
  completedQuizzes: {},
  codeSubmissions: {},
  lastActivity: new Date(),
};

export const useStore = create<StoreState>(
  persist(
    (set) => ({
      // Initial data
      lessons,
      quizzes,
      
      // Initial user progress
      userProgress: defaultUserProgress,
      
      // Actions
      completeLesson: (lessonId: string) => set((state) => {
        // Don't add duplicate entries
        if (state.userProgress.completedLessons.includes(lessonId)) {
          return state;
        }
        
        return {
          userProgress: {
            ...state.userProgress,
            completedLessons: [...state.userProgress.completedLessons, lessonId],
            lastActivity: new Date(),
          }
        };
      }),
      
      completeQuiz: (quizId: string, result: QuizResult) => set((state) => ({
        userProgress: {
          ...state.userProgress,
          completedQuizzes: {
            ...state.userProgress.completedQuizzes,
            [quizId]: result,
          },
          lastActivity: new Date(),
        }
      })),
      
      saveCodeSubmission: (challengeId: string, submission: CodeSubmission) => set((state) => {
        const currentSubmissions = state.userProgress.codeSubmissions[challengeId] || [];
        
        return {
          userProgress: {
            ...state.userProgress,
            codeSubmissions: {
              ...state.userProgress.codeSubmissions,
              [challengeId]: [...currentSubmissions, submission],
            },
            lastActivity: new Date(),
          }
        };
      }),
      
      resetProgress: () => set({
        userProgress: defaultUserProgress,
      }),
    }),
    {
      name: 'oop-learning-storage', // Name for localStorage key
      partialize: (state) => ({ userProgress: state.userProgress }), // Only persist user progress
    }
  )
);