import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 12px;
  padding: 30px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid ${props => props.theme.border};
`;

const ModalTitle = styled.h2`
  color: ${props => props.theme.text};
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 700;
`;

const UploadArea = styled.div`
  border: 2px dashed ${props => props.theme.border};
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme.primary};
    background: ${props => props.theme.primary}10;
  }
`;

const UploadIcon = styled.div`
  font-size: 48px;
  margin-bottom: 15px;
  color: ${props => props.theme.primary};
`;

const UploadText = styled.p`
  color: ${props => props.theme.text};
  margin-bottom: 10px;
`;

const UploadSubtext = styled.p`
  color: ${props => props.theme.text};
  opacity: 0.7;
  font-size: 14px;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: ${props => props.theme.text};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 6px;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
`;

const PrimaryButton = styled(Button)`
  background: ${props => props.theme.primary};
  color: white;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled(Button)`
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.border};
  
  &:hover {
    background: ${props => props.theme.border};
  }
`;

const ProfileUpload = ({ onClose, onTeacherAdded }) => {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: ''
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process the form data and create a complete teacher object
    const newTeacher = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      phone: formData.phone,
      avatar: preview || 'default-avatar-url',
      performance: 85, // Default value
      students: 20, // Default value
      years: 1 // Default value
    };
    
    // Call the callback with the new teacher
    if (onTeacherAdded) {
      onTeacherAdded(newTeacher);
    }
    
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>Add New Teacher</ModalTitle>
        
        <form onSubmit={handleSubmit}>
          <UploadArea onClick={() => document.getElementById('file-input').click()}>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            
            {preview ? (
              <PreviewImage src={preview} alt="Preview" />
            ) : (
              <>
                <UploadIcon>📷</UploadIcon>
                <UploadText>Click to upload profile picture</UploadText>
                <UploadSubtext>JPG, PNG or GIF - Max 5MB</UploadSubtext>
              </>
            )}
          </UploadArea>
          
          <FormGroup>
            <Label>Full Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Subject</Label>
            <Input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Phone</Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </FormGroup>
          
          <ActionButtons>
            <SecondaryButton type="button" onClick={onClose}>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit">
              Add Teacher
            </PrimaryButton>
          </ActionButtons>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProfileUpload;