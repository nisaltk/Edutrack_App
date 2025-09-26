// Mock AI assistant service for demonstration
// In a real application, this would connect to an AI API

const responses = [
  "Based on the performance data, I recommend focusing on differentiated instruction strategies.",
  "The student feedback suggests that interactive activities are highly effective in your classroom.",
  "Looking at the training history, you might benefit from the upcoming classroom management workshop.",
  "The performance metrics show improvement in student engagement over the last quarter.",
  "Consider implementing more project-based learning approaches based on the success patterns I've observed.",
  "The data suggests that students respond well to your use of technology in the classroom."
];

const questions = [
  "How can I improve student engagement?",
  "What training would benefit me most?",
  "How do I interpret my performance metrics?",
  "What teaching strategies work best for my subject?",
  "How can I better incorporate technology?"
];

export const aiService = {
  getResponse: async (message) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple pattern matching for demo purposes
    if (message.toLowerCase().includes('engagement')) {
      return responses[0];
    } else if (message.toLowerCase().includes('feedback')) {
      return responses[1];
    } else if (message.toLowerCase().includes('training')) {
      return responses[2];
    } else if (message.toLowerCase().includes('performance')) {
      return responses[3];
    } else if (message.toLowerCase().includes('project')) {
      return responses[4];
    } else if (message.toLowerCase().includes('technology')) {
      return responses[5];
    }
    
    // Default random response
    return responses[Math.floor(Math.random() * responses.length)];
  },
  
  getSuggestedQuestions: () => {
    return questions;
  },
  
  analyzePerformance: (teacherData) => {
    // Mock performance analysis
    return {
      strengths: [
        "Student engagement",
        "Classroom management",
        "Technology integration"
      ],
      areasForImprovement: [
        "Assessment variety",
        "Differentiated instruction",
        "Parent communication"
      ],
      recommendations: [
        "Attend the upcoming assessment strategies workshop",
        "Implement more project-based learning activities",
        "Schedule monthly parent update meetings"
      ]
    };
  }
};