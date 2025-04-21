# Project 2: Interactive C# Learning Platform

## Description

This project is a web application designed to provide an interactive learning experience for C# programming concepts. Users can browse through lessons, view content, interact with code examples using an embedded editor, and simulate code execution. The platform tracks user progress and allows navigation between lessons and related quizzes.

**Note:** The code execution feature is currently mocked via the `CodeExecutionService` and does not connect to a real backend execution environment.

## Features

*   **Lesson Display:** View lessons with titles, descriptions, difficulty levels, tags, and formatted content.
*   **Interactive Code Editor:** Uses Monaco Editor for displaying and editing C# code examples within lessons.
*   **Code Execution Simulation:** Allows users to "run" C# code snippets and view simulated output or errors. Supports basic test case simulation.
*   **Multiple Examples:** Lessons can contain multiple tabbed code examples, each with its own description and code.
*   **Hints:** Code examples can include hints to guide the user.
*   **User Progress Tracking:** Marks lessons as complete and uses this status to control navigation (e.g., enabling the "Take Quiz" button).
*   **Navigation:** Provides links to go back to a dashboard, move to the next lesson, or access a quiz associated with the lesson.
*   **Responsive Design:** Uses Tailwind CSS for styling.

## Technologies Used

*   React
*   TypeScript
*   React Router (`react-router-dom`)
*   Monaco Editor (`@monaco-editor/react`)
*   Tailwind CSS (inferred from class names)

## Key Components/Services

*   **`LessonView.tsx`**: The main component responsible for fetching and displaying the content of a specific lesson, handling user interactions with code examples, managing state for the editor and output, and facilitating navigation and lesson completion.
*   **`CodeExecutionService.ts`**: A service module that simulates the execution of C# code. It defines the request/response structure and provides a mock function (`executeCode`) that returns simulated results, including output, success status, and test case outcomes. In a production environment, this would interact with a secure backend service.

## Getting Started (Example)

*(You might want to add instructions here on how to install dependencies and run the project, e.g.:)*

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm start
    ```
