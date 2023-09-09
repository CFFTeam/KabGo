import { authStorage } from "@utils/storage";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    return authStorage.isAuthenticated() ? <Outlet/> : <Navigate to = "/"/>;
}

export default ProtectedRoute;