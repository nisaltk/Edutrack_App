import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '../styles/globalStyles';
import PerformanceChart from '../components/PerformanceChart';

const PerformanceContainer = styled.div`
  padding: 20px;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.text};
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 700;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? props.theme.primary : props.theme.cardBg};
  color: ${props => props.active ? 'white' : props.theme.text};
  border: 1px solid ${props => props.theme.border};
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.primary};
    color: white;
  }
`;

const PerformanceMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const MetricCard = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
  text-align: center;
`;

const MetricTitle = styled.h3`
  color: ${props => props.theme.text};
  font-size: 16px;
  margin-bottom: 10px;
  opacity: 0.8;
`;

const MetricValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${props => props.theme.primary};
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: ${props => props.theme.text};
  opacity: 0.7;
  font-style: italic;
`;

const EditSection = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 20px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
  margin-bottom: 30px;
`;

const EditTitle = styled.h3`
  color: ${props => props.theme.text};
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: ${props => props.theme.text};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}20;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}20;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 25px;
`;

const SaveButton = styled.button`
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const CancelButton = styled.button`
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.border};
  }
`;

const SuccessMessage = styled.div`
  background: #d1fae5;
  color: #065f46;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #a7f3d0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

// Local storage functions
const getStoredPerformanceData = () => {
  try {
    const storedData = localStorage.getItem('performanceData');
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error('Error loading performance data from localStorage:', error);
    return null;
  }
};

const setStoredPerformanceData = (data) => {
  try {
    localStorage.setItem('performanceData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving performance data to localStorage:', error);
  }
};

// Default performance data
const getDefaultPerformanceData = () => ({
  all: {
    metrics: [
      { title: 'Average Performance Score', value: '87%' },
      { title: 'Student Satisfaction', value: '92%' },
      { title: 'Improvement Rate', value: '+5.2%' },
      { title: 'Feedback Response Rate', value: '94%' }
    ],
    hasData: true
  },
  math: {
    metrics: [
      { title: 'Average Performance Score', value: '92%' },
      { title: 'Student Satisfaction', value: '89%' },
      { title: 'Improvement Rate', value: '+7.3%' },
      { title: 'Test Completion Rate', value: '96%' }
    ],
    hasData: true
  },
  science: {
    metrics: [
      { title: 'Average Performance Score', value: '85%' },
      { title: 'Student Satisfaction', value: '88%' },
      { title: 'Improvement Rate', value: '+4.1%' },
      { title: 'Lab Completion Rate', value: '83%' }
    ],
    hasData: true
  },
  english: {
    metrics: [
      { title: 'Average Performance Score', value: '82%' },
      { title: 'Student Satisfaction', value: '84%' },
      { title: 'Improvement Rate', value: '+3.5%' },
      { title: 'Reading Comprehension', value: '79%' }
    ],
    hasData: true
  },
  history: {
    metrics: [
      { title: 'Average Performance Score', value: '78%' },
      { title: 'Student Satisfaction', value: '81%' },
      { title: 'Improvement Rate', value: '+2.8%' },
      { title: 'Research Papers', value: '76%' }
    ],
    hasData: true
  },
  arts: {
    metrics: [
      { title: 'Average Performance Score', value: '91%' },
      { title: 'Student Satisfaction', value: '94%' },
      { title: 'Improvement Rate', value: '+6.2%' },
      { title: 'Creative Projects', value: '93%' }
    ],
    hasData: true
  }
});

// Initialize performance data
const initializePerformanceData = () => {
  const storedData = getStoredPerformanceData();
  if (!storedData) {
    const defaultData = getDefaultPerformanceData();
    setStoredPerformanceData(defaultData);
    return defaultData;
  }
  return storedData;
};

const Performance = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [performanceData, setPerformanceData] = useState(initializePerformanceData());
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const filters = [
    { id: 'all', label: 'All Teachers' },
    { id: 'math', label: 'Mathematics' },
    { id: 'science', label: 'Science' },
    { id: 'english', label: 'English' },
    { id: 'history', label: 'History' },
    { id: 'arts', label: 'Arts' }
  ];

  // Update localStorage whenever performanceData changes
  useEffect(() => {
    setStoredPerformanceData(performanceData);
  }, [performanceData]);

  // Get current metrics based on active filter
  const currentMetrics = performanceData[activeFilter]?.metrics || [];
  const hasData = performanceData[activeFilter]?.hasData || false;

  const handleEditClick = () => {
    // Initialize edit data with current values
    setEditData({
      ...performanceData[activeFilter],
      subject: activeFilter
    });
    setIsEditing(true);
  };

  const handleInputChange = (e, index, field) => {
    const { value } = e.target;
    const updatedEditData = { ...editData };
    
    if (field === 'title') {
      updatedEditData.metrics[index].title = value;
    } else if (field === 'value') {
      updatedEditData.metrics[index].value = value;
    }
    
    setEditData(updatedEditData);
  };

  const handleSave = () => {
    const updatedPerformanceData = {
      ...performanceData,
      [activeFilter]: editData
    };
    
    setPerformanceData(updatedPerformanceData);
    setIsEditing(false);
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const handleAddMetric = () => {
    const updatedEditData = {
      ...editData,
      metrics: [
        ...editData.metrics,
        { title: 'New Metric', value: '0%' }
      ]
    };
    
    setEditData(updatedEditData);
  };

  const handleRemoveMetric = (index) => {
    if (editData.metrics.length <= 1) {
      alert('You must have at least one metric.');
      return;
    }
    
    const updatedEditData = {
      ...editData,
      metrics: editData.metrics.filter((_, i) => i !== index)
    };
    
    setEditData(updatedEditData);
  };

  return (
    <PerformanceContainer>
      <Container>
        <SectionTitle>Performance Analytics</SectionTitle>
        
        {showSuccess && (
          <SuccessMessage>
            ✅ Performance data updated successfully! Changes have been saved.
          </SuccessMessage>
        )}
        
        <FilterSection>
          {filters.map(filter => (
            <FilterButton
              key={filter.id}
              active={activeFilter === filter.id}
              onClick={() => {
                setActiveFilter(filter.id);
                setIsEditing(false);
              }}
            >
              {filter.label}
            </FilterButton>
          ))}
        </FilterSection>
        
        {isEditing ? (
          <EditSection>
            <EditTitle>✏️ Edit Performance Data for {filters.find(f => f.id === activeFilter)?.label}</EditTitle>
            
            {editData.metrics?.map((metric, index) => (
              <div key={index} style={{ display: 'flex', gap: '15px', marginBottom: '15px', alignItems: 'flex-end' }}>
                <FormGroup style={{ flex: 1 }}>
                  <FormLabel>Metric Title</FormLabel>
                  <FormInput
                    type="text"
                    value={metric.title}
                    onChange={(e) => handleInputChange(e, index, 'title')}
                  />
                </FormGroup>
                
                <FormGroup style={{ flex: 1 }}>
                  <FormLabel>Value</FormLabel>
                  <FormInput
                    type="text"
                    value={metric.value}
                    onChange={(e) => handleInputChange(e, index, 'value')}
                  />
                </FormGroup>
                
                <button
                  onClick={() => handleRemoveMetric(index)}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '12px',
                    cursor: 'pointer',
                    height: '42px'
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
            
            <button
              onClick={handleAddMetric}
              style={{
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 15px',
                cursor: 'pointer',
                marginBottom: '20px'
              }}
            >
              + Add Metric
            </button>
            
            <FormActions>
              <SaveButton onClick={handleSave}>
                💾 Save Changes
              </SaveButton>
              <CancelButton onClick={handleCancel}>
                ❌ Cancel
              </CancelButton>
            </FormActions>
          </EditSection>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <SaveButton onClick={handleEditClick}>
              ✏️ Edit Performance Data
            </SaveButton>
          </div>
        )}
        
        {hasData ? (
          <>
            <PerformanceMetrics>
              {currentMetrics.map((metric, index) => (
                <MetricCard key={index}>
                  <MetricTitle>{metric.title}</MetricTitle>
                  <MetricValue>{metric.value}</MetricValue>
                </MetricCard>
              ))}
            </PerformanceMetrics>
            
            <PerformanceChart subject={activeFilter} performanceData={performanceData[activeFilter]} />
          </>
        ) : (
          <NoDataMessage>
            No performance data available for this selection.
          </NoDataMessage>
        )}
      </Container>
    </PerformanceContainer>
  );
};

export default Performance;