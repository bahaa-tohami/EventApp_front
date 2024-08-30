import axios from "axios";
import { useState, useEffect } from "react";
import { auth } from '../auth/auth';

const useMyInvitations = (src) => {
    const [invitations, setInvitations] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const headers = auth();
   
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(src, {headers});
                setInvitations(response.data);
                console.log(response.data);
            } catch (err) {
                console.log(err.response.data.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [src]);
    return {invitations, error, loading};
};

export default useMyInvitations;