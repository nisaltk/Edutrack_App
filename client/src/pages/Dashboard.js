import React from 'react';
import styled from 'styled-components';
import { Container, Grid } from '../styles/globalStyles';
import StatsCard from '../components/StatsCard';
import PerformanceChart from '../components/PerformanceChart';
import RecentActivity from '../components/RecentActivity';
import AIAssistant from '../components/AIAssistant';

const DashboardContainer = styled.div`
  padding: 20px;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.text};
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 700;
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const WelcomeMessage = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
  text-align: center;
  margin-bottom: 30px;
`;

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 30px;
`;

const Dashboard = ({ user, teacherCount }) => {
  const statsData = [
    { title: 'Total Teachers', value: teacherCount.toString(), change: '+2', icon: '👨‍🏫', color: '#6366f1' },
    { title: 'Avg. Performance', value: '87%', change: '+2%', icon: '📈', color: '#10b981' },
    { title: 'Student Satisfaction', value: '92%', change: '+5%', icon: '😊', color: '#f59e0b' },
    { title: 'Training Completed', value: '28', change: '+8', icon: '🎓', color: '#8b5cf6' },
  ];

  return (
    <DashboardContainer>
      <Container>
        <SectionTitle>Dashboard Overview</SectionTitle>
        
        <WelcomeMessage>
          <h2>Welcome to EduTrack, {user?.name || 'User'}!</h2>
          <p>Track teacher performance, manage feedback, and monitor professional development.</p>
        </WelcomeMessage>
        
        <Grid>
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </Grid>
        
        <ChartsContainer>
          <PerformanceChart isDashboard={true} />
        </ChartsContainer>
        
        <TwoColumnGrid>
          <RecentActivity />
          <AIAssistant />
        </TwoColumnGrid>
      </Container>
    </DashboardContainer>
  );
};

export default Dashboard;