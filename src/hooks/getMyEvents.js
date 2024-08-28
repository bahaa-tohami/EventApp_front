import axios from "axios";
import { useState, useEffect } from "react";

const useGetMyEvents = (src) => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const storageData = JSON.parse(localStorage.getItem('user'));

    const headers = {
        Authorization: `Bearer ${storageData.token}`
    };
   
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(src, {headers});
                setEvents(response.data);
                console.log(response.data);
            } catch (err) {
                console.log(err.response.data.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [src]);
    return  events;
};

export default useGetMyEvents;