import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect, useState } from 'react';
import Calandar from '../components/Calandar';
import useGetMyEvents from '../hooks/getMyEvents';
import { Container, Card, Text } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { CardHeader, CardBody } from '@nextui-org/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";

import EditEvent from '../components/EditEvent';


const formatEventsWithMoment = (events) => {
    return events.map(event => ({
      ...event,
      date: moment(event.date).toDate() // ou simplement `moment(event.date)` si vous voulez un objet Moment
    }));
  }

const Events = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
  const onOpenChange = (openState) => setIsOpen(openState);
  const onClose = () => setIsOpen(false);
  const [backdrop, setBackdrop] = useState('blur');
   
    const localStorageData = JSON.parse(localStorage.getItem('user'));
    const userId = localStorageData.userId;
    const headers = {
        Authorization: `Bearer ${localStorageData.token}`
    };
    const events = useGetMyEvents(`http://localhost:9000/event/events-by-user/${userId}`);
    const formattedEvents = formatEventsWithMoment(events);
    
    const localizer = momentLocalizer(moment);
    const navigate = useNavigate();
    return (
        <div>
        <div className='flex justify-center items-right'>
             <div className='max-w-1xl flex flex-col gap-2'>
                <Button onClick={() => navigate('/event-form')}>Ajouter un événement</Button>
             </div>
        </div>
        <div className='flex justify-center items-center'>
            <div className='w-full max-w-4xl flex flex-col gap-2'>
                <Card>
                    <CardHeader>
                        <h1>Mes événements</h1>
                    </CardHeader>
                    <CardBody>
                        <Calandar events={formattedEvents} />
                    </CardBody>
                </Card>
            </div>
       </div>
    </div>
     
    );
};

export default Events;