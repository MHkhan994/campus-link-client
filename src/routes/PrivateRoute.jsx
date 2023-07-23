import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const loaction = useLocation()

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    else if (user) {
        return children
    }

    return <Navigate to={'/login'} state={{ from: loaction }} ></Navigate>
};

export default PrivateRoute;