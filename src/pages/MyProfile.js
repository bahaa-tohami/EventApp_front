import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Input, Button } from "@nextui-org/react";

const fetchUserProfile = async (userId) => {
    try {
        const user = JSON.parse(localStorage.getItem('user')); // Récupérer l'objet 'user' du localStorage
        if (!user || !user.token) {
            throw new Error('No user token found');
        }

        const response = await axios.get(`http://localhost:9000/profile/${userId}`, {
            headers: {
                Authorization: `Bearer ${user.token}` // Utiliser le token de l'objet user pour l'en-tête d'autorisation
            }
        });
        return response.data; // Avec axios, les données sont directement dans response.data
    } catch (error) {
        throw new Error('Failed to fetch user profile');
    }
};

const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modified, setModified] = useState(false);
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState(''); // Ajout de l'état pour le message

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (user && user.userId) {
                    const userData = await fetchUserProfile(user.userId);
                    setUser(userData);
                    setFormData(userData);
                } else {
                    throw new Error('No user ID found');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getUserProfile();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setModified(true);
    };

    const handleValidation = async (e) => {
        e.preventDefault();

        const userId = JSON.parse(localStorage.getItem('user')).userId;

        const dataToSend = {
            ...formData,
            // Ajoutez d'autres transformations nécessaires pour les données
        };

        try {
            const response = await axios.put(`http://localhost:9000/profile/${userId}`, dataToSend, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                }
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil:', error);
            setMessage('Erreur lors de la mise à jour du profil');
        }

        setModified(false);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Profil utilisateur</h1>
            {user ? (
                <div>
                    <Input
                        type="text"
                        name="username"
                        label="Username"
                        defaultValue={user.username}
                        onChange={handleChange}
                        className="max-w-[220px]"
                    />
                    <Input
                        type="email"
                        name="email"
                        label="Email"
                        defaultValue={user.email}
                        onChange={handleChange}
                        className="max-w-[220px]"
                    />
                    <Input
                        type="text"
                        name="first_name"
                        label="First Name"
                        defaultValue={user.first_name}
                        onChange={handleChange}
                        className="max-w-[220px]"
                    />
                    <Input
                        type="text"
                        name="last_name"
                        label="Last Name"
                        defaultValue={user.last_name}
                        onChange={handleChange}
                        className="max-w-[220px]"
                    />
                    <Input
                        type="text"
                        name="role"
                        label="Role"
                        defaultValue={user.role}
                        readOnly
                        className="max-w-[220px]"
                    />
                    <Input
                        type="text"
                        name="status"
                        label="Status"
                        defaultValue={user.status}
                        readOnly
                        className="max-w-[220px]"
                    />
                    {modified && (
                        <Button onClick={handleValidation} className="mt-4">
                            Valider
                        </Button>
                    )}
                    {message && <p>{message}</p>} {/* Afficher le message de retour */}
                </div>
            ) : (
                <p>No user data found.</p>
            )}
        </div>
    );
};

export default UserProfile;
