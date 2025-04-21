import { Lesson } from '../types';

export const lessons: Lesson[] = [
  {
    id: 'intro-to-oop',
    title: 'Introduction to Object-Oriented Programming',
    description: 'Learn the fundamental concepts of object-oriented programming and why it matters.',
    content: `
      <h2>What is Object-Oriented Programming?</h2>
      <p>Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which can contain data and code: data in the form of fields (often known as attributes or properties), and code in the form of procedures (often known as methods).</p>
      
      <p>OOP is built on four main principles:</p>
      <ul>
        <li><strong>Encapsulation:</strong> Bundling data and methods that work on that data within one unit, like a class.</li>
        <li><strong>Inheritance:</strong> A mechanism where a new class can inherit properties and methods from an existing class.</li>
        <li><strong>Polymorphism:</strong> The ability to present the same interface for different underlying forms or data types.</li>
        <li><strong>Abstraction:</strong> Hiding complex implementation details and showing only the necessary features of an object.</li>
      </ul>
      
      <h2>Why Use OOP?</h2>
      <p>OOP helps developers to:</p>
      <ul>
        <li>Model complex systems by breaking them down into smaller, more manageable parts</li>
        <li>Reuse code through inheritance</li>
        <li>Create modular, maintainable applications</li>
        <li>Implement real-world entities in code more naturally</li>
      </ul>
    `,
    order: 1,
    difficulty: 'beginner',
    tags: ['OOP', 'Fundamentals', 'Programming Paradigms'],
    estimatedTime: 20,
    codeExamples: [
      {
        id: 'oop-basic-class',
        title: 'Basic Class Structure',
        description: 'A simple example of a class in C#',
        code: `// A basic class in C#
public class Person
{
    // Properties (attributes)
    public string Name { get; set; }
    public int Age { get; set; }
    
    // Constructor
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
    
    // Method
    public void Introduce()
    {
        Console.WriteLine($"Hi, I'm {Name} and I'm {Age} years old.");
    }
}

// Creating and using an object
Person person = new Person("John", 30);
person.Introduce(); // Outputs: Hi, I'm John and I'm 30 years old.`,
        language: 'csharp',
        readOnly: true,
        expectedOutput: 'Hi, I'm John and I'm 30 years old.'
      }
    ],
    nextLessonId: 'csharp-basics'
  },
  {
    id: 'csharp-basics',
    title: 'C# Basics for OOP',
    description: 'Learn the essential C# syntax and features that support object-oriented programming.',
    content: `
      <h2>C# as an Object-Oriented Language</h2>
      <p>C# is a modern, object-oriented programming language developed by Microsoft. It's part of the .NET ecosystem and is designed to be simple, powerful, type-safe, and object-oriented.</p>
      
      <h2>Key C# Features for OOP</h2>
      <ul>
        <li><strong>Classes and Objects:</strong> C# provides robust support for defining classes and creating objects.</li>
        <li><strong>Properties:</strong> C# has built-in property syntax that simplifies getting and setting values while enabling encapsulation.</li>
        <li><strong>Inheritance:</strong> C# supports single inheritance for classes, but multiple inheritance through interfaces.</li>
        <li><strong>Interfaces:</strong> Define contracts that classes can implement, enabling polymorphism.</li>
        <li><strong>Access Modifiers:</strong> Control the visibility and accessibility of classes and their members.</li>
        <li><strong>Method Overloading and Overriding:</strong> Support for polymorphic behavior.</li>
      </ul>
      
      <h2>C# Type System</h2>
      <p>C# has a unified type system where all types, including primitive types, inherit from the <code>object</code> class. This means that every type can be treated as an object.</p>
    `,
    order: 2,
    difficulty: 'beginner',
    tags: ['C#', '.NET', 'Syntax'],
    estimatedTime: 25,
    codeExamples: [
      {
        id: 'csharp-properties',
        title: 'C# Properties',
        description: 'How to use properties in C#',
        code: `// Using properties in C#
public class BankAccount
{
    // Private field
    private decimal _balance;
    
    // Public property with validation
    public decimal Balance
    {
        get { return _balance; }
        private set { _balance = value; }
    }
    
    // Auto-implemented property
    public string AccountNumber { get; private set; }
    
    public BankAccount(string accountNumber, decimal initialBalance)
    {
        AccountNumber = accountNumber;
        _balance = initialBalance;
    }
    
    public void Deposit(decimal amount)
    {
        if (amount <= 0)
        {
            throw new ArgumentException("Deposit amount must be positive");
        }
        
        _balance += amount;
    }
}

// Using the class
var account = new BankAccount("123456789", 1000);
account.Deposit(500);
Console.WriteLine($"Account {account.AccountNumber} has balance: {account.Balance}");`,
        language: 'csharp',
        readOnly: false,
        expectedOutput: 'Account 123456789 has balance: 1500'
      }
    ],
    nextLessonId: 'encapsulation'
  },
  {
    id: 'encapsulation',
    title: 'Encapsulation in C#',
    description: 'Learn how to implement encapsulation to protect data and create maintainable code.',
    content: `
      <h2>Understanding Encapsulation</h2>
      <p>Encapsulation is one of the four fundamental OOP concepts. It describes the idea of bundling data and methods that work on that data within one unit, like a class in C#.</p>
      
      <p>This concept is also often used to hide the internal representation, or state, of an object from the outside. This is called information hiding.</p>
      
      <h2>Benefits of Encapsulation</h2>
      <ul>
        <li><strong>Data Protection:</strong> Prevent direct access to data that could be misused.</li>
        <li><strong>Flexibility:</strong> Change the implementation without affecting code that uses the class.</li>
        <li><strong>Maintainability:</strong> Easier to maintain as changes are localized.</li>
        <li><strong>Reduced Complexity:</strong> Users of the class don't need to understand its internal workings.</li>
      </ul>
      
      <h2>Implementing Encapsulation in C#</h2>
      <p>C# provides several mechanisms to implement encapsulation:</p>
      <ul>
        <li><strong>Access Modifiers:</strong> Use private, protected, internal, and public to control access.</li>
        <li><strong>Properties:</strong> Use getters and setters to control access to fields.</li>
        <li><strong>Methods:</strong> Expose functionality without revealing implementation details.</li>
      </ul>
    `,
    order: 3,
    difficulty: 'beginner',
    tags: ['OOP', 'Encapsulation', 'C#'],
    estimatedTime: 30,
    codeExamples: [
      {
        id: 'encapsulation-example',
        title: 'Implementing Encapsulation',
        description: 'A practical example of encapsulation in C#',
        code: `// Encapsulation example
public class Employee
{
    // Private fields
    private string _firstName;
    private string _lastName;
    private decimal _salary;
    
    // Public properties with validation
    public string FirstName
    {
        get { return _firstName; }
        set 
        { 
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("First name cannot be empty");
            _firstName = value; 
        }
    }
    
    public string LastName
    {
        get { return _lastName; }
        set 
        { 
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("Last name cannot be empty");
            _lastName = value; 
        }
    }
    
    public string FullName
    {
        get { return $"{_firstName} {_lastName}"; }
    }
    
    public decimal Salary
    {
        get { return _salary; }
        private set { _salary = value; }
    }
    
    public Employee(string firstName, string lastName, decimal salary)
    {
        FirstName = firstName;  // Uses the property setter with validation
        LastName = lastName;    // Uses the property setter with validation
        _salary = salary;       // Directly sets the field
    }
    
    // Public method to give a raise
    public void GiveRaise(decimal percentage)
    {
        if (percentage <= 0)
            throw new ArgumentException("Percentage must be positive");
            
        _salary += _salary * percentage / 100;
    }
}

// Using the encapsulated class
var employee = new Employee("John", "Doe", 50000);
employee.GiveRaise(10);  // 10% raise
Console.WriteLine($"{employee.FullName}'s new salary: {employee.Salary}");`,
        language: 'csharp',
        readOnly: false,
        expectedOutput: 'John Doe\'s new salary: 55000'
      }
    ],
    nextLessonId: 'inheritance'
  },
  {
    id: 'inheritance',
    title: 'Inheritance in C#',
    description: 'Learn how to use inheritance to create class hierarchies and promote code reuse.',
    content: `
      <h2>Understanding Inheritance</h2>
      <p>Inheritance is a fundamental concept in OOP that allows a class to inherit properties and behavior from another class. The class that inherits is called a derived class or subclass, and the class being inherited from is called a base class or superclass.</p>
      
      <h2>Benefits of Inheritance</h2>
      <ul>
        <li><strong>Code Reuse:</strong> Avoid duplicating code by inheriting common functionality.</li>
        <li><strong>Extensibility:</strong> Extend existing classes with new functionality.</li>
        <li><strong>Polymorphism:</strong> Enable polymorphic behavior through method overriding.</li>
        <li><strong>Hierarchical Organization:</strong> Create logical class hierarchies that model real-world relationships.</li>
      </ul>
      
      <h2>Types of Inheritance</h2>
      <p>C# supports:</p>
      <ul>
        <li><strong>Single Inheritance:</strong> A class can inherit from only one base class.</li>
        <li><strong>Multilevel Inheritance:</strong> A class can inherit from a derived class.</li>
        <li><strong>Interface Inheritance:</strong> A class can implement multiple interfaces.</li>
      </ul>
      
      <h2>Key Inheritance Features in C#</h2>
      <ul>
        <li><strong>Base and Derived Classes:</strong> Use the colon syntax to inherit.</li>
        <li><strong>Method Overriding:</strong> Use the virtual and override keywords.</li>
        <li><strong>Base Keyword:</strong> Access base class members.</li>
        <li><strong>Sealed Classes:</strong> Prevent further inheritance.</li>
        <li><strong>Abstract Classes:</strong> Create base classes that cannot be instantiated.</li>
      </ul>
    `,
    order: 4,
    difficulty: 'intermediate',
    tags: ['OOP', 'Inheritance', 'C#'],
    estimatedTime: 35,
    codeExamples: [
      {
        id: 'inheritance-example',
        title: 'Basic Inheritance',
        description: 'A simple example of inheritance in C#',
        code: `// Base class
public class Shape
{
    // Protected member accessible to derived classes
    protected string _name;
    
    // Public properties
    public string Name { get { return _name; } }
    public string Color { get; set; }
    
    // Constructor
    public Shape(string name, string color)
    {
        _name = name;
        Color = color;
    }
    
    // Virtual method that can be overridden
    public virtual double CalculateArea()
    {
        return 0;
    }
    
    // Method that will be inherited as-is
    public void DisplayInfo()
    {
        Console.WriteLine($"{Name} is {Color} and has area: {CalculateArea()}");
    }
}

// Derived class
public class Circle : Shape
{
    public double Radius { get; set; }
    
    // Constructor calls base constructor
    public Circle(double radius, string color) : base("Circle", color)
    {
        Radius = radius;
    }
    
    // Override the virtual method
    public override double CalculateArea()
    {
        return Math.PI * Radius * Radius;
    }
}

// Another derived class
public class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }
    
    public Rectangle(double width, double height, string color) : base("Rectangle", color)
    {
        Width = width;
        Height = height;
    }
    
    public override double CalculateArea()
    {
        return Width * Height;
    }
}

// Using inheritance
Shape circle = new Circle(5, "Red");
Shape rectangle = new Rectangle(4, 6, "Blue");

circle.DisplayInfo();
rectangle.DisplayInfo();`,
        language: 'csharp',
        readOnly: false,
        expectedOutput: 'Circle is Red and has area: 78.53981633974483\nRectangle is Blue and has area: 24'
      }
    ],
    nextLessonId: 'polymorphism'
  },
  {
    id: 'polymorphism',
    title: 'Polymorphism in C#',
    description: 'Understand how polymorphism allows objects to take on many forms and behaviors.',
    content: `
      <h2>Understanding Polymorphism</h2>
      <p>Polymorphism is a core concept in OOP that allows objects of different classes to be treated as objects of a common base class. The word polymorphism means "many forms," and that's exactly what it enables: the same interface to be used for different underlying forms.</p>
      
      <h2>Types of Polymorphism in C#</h2>
      <ul>
        <li><strong>Compile-time Polymorphism (Static):</strong> Achieved through method overloading and operator overloading.</li>
        <li><strong>Runtime Polymorphism (Dynamic):</strong> Achieved through method overriding.</li>
      </ul>
      
      <h2>Benefits of Polymorphism</h2>
      <ul>
        <li><strong>Flexibility:</strong> Write code that can work with objects of multiple types.</li>
        <li><strong>Extensibility:</strong> Add new classes without changing existing code.</li>
        <li><strong>Simplicity:</strong> Simplify code by treating related objects uniformly.</li>
        <li><strong>Maintainability:</strong> Make code more modular and easier to maintain.</li>
      </ul>
      
      <h2>Implementing Polymorphism in C#</h2>
      <ul>
        <li><strong>Method Overriding:</strong> Use virtual, override, and abstract keywords.</li>
        <li><strong>Interfaces:</strong> Implement multiple interfaces to enable polymorphic behavior.</li>
        <li><strong>Abstract Classes:</strong> Create base classes with abstract methods that derived classes must implement.</li>
        <li><strong>Method Overloading:</strong> Define multiple methods with the same name but different parameters.</li>
      </ul>
    `,
    order: 5,
    difficulty: 'intermediate',
    tags: ['OOP', 'Polymorphism', 'C#'],
    estimatedTime: 40,
    codeExamples: [
      {
        id: 'polymorphism-example',
        title: 'Runtime Polymorphism',
        description: 'An example of runtime polymorphism in C#',
        code: `// Abstract base class
public abstract class Animal
{
    public string Name { get; set; }
    
    public Animal(string name)
    {
        Name = name;
    }
    
    // Abstract method that must be implemented by derived classes
    public abstract void MakeSound();
    
    // Virtual method with a default implementation
    public virtual void Sleep()
    {
        Console.WriteLine($"{Name} is sleeping...");
    }
}

// Derived class
public class Dog : Animal
{
    public Dog(string name) : base(name) { }
    
    // Implementing the abstract method
    public override void MakeSound()
    {
        Console.WriteLine($"{Name} says: Woof!");
    }
    
    // Additional method specific to Dog
    public void Fetch()
    {
        Console.WriteLine($"{Name} is fetching the ball!");
    }
}

// Another derived class
public class Cat : Animal
{
    public Cat(string name) : base(name) { }
    
    // Implementing the abstract method
    public override void MakeSound()
    {
        Console.WriteLine($"{Name} says: Meow!");
    }
    
    // Overriding the virtual method
    public override void Sleep()
    {
        Console.WriteLine($"{Name} is taking a cat nap.");
    }
}

// Demonstrating polymorphism
public static void AnimalSounds(Animal[] animals)
{
    foreach (var animal in animals)
    {
        // Polymorphic call - the correct version of MakeSound() is called
        // based on the actual type of the object, not the reference type
        animal.MakeSound();
        animal.Sleep();
        Console.WriteLine();
    }
}

// Using polymorphism
Animal[] animals = new Animal[2];
animals[0] = new Dog("Rex");
animals[1] = new Cat("Whiskers");

AnimalSounds(animals);

// We can also use the specific type when we need to
Dog dog = (Dog)animals[0];
dog.Fetch(); // Calling a method specific to Dog`,
        language: 'csharp',
        readOnly: false,
        expectedOutput: 'Rex says: Woof!\nRex is sleeping...\n\nWhiskers says: Meow!\nWhiskers is taking a cat nap.\n\nRex is fetching the ball!'
      }
    ],
    nextLessonId: 'abstraction'
  },
  {
    id: 'abstraction',
    title: 'Abstraction in C#',
    description: 'Learn how to use abstraction to hide complex implementation details and focus on essential features.',
    content: `
      <h2>Understanding Abstraction</h2>
      <p>Abstraction is the concept of hiding complex implementation details and showing only the necessary features of an object. It helps manage complexity by allowing programmers to focus on what an object does rather than how it does it.</p>
      
      <h2>Benefits of Abstraction</h2>
      <ul>
        <li><strong>Simplicity:</strong> Reduce complexity by hiding unnecessary details.</li>
        <li><strong>Maintainability:</strong> Change implementation without affecting code that uses the abstraction.</li>
        <li><strong>Focus:</strong> Concentrate on essential features rather than intricate details.</li>
        <li><strong>Security:</strong> Hide sensitive implementation details from users.</li>
      </ul>
      
      <h2>Implementing Abstraction in C#</h2>
      <ul>
        <li><strong>Abstract Classes:</strong> Create base classes that cannot be instantiated but provide a common interface.</li>
        <li><strong>Interfaces:</strong> Define contracts that classes must implement.</li>
        <li><strong>Access Modifiers:</strong> Control visibility of implementation details.</li>
        <li><strong>Encapsulation:</strong> Use properties and methods to hide internal state.</li>
      </ul>
      
      <h2>Abstract Classes vs. Interfaces</h2>
      <p><strong>Abstract Classes:</strong></p>
      <ul>
        <li>Can have implementation for some methods</li>
        <li>Can have fields and constants</li>
        <li>Can have constructors</li>
        <li>A class can inherit from only one abstract class</li>
      </ul>
      
      <p><strong>Interfaces:</strong></p>
      <ul>
        <li>Cannot have implementation for methods (prior to C# 8.0)</li>
        <li>Cannot have fields (only properties, methods, events)</li>
        <li>Cannot have constructors</li>
        <li>A class can implement multiple interfaces</li>
      </ul>
    `,
    order: 6,
    difficulty: 'intermediate',
    tags: ['OOP', 'Abstraction', 'C#'],
    estimatedTime: 35,
    codeExamples: [
      {
        id: 'abstraction-example',
        title: 'Abstraction with Abstract Class and Interface',
        description: 'An example showing abstraction using both abstract classes and interfaces',
        code: `// Interface - defines a contract
public interface IPayable
{
    decimal CalculatePayment();
}

// Abstract class - provides partial implementation
public abstract class Employee
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string FullName => $"{FirstName} {LastName}";
    
    // Constructor
    public Employee(string firstName, string lastName)
    {
        FirstName = firstName;
        LastName = lastName;
    }
    
    // Abstract method - must be implemented by derived classes
    public abstract void Work();
    
    // Concrete method - shared implementation
    public void DisplayInfo()
    {
        Console.WriteLine($"Employee: {FullName}");
    }
}

// Concrete class implementing both the abstract class and interface
public class FullTimeEmployee : Employee, IPayable
{
    public decimal MonthlySalary { get; set; }
    
    public FullTimeEmployee(string firstName, string lastName, decimal monthlySalary) 
        : base(firstName, lastName)
    {
        MonthlySalary = monthlySalary;
    }
    
    // Implementing the abstract method
    public override void Work()
    {
        Console.WriteLine($"{FullName} is working full time.");
    }
    
    // Implementing the interface method
    public decimal CalculatePayment()
    {
        return MonthlySalary;
    }
}

// Another concrete class
public class Contractor : Employee, IPayable
{
    public decimal HourlyRate { get; set; }
    public int HoursWorked { get; set; }
    
    public Contractor(string firstName, string lastName, decimal hourlyRate, int hoursWorked) 
        : base(firstName, lastName)
    {
        HourlyRate = hourlyRate;
        HoursWorked = hoursWorked;
    }
    
    public override void Work()
    {
        Console.WriteLine($"{FullName} is working on a contract basis.");
    }
    
    public decimal CalculatePayment()
    {
        return HourlyRate * HoursWorked;
    }
}

// Using abstraction
Employee fullTimeEmployee = new FullTimeEmployee("John", "Doe", 5000);
Employee contractor = new Contractor("Jane", "Smith", 50, 100);

// Using Employee abstraction
fullTimeEmployee.DisplayInfo();
fullTimeEmployee.Work();

contractor.DisplayInfo();
contractor.Work();

// Using IPayable abstraction
IPayable[] payables = new IPayable[2];
payables[0] = (IPayable)fullTimeEmployee;
payables[1] = (IPayable)contractor;

foreach (var payable in payables)
{
    Console.WriteLine($"Payment: ${payable.CalculatePayment()}");
}`,
        language: 'csharp',
        readOnly: false,
        expectedOutput: 'Employee: John Doe\nJohn Doe is working full time.\nEmployee: Jane Smith\nJane Smith is working on a contract basis.\nPayment: $5000\nPayment: $5000'
      }
    ],
    nextLessonId: 'interfaces'
  },
  {
    id: 'interfaces',
    title: 'Interfaces in C#',
    description: 'Master the use of interfaces to define contracts and enable polymorphism.',
    content: `
      <h2>Understanding Interfaces</h2>
      <p>An interface in C# is a contract that defines a set of methods, properties, events, or indexers without implementation. Classes or structs that implement an interface must provide implementations for all its members.</p>
      
      <h2>Benefits of Interfaces</h2>
      <ul>
        <li><strong>Multiple Inheritance:</strong> A class can implement multiple interfaces, overcoming the single inheritance limitation.</li>
        <li><strong>Polymorphism:</strong> Enable polymorphic behavior across unrelated classes.</li>
        <li><strong>Decoupling:</strong> Reduce dependencies between components.</li>
        <li><strong>Testability:</strong> Facilitate unit testing through mock implementations.</li>
        <li><strong>API Design:</strong> Define clear contracts for components.</li>
      </ul>
      
      <h2>Interface Features in C#</h2>
      <ul>
        <li><strong>Declaration:</strong> Use the interface keyword.</li>
        <li><strong>Implementation:</strong> Classes use the colon syntax to implement interfaces.</li>
        <li><strong>Explicit Implementation:</strong> Implement interface members explicitly to avoid naming conflicts.</li>
        <li><strong>Default Interface Methods:</strong> From C# 8.0, interfaces can have default implementations.</li>
        <li><strong>Interface Inheritance:</strong> Interfaces can inherit from other interfaces.</li>
      </ul>
      
      <h2>Common Interface Patterns</h2>
      <ul>
        <li><strong>IEnumerable/IEnumerator:</strong> For collection iteration.</li>
        <li><strong>IDisposable:</strong> For resource cleanup.</li>
        <li><strong>IComparable/IComparer:</strong> For object comparison.</li>
        <li><strong>IEquatable:</strong> For object equality.</li>
        <li><strong>INotifyPropertyChanged:</strong> For property change notification.</li>
      </ul>
    `,
    order: 7,
    difficulty: 'intermediate',
    tags: ['OOP', 'Interfaces', 'C#'],
    estimatedTime: 40,
    codeExamples: [
      {
        id: 'interfaces-example',
        title: 'Working with Interfaces',
        description: 'A comprehensive example of interfaces in C#',
        code: `// Basic interface definition
public interface ILogger
{
    void Log(string message);
    bool LogError(Exception ex);
    string LogLevel { get; set; }
}

// Another interface
public interface IFileManager
{
    bool SaveToFile(string content, string path);
    string ReadFromFile(string path);
}

// Interface inheritance
public interface IAdvancedLogger : ILogger
{
    void LogVerbose(string message, params object[] args);
}

// Class implementing a single interface
public class ConsoleLogger : ILogger
{
    public string LogLevel { get; set; } = "Info";
    
    public void Log(string message)
    {
        Console.WriteLine($"[{LogLevel}] {message}");
    }
    
    public bool LogError(Exception ex)
    {
        Console.WriteLine($"[ERROR] {ex.Message}");
        return true;
    }
}

// Class implementing multiple interfaces
public class FileLogger : ILogger, IFileManager
{
    private string _logFilePath;
    public string LogLevel { get; set; } = "Info";
    
    public FileLogger(string logFilePath)
    {
        _logFilePath = logFilePath;
    }
    
    public void Log(string message)
    {
        string logEntry = $"[{LogLevel}] {DateTime.Now}: {message}";
        SaveToFile(logEntry, _logFilePath);
    }
    
    public bool LogError(Exception ex)
    {
        string logEntry = $"[ERROR] {DateTime.Now}: {ex.Message}";
        return SaveToFile(logEntry, _logFilePath);
    }
    
    public bool SaveToFile(string content, string path)
    {
        // In a real implementation, this would write to a file
        Console.WriteLine($"Writing to file {path}: {content}");
        return true;
    }
    
    public string ReadFromFile(string path)
    {
        // In a real implementation, this would read from a file
        Console.WriteLine($"Reading from file {path}");
        return "File content";