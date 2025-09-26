import React from 'react';
import styled from 'styled-components';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
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

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PerformanceChart = ({ subject, performanceData, isDashboard = false }) => {
  // For dashboard view - show sample data
  if (isDashboard) {
    // Pie chart data for subject distribution
    const pieData = {
      labels: ['Mathematics', 'Science', 'English', 'History', 'Arts', 'Others'],
      datasets: [
        {
          data: [25, 20, 18, 15, 12, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const pieOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Subject Distribution',
        },
      },
    };

    // Line chart data for student satisfaction and teacher performance
    const lineData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Student Satisfaction',
          data: [85, 78, 90, 88, 92, 95],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.3,
          fill: true,
        },
        {
          label: 'Teacher Performance',
          data: [82, 85, 88, 90, 87, 92],
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          tension: 0.3,
          fill: true,
        },
      ],
    };

    const lineOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Monthly Performance Trends',
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 70,
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
      <>
        <ChartContainer>
          <ChartTitle>Subject Distribution</ChartTitle>
          <Doughnut data={pieData} options={pieOptions} />
        </ChartContainer>
        
        <ChartContainer>
          <ChartTitle>Performance Trends</ChartTitle>
          <Line data={lineData} options={lineOptions} />
        </ChartContainer>
      </>
    );
  }

  // For performance page view - use the provided data
  // Pie chart data based on performance metrics
  const getPieData = () => {
    if (!performanceData || !performanceData.metrics) {
      return {
        labels: ['No Data'],
        datasets: [
          {
            data: [100],
            backgroundColor: ['rgba(100, 100, 100, 0.5)'],
          },
        ],
      };
    }

    const labels = performanceData.metrics.map(metric => metric.title);
    const data = performanceData.metrics.map(metric => {
      // Extract numeric value from string (e.g., "87%" -> 87, "+5.2%" -> 5.2)
      const numericValue = parseFloat(metric.value.replace(/[+%]/g, ''));
      return isNaN(numericValue) ? 0 : numericValue;
    });

    const backgroundColors = [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)',
      'rgba(255, 159, 64, 0.8)',
    ];

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: backgroundColors.slice(0, data.length),
          borderColor: backgroundColors.slice(0, data.length).map(color => color.replace('0.8', '1')),
          borderWidth: 1,
        },
      ],
    };
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Performance Metrics - ${subject ? subject.charAt(0).toUpperCase() + subject.slice(1) : 'All Subjects'}`,
      },
    },
  };

  // Line chart data for student satisfaction and teacher performance
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Student Satisfaction',
        data: [85, 78, 90, 88, 92, 95],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Teacher Performance',
        data: [82, 85, 88, 90, 87, 92],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Performance Trends',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 70,
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
    <>
      <ChartsGrid>
        <ChartContainer>
          <ChartTitle>Performance Distribution</ChartTitle>
          <Doughnut data={getPieData()} options={pieOptions} />
        </ChartContainer>
        
        <ChartContainer>
          <ChartTitle>Performance Trends</ChartTitle>
          <Line data={lineData} options={lineOptions} />
        </ChartContainer>
      </ChartsGrid>
    </>
  );
};

export default PerformanceChart;