import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContexts/AuthContexts';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {

    const {user} = useContext(AuthContext);
    const location = useLocation();

    if(!user) {
        return <Navigate to="/login" state={location.pathname}></Navigate>
    }

    return children;;
};

export default PrivateRoute;