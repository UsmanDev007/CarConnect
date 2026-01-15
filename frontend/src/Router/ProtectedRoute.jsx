import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, redirectTo }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // 1. If no token, go to the specific login page for that role
    if (!token) {
        return <Navigate to={redirectTo} replace />;
    }

    // 2. If role doesn't match, go to the specific login page
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;