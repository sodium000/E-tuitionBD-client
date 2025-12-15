import React from 'react';;
import Loading from '../Component/Loading/Loading';
import Forbidden from '../Component/Forbidden/Forbidden';
import useAuth from '../hook/useAuth';
import useRole from '../hook/useRole';

const AdminRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'admin') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;