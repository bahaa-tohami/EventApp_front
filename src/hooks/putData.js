import { useState } from 'react';
import axios from 'axios';
import {auth} from '../auth/auth';

const usePutData = (url) => {
    const [errorPut, setErrorPut] = useState(null);
    const [loadingPut, setLoadingPut] = useState(false);
    const [dataReturnPut, setDataReturnPut] = useState(null);
    const headers = auth();
    const putData = async (newData) => {
        setLoadingPut(true);
        setErrorPut(null);
        try {
            const response = await axios.put(url, newData, { headers });
            setDataReturnPut(response.data);
            return response.data;
        } catch (err) {
           console.log(err);
           setErrorPut(err.response.data.message);
        } finally {
                setLoadingPut(false);
        }
    };
    return { putData, errorPut, loadingPut };
};

export default usePutData;

