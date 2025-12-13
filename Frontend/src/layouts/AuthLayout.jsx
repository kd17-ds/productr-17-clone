import LeftAuth from "../pages/Auth/LeftAuth";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex">
            <LeftAuth />
            <Outlet />
        </div>
    );
}
