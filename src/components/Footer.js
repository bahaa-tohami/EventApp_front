import React from 'react';
import { Link } from '@nextui-org/react';

const Footer = () => {
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
          <h3 style={{ margin: 0 }}>Event App</h3>
        </div>
        <nav style={{
          display: 'flex',
          gap: '1rem'
        }}>
          <Link href="/" color="foreground">Accueil</Link>
          <Link href="/events" color="foreground">Mes Événements</Link>
          <Link href="/myprofile" color="foreground">Mon Profil</Link>
          <Link href="/notifications" color="foreground">Notifications</Link>
          <Link href="/invitations" color="foreground">Invitations</Link>
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
        <p>© 2024 Event App. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;