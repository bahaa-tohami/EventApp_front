import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, Chip } from '@nextui-org/react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const InvitationCard = ({ invitation, onButtonClick }) => {
    const userConnected = JSON.parse(localStorage.getItem('user'));
    const isReceiver = invitation.user_id === userConnected.userId;
    const isResponded = invitation.status !== 'invited';
    const navigate = useNavigate();
    return (
        <div>
            <Card className={`${isReceiver ? 'bg-gray' : ''}`}>
                <CardHeader>
                    <p><b>Evenement: {invitation.Event.title} </b></p>
                </CardHeader>
                <CardBody>
                    <div>
                        <p>Description: {invitation.Event.description}</p>
                        <p>Lieu: {invitation.Event.location}</p>
                        <p> {isReceiver ? 'Date reception: ' : 'Envoyé le: '}
                            {new Date(invitation.invited_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            <span> à </span>  {new Date(invitation.invited_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                        <p>Organisateur: {invitation.User.first_name} {invitation.User.last_name}</p>
                    </div>

                </CardBody>
                <CardFooter>
                    <div className="flex justify-between items-center w-full">
                        <Button onClick={() => navigate(`/eventdetails/${invitation.event_id}`)}>Voir l'événement</Button>
                        {isReceiver ? (
                            <div className="flex gap-2 justify-end">
                                {isResponded ? <Chip color="primary">{invitation.status}</Chip> :
                                    <>
                                        <Button
                                            color="success"
                                            onClick={() => onButtonClick(invitation, "accepted")}>
                                            Accepter
                                        </Button>
                                        <Button
                                            color="danger"
                                            onClick={() => onButtonClick(invitation, "declined")}>
                                            Refuser
                                        </Button>
                                    </>
                                }
                            </div>
                        ) : (
                            <Chip color="primary">{invitation.status}</Chip>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default InvitationCard;