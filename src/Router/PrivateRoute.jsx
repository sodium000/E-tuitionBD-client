import React from 'react';
import { useLocation } from 'react-router';
import Loading from '../Component/Loading/Loading';
import useAuth from '../hook/useAuth'

const PrivateRoute = ({children}) => {
   const {user,loading}= useAuth();

    const location = useLocation();

    if (loading) {
        return <div className='flex justify-center items-center h-[300px]'><Loading></Loading></div>
    }

    if (!user) {
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }

    return children;
};

export default PrivateRoute;