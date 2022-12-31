import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/Authprovider';


const AdminRout = ({ children }) => {
    const { admin, adminLoading, loading } = useContext(AuthContext);
    const location = useLocation();

    console.log(admin);
    if (adminLoading) {
        return <div className='my-[200px]'>
            <progress className="progress w-56"></progress>
        </div>;
    }


    if (admin?.role === 'admin') {
        return children;
    }
    return <>
        {alert('Please login with admin email and password')}
        <Navigate to='/signin' state={{ from: location }} replace></Navigate>
    </>
};

export default AdminRout;