import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Grid } from '../styles/globalStyles';
import ProfileUpload from '../components/ProfileUpload';

const TeachersContainer = styled.div`
  padding: 20px;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.text};
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 700;
`;

const TeacherCard = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: fadeIn 0.6s ease forwards;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px ${props => props.theme.shadow};
  }
`;

const TeacherAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
  border: 3px solid ${props => props.theme.primary};
`;

const TeacherName = styled.h3`
  color: ${props => props.theme.text};
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const TeacherSubject = styled.p`
  color: ${props => props.theme.text};
  opacity: 0.7;
  margin-bottom: 10px;
`;

const TeacherStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const Stat = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.primary};
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: ${props => props.theme.text};
  opacity: 0.7;
`;

const AddTeacherButton = styled.button`
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
  
  ${TeacherCard}:hover & {
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
const getStoredTeachers = () => {
  try {
    const storedTeachers = localStorage.getItem('teachers');
    return storedTeachers ? JSON.parse(storedTeachers) : null;
  } catch (error) {
    console.error('Error loading teachers from localStorage:', error);
    return null;
  }
};

const setStoredTeachers = (teachers) => {
  try {
    localStorage.setItem('teachers', JSON.stringify(teachers));
  } catch (error) {
    console.error('Error saving teachers to localStorage:', error);
  }
};

// Default teachers data
const getDefaultTeachers = () => [
  {
    id: 1,
    name: 'Sarah Johnson',
    subject: 'Mathematics',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    performance: 92,
    students: 28,
    years: 5,
    email: 'sarah.johnson@school.edu',
    phone: '+1 (555) 123-4567'
  },
  {
    id: 2,
    name: 'Michael Chen',
    subject: 'Science',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    performance: 88,
    students: 32,
    years: 3,
    email: 'michael.chen@school.edu',
    phone: '+1 (555) 234-5678'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    subject: 'English',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    performance: 95,
    students: 25,
    years: 7,
    email: 'emily.rodriguez@school.edu',
    phone: '+1 (555) 345-6789'
  },
  {
    id: 4,
    name: 'David Kim',
    subject: 'History',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    performance: 85,
    students: 30,
    years: 4,
    email: 'david.kim@school.edu',
    phone: '+1 (555) 456-7890'
  },
  {
    id: 5,
    name: 'Jessica Williams',
    subject: 'Art',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    performance: 90,
    students: 22,
    years: 6,
    email: 'jessica.williams@school.edu',
    phone: '+1 (555) 567-8901'
  },
  {
    id: 6,
    name: 'Robert Taylor',
    subject: 'Physical Education',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    performance: 78,
    students: 35,
    years: 2,
    email: 'robert.taylor@school.edu',
    phone: '+1 (555) 678-9012'
  }
];

// Initialize teachers data
const initializeTeachers = () => {
  const storedTeachers = getStoredTeachers();
  if (!storedTeachers) {
    const defaultTeachers = getDefaultTeachers();
    setStoredTeachers(defaultTeachers);
    return defaultTeachers;
  }
  return storedTeachers;
};

const Teachers = ({ onTeacherChange }) => {
  const [teachers, setTeachers] = useState(initializeTeachers());
  const [showUpload, setShowUpload] = useState(false);

  // Update localStorage whenever teachers change
  useEffect(() => {
    setStoredTeachers(teachers);
    // Notify parent component about the change
    if (onTeacherChange) {
      onTeacherChange();
    }
  }, [teachers, onTeacherChange]);

  const handleTeacherAdded = (newTeacher) => {
    const teacherWithId = {
      ...newTeacher,
      id: Math.max(0, ...teachers.map(t => t.id)) + 1
    };
    
    const updatedTeachers = [teacherWithId, ...teachers];
    setTeachers(updatedTeachers);
    setShowUpload(false);
  };

  const handleDeleteTeacher = (teacherId) => {
    if (window.confirm('Are you sure you want to delete this teacher? This action cannot be undone.')) {
      const updatedTeachers = teachers.filter(teacher => teacher.id !== teacherId);
      setTeachers(updatedTeachers);
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset to default teachers? This will replace all current teachers with the default set.')) {
      const defaultTeachers = getDefaultTeachers();
      setTeachers(defaultTeachers);
      setStoredTeachers(defaultTeachers);
      if (onTeacherChange) {
        onTeacherChange();
      }
    }
  };

  return (
    <TeachersContainer>
      <Container>
        <SectionTitle>Teacher Management</SectionTitle>
        
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <AddTeacherButton onClick={() => setShowUpload(true)}>
            + Add New Teacher
          </AddTeacherButton>
          
          {teachers.length > 0 && (
            <ActionButton 
              onClick={handleResetToDefault}
              style={{ background: '#6c757d' }}
            >
              Reset to Default
            </ActionButton>
          )}
        </div>
        
        {showUpload && (
          <ProfileUpload 
            onClose={() => setShowUpload(false)} 
            onTeacherAdded={handleTeacherAdded}
          />
        )}
        
        {teachers.length === 0 ? (
          <EmptyState>
            <h3>No Teachers Found</h3>
            <p>Get started by adding your first teacher or resetting to default teachers.</p>
            <ActionButton onClick={handleResetToDefault}>
              Reset to Default Teachers
            </ActionButton>
          </EmptyState>
        ) : (
          <Grid>
            {teachers.map(teacher => (
              <TeacherCard key={teacher.id}>
                <DeleteButton 
                  onClick={() => handleDeleteTeacher(teacher.id)}
                  title="Delete Teacher"
                >
                  ✕
                </DeleteButton>
                
                <div style={{ textAlign: 'center' }}>
                  <TeacherAvatar src={teacher.avatar} alt={teacher.name} />
                  <TeacherName>{teacher.name}</TeacherName>
                  <TeacherSubject>{teacher.subject}</TeacherSubject>
                </div>
                
                <TeacherStats>
                  <Stat>
                    <StatValue>{teacher.performance}%</StatValue>
                    <StatLabel>Performance</StatLabel>
                  </Stat>
                  <Stat>
                    <StatValue>{teacher.students}</StatValue>
                    <StatLabel>Students</StatLabel>
                  </Stat>
                  <Stat>
                    <StatValue>{teacher.years}</StatValue>
                    <StatLabel>Years</StatLabel>
                  </Stat>
                </TeacherStats>
              </TeacherCard>
            ))}
          </Grid>
        )}
      </Container>
    </TeachersContainer>
  );
};

export default Teachers;