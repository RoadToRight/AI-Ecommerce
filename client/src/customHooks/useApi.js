import { useCallback } from 'react';
import { axiosInstance } from '../lib/axios'
import { toast } from "react-toastify";

const useApi = (errorMessage = true) => {

    const Request = useCallback(async ({ type = "get", data, url, erMess }) => {
        try {
            const response =
                type === 'get'
                    ? await axiosInstance.request({ type, url })
                    : await axiosInstance(type, url, data);
            return response.data;
        } catch (error) {
            console.log(errorMessage);

            if (errorMessage) {
                toast.error(error?.response?.data?.message || error.message || erMess || "Request Failed!");
            }
            throw error;
        }
    }, [errorMessage])

    return Request;
}

export default useApi
