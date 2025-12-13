import { useLocation } from "react-router-dom";
import { FiChevronDown, FiBox } from "react-icons/fi";

export default function NavBar() {
    const location = useLocation();
    const showSearch = location.pathname === "/products";

    return (
        <div
            className="h-14 border-b border-gray-200 flex items-center justify-between px-10"
            style={{
                background:
                    "linear-gradient(90deg, #ffe4e6 0%, #ffffff 50%, #e0f2fe 100%)",
            }}
        >
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                {showSearch && (
                    <>
                        <FiBox size={16} className="text-gray-600" />
                        <span>Products</span>
                    </>
                )}
            </div>

            {showSearch && (
                <div className="flex-1 flex justify-end mr-6">
                    <input
                        type="text"
                        placeholder="Search Services, Products"
                        className="w-full max-w-sm px-3 py-1.5 text-sm rounded-md bg-gray-200 text-gray-700 placeholder-gray-500 focus:outline-none"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='gray'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z' /%3E%3C/svg%3E\")",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "8px center",
                            backgroundSize: "14px",
                            paddingLeft: "32px",
                        }}
                    />
                </div>
            )}

            <div className="flex items-center gap-2">
                <img
                    src="/user.png"
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                />

                <FiChevronDown
                    size={20}
                    className="text-gray-600"
                />
            </div>

        </div>
    );
}
