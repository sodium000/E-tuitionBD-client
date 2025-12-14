import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth'


    const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});


const useAxiosSecure = () => {
     const { GoogleSignOut } = useAuth();
    const navigate = useNavigate();

      useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      res => res,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            GoogleSignOut
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => axiosSecure.interceptors.response.eject(interceptor);
  }, [GoogleSignOut, navigate]);
    return axiosSecure;
};

export default useAxiosSecure;