import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Input, Textarea, Accordion, AccordionItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { Image } from '@nextui-org/react';
import { useParams } from 'react-router-dom';

// Mock functions for fetching event and user data
const fetchEventById = async (eventId)=> {
    const user = JSON.parse(localStorage.getItem('user'));


    // Check if the user's token is present
    if (!user || !user.token) {
        console.error('Token is missing or user is not logged in');
        throw new Error('User is not logged in or token is missing');
    }

    try {
        const response = await axios.get(`http://localhost:9000/event/event-by-id/${eventId}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
        console.log('Event data fetched:', response.data);
        return response.data;

    } catch (error) {
        console.error('Error fetching event by ID:', error); // Log the actual error for debugging
        throw new Error('Failed to fetch event by ID');
    }
};


const EventDetails = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [participantCount, setParticipantCount] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);
    const [comment, setComment] = useState('');
    const [note, setNote] = useState('');
    const [invitedUser, setInvitedUser] = useState('');
    const [ratingValue, setRatingValue] = useState(0);
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [totalStars, setTotalStars] = useState(1);


    const { isOpen: isInvitesModalOpen, onOpen: onInvitesOpen, onClose: onInvitesClose } = useDisclosure();
    const { isOpen: isCommentModalOpen, onOpen: onCommentOpen, onClose: onCommentClose } = useDisclosure();


    const handleRating = (rate) => {
        setRatingValue(rate);
    };

    useEffect(() => {
        const loadEvent = async () => {
            try {
                const eventData = await fetchEventById(eventId);
                setEvent(eventData);

                const totalParticipants = eventData.Participants ? eventData.Participants.length : 0;
                setParticipantCount(totalParticipants);

                console.log('Event data set:', eventData);
                console.log('Event data title:', eventData.title);

                // Assuming we want to set current user, fetch user data
                const user = JSON.parse(localStorage.getItem('user'));
                setCurrentUser(user);
                console.log('Current user set:', user.userId);
            } catch (error) {
                console.error(error.message);
            }
        };

        loadEvent();

    }, []);

    const handleCommentChange = (e) => setComment(e.target.value);
    const handleNoteChange = (e) => setNote(e.target.value);
    const handleInvitedUserChange = (e) => setInvitedUser(e.target.value);

    const handleAddComment = () => {
        // Logic to handle adding a comment
        console.log(`Comment added: ${comment}`);
        setComment('');
    };

    const handleAddNote = () => {
        // Logic to handle adding a note
        console.log(`Note added: ${note}`);
        setNote('');
    };

    const handleInviteUser = () => {
        // Logic to handle inviting a user
        console.log(`User invited: ${invitedUser}`);
        setInvitedUser('');
    };

    // Fonction pour calculer la moyenne des notes
    const calculateAverageRating = (comments) => {
        if (!Array.isArray(comments) || comments.length === 0) {
            return 0;
        }
        const total = comments.reduce((sum, comment) => sum + (comment.rating || 0), 0);
        return parseFloat((total / comments.length).toFixed(1)); // Retourne la moyenne arrondie à 1 décimale
    };



    if (!event) {
        return;
    }

    const averageRating = calculateAverageRating(event.Comments);

    //RatingDisplay affiche la moyenne des notes d'un evenement en forme d'étoiles
    const RatingDisplay = ({ comments }) => {
        const starAverage = calculateAverageRating(comments);

        // Calcul du nombre d'étoiles pleines et partielles
        const fullStars = Math.floor(starAverage);
        const partialStar = starAverage - fullStars;
        const emptyStars = 5 - (fullStars + (partialStar > 0 ? 1 : 0));

        // Création du tableau d'étoiles
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} color="#ff643d" />);
        }

        if (partialStar > 0) {
            stars.push(<FaStarHalfAlt key="partial" color="#ff643d" />);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} color="#bbbac0" />);
        }

        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {stars}
                    <p style={{ marginLeft: '8px', fontSize: '16px', fontWeight: 'bold' }}>{starAverage}</p>
                </div>
            </div>
        );
    };
    // Fonction pour mettre à jour totalStars, s'assurant qu'il ne dépasse pas 5
    const updateTotalStars = (newTotalStars) => {
        if (newTotalStars <= 5) {
            setTotalStars(newTotalStars);
        } else {
            console.warn("Le nombre total d'étoiles ne peut pas dépasser 5");
        }
    };
    // permet de noter un evenement en cliquant sur une étoile
    const renderStars = () => {
        const stars = [];

        for (let i = 1; i <= totalStars; i++) {

            stars.push(
                <label key={i}>
                    <input
                        type="radio"
                        name="rating"
                        value={i}
                        onChange={() => setRating(i)}
                        style={{ display: 'none' }}

                    />

                    &#9733;

                </label>
            );
        }
        return stars;
    };



    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md flex flex-col gap-6">
                <Card className="pb-10">
                    <CardHeader className="flex gap-3">
                        <div>
                            <h1 className="text-2xl font-bold">Détails de l'événement</h1>
                            <p className="text-sm text-default-500">Titre: {event.title}</p>
                            <p className="text-sm text-default-500">Description: {event.description}</p>
                            <p className="text-sm text-default-500">Date: {event.date}</p>
                            <p className="text-sm text-default-500">Location: {event.location}</p>
                            {currentUser && currentUser.userId === event.created_by && (
                                <>
                                    <div className="flex gap-4 items-center">
                                        <p className="text-sm text-default-500">Nombre d'inscrits: {participantCount}</p>
                                        <>
                                            <Button onPress={onInvitesOpen}>Afficher la liste</Button>
                                            <Modal isOpen={isInvitesModalOpen} onOpenChange={onInvitesClose}>
                                                <ModalContent>
                                                    {(onClose) => (
                                                        <>
                                                            <ModalHeader className="flex flex-col gap-1">Liste des invités</ModalHeader>
                                                            <ModalBody>
                                                                {event.Participants && event.Participants.length > 0 ? (
                                                                    <ul>
                                                                        {event.Participants.map((participant) => (
                                                                            <li key={participant.user_id} className="border p-2 mb-2 rounded flex items-center gap-3">
                                                                                <Image
                                                                                    alt="user avatar"
                                                                                    height={40}
                                                                                    radius="sm"
                                                                                    src="https://avatar.iran.liara.run/public"
                                                                                    width={40}
                                                                                />
                                                                                <div className="flex flex-col">
                                                                                    <p className="text-md">
                                                                                      {participant.User.username || 'Utilisateur inconnu'}
                                                                                    </p>
                                                                                </div>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                ) : (
                                                                    <p>Aucun participant disponible.</p>
                                                                )}
                                                            </ModalBody>

                                                            <ModalFooter>
                                                                <Button color="danger" variant="light" onPress={onClose}>
                                                                    Close
                                                                </Button>

                                                            </ModalFooter>
                                                        </>
                                                    )}

                                                </ModalContent>
                                            </Modal>
                                        </>

                                    </div>
                                </>
                            )}
                            <div className="text-sm text-default-500">


                                <Accordion>
                                    <AccordionItem key="1" aria-label="Commentaires" title="Commentaires" subtitle="Cliquez pour lire les commentaires">
                                        {Array.isArray(event.Comments) && event.Comments.length > 0 ? (
                                            <ul>
                                                {event.Comments.map((comment, index) => (
                                                    <li key={index} className="border p-2 mb-2 rounded">
                                                        <p><strong>Contenu:</strong> {comment.content || 'Pas de contenu'}</p>
                                                        <p><strong>Évaluation:</strong> {comment.rating !== undefined ? comment.rating : 'Non défini'}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>Aucun commentaire disponible.</p>
                                        )}
                                    </AccordionItem>
                                </Accordion>
                            </div>
                            <p><strong>Note moyenne:</strong></p>
                            <div><RatingDisplay comments={event.Comments} /></div>

                        </div>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Button onPress={onCommentOpen}>Ajouter un commentaire</Button>
                        <Modal isOpen={isCommentModalOpen} onOpenChange={onCommentClose}>
                            <ModalContent>

                                <ModalBody>
                                    <div>Notez l'évènement</div>
                                    <div className="flex" onClick={handleAddNote}>{renderStars()}</div>

                                    <label style={{ fontWeight: 400 }}>
                                        Number of stars:
                                        <input
                                            style={{ marginLeft: '12px', maxWidth: '50px' }}
                                            onChange={(e) => setTotalStars(Number(e.target.value))}
                                            value={totalStars}
                                            type="number"
                                            min={1}
                                        />
                                    </label>
                                    <Textarea
                                        placeholder="Ajouter un commentaire"
                                        value={comment}
                                        onChange={handleCommentChange}
                                        className="max-w-xs"
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={handleAddComment}>
                                        Ajoutez un commentaire
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                        {currentUser && currentUser.userId === event.created_by && (
                            <>

                                <Button color="primary" onClick={handleInviteUser}>
                                    Inviter un utilisateur
                                </Button>

                            </>
                        )}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default EventDetails;
