import React from 'react';
import { Link } from 'react-router-dom';
import { Lesson } from '../types';

interface DashboardProps {
  lessons: Lesson[];
  userProgress?: {
    completedLessons: string[];
    completedQuizzes: Record<string, any>;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ lessons, userProgress = { completedLessons: [], completedQuizzes: {} } }) => {
  // Sort lessons by order
  const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">OOP & .NET Learning Platform</h1>
        <p className="text-gray-600">
          Master object-oriented programming concepts and C# with interactive lessons and coding exercises.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedLessons.map((lesson) => {
          const isCompleted = userProgress?.completedLessons.includes(lesson.id);
          const hasQuiz = lesson.nextLessonId !== undefined;
          
          return (
            <div 
              key={lesson.id} 
              className={`border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${isCompleted ? 'border-green-500' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">{lesson.title}</h2>
                  <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(lesson.difficulty)}`}>
                    {lesson.difficulty}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{lesson.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {lesson.estimatedTime || 15} min
                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {lesson.codeExamples?.length || 0} examples
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {lesson.tags.map((tag) => (
                    <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <Link 
                    to={`/lesson/${lesson.id}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {isCompleted ? 'Review Lesson' : 'Start Learning'}
                  </Link>
                  {hasQuiz && (
                    <Link 
                      to={`/quiz/${lesson.id}`}
                      className={`inline-flex items-center px-4 py-2 rounded-md transition-colors ${isCompleted ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                      onClick={(e) => !isCompleted && e.preventDefault()}
                    >
                      Take Quiz
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function getDifficultyColor(difficulty: 'beginner' | 'intermediate' | 'advanced'): string {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-800';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800';
    case 'advanced':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default Dashboard;