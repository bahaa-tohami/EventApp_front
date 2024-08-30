import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Input, Divider, Textarea, Accordion, AccordionItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Avatar, Rating } from '@nextui-org/react';
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { Image } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { TimeInput } from "@nextui-org/react";
import { Time } from "@internationalized/date";
import InviteUserButton from '../components/InviteUserButton.js';
import InviteUserForm from '../components/InviteUserForm.js';
import { useAuth } from '../auth/AuthContext.js';
// Mock functions for fetching event and user data
const fetchEventById = async (eventId) => {
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
    const user = JSON.parse(localStorage.getItem('user'));

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
     const { isOpen: isInvitationModalOpen, onOpen:onInvitatioOpen, onOpenChange } = useDisclosure();
   

   
    

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

    const RatingOneComment = ({ rating }) => {
        const colors = {
            orange: "#F2C265",
            grey: "#a9a9a9"
        };
        const stars = Array(5).fill(0);

        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {stars.map((_, index) => (
                    <FaStar
                        key={index}
                        size={12}
                        color={rating > index ? colors.orange : colors.grey}
                    />
                ))}
                <p style={{ marginLeft: 8 }}>{rating}</p>
            </div>
        );
    };

    //affichage d'une note par commentaire




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
    const eventTime = new Time(event.time.split(':')[0], event.time.split(':')[1]);
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'black' }}>
            <div style={{ width: '100%', maxWidth: '800px', margin: '1rem' }}>
                <Card className="max-w-[800px]" style={{ marginBottom: '2rem' }}>
                    <CardHeader className="flex gap-3">
                        <Image
                            alt="event image"
                            height={40}
                            radius="sm"
                            src="https://via.placeholder.com/40" // Remplacez par l'URL de l'image de l'événement si disponible
                            width={40}
                        />
                        <div className="flex flex-col">
                            <h1 className="text-xl">{event.title}</h1>
                            <p className="text-small text-default-500">{event.location}</p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>

                        <p className="text-sm text-default-500"><strong>Titre:</strong> {event.title}</p>
                        <p className="text-sm text-default-500"><strong>Description:</strong> {event.description}</p>
                        <p className="text-sm text-default-500">
                            <strong>Date:</strong> {new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}

                        </p>
                        <p className="text-sm text-default-500"><strong>Lieu:</strong> {event.location}</p>
                        <br />
                        <TimeInput
                            isReadOnly
                            label="Event Time"
                            defaultValue={eventTime}
                        />
                        <br />
                        {/* <p>Organisé par {capitalizeFirstLetter(user.username)}</p>  */}{/* Make sure the field is correct */}
                        <p style={{ paddingBottom: '20px' }} ><strong>Capacité maximale: </strong> {event.capacity} personnes</p>
                        <div className='flex gap-4 items-center '>
                            <p><strong>Note moyenne:</strong></p>
                            <div><RatingDisplay comments={event.Comments} /></div>
                        </div>

                        <div>
                            {currentUser && currentUser.userId === event.created_by && (


                                <div className="flex gap-4 items-center ">

                                    <p><strong>Nombre d'inscrits: </strong>{participantCount}</p>
                                    <div>
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
                                    </div>
                                    <div>

                                    <InviteUserForm style={{marginLeft:'10px'}} eventId={event.event_id} />

                                    </div>
                                </div>


                            )}
                        </div>
                    </CardBody>
                    <Divider />
                    <CardFooter className="flex flex-col gap-4">

                        <div className="flex gap-4 items-center">
                            <div className="max-w-lg mx-auto p-4">
                                <h2 className="text-lg font-semibold mb-4">Commentaires</h2>
                                {event.Comments.length > 0 ? (
                                    <ul className="list-none p-0">
                                        {event.Comments.map((comment) => (
                                            <li key={comment.id} className=" p-4 mb-2 rounded flex items-start">
                                                <Avatar
                                                    src={comment.avatar}
                                                    alt="Avatar"
                                                    className="flex-shrink-0 mr-4"
                                                    size="sm"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-medium mb-1">{comment.content || 'Pas de contenu'}</p>
                                                    <p><RatingOneComment rating={comment.rating} /></p>

                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Aucun commentaire disponible.</p>
                                )}
                            </div>

                        </div>



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


                    </CardFooter>

                </Card>
            </div>
        </div>
    );


};

export default EventDetails;
