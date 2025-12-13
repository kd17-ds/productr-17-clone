import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";
import NavBar from "../components/NavBar";

export default function AppLayout() {
    return (
        <div className="flex h-screen bg-white">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <NavBar />
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

