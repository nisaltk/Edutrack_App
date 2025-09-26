// Check if user is admin
export const isAdmin = (user) => {
  return user && user.role === 'admin';
};

// Protect admin routes
export const requireAdmin = (user, navigate) => {
  if (!isAdmin(user)) {
    navigate('/');
    return false;
  }
  return true;
};