import React, { useState } from 'react';
import styled from 'styled-components';

const AssistantContainer = styled.div`
  margin-top: 30px;
`;

const AssistantHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 15px;
  background: ${props => props.theme.cardBg};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.border};
  box-shadow: 0 4px 12px ${props => props.theme.shadow};
`;

const AssistantTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${props => props.theme.text};
  margin: 0;
`;

const AssistantContent = styled.div`
  margin-top: 15px;
  padding: 20px;
  background: ${props => props.theme.cardBg};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.border};
  animation: fadeIn 0.3s ease;
`;

const MessageInput = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
`;

const SendButton = styled.button`
  padding: 12px 20px;
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
`;

const Message = styled.div`
  padding: 10px 15px;
  margin: 10px 0;
  border-radius: 12px;
  background: ${props => props.isUser ? props.theme.primary : props.theme.background};
  color: ${props => props.isUser ? 'white' : props.theme.text};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  max-width: 80%;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 15px;
`;

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI teaching assistant. How can I help you today?", isUser: false }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, isUser: true }]);
      setMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "I can help analyze teacher performance, suggest training programs, or provide insights based on student feedback.", 
          isUser: false 
        }]);
      }, 1000);
    }
  };

  return (
    <AssistantContainer>
      <AssistantHeader onClick={() => setIsOpen(!isOpen)}>
        <AssistantTitle>
          <span>🤖</span> AI Teaching Assistant
        </AssistantTitle>
        <span>{isOpen ? '▼' : '▲'}</span>
      </AssistantHeader>
      
      {isOpen && (
        <AssistantContent>
          <MessagesContainer>
            {messages.map((msg, index) => (
              <Message key={index} isUser={msg.isUser}>
                {msg.text}
              </Message>
            ))}
          </MessagesContainer>
          
          <MessageInput>
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask something about teacher performance..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <SendButton onClick={handleSendMessage}>Send</SendButton>
          </MessageInput>
        </AssistantContent>
      )}
    </AssistantContainer>
  );
};

export default AIAssistant;