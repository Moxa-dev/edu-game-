import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Quiz, QuizQuestion, CodeChallenge, QuizResult, CodeSubmission } from '../types';
import Editor from '@monaco-editor/react';

interface QuizViewProps {
  quizzes: Quiz[];
  onQuizComplete: (quizId: string, result: QuizResult) => void;
  userProgress?: {
    completedLessons: string[];
    completedQuizzes: Record<string, QuizResult>;
  };
}

const QuizView: React.FC<QuizViewProps> = ({ 
  quizzes, 
  onQuizComplete,
  userProgress = { completedLessons: [], completedQuizzes: {} } 
}) => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const quiz = quizzes.find(q => q.id === quizId);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | CodeSubmission>>({});
  const [codeValues, setCodeValues] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questionResults, setQuestionResults] = useState<Record<string, boolean>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [startTime] = useState<Date>(new Date());

  useEffect(() => {
    // Initialize timer if quiz has a time limit
    if (quiz?.timeLimit && timeRemaining === null) {
      setTimeRemaining(quiz.timeLimit * 60); // Convert minutes to seconds
    }
  }, [quiz, timeRemaining]);

  useEffect(() => {
    // Timer countdown
    if (timeRemaining !== null && timeRemaining > 0 && !quizCompleted) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !quizCompleted) {
      // Auto-submit when time runs out
      handleSubmitQuiz();
    }
  }, [timeRemaining, quizCompleted]);

  if (!quiz) {
    return <div className="container mx-auto px-4 py-8">Quiz not found</div>;
  }

  // Check if user has already completed this quiz
  const existingResult = userProgress.completedQuizzes[quiz.id];
  
  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleCodeChange = (questionId: string, value: string | undefined) => {
    if (value !== undefined) {
      setCodeValues(prev => ({ ...prev, [questionId]: value }));
    }
  };

  const handleRunCode = async (question: QuizQuestion) => {
    if (!question.codeChallenge || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const code = codeValues[question.id] || question.codeChallenge.startingCode;
      
      // Use the CodeExecutionService to execute the code
      const { executeCode } = await import('../services/CodeExecutionService');
      const result = await executeCode({
        code,
        language: 'csharp',
        testCases: question.codeChallenge.testCases
      });
      
      const testResults = result.testResults || [];
      const allPassed = testResults.every(result => result.passed);
      
      const submission: CodeSubmission = {
        challengeId: question.id,
        code,
        submittedAt: new Date(),
        passed: allPassed,
        testResults,
        executionTime: Math.floor(Math.random() * 100) + 50 // Random execution time between 50-150ms
      };
      
      setAnswers(prev => ({ ...prev, [question.id]: submission }));
      setQuestionResults(prev => ({ ...prev, [question.id]: allPassed }));
    } catch (error) {
      console.error('Error running code:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    const endTime = new Date();
    const timeSpent = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
    
    // Calculate score
    let totalScore = 0;
    let totalPossibleScore = 0;
    
    quiz.questions.forEach(question => {
      totalPossibleScore += question.points;
      
      const answer = answers[question.id];
      if (!answer) return;
      
      if (question.type === 'coding') {
        const submission = answer as CodeSubmission;
        if (submission.passed) {
          totalScore += question.points;
        }
      } else {
        // For multiple-choice and true-false questions
        const stringAnswer = answer as string;
        if (stringAnswer === question.correctAnswer) {
          totalScore += question.points;
        }
      }
    });
    
    const percentageScore = (totalScore / totalPossibleScore) * 100;
    const passed = percentageScore >= quiz.passingScore;
    
    const result: QuizResult = {
      quizId: quiz.id,
      score: percentageScore,
      completedAt: endTime,
      answers,
      timeSpent,
      passed
    };
    
    onQuizComplete(quiz.id, result);
    setQuizCompleted(true);
  };

  const renderQuestion = (question: QuizQuestion) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">{question.text}</h3>
            <div className="space-y-3">
              {question.options?.map((option) => (
                <label key={option.id} className="flex items-start p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option.id.toString()}
                    checked={answers[question.id] === option.id.toString()}
                    onChange={() => handleAnswerChange(question.id, option.id.toString())}
                    className="mt-1 mr-3"
                  />
                  <span>{option.text}</span>
                </label>
              ))}
            </div>
          </div>
        );
      
      case 'true-false':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">{question.text}</h3>
            <div className="space-y-3">
              <label className="flex items-start p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value="true"
                  checked={answers[question.id] === 'true'}
                  onChange={() => handleAnswerChange(question.id, 'true')}
                  className="mt-1 mr-3"
                />
                <span>True</span>
              </label>
              <label className="flex items-start p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value="false"
                  checked={answers[question.id] === 'false'}
                  onChange={() => handleAnswerChange(question.id, 'false')}
                  className="mt-1 mr-3"
                />
                <span>False</span>
              </label>
            </div>
          </div>
        );
      
      case 'coding':
        if (!question.codeChallenge) return null;
        
        const codeChallenge: CodeChallenge = question.codeChallenge;
        const codeSubmission = answers[question.id] as CodeSubmission | undefined;
        
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">{question.text}</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="mb-4">{codeChallenge.instructions}</p>
              
              <div className="mb-4 border rounded-lg overflow-hidden">
                <Editor
                  height="300px"
                  defaultLanguage="csharp"
                  defaultValue={codeChallenge.startingCode}
                  value={codeValues[question.id] || codeChallenge.startingCode}
                  onChange={(value) => handleCodeChange(question.id, value)}
                  options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                  }}
                />
              </div>
              
              <button
                onClick={() => handleRunCode(question)}
                disabled={isSubmitting}
                className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Running...' : 'Run Code'}
              </button>
              
              {codeSubmission && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Test Results:</h4>
                  <div className="space-y-2">
                    {codeSubmission.testResults?.map((result, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded-md ${result.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                      >
                        <div className="flex justify-between">
                          <span>Test Case {index + 1}</span>
                          <span>{result.passed ? 'Passed' : 'Failed'}</span>
                        </div>
                        {!result.passed && result.error && (
                          <div className="mt-2 text-sm">
                            <p>Error: {result.error}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderQuizResults = () => {
    if (!existingResult) return null;
    
    return (
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700">Score:</span>
            <span className="font-semibold">{existingResult.score.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${existingResult.passed ? 'bg-green-600' : 'bg-red-600'}`} 
              style={{ width: `${existingResult.score}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Status</p>
            <p className={`font-semibold ${existingResult.passed ? 'text-green-600' : 'text-red-600'}`}>
              {existingResult.passed ? 'Passed' : 'Failed'}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Time Spent</p>
            <p className="font-semibold">{formatTime(existingResult.timeSpent)}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="font-semibold">{new Date(existingResult.completedAt).toLocaleDateString()}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Passing Score</p>
            <p className="font-semibold">{quiz.passingScore}%</p>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Back to Dashboard
          </Link>
          <button 
            onClick={() => {
              setQuizCompleted(false);
              setAnswers({});
              setCurrentQuestionIndex(0);
              setQuestionResults({});
              if (quiz.timeLimit) {
                setTimeRemaining(quiz.timeLimit * 60);
              }
            }}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  };

  // If the quiz is already completed and not being retaken, show results
  if (existingResult && !quizCompleted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{quiz.title}</h1>
          <p className="text-gray-600">{quiz.description}</p>
        </div>
        
        {renderQuizResults()}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{quiz.title}</h1>
        <p className="text-gray-600">{quiz.description}</p>
      </div>
      
      {quizCompleted ? (
        <div className="bg-white border rounded-lg p-6 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
            <p className="text-gray-600">Your answers have been submitted successfully.</p>
          </div>
          
          <div className="flex justify-center">
            <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Return to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white border rounded-lg p-6">
          {/* Quiz progress and timer */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <span className="text-gray-700 mr-2">Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
              <div className="w-32 bg-gray-200 rounded-full h-2.5">
                <div 
                  className="h-2.5 bg-blue-600 rounded-full" 
                  style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {timeRemaining !== null && (
              <div className="text-gray-700">
                Time Remaining: {formatTime(timeRemaining)}
              </div>
            )}
          </div>
          
          {/* Current question */}
          <div className="mb-6">
            {renderQuestion(currentQuestion)}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded-md ${currentQuestionIndex === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} transition-colors`}
            >
              Previous
            </button>
            
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {currentQuestionIndex === quiz.questions.length - 1 ? 'Submit Quiz' : 'Next'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default QuizView;