import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import React from 'react';
import { useQuery } from '@tanstack/react-query';


const useRole = () => {
    const { user, loading } = useAuth(); // Assume useAuth provides a loading state
    const axiosSecure = useAxiosSecure();

    const { isLoading: roleLoading, data: role } = useQuery({
        queryKey: ['user-role', user?.email],
        enabled: !loading && !!user?.email, // Only run if auth is finished and email exists
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            return res.data?.role;
        },
        staleTime: 1000 * 60 * 5, // Keep data "fresh" for 5 minutes to prevent flickering
        retry: 1, // Limit retries if the server is down
    });

    return { role, roleLoading };
};

export default useRole;