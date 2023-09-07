import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { get } from "http";

interface UseAxiosProps {
    method: 'get' | 'post' | 'put' | 'delete';
    api: string;
    body?: object;
    options?: object;
    deps: any[] // update when deps changes
}

const useAxios = ({method, api, body, options, deps}: UseAxiosProps) => {
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [response, setResponse] = useState<Object>({});
    const [error, setError] = useState<Object>({});

    const axiosController = new AbortController();
    useEffect(() => {
        if (!isLoading) {
            axiosClient[method](api, body, {
                ...options, 
                signal: axiosController.signal,
            }).then(response => {
                setResponse(response);
                setIsLoading(false);
            }).catch((error) => {
                setError(error);
                setIsLoading(false);
            });
        }

        // clean-up function
        return () => {
            if (isLoading) {
                axiosController.abort();
                setIsLoading(false);
            }
        }
    }, [...deps])

    return [response, error, isLoading];
};

export default useAxios;

