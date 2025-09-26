import React from 'react';
import styled from 'styled-components';

const ActivityContainer = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
`;

const ActivityTitle = styled.h3`
  color: ${props => props.theme.text};
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
`;

const ActivityList = styled.ul`
  list-style: none;
`;

const ActivityItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${props => props.theme.border};
  
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.p`
  color: ${props => props.theme.text};
  margin-bottom: 5px;
  line-height: 1.4;
`;

const ActivityTime = styled.span`
  font-size: 12px;
  color: ${props => props.theme.text};
  opacity: 0.6;
`;

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      text: 'Sarah Johnson completed the Technology Integration training',
      time: '2 hours ago',
      icon: '💻',
      color: '#6366f1'
    },
    {
      id: 2,
      text: 'Michael Chen received a new performance review',
      time: '5 hours ago',
      icon: '⭐',
      color: '#10b981'
    },
    {
      id: 3,
      text: 'Emily Rodriguez added a new teaching milestone',
      time: 'Yesterday',
      icon: '🏆',
      color: '#f59e0b'
    },
    {
      id: 4,
      text: 'David Kim uploaded a new lesson plan',
      time: '2 days ago',
      icon: '📝',
      color: '#ef4444'
    },
    {
      id: 5,
      text: 'Jessica Williams completed student feedback analysis',
      time: '3 days ago',
      icon: '📊',
      color: '#8b5cf6'
    }
  ];

  return (
    <ActivityContainer>
      <ActivityTitle>Recent Activity</ActivityTitle>
      
      <ActivityList>
        {activities.map(activity => (
          <ActivityItem key={activity.id}>
            <ActivityIcon color={activity.color}>{activity.icon}</ActivityIcon>
            <ActivityContent>
              <ActivityText>{activity.text}</ActivityText>
              <ActivityTime>{activity.time}</ActivityTime>
            </ActivityContent>
          </ActivityItem>
        ))}
      </ActivityList>
    </ActivityContainer>
  );
};

export default RecentActivity;