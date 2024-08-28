import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useState } from 'react';
import { Modal, ModalContent } from '@nextui-org/react';


const eventStyleGetter = (event) => {
    let backgroundColor = '';
    const userConnected = JSON.parse(localStorage.getItem('user'));
    if(event.created_by === userConnected.userId){
        backgroundColor = '#48bb78'; // Vert pour le personnel
    }else{
        backgroundColor = '#3182ce'; // Bleu pour autre
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
  
    const localizer = momentLocalizer(moment);
    const handleSelectEvent = (event) => {
        alert(event.title);
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