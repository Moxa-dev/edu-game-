import React from 'react';
import { Link } from 'react-router-dom';
import { Lesson, Quiz, UserProgress, QuizResult } from '../types';

interface ProgressProps {
  lessons: Lesson[];
  quizzes: Quiz[];
  userProgress: UserProgress;
}

const Progress: React.FC<ProgressProps> = ({ lessons, quizzes, userProgress }) => {
  // Sort lessons by order
  const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);
  
  // Calculate overall progress
  const totalItems = lessons.length + quizzes.length;
  const completedItems = userProgress.completedLessons.length + Object.keys(userProgress.completedQuizzes).length;
  const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Progress</h1>
        <p className="text-gray-600">
          Track your journey through object-oriented programming and C# concepts.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Overall Progress</h2>
        <div className="mb-2 flex justify-between">
          <span className="text-sm font-medium text-gray-700">{progressPercentage}% Complete</span>
          <span className="text-sm font-medium text-gray-700">{completedItems}/{totalItems} Items</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Lesson Progress</h2>
        <div className="space-y-4">
          {sortedLessons.map((lesson) => {
            const isCompleted = userProgress.completedLessons.includes(lesson.id);
            const relatedQuiz = quizzes.find(q => q.lessonId === lesson.id);
            const quizCompleted = relatedQuiz ? userProgress.completedQuizzes[relatedQuiz.id] : null;
            
            return (
              <div key={lesson.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className={`mt-1 flex-shrink-0 h-5 w-5 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}>
                      {isCompleted && (
                        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-800">{lesson.title}</h3>
                      <p className="text-sm text-gray-600">{lesson.description}</p>
                    </div>
                  </div>
                  <Link 
                    to={`/lesson/${lesson.id}`}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    {isCompleted ? 'Review' : 'Start'}
                  </Link>
                </div>
                
                {relatedQuiz && (
                  <div className="mt-3 ml-8 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-4 w-4 rounded-full ${quizCompleted ? 'bg-green-500' : 'bg-gray-300'}`}>
                        {quizCompleted && (
                          <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-3">
                        <span className="text-sm font-medium text-gray-700">{relatedQuiz.title}</span>
                        {quizCompleted && (
                          <span className="ml-2 text-xs text-green-600">
                            Score: {quizCompleted.score}% {quizCompleted.passed ? '(Passed)' : '(Failed)'}
                          </span>
                        )}
                      </div>
                    </div>
                    <Link 
                      to={`/quiz/${relatedQuiz.id}`}
                      className={`px-3 py-1 text-xs rounded ${isCompleted ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-gray-100 text-gray-500 cursor-not-allowed'}`}
                      onClick={(e) => !isCompleted && e.preventDefault()}
                    >
                      {quizCompleted ? 'Retry' : 'Take Quiz'}
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        {userProgress.lastActivity ? (
          <div>
            <p className="text-gray-700">Last activity: {new Date(userProgress.lastActivity).toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-2">
              You've completed {userProgress.completedLessons.length} lessons and {Object.keys(userProgress.completedQuizzes).length} quizzes so far.
            </p>
          </div>
        ) : (
          <p className="text-gray-700">No activity recorded yet. Start learning to track your progress!</p>
        )}
      </div>
    </div>
  );
};

export default Progress;