import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
  text-align: center;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const Icon = styled.div`
  font-size: 32px;
  margin-bottom: 15px;
`;

const Title = styled.h3`
  color: ${props => props.theme.text};
  font-size: 16px;
  margin-bottom: 10px;
  opacity: 0.8;
`;

const Value = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${props => props.color || props.theme.primary};
  margin-bottom: 5px;
`;

const Change = styled.div`
  font-size: 14px;
  color: ${props => {
    if (props.change.startsWith('+')) return '#10b981'; // Green for positive
    if (props.change.startsWith('-')) return '#ef4444'; // Red for negative
    return '#6b7280'; // Gray for neutral
  }};
  font-weight: 600;
`;

const StatsCard = ({ title, value, change, icon, color }) => {
  return (
    <Card>
      <Icon>{icon}</Icon>
      <Title>{title}</Title>
      <Value color={color}>{value}</Value>
      <Change change={change}>{change}</Change>
    </Card>
  );
};

export default StatsCard;