import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useState } from 'react';
import { Modal, ModalContent } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';



const eventStyleGetter = (event) => {
    let backgroundColor = '';
    const userConnected = JSON.parse(localStorage.getItem('user'));
    if(event.created_by === userConnected.userId){
        backgroundColor = '#00aa9b'; // Vert pour le personnel
    }else{
        backgroundColor = ''; // Bleu pour autre
    }

  
    return {
      style: {
        backgroundColor,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

const MyCalandar = ({events}) => {
    const navigate = useNavigate();
  
    const localizer = momentLocalizer(moment);
    const handleSelectEvent = (event) => {
        navigate(`/eventdetails/${event.event_id}`);
    };
    console.log(events);
    return (
        <>
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="date"
            endAccessor="date"
            style={{ height: 500 }}
            onSelectEvent={handleSelectEvent}
            eventPropGetter={eventStyleGetter}
        />
       
        </>
        
    );
};

export default MyCalandar;