import { NavLink } from "react-router-dom";
import { FiHome, FiBox } from "react-icons/fi";


export default function SideBar() {
    return (
        <div className="w-64 bg-[#090e1b] text-white flex flex-col">
            <div className="border-white/10 py-5 border-b">
                <div className="px-6 ">
                    <img
                        src="/productrLogo2.png"
                        alt="logo"
                        className="mb-4"
                    />
                </div>

                <div className="px-3">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-white/10 text-sm text-white placeholder-gray-400 rounded-md pl-8 px-3 py-2 outline-none border border-white/10 focus:border-gray-500"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='gray'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z' /%3E%3C/svg%3E\")",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "8px center",
                            backgroundSize: "14px",
                        }}
                    />
                </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                <NavItem to="/" label="Home" Icon={FiHome} />
                <NavItem to="/products" label="Products" Icon={FiBox} />
            </nav>
        </div>
    );
}

function NavItem({ to, label, Icon }) {
    return (
        <NavLink
            to={to}
            end
            className={({ isActive }) =>
                `block px-8 hover:cursor-pointer py-2 rounded-md text-sm font-medium transition ${isActive ? " text-white" : "text-gray-400 hover:text-white "
                }`
            }
            style={{ position: "relative" }}
        >

            <Icon
                size={16}
                style={{
                    position: "absolute",
                    left: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    opacity: 0.7,
                }}
            />

            {label}
        </NavLink>
    );
}
