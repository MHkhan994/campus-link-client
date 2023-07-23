import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const loaction = useLocation()

    if (loading) {
        return <div className="h-[90vh] flex justify-center items-center">
            <ScaleLoader color="rgb(22 163 74)" />
        </div>
    }
    else if (user) {
        return children
    }

    return <Navigate to={'/login'} ></Navigate>
};

export default PrivateRoute;