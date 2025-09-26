import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from './styles/globalStyles';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Teachers from './pages/Teachers';
import Performance from './pages/Performance';
import Feedback from './pages/Feedback';
import Training from './pages/Training';
import Milestones from './pages/Milestones';
import Login from './pages/Login';
import Profile from './pages/Profile';
import './styles/animations.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [teacherCount, setTeacherCount] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
    
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }

    // Load initial teacher count
    updateTeacherCount();
  }, []);

  const updateTeacherCount = () => {
    try {
      const teachers = JSON.parse(localStorage.getItem('teachers') || '[]');
      setTeacherCount(teachers.length);
    } catch (error) {
      console.error('Error updating teacher count:', error);
    }
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleLogin = (userData, token) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (!isLoggedIn) {
    return (
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Login onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Router>
        <div className="app">
          <Navbar user={user} onLogout={handleLogout} toggleTheme={toggleTheme} theme={theme} />
          <div className="main-content">
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/" element={<Dashboard user={user} teacherCount={teacherCount} />} />
                <Route path="/dashboard" element={<Dashboard user={user} teacherCount={teacherCount} />} />
                <Route 
                  path="/teachers" 
                  element={<Teachers onTeacherChange={updateTeacherCount} />} 
                />
                <Route path="/performance" element={<Performance />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/training" element={<Training />} />
                <Route path="/milestones" element={<Milestones />} />
                <Route path="/profile" element={<Profile user={user} onUpdateUser={handleUpdateUser} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;