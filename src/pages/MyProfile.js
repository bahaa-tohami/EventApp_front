import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Input, Button } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

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

   
    const [errors, setErrors] = useState({});
    const [isVisible, setIsVisible] = useState(false); 
    
    const toggleVisibility = () => setIsVisible(!isVisible);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Validation en temps réel
        let newErrors = { ...errors };
        if (name === 'email' && !validateEmail(value)) {
            newErrors.email = 'Veuillez entrer un email valide.';
        } else {
            delete newErrors.email;
        }
      
        setErrors(newErrors);
        setModified(true);
    };

    const handleValidation = async (e) => {
        e.preventDefault();
        let validationErrors = {};
        if (!validateEmail(formData.email)) {
            validationErrors.email = 'Veuillez entrer un email valide.';
        }
        setErrors(validationErrors);
         // Si des erreurs existent, on ne soumet pas le formulaire
         if (Object.keys(validationErrors).length > 0) {
            return;
        }
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

    // if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

   return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-16">
        <div className="w-full max-w-2xl flex flex-col gap-6">
            <br />
        
            <Card className="pb-10 shadow-lg">
                <CardHeader className="flex gap-3">
                    <div>
                        <h1 className="text-2xl font-bold">Profil utilisateur</h1>
                    </div>
                </CardHeader>
                <CardBody>
                    {user ? (
                        <form onSubmit={handleValidation} className="flex flex-col gap-4">
                            <Input
                                type="text"
                                name="username"
                                label="Nom d'utilisateur"
                                defaultValue={user.username}
                                onChange={handleChange}
                                className="max-w-full"
                            />
                            <Input
                                type="email"
                                name="email"
                                label="Email"
                                defaultValue={user.email}
                                onChange={handleChange}
                                className="max-w-full"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email}</p>
                            )}
                            <Input
                                type="text"
                                name="first_name"
                                label="Prénom"
                                defaultValue={user.first_name}
                                onChange={handleChange}
                                className="max-w-full"
                            />
                            <Input
                                type="text"
                                name="last_name"
                                label="Nom"
                                defaultValue={user.last_name}
                                onChange={handleChange}
                                className="max-w-full"
                            />
                            <Input
                                type="text"
                                name="role"
                                label="Rôle"
                                defaultValue={user.role}
                                readOnly
                                className="max-w-full"
                            />
                            <Input
                                type="text"
                                name="status"
                                label="Statut"
                                defaultValue={user.status}
                                readOnly
                                className="max-w-full"
                            />
                            {modified && (
                                <div className="flex justify-center">
                                    <Button color="primary" type="submit" className="mt-4">
                                        Valider
                                    </Button>
                                </div>
                            )}
                            {message && <p>{message}</p>} {/* Afficher le message de retour */}
                        </form>
                    ) : (
                        <p className="text-center">Chargement...</p>
                    )}
                </CardBody>
            </Card>
        </div>
    </div>
);
    
};

export default UserProfile;
