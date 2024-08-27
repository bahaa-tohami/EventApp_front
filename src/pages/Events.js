import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect } from 'react';
import Calandar from '../components/Calandar';
import useGetMyEvents from '../hooks/getMyEvents';
import { Button, Container, Card, Text } from '@nextui-org/react';
const Events = () => {
    const events = useGetMyEvents("http://localhost:9000/event/events");
    const localizer = momentLocalizer(moment);
    const handleSelectEvent = (event) => {
        alert(event.title);
    };
    return (
        <div>
        <h1>Calendrier</h1>
        <Button>Ajouter un événement</Button>
       <Calandar events={events} />
    </div>
     
    );
};

export default Events;