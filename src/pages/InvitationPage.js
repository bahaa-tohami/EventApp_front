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
import useMyNotifications from '../hooks/getMyNotification';
import useMyInvitations from '../hooks/getMyInvitations';
import InvitationCard from '../components/InvitationCard';
import usePutData from '../hooks/putData';





const Events = () => {
    const [invitation, setInvitation] = useState(null);
    const url = "http://localhost:9000/guest/invite-response";

    const localStorageData = JSON.parse(localStorage.getItem('user'));
    const userId = localStorageData.userId;
    const [urlInvitation, setUrlInvitation] = useState(`http://localhost:9000/guest/invitations/${userId}`);
    const {invitations, error, loading} = useMyInvitations(urlInvitation);

    const {putData, error1, loading1} = usePutData("http://localhost:9000/guest/invite-response");
    const handleButtonClick = (invitation, status) => {
        const invitationResponse = {
           user_id: invitation.user_id,
           event_id: invitation.event_id,
           participant_id: invitation.participant_id,
           status: status
        }
        console.log(invitationResponse);
        putData(invitationResponse);
        if(!error){
            console.log("Invitation accepted");
           // setUrlInvitation(`http://localhost:9000/guest/invitations/${userId}`);
        }   

    };
  
    //const formattedEvents = formatEventsWithMoment(events);
    
    //const localizer = momentLocalizer(moment);
    //const navigate = useNavigate();
    return (
        <div>
        <div className='flex justify-center items-center'>
            <div className='w-full max-w-xl flex flex-col gap-2'>
                <h1>List des invitations</h1>
                {invitations.map((invitation, index) => (
                    <InvitationCard key={index} invitation={invitation} onButtonClick={handleButtonClick} />
                ))}
            </div>
       </div>
    </div>
     
    );
};

export default Events;