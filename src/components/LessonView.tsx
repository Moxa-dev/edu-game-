import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Lesson, CodeExample } from '../types';
import Editor from '@monaco-editor/react';

interface LessonViewProps {
  lessons: Lesson[];
  onLessonComplete: (lessonId: string) => void;
  userProgress?: {
    completedLessons: string[];
  };
}

const LessonView: React.FC<LessonViewProps> = ({ 
  lessons, 
  onLessonComplete,
  userProgress = { completedLessons: [] } 
}) => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const lesson = lessons.find(l => l.id === lessonId);
  
  const [activeExampleIndex, setActiveExampleIndex] = useState(0);
  const [code, setCode] = useState<Record<string, string>>({});
  const [output, setOutput] = useState<Record<string, string>>({});
  const [isRunning, setIsRunning] = useState<Record<string, boolean>>({});
  
  if (!lesson) {
    return <div className="container mx-auto px-4 py-8">Lesson not found</div>;
  }

  const activeExample = lesson.codeExamples?.[activeExampleIndex];
  
  const handleCodeChange = (exampleId: string, value: string | undefined) => {
    if (value !== undefined) {
      setCode(prev => ({ ...prev, [exampleId]: value }));
    }
  };

  const runCode = async (example: CodeExample) => {
    if (isRunning[example.id]) return;
    
    setIsRunning(prev => ({ ...prev, [example.id]: true }));
    setOutput(prev => ({ ...prev, [example.id]: 'Running code...' }));
    
    try {
      // Get the current code or use the example's original code
      const codeToRun = code[example.id] || example.code;
      
      // Use the CodeExecutionService to execute the code
      const { executeCode } = await import('../services/CodeExecutionService');
      const result = await executeCode({
        code: codeToRun,
        language: 'csharp',
        testCases: example.expectedOutput ? [{ expectedOutput: example.expectedOutput }] : undefined
      });
      
      // Set the output based on the execution result
      setOutput(prev => ({
        ...prev,
        [example.id]: result.error || result.output
      }));
    } catch (error) {
      setOutput(prev => ({ ...prev, [example.id]: `Error: ${error}` }));
    } finally {
      setIsRunning(prev => ({ ...prev, [example.id]: false }));
    }
  };

  const handleCompleteLesson = () => {
    onLessonComplete(lesson.id);
  };

  const isCompleted = userProgress.completedLessons.includes(lesson.id);
  const nextLesson = lesson.nextLessonId ? lessons.find(l => l.id === lesson.nextLessonId) : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Dashboard
        </Link>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">{lesson.title}</h1>
          <span className={`px-3 py-1 text-sm rounded-full ${getDifficultyColor(lesson.difficulty)}`}>
            {lesson.difficulty}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2 mb-4">
          {lesson.tags.map((tag) => (
            <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-600">{lesson.description}</p>
      </div>

      <div className="prose max-w-none mb-8">
        <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
      </div>

      {lesson.codeExamples && lesson.codeExamples.length > 0 && (
        <div className="bg-gray-50 border rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Interactive Code Examples</h2>
          
          {lesson.codeExamples.length > 1 && (
            <div className="flex mb-4 border-b">
              {lesson.codeExamples.map((example, index) => (
                <button
                  key={example.id}
                  className={`px-4 py-2 ${activeExampleIndex === index ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                  onClick={() => setActiveExampleIndex(index)}
                >
                  {example.title}
                </button>
              ))}
            </div>
          )}

          {activeExample && (
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">{activeExample.title}</h3>
                <p className="text-gray-600 mb-4">{activeExample.description}</p>
              </div>
              
              <div className="mb-4 border rounded-lg overflow-hidden">
                <Editor
                  height="300px"
                  defaultLanguage="csharp"
                  defaultValue={activeExample.code}
                  value={code[activeExample.id] || activeExample.code}
                  onChange={(value) => handleCodeChange(activeExample.id, value)}
                  options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    readOnly: activeExample.readOnly,
                  }}
                />
              </div>
              
              <div className="flex justify-between mb-4">
                <button
                  className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors ${isRunning[activeExample.id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => runCode(activeExample)}
                  disabled={isRunning[activeExample.id]}
                >
                  {isRunning[activeExample.id] ? 'Running...' : 'Run Code'}
                </button>
                
                {activeExample.hints && activeExample.hints.length > 0 && (
                  <div className="relative group">
                    <button className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors">
                      Show Hint
                    </button>
                    <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg p-4 hidden group-hover:block z-10">
                      <ul className="list-disc pl-5 space-y-1">
                        {activeExample.hints.map((hint, index) => (
                          <li key={index} className="text-sm text-gray-700">{hint}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              
              {output[activeExample.id] && (
                <div className="bg-gray-800 text-white p-4 rounded-md font-mono text-sm overflow-auto max-h-40">
                  <pre>{output[activeExample.id]}</pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between items-center mt-8 pt-4 border-t">
        <button
          onClick={handleCompleteLesson}
          className={`px-4 py-2 rounded-md ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-blue-600 text-white hover:bg-blue-700'} transition-colors`}
          disabled={isCompleted}
        >
          {isCompleted ? 'Lesson Completed' : 'Mark as Complete'}
        </button>

        {nextLesson && (
          <Link
            to={`/lesson/${nextLesson.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Next Lesson: {nextLesson.title} →
          </Link>
        )}

        {lesson.nextLessonId && (
          <Link
            to={`/quiz/${lesson.id}`}
            className={`px-4 py-2 rounded-md transition-colors ${isCompleted ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
            onClick={(e) => !isCompleted && e.preventDefault()}
          >
            Take Quiz
          </Link>
        )}
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

export default LessonView;