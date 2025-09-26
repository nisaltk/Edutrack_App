import styled, { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#f5f5f5',
  text: '#333',
  background: '#fff',
  primary: '#6200ee',
  secondary: '#03dac6',
  accent: '#ff4081',
  cardBg: '#fff',
  border: '#e0e0e0',
  shadow: 'rgba(0, 0, 0, 0.1)'
};

export const darkTheme = {
  body: '#121212',
  text: '#f5f5f5',
  background: '#1e1e1e',
  primary: '#bb86fc',
  secondary: '#03dac6',
  accent: '#ff4081',
  cardBg: '#2d2d2d',
  border: '#444',
  shadow: 'rgba(0, 0, 0, 0.3)'
};

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${props => props.theme.body};
    color: ${props => props.theme.text};
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    transition: all 0.3s ease;
  }

  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main-content {
    display: flex;
    flex: 1;
  }

  .content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
  }

  .card {
    background: ${props => props.theme.cardBg};
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 20px ${props => props.theme.shadow};
    margin-bottom: 20px;
    border: 1px solid ${props => props.theme.border};
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px ${props => props.theme.shadow};
  }

  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s ease;
  }

  .btn-primary {
    background: ${props => props.theme.primary};
    color: white;
  }

  .btn-primary:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }

  .form-input {
    width: 100%;
    padding: 12px;
    border: 1px solid ${props => props.theme.border};
    border-radius: 8px;
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
    font-size: 16px;
  }

  .form-input:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}20;
  }
`;

// Styled components
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => props.gap || '0'};
`;