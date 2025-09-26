import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from '../styles/globalStyles';

const MilestonesContainer = styled.div`
  padding: 20px;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.text};
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 700;
`;

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: ${props => props.theme.primary};
    opacity: 0.3;
  }
`;

const MilestoneItem = styled.div`
  display: flex;
  justify-content: ${props => props.reverse ? 'flex-start' : 'flex-end'};
  margin-bottom: 40px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.theme.primary};
    z-index: 1;
  }
`;

const MilestoneContent = styled.div`
  width: calc(50% - 40px);
  background: ${props => props.theme.cardBg};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 20px;
    ${props => props.reverse ? 'right: -8px;' : 'left: -8px;'}
    width: 16px;
    height: 16px;
    transform: rotate(45deg);
    background: ${props => props.theme.cardBg};
    border-${props => props.reverse ? 'left' : 'right'}: 1px solid ${props => props.theme.border};
    border-${props => props.reverse ? 'top' : 'bottom'}: 1px solid ${props => props.theme.border};
  }
`;

const MilestoneTitle = styled.h3`
  color: ${props => props.theme.text};
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const MilestoneDate = styled.div`
  font-size: 14px;
  color: ${props => props.theme.primary};
  font-weight: 600;
  margin-bottom: 10px;
`;

const MilestoneDescription = styled.p`
  color: ${props => props.theme.text};
  opacity: 0.8;
  line-height: 1.5;
`;

const MilestoneIcon = styled.div`
  position: absolute;
  top: 15px;
  ${props => props.reverse ? 'right: -45px;' : 'left: -45px;'}
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${props => props.theme.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

const Milestones = () => {
  const [milestones] = useState([
    {
      id: 1,
      title: 'Teacher of the Year Award',
      date: '2023-06-15',
      description: 'Received the district Teacher of the Year award for exceptional dedication to student success.',
      icon: '🏆',
      reverse: false
    },
    {
      id: 2,
      title: 'Curriculum Development Lead',
      date: '2022-08-20',
      description: 'Appointed as lead for developing the new science curriculum across the district.',
      icon: '📚',
      reverse: true
    },
    {
      id: 3,
      title: 'Masters in Education',
      date: '2021-05-10',
      description: 'Completed Masters degree in Educational Leadership with honors.',
      icon: '🎓',
      reverse: false
    },
    {
      id: 4,
      title: 'National Conference Presentation',
      date: '2020-11-05',
      description: 'Presented research on innovative teaching methods at the National Education Conference.',
      icon: '📊',
      reverse: true
    },
    {
      id: 5,
      title: 'Department Chair Appointment',
      date: '2019-08-15',
      description: 'Appointed as chair of the Mathematics Department.',
      icon: '👨‍🏫',
      reverse: false
    }
  ]);

  return (
    <MilestonesContainer>
      <Container>
        <SectionTitle>Career Milestones</SectionTitle>
        
        <Timeline>
          {milestones.map(milestone => (
            <MilestoneItem key={milestone.id} reverse={milestone.reverse}>
              <MilestoneContent reverse={milestone.reverse}>
                <MilestoneTitle>{milestone.title}</MilestoneTitle>
                <MilestoneDate>{milestone.date}</MilestoneDate>
                <MilestoneDescription>{milestone.description}</MilestoneDescription>
                <MilestoneIcon reverse={milestone.reverse}>{milestone.icon}</MilestoneIcon>
              </MilestoneContent>
            </MilestoneItem>
          ))}
        </Timeline>
      </Container>
    </MilestonesContainer>
  );
};

export default Milestones;