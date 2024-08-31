import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, Image } from '@nextui-org/react';
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
            <Card className='mb-5'>
                <CardHeader className="flex gap-3">
                <Image
                    alt="event image"
                    height={40}
                    radius="sm"
                    src="https://via.placeholder.com/40" // Remplacez par l'URL de l'image de l'événement si disponible
                    width={40}
                  />
                  <div className="flex flex-col">
                <h1 className="text-xl">{notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}</h1>
                <p className="text-small text-default-500">{new Date(notification.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        <span> à </span> {timeFormatted}</p>
                        </div>
                </CardHeader>
                <CardBody>
                    <div>
                        <p>{notification.message}</p>
                        
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