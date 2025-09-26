// Utility functions for performance data management

// Get performance data from localStorage
export const getStoredPerformanceData = () => {
  try {
    const storedData = localStorage.getItem('performanceData');
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error('Error loading performance data from localStorage:', error);
    return null;
  }
};

// Save performance data to localStorage
export const setStoredPerformanceData = (data) => {
  try {
    localStorage.setItem('performanceData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving performance data to localStorage:', error);
  }
};

// Default performance data structure
export const getDefaultPerformanceData = () => ({
  all: {
    metrics: [
      { title: 'Average Performance Score', value: '87%' },
      { title: 'Top Performing Subject', value: 'Mathematics' },
      { title: 'Improvement Rate', value: '+5.2%' },
      { title: 'Feedback Response Rate', value: '92%' }
    ],
    hasData: true
  },
  math: {
    metrics: [
      { title: 'Average Performance Score', value: '92%' },
      { title: 'Student Engagement', value: '89%' },
      { title: 'Improvement Rate', value: '+7.3%' },
      { title: 'Test Completion Rate', value: '96%' }
    ],
    hasData: true
  },
  science: {
    metrics: [
      { title: 'Average Performance Score', value: '85%' },
      { title: 'Lab Work Score', value: '88%' },
      { title: 'Improvement Rate', value: '+4.1%' },
      { title: 'Research Projects', value: '83%' }
    ],
    hasData: true
  },
  english: {
    metrics: [
      { title: 'Average Performance Score', value: '82%' },
      { title: 'Reading Comprehension', value: '84%' },
      { title: 'Writing Skills', value: '79%' },
      { title: 'Class Participation', value: '88%' }
    ],
    hasData: true
  },
  history: {
    metrics: [
      { title: 'Average Performance Score', value: '78%' },
      { title: 'Historical Analysis', value: '81%' },
      { title: 'Research Papers', value: '76%' },
      { title: 'Exam Results', value: '80%' }
    ],
    hasData: true
  },
  arts: {
    metrics: [
      { title: 'Average Performance Score', value: '91%' },
      { title: 'Creative Projects', value: '94%' },
      { title: 'Technique Mastery', value: '89%' },
      { title: 'Portfolio Quality', value: '93%' }
    ],
    hasData: true
  }
});

// Initialize performance data
export const initializePerformanceData = () => {
  const storedData = getStoredPerformanceData();
  if (!storedData) {
    const defaultData = getDefaultPerformanceData();
    setStoredPerformanceData(defaultData);
    return defaultData;
  }
  return storedData;
};

// Update a specific subject's performance data
export const updateSubjectPerformance = (subject, newData) => {
  const currentData = getStoredPerformanceData() || getDefaultPerformanceData();
  const updatedData = {
    ...currentData,
    [subject]: newData
  };
  setStoredPerformanceData(updatedData);
  return updatedData;
};