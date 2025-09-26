import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  background: ${props => props.theme.background};
  border-right: 1px solid ${props => props.theme.border};
  padding: 20px 0;
  height: calc(100vh - 70px);
  position: sticky;
  top: 70px;
  overflow-y: auto;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  margin: 5px 10px;
  border-radius: 8px;
  color: ${props => props.theme.text};
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:hover {
    background: ${props => props.theme.primary}20;
    color: ${props => props.theme.primary};
    transform: translateX(5px);
  }
  
  &.active {
    background: ${props => props.theme.primary};
    color: white;
  }
`;

const Icon = styled.span`
  margin-right: 12px;
  font-size: 20px;
`;

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/teachers', label: 'Teachers', icon: '👨‍🏫' },
    { path: '/performance', label: 'Performance', icon: '📈' },
    { path: '/feedback', label: 'Feedback', icon: '💬' },
    { path: '/training', label: 'Training', icon: '🎓' },
    { path: '/milestones', label: 'Milestones', icon: '🏆' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <SidebarContainer>
      {menuItems.map(item => (
        <MenuItem
          key={item.path}
          to={item.path}
          className={location.pathname === item.path ? 'active' : ''}
        >
          <Icon>{item.icon}</Icon>
          <span>{item.label}</span>
        </MenuItem>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;