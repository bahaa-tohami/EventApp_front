import React, { useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import InvitationCard from '../components/InvitationCard';
import usePutData from '../hooks/putData';
import { useNavigate } from 'react-router-dom';
import useGetData from '../hooks/getData';
import { Button } from '@nextui-org/react';

const Events = () => {
    const navigate = useNavigate();

    const localStorageData = JSON.parse(localStorage.getItem('user'));
    const userId = localStorageData.userId;
    const [refresh, setRefresh] = useState(0);
    const { data, error, loading } = useGetData(`http://localhost:9000/guest/invitations/${userId}`, refresh);

    const { putData, errorPut, loadingPut, dataReturnPut } = usePutData("http://localhost:9000/guest/invite-response");
    const handleButtonClick = async (invitation, status) => {
        const invitationResponse = {
            user_id: invitation.user_id,
            event_id: invitation.event_id,
            participant_id: invitation.participant_id,
            status: status
        }
        console.log(invitationResponse);
        const response = await putData(invitationResponse);
        if (!errorPut) {
            console.log("Invitation accepted");
            setRefresh(refresh + 1);
        }
    };

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const invitationsPerPage = 5;

    // Calculate current invitations
    const indexOfLastInvitation = currentPage * invitationsPerPage;
    const indexOfFirstInvitation = indexOfLastInvitation - invitationsPerPage;
    const currentInvitations = data.slice(indexOfFirstInvitation, indexOfLastInvitation);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

   return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'black' }}>
        <div style={{ width: '100%', maxWidth: '800px', margin: '1rem' }}>
            {currentInvitations.length > 0 ? (
                currentInvitations.map((invitation, index) => (
                    <div key={index} style={{ marginBottom: '2rem' }}>
                        <InvitationCard invitation={invitation} onButtonClick={handleButtonClick} />
                    </div>
                ))
            ) : (
                <div></div>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {Array.from({ length: Math.ceil(data.length / invitationsPerPage) }, (_, index) => (
                    <Button key={index + 1} onClick={() => paginate(index + 1)} style={{ margin: '0 5px' }}>
                        {index + 1}
                    </Button>
                ))}
            </div>
        </div>
    </div>
)
};

export default Events;