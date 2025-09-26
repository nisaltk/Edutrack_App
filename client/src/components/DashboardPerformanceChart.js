import React from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartContainer = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 20px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
  margin-bottom: 30px;
`;

const ChartTitle = styled.h3`
  color: ${props => props.theme.text};
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

const DashboardPerformanceChart = () => {
  // Sample data for the dashboard chart
  const data = {
    labels: ['Mathematics', 'Science', 'English', 'History', 'Arts'],
    datasets: [
      {
        label: 'Average Performance (%)',
        data: [92, 85, 82, 78, 91],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Subject Performance Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      },
    },
  };

  return (
    <ChartContainer>
      <ChartTitle>Performance Overview</ChartTitle>
      <Bar data={data} options={options} />
    </ChartContainer>
  );
};

export default DashboardPerformanceChart;