import React from 'react';;
import Loading from '../Component/Loading/Loading';
import useAuth from '../hook/useAuth';
import useRole from '../hook/useRole';
import Forbidden from '../Component/Forbidden';

const TutorRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'tutor') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default TutorRoute;