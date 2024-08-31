import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      flexDirection: 'column', 
      padding: '20px 0', 
      borderTop: '1px solid #eaeaea', 
      backgroundColor: '#1a1a1a', 
      color: 'white', 
      width: '100%' 
    }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0.5rem 0', fontSize: '1.2rem', fontWeight: 'bold' }}>© 2024 ACME Corporation</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
          <a href="/about" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#ff6347'} onMouseOut={(e) => e.target.style.color = 'white'}>À propos</a>
          <a href="/contact" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#ff6347'} onMouseOut={(e) => e.target.style.color = 'white'}>Contact</a>
          <a href="/privacy" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#ff6347'} onMouseOut={(e) => e.target.style.color = 'white'}>Politique de confidentialité</a>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: '1.5rem', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#3b5998'} onMouseOut={(e) => e.target.style.color = 'white'}><i className="fab fa-facebook"></i></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: '1.5rem', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#1da1f2'} onMouseOut={(e) => e.target.style.color = 'white'}><i className="fab fa-twitter"></i></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: '1.5rem', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#e1306c'} onMouseOut={(e) => e.target.style.color = 'white'}><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;