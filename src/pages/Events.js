import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect } from 'react';
import Calandar from '../components/Calandar';
import useGetMyEvents from '../hooks/getMyEvents';
import { Button, Container, Card, Text } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
const Events = () => {
    const localStorageData = JSON.parse(localStorage.getItem('user'));
    const userId = localStorageData.userId;
    const headers = {
        Authorization: `Bearer ${localStorageData.token}`
    };
    const events = useGetMyEvents(`http://localhost:9000/event/events-by-user/${userId}`);
    const localizer = momentLocalizer(moment);
    const handleSelectEvent = (event) => {
        alert(event.title);
    };
    const navigate = useNavigate();
    return (
        <div>
        <h1>Calendrier</h1>
        <Button onClick={() => navigate('/event-form')}>Ajouter un événement</Button>
       <Calandar events={events} />
    </div>
     
    );
};

export default Events;