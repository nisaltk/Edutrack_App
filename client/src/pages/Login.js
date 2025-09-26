import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from '../styles/globalStyles';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${props => props.theme.primary}20, ${props => props.theme.secondary}20);
  padding: 20px;
`;

const LoginCard = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 40px ${props => props.theme.shadow};
  width: 100%;
  max-width: 450px;
  border: 1px solid ${props => props.theme.border};
  animation: fadeIn 0.8s ease;
`;

const LoginTitle = styled.h1`
  text-align: center;
  color: ${props => props.theme.primary};
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 700;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: ${props => props.theme.text};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid ${props => props.theme.border};
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
  background: ${props => props.theme.inputBg};
  color: ${props => props.theme.text};
  
  &:focus {
    border-color: ${props => props.theme.primary};
    outline: none;
  }
`;

const LoginButton = styled.button`
  background: linear-gradient(45deg, ${props => props.theme.primary}, ${props => props.theme.accent});
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px ${props => props.theme.primary}40;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  text-align: center;
  margin-top: 15px;
  padding: 10px;
  background: #ffeaea;
  border-radius: 6px;
  border: 1px solid #f5c6cb;
  font-size: 14px;
`;

const DemoNote = styled.p`
  text-align: center;
  margin-top: 20px;
  color: ${props => props.theme.text};
  opacity: 0.7;
  font-size: 14px;
`;

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate credentials
    if (email === 'admin@edutrack.com' && password === 'admin123') {
      const userData = {
        name: 'Admin User',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        role: 'admin'
      };
      onLogin(userData, 'admin-jwt-token');
    } else {
      setError('Invalid email or password. Use admin@edutrack.com / admin123');
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <Container>
        <LoginCard>
          <LoginTitle>EduTrack Login</LoginTitle>
          <LoginForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Password</FormLabel>
              <FormInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </FormGroup>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <LoginButton type="submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </LoginButton>
          </LoginForm>
          <DemoNote>
            Demo Credentials:<br />
            Email: admin@edutrack.com<br />
            Password: admin123
          </DemoNote>
        </LoginCard>
      </Container>
    </LoginContainer>
  );
};

export default Login;
