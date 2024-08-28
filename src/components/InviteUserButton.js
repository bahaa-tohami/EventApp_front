import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext.js'; // Importer useAuth

const InviteUserButton = ({ eventId, onOpenChange }) => {
  const { isAuthenticated, token } = useAuth(); // Utiliser useAuth pour obtenir l'état d'authentification et le token
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated && token) {
      const fetchUsers = async () => {
        try {
          console.log('Fetching users with token:', token);
          const headers = { Authorization: `Bearer ${token}` };
          const response = await axios.get('http://localhost:9000/usernames', { headers });
          console.log('Users fetched:', response.data);
          setUsers(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des utilisateurs:', error);
          setError(error.message || 'An unknown error occurred');
        }
      };

      fetchUsers();
    }
  }, [isAuthenticated, token]);

  const handleInvite = async (userId) => {
    try {
      setLoading(true);
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post('http://localhost:9000/guest/invite', {
        event_id: eventId,
        user_ids: [userId],
      }, { headers });

      if (response.status === 200) {
        alert('User invited successfully');
        // Fermer le composant ou modale
        onOpenChange(false);
      } else {
        throw new Error('Failed to invite user');
      }
    } catch (error) {
      console.error('Erreur lors de l\'invitation des utilisateurs:', error);
      setError(error.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <p>Vous devez être connecté pour inviter des utilisateurs.</p>;
  }

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.user_id}>
              {user.username}
              <button onClick={() => handleInvite(user.user_id)} disabled={loading}>
                {loading ? 'Inviting...' : 'Invite'}
              </button>
            </li>
          ))
        ) : (
          <p>Aucun utilisateur disponible pour l'invitation.</p>
        )}
      </ul>
    </div>
  );
};

export default InviteUserButton;