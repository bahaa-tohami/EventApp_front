import React, { useEffect, useState } from "react";
import { Link } from '@nextui-org/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import axios from 'axios';


const Footer = ({ handleOnClickOnNotification, countNotifications }) => {
  const { isAuthenticated } = useAuth();
  const [role, setRole] = useState(null);
  const isInvisible = countNotifications === 0 || countNotifications === undefined;

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.userId && user.token) {
        try {
          const response = await axios.get(`http://localhost:9000/users/${user.userId}/role`, {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          });
          setRole(response.data.role);
        } catch (error) {
          console.error("Échec de la récupération du rôle de l'utilisateur", error);
        }
      }
    };

    fetchUserRole();
  }, []);

  return (
    <footer style={{ 
      backgroundColor: 'black', 
      color: 'white',
      padding: '2rem 0'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ fontWeight: 'bold', marginLeft: '0.5rem' }}>ACME</p>
        </div>
        <nav style={{
          display: 'flex',
          gap: '1rem'
        }}>
          {isAuthenticated ? (
            <>
              <Link as={RouterLink} to="/home" color="foreground">Accueil</Link>
              <Link as={RouterLink} to="/myprofile" color="foreground">Mon Profil</Link>
              <Link as={RouterLink} to="/events" color="foreground">Mes Événements</Link>
              <Link as={RouterLink} to="/invitations" color="foreground">Invitations</Link>
              <Link as={RouterLink} to="/notifications" color="foreground" onClick={handleOnClickOnNotification}>
                Notifications {!isInvisible && `(${countNotifications})`}
              </Link>
              {role === 'admin' && (
                <Link as={RouterLink} to="/admin" color="foreground">Admin</Link>
              )}
            </>
          ) : (
            <>
              <Link as={RouterLink} to="/login" color="foreground">Login</Link>
              <Link as={RouterLink} to="/registration" color="foreground">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '1rem auto 0',
        padding: '0 1rem',
        textAlign: 'center',
        fontSize: '0.9rem',
        opacity: 0.7
      }}>
        <p>© 2024 ACME. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;