import axios from "axios";
import { useState, useEffect } from "react";

const useGetMyEvents = (src) => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    const headers = {
        Authorization: `Bearer ${token}`
    };
   
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(src, {headers});
                setEvents(response.data);
                console.log(response.data);
            } catch (err) {
                console.log("err");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [src]);
    return  events;
};

export default useGetMyEvents;