import axios from "axios";
import { useState, useEffect } from "react";
import { auth } from '../auth/auth';

const useResponseInvitation = (src, participantData) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const headers = auth();
   
    useEffect(() => {
        const updateData = async () => {
            setLoading(true);
            try {
                const response = await axios.put(src, participantData, {headers});
                console.log(response.data);
            } catch (err) {
                console.log(err.response.data.message);
            } finally {
                setLoading(false);
            }
        };
        updateData();
    }, [participantData]);
    return  {error, loading};
};

export default useResponseInvitation;