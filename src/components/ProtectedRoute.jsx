import React from 'react';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {

    const { isLogin } = useSelector(store => store.user);

    if (!isLogin) {
        toast.error('You are not login 😫', { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored", });

        return <Navigate to="/login" />
    }

    return (
        children
    )
}

export default ProtectedRoute