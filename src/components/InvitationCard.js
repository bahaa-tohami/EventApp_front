import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, Chip, Image } from '@nextui-org/react';
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
                <CardHeader className="flex gap-3">
                  <Image
                    alt="event image"
                    height={40}
                    radius="sm"
                    src="https://via.placeholder.com/40" // Remplacez par l'URL de l'image de l'événement si disponible
                    width={40}
                  />
                  <div className="flex flex-col">
                    <h1 className="text-xl">Invitation à l'évènement {invitation.Event.title}</h1>
                        <p className="text-default-500">Se déroule à {invitation.Event.location}</p>
                    
                  </div>
                </CardHeader>
                <CardBody>
                    <div>
                        <p className="text-default-500">{invitation.Event.description}</p>
                        <p className="text-default-500"> {isReceiver ? 'Date reception: ' : 'Envoyé le: '}
                            {new Date(invitation.invited_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            <span> à </span>  {new Date(invitation.invited_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                        {isReceiver ? (
                            <p>Invité par {invitation.Event.User.username}</p>
                        ) : (
                            <p>Invitation envoyée à {invitation.User.username}</p>
                        )}
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