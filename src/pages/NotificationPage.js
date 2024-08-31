import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import NotificationCard from '../components/NotificationCard';
import useMyNotifications from '../hooks/getData';
import usePutData from '../hooks/putData';
import { useState, useEffect } from 'react'; 
import useGetData from '../hooks/getData';




const Events = () => {
 
   
    const localStorageData = JSON.parse(localStorage.getItem('user'));
    const userId = localStorageData.userId;
    const [notificationId, setNotificationId] = useState(0);
    const [refresh, setRefresh] = useState(0);
    const [refresh2, setRefresh2] = useState(0);
    
    const {data, error, loading} = useGetData(`http://localhost:9000/notifications/${userId}`, refresh2);
    const {putData, error1, loading1} = usePutData(`http://localhost:9000/notifications/${notificationId}`);
    useEffect(() => {
        if (notificationId !== 0) { // Avoid calling putData on initial render
            putData({ is_read: true });
            if (!error1) {
                console.log("Notification modifiée");
                setRefresh(refresh + 1);
                setRefresh2(refresh2 + 1);
            }
        }
    }, [notificationId]);
    
    //const formattedEvents = formatEventsWithMoment(events);
    
    //const localizer = momentLocalizer(moment);
    //const navigate = useNavigate();
    const handleOnClicButtonRead = (notificationId) => {
        setNotificationId(notificationId);
        
    }
    return (
        <div>
        <div className='flex justify-center items-center'>
            <div className='w-full max-w-xl flex flex-col gap-2'>
                <h1>Liste des notifications</h1>
                {data.map((notification) => (
                <NotificationCard key={notification.notification_id} notification={notification} handleOnClicButtonRead={handleOnClicButtonRead} />
                ))}
            </div>
       </div>
    </div>
     
    );
};

export default Events;