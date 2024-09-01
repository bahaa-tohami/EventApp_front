import React, { useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import NotificationCard from '../components/NotificationCard';
import usePutData from '../hooks/putData';
import useGetData from '../hooks/getData';
import { Button } from '@nextui-org/react';

const Events = () => {
    const localStorageData = JSON.parse(localStorage.getItem('user'));
    const userId = localStorageData.userId;
    const [notificationId, setNotificationId] = useState(0);
    const [refresh, setRefresh] = useState(0);
    const [refresh2, setRefresh2] = useState(0);

    const { data, error, loading } = useGetData(`http://localhost:9000/notifications/${userId}`, refresh2);
    const { putData, errorPut, loadingPut, dataReturnPut } = usePutData(`http://localhost:9000/notifications/${notificationId}`);

    useEffect(() => {
        if (notificationId !== 0) { // Avoid calling putData on initial render
            const response = putData({ is_read: true });
            if (response) {
                console.log("Notification modifiée");
                setRefresh(refresh + 1);
                setRefresh2(refresh2 + 1);
            }
        }
    }, [notificationId]);

    const handleOnClicButtonRead = (notificationId) => {
        setNotificationId(notificationId);
    };

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const notificationsPerPage = 5;

    // Calculate current notifications
    const indexOfLastNotification = currentPage * notificationsPerPage;
    const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
    const currentNotifications = data.slice(indexOfFirstNotification, indexOfLastNotification);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className='flex justify-center items-center'>
                <div className='w-full max-w-xl flex flex-col gap-2'>
                    
                    {currentNotifications.map((notification) => (
                        <NotificationCard
                            key={notification.notification_id}
                            notification={notification}
                            handleOnClicButtonRead={handleOnClicButtonRead}
                        />
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        {Array.from({ length: Math.ceil(data.length / notificationsPerPage) }, (_, index) => (
                            <Button key={index + 1} onClick={() => paginate(index + 1)} style={{ margin: '0 5px' }}>
                                {index + 1}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;