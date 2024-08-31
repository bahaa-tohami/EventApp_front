import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import InvitationCard from '../components/InvitationCard';
import usePutData from '../hooks/putData';
import { useNavigate } from 'react-router-dom';
import useGetData from '../hooks/getData';






const Events = () => {
    const navigate = useNavigate();

    const localStorageData = JSON.parse(localStorage.getItem('user'));
    const userId = localStorageData.userId;
    const [refresh, setRefresh] = useState(0);
    const { data, error, loading } = useGetData(`http://localhost:9000/guest/invitations/${userId}`, refresh);

    const { putData, error1, loading1 } = usePutData("http://localhost:9000/guest/invite-response");
    const handleButtonClick = (invitation, status) => {
        const invitationResponse = {
            user_id: invitation.user_id,
            event_id: invitation.event_id,
            participant_id: invitation.participant_id,
            status: status
        }
        console.log(invitationResponse);
        putData(invitationResponse);
        if (!error) {
            console.log("Invitation accepted");
            setRefresh(refresh + 1);
        }

    };

    return (
        <div>
            <div className='flex justify-center items-center'>
                <div className='w-full max-w-xl flex flex-col gap-2'>
                    <h1>Liste des invitations</h1>
                    {data.map((invitation, index) => (
                        <InvitationCard key={index} invitation={invitation} onButtonClick={handleButtonClick} />
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Events;