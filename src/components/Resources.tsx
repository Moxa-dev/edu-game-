import React from 'react';

const Resources: React.FC = () => {
  const documentationResources = [
    {
      title: 'C# Documentation',
      description: 'Official Microsoft documentation for C# language.',
      url: 'https://docs.microsoft.com/en-us/dotnet/csharp/',
      icon: 'document'
    },
    {
      title: '.NET API Browser',
      description: 'Search and browse the .NET API documentation.',
      url: 'https://docs.microsoft.com/en-us/dotnet/api/',
      icon: 'code'
    },
    {
      title: 'Object-Oriented Programming Concepts',
      description: 'Learn about the core concepts of object-oriented programming.',
      url: 'https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/tutorials/oop',
      icon: 'academic-cap'
    }
  ];

  const tutorialResources = [
    {
      title: 'C# Fundamentals',
      description: 'Interactive tutorials to learn C# fundamentals.',
      url: 'https://dotnet.microsoft.com/learn/csharp',
      icon: 'book-open'
    },
    {
      title: 'C# Programming Guide',
      description: 'Comprehensive guide to C# programming concepts.',
      url: 'https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/',
      icon: 'book'
    },
    {
      title: 'Design Patterns in C#',
      description: 'Learn common design patterns and their implementation in C#.',
      url: 'https://refactoring.guru/design-patterns/csharp',
      icon: 'template'
    }
  ];

  const communityResources = [
    {
      title: 'Stack Overflow',
      description: 'Community-driven Q&A for programmers.',
      url: 'https://stackoverflow.com/questions/tagged/c%23',
      icon: 'chat'
    },
    {
      title: 'C# Discord',
      description: 'Join the C# Discord community for real-time discussions.',
      url: 'https://discord.com/invite/csharp',
      icon: 'chat-alt'
    },
    {
      title: 'GitHub .NET Community',
      description: 'Explore open-source .NET projects and contribute.',
      url: 'https://github.com/dotnet',
      icon: 'code-branch'
    }
  ];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'document':
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'code':
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'academic-cap':
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        );
      case 'book-open':
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'book':
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'template':
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        );
      case 'chat':
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'chat-alt':
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
        );
      case 'code-branch':
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        );
      default:
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const ResourceCard = ({ resource, category }: { resource: any, category: string }) => (
    <a 
      href={resource.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-start p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className={`flex-shrink-0 p-3 mr-4 rounded-full ${getCategoryColor(category)}`}>
        {renderIcon(resource.icon)}
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">{resource.title}</h3>
        <p className="mt-1 text-sm text-gray-600">{resource.description}</p>
      </div>
    </a>
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'documentation':
        return 'bg-blue-100 text-blue-600';
      case 'tutorial':
        return 'bg-green-100 text-green-600';
      case 'community':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Learning Resources</h1>
        <p className="text-gray-600">
          Explore these resources to deepen your understanding of object-oriented programming and C#.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Documentation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentationResources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} category="documentation" />
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tutorials & Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorialResources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} category="tutorial" />
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Community & Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communityResources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} category="community" />
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">Need more help?</h2>
        <p className="text-blue-700 mb-4">
          If you're stuck on a concept or have questions about the material, don't hesitate to reach out for help.
        </p>
        <div className="flex flex-wrap gap-4">
          <a 
            href="mailto:support@oopcsharp.learn" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Support
          </a>
          <a 
            href="https://github.com/oop-learning-platform/issues" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Report an Issue
          </a>
        </div>
      </div>
    </div>
  );
};

export default Resources;