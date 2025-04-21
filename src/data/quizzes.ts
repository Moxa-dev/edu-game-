import { Quiz } from '../types';

export const quizzes: Quiz[] = [
  {
    id: 'quiz-intro-to-oop',
    title: 'OOP Fundamentals Quiz',
    description: 'Test your understanding of object-oriented programming fundamentals.',
    lessonId: 'intro-to-oop',
    questions: [
      {
        id: 'q1-oop-principles',
        text: 'Which of the following is NOT one of the four main principles of OOP?',
        type: 'multiple-choice',
        options: [
          { id: 1, text: 'Encapsulation' },
          { id: 2, text: 'Inheritance' },
          { id: 3, text: 'Compilation' },
          { id: 4, text: 'Polymorphism' }
        ],
        correctAnswer: '3',
        points: 10
      },
      {
        id: 'q2-encapsulation',
        text: 'Encapsulation is the bundling of data and methods that work on that data within one unit.',
        type: 'true-false',
        correctAnswer: 'true',
        points: 5
      },
      {
        id: 'q3-class-object',
        text: 'In OOP, what is the relationship between a class and an object?',
        type: 'multiple-choice',
        options: [
          { id: 1, text: 'A class is an instance of an object' },
          { id: 2, text: 'An object is an instance of a class' },
          { id: 3, text: 'Classes and objects are the same thing' },
          { id: 4, text: 'Objects contain multiple classes' }
        ],
        correctAnswer: '2',
        points: 10
      },
      {
        id: 'q4-oop-code',
        text: 'Create a Person class with name and age properties, and a Greet method.',
        type: 'coding',
        codeChallenge: {
          instructions: 'Create a Person class with name and age properties, and a Greet method that returns a greeting string including the person\'s name and age.',
          startingCode: `public class Person
{
    // Add properties here
    
    // Add constructor here
    
    // Add Greet method here
    
}

// Test your code
Person person = new Person("Alice", 25);
Console.WriteLine(person.Greet());`,
          testCases: [
            {
              input: 'new Person("Alice", 25)',
              expectedOutput: 'Hello, my name is Alice and I am 25 years old.',
              explanation: 'The Greet method should return a string with the person\'s name and age.'
            },
            {
              input: 'new Person("Bob", 30)',
              expectedOutput: 'Hello, my name is Bob and I am 30 years old.',
              explanation: 'The Greet method should work with different names and ages.'
            }
          ]
        },
        points: 25
      }
    ],
    passingScore: 70,
    timeLimit: 20
  },
  {
    id: 'quiz-csharp-basics',
    title: 'C# Basics Quiz',
    description: 'Test your knowledge of C# syntax and features for OOP.',
    lessonId: 'csharp-basics',
    questions: [
      {
        id: 'q1-csharp-properties',
        text: 'Which of the following correctly defines an auto-implemented property in C#?',
        type: 'multiple-choice',
        options: [
          { id: 1, text: 'public string Name { get; set; }' },
          { id: 2, text: 'public string Name() { get; set; }' },
          { id: 3, text: 'public property string Name;' },
          { id: 4, text: 'public string Name = { get; set; }' }
        ],
        correctAnswer: '1',
        points: 10
      },
      {
        id: 'q2-csharp-inheritance',
        text: 'In C#, a class can inherit from multiple base classes.',
        type: 'true-false',
        correctAnswer: 'false',
        points: 5
      },
      {
        id: 'q3-csharp-access',
        text: 'Which access modifier makes a member accessible only within the same class or struct?',
        type: 'multiple-choice',
        options: [
          { id: 1, text: 'public' },
          { id: 2, text: 'protected' },
          { id: 3, text: 'private' },
          { id: 4, text: 'internal' }
        ],
        correctAnswer: '3',
        points: 10
      },
      {
        id: 'q4-csharp-property',
        text: 'Implement a Temperature class with Celsius and Fahrenheit properties.',
        type: 'coding',
        codeChallenge: {
          instructions: 'Create a Temperature class with a Celsius property and a read-only Fahrenheit property that converts from Celsius. The formula is: F = C * 9/5 + 32',
          startingCode: `public class Temperature
{
    // Add Celsius property here
    
    // Add Fahrenheit property here
    
}

// Test your code
Temperature temp = new Temperature();
temp.Celsius = 25;
Console.WriteLine($"Celsius: {temp.Celsius}, Fahrenheit: {temp.Fahrenheit}");`,
          testCases: [
            {
              input: 'temp.Celsius = 0',
              expectedOutput: 'Celsius: 0, Fahrenheit: 32',
              explanation: 'When Celsius is 0, Fahrenheit should be 32.'
            },
            {
              input: 'temp.Celsius = 100',
              expectedOutput: 'Celsius: 100, Fahrenheit: 212',
              explanation: 'When Celsius is 100, Fahrenheit should be 212.'
            },
            {
              input: 'temp.Celsius = 25',
              expectedOutput: 'Celsius: 25, Fahrenheit: 77',
              explanation: 'When Celsius is 25, Fahrenheit should be 77.'
            }
          ]
        },
        points: 25
      }
    ],
    passingScore: 70,
    timeLimit: 25
  },
  {
    id: 'quiz-encapsulation',
    title: 'Encapsulation in C# Quiz',
    description: 'Test your understanding of encapsulation principles and implementation in C#.',
    lessonId: 'encapsulation',
    questions: [
      {
        id: 'q1-encapsulation-def',
        text: 'What is the main purpose of encapsulation in OOP?',
        type: 'multiple-choice',
        options: [
          { id: 1, text: 'To make all data public' },
          { id: 2, text: 'To hide implementation details and protect data' },
          { id: 3, text: 'To eliminate the need for methods' },
          { id: 4, text: 'To prevent inheritance' }
        ],
        correctAnswer: '2',
        points: 10
      },
      {
        id: 'q2-property-field',
        text: 'In C#, properties are a better choice than public fields for implementing encapsulation.',
        type: 'true-false',
        correctAnswer: 'true',
        points: 5
      },
      {
        id: 'q3-access-modifiers',
        text: 'Which access modifier would you use to make a field accessible only to derived classes?',
        type: 'multiple-choice',
        options: [
          { id: 1, text: 'public' },
          { id: 2, text: 'private' },
          { id: 3, text: 'protected' },
          { id: 4, text: 'internal' }
        ],
        correctAnswer: '3',
        points: 10
      },
      {
        id: 'q4-bank-account',
        text: 'Implement a BankAccount class with proper encapsulation.',
        type: 'coding',
        codeChallenge: {
          instructions: 'Create a BankAccount class with a private balance field, a public read-only Balance property, and Deposit/Withdraw methods with proper validation.',
          startingCode: `public class BankAccount
{
    // Add private field for balance
    
    // Add public read-only Balance property
    
    // Add constructor
    
    // Add Deposit method
    
    // Add Withdraw method
    
}

// Test your code
BankAccount account = new BankAccount(1000);
account.Deposit(500);
bool success = account.Withdraw(200);
Console.WriteLine($"Balance: {account.Balance}, Withdrawal successful: {success}");`,
          testCases: [
            {
              input: 'account.Deposit(500)',
              expectedOutput: 'Balance: 1500',
              explanation: 'After depositing 500 to an initial balance of 1000, the balance should be 1500.'
            },
            {
              input: 'account.Withdraw(200)',
              expectedOutput: 'Balance: 1300, Withdrawal successful: True',
              explanation: 'After withdrawing 200 from 1500, the balance should be 1300 and the withdrawal should succeed.'
            },
            {
              input: 'account.Withdraw(2000)',
              expectedOutput: 'Withdrawal successful: False',
              explanation: 'Attempting to withdraw more than the balance should fail and return false.'
            }
          ]
        },
        points: 25
      }
    ],
    passingScore: 70,
    timeLimit: 30
  }
];