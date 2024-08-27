import React from 'react';
import { useAuth } from '../auth/AuthContext.js';
import { Button } from '@nextui-org/react';

const Logout = () => {
  const { setIsAuthenticated } = useAuth();

  const handleLogout = () => {
    console.log('Logout button clicked');
    localStorage.removeItem('user');
    console.log('User removed from localStorage');
    setIsAuthenticated(false);
    console.log('User authentication status set to false');
  };

  return (
    <Button onClick={handleLogout} color="primary" variant="flat">
      Se déconnecter
    </Button>
  );
};

export default Logout;