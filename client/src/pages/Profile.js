import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '../styles/globalStyles';

const ProfileContainer = styled.div`
  padding: 20px;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.text};
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 700;
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileCard = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 20px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
`;

const CardTitle = styled.h3`
  color: ${props => props.theme.text};
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AvatarContainer = styled.div`
  text-align: center;
  margin-bottom: 25px;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${props => props.theme.primary};
  margin-bottom: 15px;
`;

const AvatarUpload = styled.label`
  background: ${props => props.theme.primary};
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
  
  input {
    display: none;
  }
`;

const UserInfo = styled.div`
  margin-bottom: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: between;
  margin-bottom: 12px;
  padding: 10px;
  background: ${props => props.theme.background};
  border-radius: 8px;
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: ${props => props.theme.text};
  min-width: 120px;
`;

const InfoValue = styled.span`
  color: ${props => props.theme.text};
  opacity: 0.8;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${props => props.theme.text};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}20;
  }
  
  &:disabled {
    background: ${props => props.theme.border};
    opacity: 0.6;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}20;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 25px;
`;

const SaveButton = styled.button`
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: ${props => props.theme.border};
    cursor: not-allowed;
    transform: none;
  }
`;

const CancelButton = styled.button`
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.border};
  }
`;

const ActivityList = styled.div`
  margin-top: 20px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  padding: 15px;
  background: ${props => props.theme.background};
  border-radius: 8px;
  border-left: 4px solid ${props => props.color || props.theme.primary};
`;

const ActivityIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.color}20;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.p`
  color: ${props => props.theme.text};
  margin-bottom: 5px;
  line-height: 1.4;
`;

const ActivityTime = styled.span`
  font-size: 12px;
  color: ${props => props.theme.text};
  opacity: 0.6;
`;

const RoleBadge = styled.span`
  background: ${props => {
    switch(props.role) {
      case 'admin': return '#ef4444';
      case 'teacher': return '#10b981';
      case 'user': return '#3b82f6';
      default: return '#6b7280';
    }
  }};
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-left: 10px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${props => props.theme.text};
  opacity: 0.7;
