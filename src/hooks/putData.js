import { useState } from 'react';
import axios from 'axios';
import {auth} from '../auth/auth';

const usePutData = (url) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const headers = auth();
    const putData = async (newData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.put(url, newData, { headers });
            setData(response.data);
        } catch (err) {
           console.log(err);
           setError(err.response.data.message);
        } finally {
            setLoading(false);
        }
    };
    return { putData, error, loading };
};

export default usePutData;

