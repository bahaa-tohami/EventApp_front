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
import NotificationCard from '../components/NotificationCard';
import useMyNotifications from '../hooks/getMyNotification';


const Events = () => {
 
   
    const localStorageData = JSON.parse(localStorage.getItem('user'));
    const userId = localStorageData.userId;
    const notifications = useMyNotifications(`http://localhost:9000/notifications/${userId}`);
    //const formattedEvents = formatEventsWithMoment(events);
    
    //const localizer = momentLocalizer(moment);
    //const navigate = useNavigate();
    return (
        <div>
        <div className='flex justify-center items-center'>
            <div className='w-full max-w-xl flex flex-col gap-2'>
                <h1>List des notifications</h1>
                {notifications.map((notification) => (
                <NotificationCard key={notification.notification_id} notification={notification} />
                ))}
            </div>
       </div>
    </div>
     
    );
};

export default Events;