`;

const SuccessMessage = styled.div`
  background: #d1fae5;
  color: #065f46;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #a7f3d0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Profile = ({ user: currentUser, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const [activities] = useState([
    { id: 1, type: 'login', text: 'Logged into the system', time: '2 hours ago', icon: '🔐', color: '#10b981' },
    { id: 2, type: 'profile_update', text: 'Updated profile information', time: 'Yesterday', icon: '📝', color: '#3b82f6' },
    { id: 3, type: 'feedback', text: 'Submitted student feedback', time: '2 days ago', icon: '💬', color: '#8b5cf6' },
    { id: 4, type: 'view', text: 'Viewed performance analytics', time: '3 days ago', icon: '📊', color: '#f59e0b' }
  ]);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('adminUser');
      let parsedUser;
      if (storedUser) {
        parsedUser = JSON.parse(storedUser);
      } else if (currentUser) {
        parsedUser = currentUser;
        localStorage.setItem('adminUser', JSON.stringify(currentUser));
      } else {
        parsedUser = {
          id: '1',
          name: 'Admin User',
          email: 'admin@edutrack.com',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          phone: '',
          department: 'Administration',
          joinDate: new Date().toISOString().split('T')[0]
        };
        localStorage.setItem('adminUser', JSON.stringify(parsedUser));
      }
      setUser(parsedUser);
      if (onUpdateUser) onUpdateUser(parsedUser);
    } catch (err) {
      console.error('Error loading user data:', err);
    } finally {
      setLoading(false);
    }
  }, [currentUser, onUpdateUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser(formData);
    localStorage.setItem('adminUser', JSON.stringify(formData));
    if (onUpdateUser) onUpdateUser(formData);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...user, avatar: reader.result };
        setUser(updatedUser);
        setFormData(updatedUser);
        localStorage.setItem('adminUser', JSON.stringify(updatedUser));
        if (onUpdateUser) onUpdateUser(updatedUser);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading || !user) {
    return (
      <ProfileContainer>
        <Container>
          <LoadingMessage>Loading profile...</LoadingMessage>
        </Container>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <Container>
        <SectionTitle>User Profile</SectionTitle>

        {showSuccess && (
          <SuccessMessage>
            ✅ Profile updated successfully! Changes have been saved.
          </SuccessMessage>
        )}

        <ProfileGrid>
          <div>
            <ProfileCard>
              <CardTitle>👤 Profile Information</CardTitle>
              <AvatarContainer>
                <Avatar src={user.avatar} alt={user.name} />
                <AvatarUpload>
                  📷 Change Photo
                  <input type="file" accept="image/*" onChange={handleAvatarChange} />
                </AvatarUpload>
              </AvatarContainer>

              <UserInfo>
                <InfoItem>
                  <InfoLabel>Name:</InfoLabel>
                  <InfoValue>{user.name}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Email:</InfoLabel>
                  <InfoValue>{user.email}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Role:</InfoLabel>
                  <InfoValue>
                    {user.role || 'admin'}
                    <RoleBadge role={user.role || 'admin'}>
                      {(user.role || 'admin').toUpperCase()}
                    </RoleBadge>
                  </InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Member since:</InfoLabel>
                  <InfoValue>{user.joinDate || 'N/A'}</InfoValue>
                </InfoItem>
                {user.phone && (
                  <InfoItem>
                    <InfoLabel>Phone:</InfoLabel>
                    <InfoValue>{user.phone}</InfoValue>
                  </InfoItem>
                )}
                {user.department && (
                  <InfoItem>
                    <InfoLabel>Department:</InfoLabel>
                    <InfoValue>{user.department}</InfoValue>
                  </InfoItem>
                )}
              </UserInfo>
            </ProfileCard>
          </div>

          <div>
            <ProfileCard>
              <CardTitle>⚙️ Edit Profile</CardTitle>
              <FormGroup>
                <FormLabel>Full Name</FormLabel>
                <FormInput
                  type="text"
                  name="name"
                  value={isEditing ? formData?.name || '' : user.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Email Address</FormLabel>
                <FormInput
                  type="email"
                  name="email"
                  value={isEditing ? formData?.email || '' : user.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Phone Number</FormLabel>
                <FormInput
                  type="tel"
                  name="phone"
                  value={isEditing ? formData?.phone || '' : user.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter phone number"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Department</FormLabel>
                <FormInput
                  type="text"
                  name="department"
                  value={isEditing ? formData?.department || '' : user.department}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter department"
                />
              </FormGroup>

              {user.role === 'admin' && (
                <FormGroup>
                  <FormLabel>User Role</FormLabel>
                  <FormSelect
                    name="role"
                    value={isEditing ? formData?.role || 'admin' : user.role}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  >
                    <option value="admin">Administrator</option>
                    <option value="teacher">Teacher</option>
                    <option value="user">User</option>
                  </FormSelect>
                </FormGroup>
              )}

              <FormActions>
                {!isEditing ? (
                  <SaveButton onClick={() => { setFormData(user); setIsEditing(true); }}>
                    ✏️ Edit Profile
                  </SaveButton>
                ) : (
                  <>
                    <SaveButton onClick={handleSave}>💾 Save Changes</SaveButton>
                    <CancelButton onClick={handleCancel}>❌ Cancel</CancelButton>
                  </>
                )}
              </FormActions>
            </ProfileCard>

            <ProfileCard style={{ marginTop: '30px' }}>
              <CardTitle>📋 Recent Activities</CardTitle>
              <ActivityList>
                {activities.map(activity => (
                  <ActivityItem key={activity.id} color={activity.color}>
                    <ActivityIcon color={activity.color}>{activity.icon}</ActivityIcon>
                    <ActivityContent>
                      <ActivityText>{activity.text}</ActivityText>
                      <ActivityTime>{activity.time}</ActivityTime>
                    </ActivityContent>
                  </ActivityItem>
                ))}
              </ActivityList>
            </ProfileCard>
          </div>
        </ProfileGrid>
      </Container>
    </ProfileContainer>
  );
};

export default Profile;
