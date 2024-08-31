import { useState } from 'react';
import axios from 'axios';
import {auth} from '../auth/auth';

const useDeleteRequest = (url) => {
    const [errorDelete, setErrorDelete] = useState(null);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [dataReturnDelete, setDataReturnDelete] = useState(null);
    const headers = auth();
        const deleteData = async (newData) => {
        setLoadingDelete(true);
        setErrorDelete(null);
        try {
            const response = await axios.delete(url, { headers });
            setDataReturnDelete(response.data);
            return response.data;
        } catch (err) {
           console.log(err);
            setErrorDelete(err.response.data.message);
        } finally {
                setLoadingDelete(false);
        }
    };
    return { deleteData, errorDelete, loadingDelete };
};

export default useDeleteRequest;

