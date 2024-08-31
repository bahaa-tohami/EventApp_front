import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button } from '@nextui-org/react';
import moment from 'moment';
import { Chip } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

const NotificationCard = ({ notification, handleOnClicButtonRead }) => {
    const dateFormatted = moment(notification.created_at).format('DD/MM/YYYY');
    const timeFormatted = moment(notification.created_at).format('HH:mm');
    const navigate = useNavigate();
    const onClickButtonRead = () => {
        console.log(notification.notification_id)
        handleOnClicButtonRead(notification.notification_id)
    }
    return (
        <div>
            <Card className={`${notification.is_read ? 'bg-gray' : ''}`}>
                <CardHeader>
                    <p>{notification.type}</p>
                </CardHeader>
                <CardBody>
                    <div>
                        <p>{notification.message}</p>
                        <p>{new Date(notification.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        <span> à </span> {timeFormatted}</p>
                    </div>

                </CardBody>
                <CardFooter>
                    <div className="flex justify-between items-center w-full">
                        <Button onClick={() => navigate(`/eventdetails/${notification.event_id}`)} size='sm'>Voir l'événement</Button>
                        <div className="flex gap-2 justify-end">
                            {!notification.is_read ?     
                            <Button
                                color="success"
                                size='sm'
                                onClick={onClickButtonRead}
                                >
                                Marquer comme lu
                                </Button>
                            :
                            <Chip color="primary">Lu</Chip>
                        }
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default NotificationCard;