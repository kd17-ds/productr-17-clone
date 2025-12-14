import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const isLoggedIn = !!localStorage.getItem("user");

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
