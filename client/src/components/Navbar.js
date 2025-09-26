import React from 'react';
import styled from 'styled-components';
import { Flex } from '../styles/globalStyles';

const NavbarContainer = styled.nav`
  background: ${props => props.theme.background};
  padding: 15px 30px;
  border-bottom: 1px solid ${props => props.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px ${props => props.theme.shadow};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.h1`
  color: ${props => props.theme.primary};
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(45deg, ${props => props.theme.primary}, ${props => props.theme.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${props => props.theme.primary};
`;

const UserName = styled.span`
  color: ${props => props.theme.text};
  font-weight: 500;
`;

const LogoutButton = styled.button`
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  padding: 8px 16px;
  color: ${props => props.theme.text};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const ThemeToggle = styled.button`
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: rotate(30deg);
    box-shadow: 0 4px 12px ${props => props.theme.shadow};
  }
`;

const Navbar = ({ user, onLogout, toggleTheme, theme }) => {
  return (
    <NavbarContainer>
      <Logo>EduTrack</Logo>
      
      <UserSection>
        <UserInfo>
          <UserAvatar 
            src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} 
            alt="User" 
          />
          <UserName>{user?.name || 'User'}</UserName>
        </UserInfo>
        
        <LogoutButton onClick={onLogout}>
          Logout
        </LogoutButton>
        
        <ThemeToggle onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </ThemeToggle>
      </UserSection>
    </NavbarContainer>
  );
};

export default Navbar;
