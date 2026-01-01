import { useCallback } from 'react';
import { axiosInstance } from '../lib/axios'
import { toast } from "react-toastify";

const useApi = () => {

    const Request = useCallback(async ({ type = "get", data, url, erMess }) => {
        try {
            const response =
                type === 'get'
                    ? await axiosInstance.get(url, { params: data })
                    : await axiosInstance[type](url, data);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || erMess || "Request Failed!");
            throw error;
        }
    }, [])

    return Request;
}

export default useApi
