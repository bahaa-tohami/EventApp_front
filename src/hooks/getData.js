import axios from "axios";
import { useState, useEffect } from "react";
import { auth } from '../auth/auth';

const useGetData = (src, refresh) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const headers = auth();
   
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(src, {headers});
                setData(response.data);
                console.log(response.data);
            } catch (err) {
                console.log(err.response.data.message);
                setError(err.response.data.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [refresh]);
    return  {data, error, loading};
};

export default useGetData;