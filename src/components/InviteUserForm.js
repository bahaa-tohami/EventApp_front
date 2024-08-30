import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Card, CardHeader, CardBody, CardFooter, Divider, Image } from '@nextui-org/react';

const InviteUserForm = () => {
    const { eventId } = useParams(); // Récupère eventId à partir des paramètres de l'URL
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:9000/usernames');
                console.log('Utilisateurs récupérés:', response.data); // Log des utilisateurs récupérés
                setUsers(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs:', error);
                setError('Erreur lors de la récupération des utilisateurs');
            }
        };

        fetchUsers();
    }, []);

    const handleInvite = async (user) => {
        const currentUser = JSON.parse(localStorage.getItem('user')); // Récupérer et parser l'objet utilisateur depuis le localStorage
    
        if (!currentUser) {
            console.log('Erreur: utilisateur non trouvé dans le localStorage');
            setError('Utilisateur non trouvé dans le localStorage');
            return;
        }
    
        const token = currentUser.token; // Extraire le jeton de l'objet utilisateur
        const userId = currentUser.userId; // Extraire l'ID de l'utilisateur de l'objet utilisateur
        const participantId = user.user_id; // Extraire l'ID du participant de l'objet utilisateur

        if (!userId) {
            console.log('Erreur: userId est indéfini');
            setError('Erreur: userId est indéfini');
            return;
        }

        if (!participantId) {
            console.log('Erreur: participantId est indéfini');
            setError('Erreur: participantId est indéfini');
            return;
        }

        console.log('User ID:', userId);
        console.log('Event ID:', eventId);
        console.log('Participant ID:', participantId);
        console.log('Token:', token);

        try {
            // Réinitialiser les messages d'erreur et de succès
            setError('');
            setMessage('');

            const response = await axios.post(
                'http://localhost:9000/guest/invite',
                {
                    user_id: userId, // Utiliser l'ID de l'utilisateur extrait
                    event_id: eventId,
                    participant_id: participantId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Réponse du serveur:', response.data);
            setMessage('Invitation envoyée avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'invitation:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Erreur lors de l\'invitation');
            }
            console.log('Erreur config:', error.config);
            console.log('Erreur request:', error.request);
            console.log('Erreur response:', error.response);
        }
    };

    const currentUser = JSON.parse(localStorage.getItem('user')); // Récupérer l'utilisateur connecté
    const filteredUsers = users.filter(user => user.user_id !== currentUser.userId); // Filtrer les utilisateurs

    return (
        <div className="flex flex-col gap-2">
<Button onPress={onOpen} className="text-sm max-w-xs">Inviter un utilisateur</Button>            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Inviter un utilisateur à l'événement
                            </ModalHeader>
                            <ModalBody>
                                {message && <p style={{ color: 'green' }}>{message}</p>}
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <div className="grid grid-cols-1 gap-4">
                                    {filteredUsers.map((user) => (
                                        <Card key={user.user_id || user.username} className="max-w-[400px]">
                                            <CardHeader className="flex justify-between items-center gap-3">
                                                <div className="flex items-center gap-3">
                                                    <Image
                                                        alt="user avatar"
                                                        height={40}
                                                        radius="sm"
                                                        src="https://avatar.iran.liara.run/public"
                                                        width={40}
                                                    />
                                                    <div className="flex flex-col">
                                                        <p className="text-md">{user.username}</p>
                                                    </div>
                                                </div>
                                                <Button onPress={() => handleInvite(user)}>Inviter</Button>
                                            </CardHeader>
                                            <Divider />
                                        
                                            <Divider />
                                        </Card>
                                    ))}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Fermer
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default InviteUserForm;