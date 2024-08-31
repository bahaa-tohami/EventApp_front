import { useState } from 'react';
import axios from 'axios';
import {auth} from '../auth/auth';

const usePostData = (url) => {
    const [errorPost, setErrorPost] = useState(null);
    const [loadingPost, setLoadingPost] = useState(false);
    const [dataReturnPost, setDataReturnPost] = useState(null);
    const headers = auth();
    const postData = async (newData) => {
        setLoadingPost(true);
        setErrorPost(null);
        try {
            const response = await axios.post(url, newData, { headers });
            setDataReturnPost(response.data);
            console.log(response.data);
            return response.data;
        } catch (err) {
           console.log(err);
           setErrorPost(err.response.data.message);
        } finally {
            setLoadingPost(false);
        }
    };
    return { postData, errorPost, loadingPost, dataReturnPost };
};

export default usePostData;

