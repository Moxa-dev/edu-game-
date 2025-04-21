import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStore } from './store/useStore';
import Dashboard from './components/Dashboard';
import LessonView from './components/LessonView';
import QuizView from './components/QuizView';
import Navigation from './components/Navigation';
import Progress from './components/Progress';
import Resources from './components/Resources';

const App: React.FC = () => {
  const { lessons, quizzes, userProgress, completeLesson, completeQuiz, saveCodeSubmission } = useStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation userProgress={userProgress} />
        <main className="pt-4 pb-12">
          <Routes>
            <Route 
              path="/" 
              element={<Dashboard lessons={lessons} userProgress={userProgress} />} 
            />
            <Route 
              path="/lesson/:lessonId" 
              element={
                <LessonView 
                  lessons={lessons} 
                  onLessonComplete={completeLesson} 
                  userProgress={userProgress} 
                />
              } 
            />
            <Route 
              path="/quiz/:quizId" 
              element={
                <QuizView 
                  quizzes={quizzes} 
                  onQuizComplete={completeQuiz} 
                  userProgress={userProgress} 
                />
              } 
            />
            <Route
              path="/progress"
              element={
                <Progress
                  lessons={lessons}
                  quizzes={quizzes}
                  userProgress={userProgress}
                />
              }
            />
            <Route
              path="/resources"
              element={<Resources />}
            />
          </Routes>
        </main>
        <footer className="bg-white border-t py-6">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            <p>OOP & .NET Learning Platform - An interactive educational game for learning object-oriented programming</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;