import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useGetOneRow from '../hooks/getOneRow';
import { useState } from 'react';
import EventForm from '../components/EventForm';
const EdiformPage = () => {
    const { eventId } = useParams();
    const [refresh, setRefresh] = useState(false);
    const { data, error, loading } = useGetOneRow(`http://localhost:9000/event/event-by-id/${eventId}`, refresh);
    return (
        <div>
            {data && (
                <EventForm event={data} />
            )}
        </div>
    );
};

export default EdiformPage;