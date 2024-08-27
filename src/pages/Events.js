import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect } from 'react';
import Calandar from '../components/Calandar';
import useGetMyEvents from '../hooks/getMyEvents';
const Events = () => {
    const events = useGetMyEvents("http://localhost:9000/event/events");
    const localizer = momentLocalizer(moment);
    const handleSelectEvent = (event) => {
        alert(event.title);
    };
    return (
        <Calandar />
    );
};

export default Events;