import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '../styles/globalStyles';

const FeedbackContainer = styled.div`
  padding: 20px;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.text};
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 700;
`;

const AddFeedbackButton = styled.button`
  background: linear-gradient(45deg, ${props => props.theme.primary}, ${props => props.theme.accent});
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px ${props => props.theme.primary}40;
  }
`;

const FeedbackForm = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
  margin-bottom: 30px;
  animation: fadeIn 0.6s ease;
`;

const FormTitle = styled.h3`
  color: ${props => props.theme.text};
  margin-bottom: 20px;
  font-size: 18px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
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

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}20;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
`;

const RatingStar = styled.span`
  font-size: 24px;
  cursor: pointer;
  color: ${props => props.active ? '#ffc107' : '#ccc'};
  transition: color 0.2s ease;
  
  &:hover {
    color: #ffc107;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
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

const FeedbackGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const FeedbackCard = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
  animation: fadeIn 0.6s ease forwards;
  position: relative;
`;

const StudentInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const StudentAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const StudentName = styled.div`
  font-weight: 600;
  color: ${props => props.theme.text};
`;

const CourseName = styled.div`
  font-size: 14px;
  color: ${props => props.theme.text};
  opacity: 0.7;
`;

const Rating = styled.div`
  display: flex;
  margin-bottom: 10px;
  
  span {
    color: #ffc107;
    font-size: 18px;
    margin-right: 2px;
  }
`;

const FeedbackText = styled.p`
  color: ${props => props.theme.text};
  line-height: 1.5;
  font-style: italic;
`;

const DateText = styled.div`
  font-size: 12px;
  color: ${props => props.theme.text};
  opacity: 0.6;
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  opacity: 0;
  
  ${FeedbackCard}:hover & {
    opacity: 1;
  }
  
  &:hover {
    background: #ff3742;
    transform: scale(1.05);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${props => props.theme.text};
  opacity: 0.7;
  
  h3 {
    margin-bottom: 10px;
    color: ${props => props.theme.text};
  }
  
  p {
    margin-bottom: 20px;
  }
`;

const ActionButton = styled.button`
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

// Local storage functions
const getStoredFeedbacks = () => {
  try {
    const storedFeedbacks = localStorage.getItem('feedbacks');
    return storedFeedbacks ? JSON.parse(storedFeedbacks) : null;
  } catch (error) {
    console.error('Error loading feedbacks from localStorage:', error);
    return null;
  }
};

const setStoredFeedbacks = (feedbacks) => {
  try {
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
  } catch (error) {
    console.error('Error saving feedbacks to localStorage:', error);
  }
};

// Default feedbacks data
const getDefaultFeedbacks = () => [
  {
    id: 1,
    student: 'Emma Thompson',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    course: 'Mathematics 101',
    rating: 5,
    text: 'Professor Johnson explains complex concepts in a way that\'s easy to understand. Her patience and dedication are remarkable.',
    date: '2023-10-15'
  },
  {
    id: 2,
    student: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    course: 'Science Fundamentals',
    rating: 4,
    text: 'Mr. Chen makes science exciting with his hands-on experiments. I look forward to every class!',
    date: '2023-10-12'
  },
  {
    id: 3,
    student: 'Sophia Martinez',
    avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    course: 'English Literature',
    rating: 5,
    text: 'Ms. Rodriguez has ignited my passion for literature. Her feedback on essays is always constructive and helpful.',
    date: '2023-10-10'
  }
];

// Initialize feedbacks data
const initializeFeedbacks = () => {
  const storedFeedbacks = getStoredFeedbacks();
  if (!storedFeedbacks) {
    const defaultFeedbacks = getDefaultFeedbacks();
    setStoredFeedbacks(defaultFeedbacks);
    return defaultFeedbacks;
  }
  return storedFeedbacks;
};

const Feedback = () => {
  const [showForm, setShowForm] = useState(false);
  const [feedbacks, setFeedbacks] = useState(initializeFeedbacks());
  const [newFeedback, setNewFeedback] = useState({
    student: '',
    course: '',
    rating: 0,
    text: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [tempRating, setTempRating] = useState(0);

  const courses = [
    'Mathematics 101',
    'Science Fundamentals',
    'English Literature',
    'World History',
    'Art Appreciation',
    'Physical Education'
  ];

  // Update localStorage whenever feedbacks change
  useEffect(() => {
    setStoredFeedbacks(feedbacks);
  }, [feedbacks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback({
      ...newFeedback,
      [name]: value
    });
  };

  const handleRatingClick = (rating) => {
    setNewFeedback({
      ...newFeedback,
      rating: rating
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newFeedbackItem = {
      id: Math.max(0, ...feedbacks.map(f => f.id)) + 1,
      student: newFeedback.student || 'Anonymous Student',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      course: newFeedback.course,
      rating: newFeedback.rating,
      text: newFeedback.text,
      date: new Date().toISOString().split('T')[0]
    };

    const updatedFeedbacks = [newFeedbackItem, ...feedbacks];
    setFeedbacks(updatedFeedbacks);
    setNewFeedback({
      student: '',
      course: '',
      rating: 0,
      text: '',
      date: new Date().toISOString().split('T')[0]
    });
    setShowForm(false);
  };

  const handleCancel = () => {
    setNewFeedback({
      student: '',
      course: '',
      rating: 0,
      text: '',
      date: new Date().toISOString().split('T')[0]
    });
    setShowForm(false);
  };

  const handleDeleteFeedback = (feedbackId) => {
    if (window.confirm('Are you sure you want to delete this feedback? This action cannot be undone.')) {
      const updatedFeedbacks = feedbacks.filter(feedback => feedback.id !== feedbackId);
      setFeedbacks(updatedFeedbacks);
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset to default feedbacks? This will replace all current feedback with the default set.')) {
      const defaultFeedbacks = getDefaultFeedbacks();
      setFeedbacks(defaultFeedbacks);
      setStoredFeedbacks(defaultFeedbacks);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i}>{i < rating ? '★' : '☆'}</span>
    ));
  };

  return (
    <FeedbackContainer>
      <Container>
        <SectionTitle>Student Feedback</SectionTitle>
        
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <AddFeedbackButton onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ Add New Feedback'}
          </AddFeedbackButton>
          
          {feedbacks.length > 0 && (
            <ActionButton 
              onClick={handleResetToDefault}
              style={{ background: '#6c757d' }}
            >
              Reset to Default
            </ActionButton>
          )}
        </div>

        {showForm && (
          <FeedbackForm>
            <FormTitle>Add New Feedback</FormTitle>
            <form onSubmit={handleSubmit}>
              <FormGrid>
                <FormGroup>
                  <FormLabel>Student Name</FormLabel>
                  <FormInput
                    type="text"
                    name="student"
                    value={newFeedback.student}
                    onChange={handleInputChange}
                    placeholder="Enter student name"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Course</FormLabel>
                  <FormSelect
                    name="course"
                    value={newFeedback.course}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a course</option>
                    {courses.map((course, index) => (
                      <option key={index} value={course}>{course}</option>
                    ))}
                  </FormSelect>
                </FormGroup>
              </FormGrid>

              <FormGroup>
                <FormLabel>Rating</FormLabel>
                <RatingContainer>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <RatingStar
                      key={star}
                      active={star <= newFeedback.rating}
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setTempRating(star)}
                      onMouseLeave={() => setTempRating(0)}
                    >
                      {star <= (tempRating || newFeedback.rating) ? '★' : '☆'}
                    </RatingStar>
                  ))}
                </RatingContainer>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  {newFeedback.rating === 0 ? 'No rating' : `${newFeedback.rating} out of 5 stars`}
                </div>
              </FormGroup>

              <FormGroup>
                <FormLabel>Feedback</FormLabel>
                <FormTextarea
                  name="text"
                  value={newFeedback.text}
                  onChange={handleInputChange}
                  placeholder="Enter your feedback here..."
                  required
                />
              </FormGroup>

              <FormActions>
                <CancelButton type="button" onClick={handleCancel}>
                  Cancel
                </CancelButton>
                <SubmitButton type="submit">
                  Submit Feedback
                </SubmitButton>
              </FormActions>
            </form>
          </FeedbackForm>
        )}

        {feedbacks.length === 0 ? (
          <EmptyState>
            <h3>No Feedback Found</h3>
            <p>Get started by adding your first feedback or resetting to default feedbacks.</p>
            <ActionButton onClick={handleResetToDefault}>
              Reset to Default Feedbacks
            </ActionButton>
          </EmptyState>
        ) : (
          <FeedbackGrid>
            {feedbacks.map(item => (
              <FeedbackCard key={item.id}>
                <DeleteButton 
                  onClick={() => handleDeleteFeedback(item.id)}
                  title="Delete Feedback"
                >
                  ✕
                </DeleteButton>
                
                <StudentInfo>
                  <StudentAvatar src={item.avatar} alt={item.student} />
                  <div>
                    <StudentName>{item.student}</StudentName>
                    <CourseName>{item.course}</CourseName>
                  </div>
                </StudentInfo>
                
                <Rating>
                  {renderStars(item.rating)}
                </Rating>
                
                <FeedbackText>"{item.text}"</FeedbackText>
                
                <DateText>{item.date}</DateText>
              </FeedbackCard>
            ))}
          </FeedbackGrid>
        )}
      </Container>
    </FeedbackContainer>
  );
};

export default Feedback;