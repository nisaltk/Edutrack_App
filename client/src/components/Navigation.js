import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Nav = styled.nav`
  background: white;
  border-radius: 10px;
  padding: 15px 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavItems = styled.div`
  display: flex;
  gap: 15px;
`;

const NavButton = styled.button`
  background: ${props => props.active ? '#3498db' : 'transparent'};
  color: ${props => props.active ? 'white' : '#3498db'};
  border: 1px solid #3498db;
  border-radius: 5px;
  padding: 8px 15px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  
  &:hover {
    background: #3498db;
    color: white;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserName = styled.span`
  color: #2c3e50;
  font-weight: 600;
`;

const LogoutButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    background: #c0392b;
  }
`;

const Navigation = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Nav>
      <NavItems>
        <NavButton 
          active={isActive('/dashboard')} 
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </NavButton>
        <NavButton 
          active={isActive('/teachers')} 
          onClick={() => navigate('/teachers')}
        >
          Teachers
        </NavButton>
        <NavButton 
          active={isActive('/performance')} 
          onClick={() => navigate('/performance')}
        >
          Performance
        </NavButton>
      </NavItems>
      
      <UserInfo>
        <UserName>Welcome, {currentUser?.name}</UserName>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </UserInfo>
    </Nav>
  );
};

export default Navigation;