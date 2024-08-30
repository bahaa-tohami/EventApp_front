import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button } from '@nextui-org/react';
import moment from 'moment';

const NotificationCard = ({notification}) => {
   const dateFormatted = moment(notification.created_at).format('DD/MM/YYYY');
   const timeFormatted = moment(notification.created_at).format('HH:mm');
    return (
        <div>
            <Card>
                <CardHeader>
                    <p>{notification.type}</p>
                </CardHeader>
                <CardBody>
                    <div>
                        <p>{notification.message}</p>
                        <p>{dateFormatted} à {timeFormatted}</p>
                    </div>

                </CardBody>
                <CardFooter>
                    <Button>Voir l'événement</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default NotificationCard;