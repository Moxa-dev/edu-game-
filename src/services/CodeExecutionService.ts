/**
 * Service for executing C# code
 * In a production environment, this would connect to a backend service
 * that compiles and executes the code in a secure environment.
 */

import { TestResult } from '../types';

export interface ExecutionRequest {
  code: string;
  language: 'csharp';
  testCases?: {
    input?: string;
    expectedOutput: string;
  }[];
}

export interface ExecutionResponse {
  output: string;
  success: boolean;
  executionTime?: number; // in milliseconds
  testResults?: TestResult[];
  error?: string;
}

// In a real implementation, this would be an API endpoint
const API_ENDPOINT = '/api/execute';

/**
 * Execute code and return the result
 * Currently mocked for demonstration purposes
 */
export const executeCode = async (request: ExecutionRequest): Promise<ExecutionResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    // Mock implementation - in a real app, this would call a backend service
    console.log('Executing code:', request.code);
    
    // Simple validation to provide more realistic feedback
    if (!request.code.trim()) {
      return {
        output: '',
        success: false,
        error: 'Code cannot be empty'
      };
    }
    
    // Check for basic syntax errors (very simplified)
    if (!request.code.includes('{') || !request.code.includes('}')) {
      return {
        output: '',
        success: false,
        error: 'Syntax error: Missing braces'
      };
    }
    
    // Mock successful execution
    let output = 'Program executed successfully!';
    let testResults: TestResult[] = [];
    
    // If test cases are provided, simulate running them
    if (request.testCases && request.testCases.length > 0) {
      testResults = request.testCases.map((testCase, index) => {
        // For demo purposes, we'll randomly pass or fail some tests
        // In a real implementation, this would actually run the code against the test cases
        const passed = Math.random() > 0.3; // 70% chance of passing
        
        return {
          testCaseId: `test-${index}`,
          passed,
          output: passed ? testCase.expectedOutput : 'Unexpected output',
          error: passed ? undefined : 'Test case failed'
        };
      });
      
      // If any test case has expected output, use it as the main output
      const firstTestWithOutput = request.testCases.find(test => test.expectedOutput);
      if (firstTestWithOutput) {
        output = firstTestWithOutput.expectedOutput;
      }
    }
    
    return {
      output,
      success: true,
      executionTime: Math.floor(Math.random() * 100) + 50, // Random time between 50-150ms
      testResults
    };
  } catch (error) {
    console.error('Error executing code:', error);
    return {
      output: '',
      success: false,
      error: `Execution error: ${error}`
    };
  }
};

/**
 * In a real implementation, this function would send the code to a backend service
 * for compilation and execution in a secure environment.
 */
const sendToBackend = async (request: ExecutionRequest): Promise<ExecutionResponse> => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending code to backend:', error);
    throw error;
  }
};