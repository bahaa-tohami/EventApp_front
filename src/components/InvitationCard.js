import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button } from '@nextui-org/react';
import moment from 'moment';

const InvitationCard = ({invitation, onButtonClick}) => {
   const dateFormatted = moment(invitation.created_at).format('DD/MM/YYYY');
   const timeFormatted = moment(invitation.created_at).format('HH:mm');
    return (
        <div>
            <Card>
                <CardHeader>
                    <p>{invitation.Event.title}</p>
                </CardHeader>
                <CardBody>
                    <div>
                        <p>{invitation.Event.description}</p>
                        <p> {invitation.Event.location}</p>
                        <p> Envoyé le {dateFormatted} à {timeFormatted}</p>
                    </div>

                </CardBody>
                <CardFooter>
                    <Button >Voir l'événement</Button>
                    <Button onClick={() => onButtonClick(invitation,"accepted")}>Accepter</Button>
                    <Button onClick={() => onButtonClick(invitation,"declined")}>Refuser</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default InvitationCard;