import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { api } from "../../contexts/ApiContext";

export default function RightAuth() {
    const navigate = useNavigate();
    const location = useLocation();

    const mode = location.pathname.includes("signup") ? "signup" : "login";

    const [identifier, setIdentifier] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");

    const title =
        mode === "signup"
            ? "Create your Productr Account"
            : "Login to your Productr Account";

    const buttonText = mode === "signup" ? "Sign Up" : "Login";

    const bottomText =
        mode === "signup"
            ? {
                msg: "Already have a Productr Account?",
                link: "/login",
                linkText: "Login Here",
            }
            : {
                msg: "Don't have a Productr Account?",
                link: "/signup",
                linkText: "Sign Up Here",
            };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setInfo("");

        if (!identifier.trim()) {
            setError("Please enter an email or phone number.");
            return;
        }

        setLoading(true);
        try {
            const res = await api.post("/auth/request-otp", {
                identifier: identifier.trim(),
            });

            const serverMsg = res?.data?.message || res?.data?.msg;
            if (serverMsg) setInfo(serverMsg);

            localStorage.setItem("pendingIdentifier", identifier.trim());
            navigate("/verify-otp");
        } catch (err) {
            const serverErr =
                err?.response?.data?.error ||
                err?.response?.data?.message ||
                err?.response?.data?.msg;

            setError(serverErr || err?.message || "Network error — please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center bg-primary min-h-screen">
            <div className="w-[440px] md:w-[420px] sm:w-[360px] px-8 py-12">
                <h2 className="text-center text-[22px] lg:text-[24px] font-semibold text-sectxt mb-8">
                    {title}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block text-sm text-txt font-semibold">
                        Email or Phone number
                    </label>

                    <input
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Enter email or phone number"
                        className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white
                       focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm text-sectxt"
                        disabled={loading}
                    />

                    {error && <div className="text-sm text-red-600">{error}</div>}
                    {info && <div className="text-sm text-green-700">{info}</div>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 py-3 rounded-md bg-cards text-white font-medium text-sm
                       disabled:opacity-60 hover:cursor-pointer"
                    >
                        {loading ? "Processing..." : buttonText}
                    </button>
                </form>

                <div className="mt-56">
                    <div className="md:w-[360px] sm:w-[300px] border border-gray-300 rounded-lg p-4 text-center bg-white/60">
                        <div className="text-xs text-gray-500 mb-1">{bottomText.msg}</div>
                        <Link
                            to={bottomText.link}
                            className="text-sm font-semibold text-sectxt"
                        >
                            {bottomText.linkText}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
