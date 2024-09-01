import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect, useState } from 'react';
import Calandar from '../components/Calandar';
import { Container, Card, Text } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { CardHeader, CardBody } from '@nextui-org/react';
import TableEvent from '../components/TableEvent';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import useGetData from '../hooks/getData';
import EventForm from '../components/EventForm';




const formatEventsWithMoment = (events) => {
    return events.map(event => ({
        ...event,
        date: moment(event.date).toDate() // ou simplement `moment(event.date)` si vous voulez un objet Moment
    }));
}

const Events = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTabFormat, setIsTabFormat] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const onOpen = () => setIsOpen(true);
    const onOpenChange = (openState) => setIsOpen(openState);
    const onClose = () => setIsOpen(false);
    const [backdrop, setBackdrop] = useState('blur');
    const [eventSelected, setEventSelected] = useState(null);

    const localStorageData = JSON.parse(localStorage.getItem('user'));
    const userId = localStorageData.userId;
    const headers = {
        Authorization: `Bearer ${localStorageData.token}`
    };

    const { data, error, loading } = useGetData(`http://localhost:9000/event/events-by-user/${userId}`, refresh);
    const formattedEvents = formatEventsWithMoment(data);
    const sortedEvents = data.sort((a, b) => new Date(a.date) - new Date(b.date));
    console.log(formattedEvents);
    const localizer = momentLocalizer(moment);
    const navigate = useNavigate();
    return (
        <div>
            <br />
            <div className='flex justify-center items-center mt-3'>
                <div className='w-full max-w-4xl flex flex-col gap-2'>
                    <div className="flex justify-between items-center w-full">
                        <h1 className="text-lg font-semibold">Mes événements</h1>
                        <div className="flex gap-2">
                            <Button
                                color='default'
                                size='sm'
                                onClick={() => setIsTabFormat(!isTabFormat)}
                                className="text-white px-4 py-2 rounded"
                            >
                                {isTabFormat ? 'Voir sous forme liste' : 'Voir sous forme calendrier'}
                            </Button>
                            <Button
                                color='default'
                                size='sm'
                                onClick={() => navigate('/event-form')}
                                className="text-white px-4 py-2 rounded"
                            >
                                Ajouter un événement
                            </Button>
                        </div>
                    </div>
                    {isTabFormat ? (
                        <Card>

                            <CardBody>
                                <Calandar events={sortedEvents} />
                            </CardBody>
                        </Card>
                    ) : (
                        <TableEvent events={data} />
                    )}
                </div>
            </div>
        </div>

    );
};

export default Events;