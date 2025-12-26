import React from 'react'
import { useAppState } from '../customHooks/useAppState'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

    const { loading, user, isAuthenticated } = useAppState();
    if (loading) return <div>Loading...</div>; // Or your Loader component
    if (!user || !isAuthenticated) return <Navigate to="/login" replace />;
    return children
}

export default ProtectedRoute
