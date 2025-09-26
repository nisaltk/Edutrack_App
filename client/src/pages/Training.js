import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Grid } from '../styles/globalStyles';

const TrainingContainer = styled.div`
  padding: 20px;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.text};
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 700;
`;

const TrainingCard = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: fadeIn 0.6s ease forwards;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px ${props => props.theme.shadow};
  }
`;

const TrainingImage = styled.div`
  height: 160px;
  border-radius: 8px;
  background: linear-gradient(45deg, ${props => props.theme.primary}, ${props => props.theme.accent});
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: 700;
`;

const TrainingTitle = styled.h3`
  color: ${props => props.theme.text};
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const TrainingDescription = styled.p`
  color: ${props => props.theme.text};
  opacity: 0.8;
  margin-bottom: 15px;
  line-height: 1.5;
`;

const TrainingMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TrainingDate = styled.div`
  font-size: 14px;
  color: ${props => props.theme.text};
  opacity: 0.7;
`;

const StatusBadge = styled.div`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => {
    switch(props.status) {
      case 'completed': return '#10b981';
      case 'upcoming': return '#3b82f6';
      case 'in-progress': return '#f59e0b';
      default: return '#6b7280';
    }
  }};
  color: white;
`;

const Training = () => {
  const [trainings] = useState([
    {
      id: 1,
      title: 'Classroom Management Techniques',
      description: 'Learn effective strategies for maintaining a positive and productive classroom environment.',
      date: '2023-11-15',
      status: 'upcoming',
      icon: '🏫'
    },
    {
      id: 2,
      title: 'Technology Integration in Education',
      description: 'Discover how to effectively incorporate technology into your teaching practices.',
      date: '2023-10-28',
      status: 'completed',
      icon: '💻'
    },
    {
      id: 3,
      title: 'Differentiated Instruction Workshop',
      description: 'Learn to tailor instruction to meet individual needs of diverse learners.',
      date: '2023-11-05',
      status: 'in-progress',
      icon: '🎯'
    },
    {
      id: 4,
      title: 'Assessment Strategies',
      description: 'Explore various formative and summative assessment techniques.',
      date: '2023-12-01',
      status: 'upcoming',
      icon: '📝'
    },
    {
      id: 5,
      title: 'Social-Emotional Learning',
      description: 'Develop skills to support students\' social and emotional development.',
      date: '2023-10-20',
      status: 'completed',
      icon: '❤️'
    },
    {
      id: 6,
      title: 'Project-Based Learning',
      description: 'Learn to design and implement engaging project-based learning experiences.',
      date: '2023-11-25',
      status: 'upcoming',
      icon: '🔍'
    }
  ]);

  return (
    <TrainingContainer>
      <Container>
        <SectionTitle>Professional Development</SectionTitle>
        
        <Grid>
          {trainings.map(training => (
            <TrainingCard key={training.id}>
              <TrainingImage>
                {training.icon}
              </TrainingImage>
              
              <TrainingTitle>{training.title}</TrainingTitle>
              <TrainingDescription>{training.description}</TrainingDescription>
              
              <TrainingMeta>
                <TrainingDate>{training.date}</TrainingDate>
                <StatusBadge status={training.status}>
                  {training.status.replace('-', ' ')}
                </StatusBadge>
              </TrainingMeta>
            </TrainingCard>
          ))}
        </Grid>
      </Container>
    </TrainingContainer>
  );
};

export default Training;
