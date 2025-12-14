import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../contexts/ApiContext";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 30;

const getRemainingTime = () => {
    const until = Number(localStorage.getItem("otp_resend_until"));
    if (!until) return 0;
    const diff = Math.ceil((until - Date.now()) / 1000);
    return diff > 0 ? diff : 0;
};

export default function RightVerifyOtp() {
    const navigate = useNavigate();
    const inputRefs = useRef([]);

    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [resendTimer, setResendTimer] = useState(getRemainingTime);
    const [verified, setVerified] = useState(false);

    const identifier = localStorage.getItem("pendingIdentifier");
    useEffect(() => {
        if (!identifier && !verified) {
            navigate("/login", { replace: true });
        }
    }, [identifier, verified, navigate]);

    useEffect(() => {
        if (resendTimer <= 0) return;

        const interval = setInterval(() => {
            setResendTimer((t) => t - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [resendTimer]);

    const handleChange = (i, val) => {
        if (!/^\d?$/.test(val)) return;

        const next = [...otp];
        next[i] = val;
        setOtp(next);

        if (val && i < OTP_LENGTH - 1) {
            inputRefs.current[i + 1]?.focus();
        }
    };

    const handleKeyDown = (i, e) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            const next = [...otp];

            if (otp[i]) {
                next[i] = "";
                setOtp(next);
            } else if (i > 0) {
                inputRefs.current[i - 1]?.focus();
            }
        }

        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, OTP_LENGTH);

        if (!pasted) return;

        const next = Array(OTP_LENGTH).fill("");
        pasted.split("").forEach((d, i) => (next[i] = d));
        setOtp(next);

        inputRefs.current[Math.min(pasted.length, OTP_LENGTH) - 1]?.focus();
    };

    const handleSubmit = async () => {
        setError("");

        if (otp.some((d) => d === "")) {
            setError("Please enter a valid OTP");
            return;
        }

        setLoading(true);
        try {
            const res = await api.post("/auth/verify-otp", {
                identifier,
                otp: otp.join(""),
            });
            setVerified(true);
            localStorage.removeItem("pendingIdentifier");
            localStorage.removeItem("otp_resend_until");
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/home");
        } catch (err) {
            setError(err?.response?.data?.error || "Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (resendTimer > 0) return;

        try {
            await api.post("/auth/request-otp", { identifier });

            const until = Date.now() + RESEND_COOLDOWN * 1000;
            localStorage.setItem("otp_resend_until", until.toString());

            setOtp(Array(OTP_LENGTH).fill(""));
            setResendTimer(RESEND_COOLDOWN);
            inputRefs.current[0]?.focus();
        } catch (err) {
            setError(err?.response?.data?.error || "Failed to resend OTP");
        }
    };

    return (
        <div className="flex-1 flex  justify-center bg-primary min-h-screen">
            <div className="w-[440px] md:w-[420px] sm:w-[360px] px-8 py-12 md:mt-25">
                <h2 className="text-center text-[22px] lg:text-[24px] font-semibold text-sectxt mb-6">
                    Login to your Productr Account
                </h2>

                <div className="mb-2 text-sm text-txt font-semibold">Enter OTP</div>

                <div
                    className="flex w-full justify-between mb-2 space-y-2"
                    onPaste={handlePaste}
                >
                    {otp.map((d, i) => (
                        <input
                            key={i}
                            ref={(el) => (inputRefs.current[i] = el)}
                            value={d}
                            maxLength={1}
                            inputMode="numeric"
                            autoFocus={i === 0}
                            onChange={(e) => handleChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            className={`w-10 h-10 text-center text-lg rounded-md border
                focus:outline-none focus:ring-2 focus:ring-purple-300
                ${error ? "border-red-400" : "border-gray-300"}`}
                        />
                    ))}
                </div>

                {error && <div className="text-sm text-red-600">{error}</div>}

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-3 rounded-md mt-3 bg-cards text-white font-medium disabled:opacity-60 hover:cursor-pointer"
                >
                    {loading ? "Verifying..." : "Enter your OTP"}
                </button>

                <div className="text-sm text-center mt-5 text-gray-500">
                    Didn’t receive OTP?{" "}
                    <span
                        onClick={handleResend}
                        className={`font-medium ${resendTimer > 0
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-sectxt cursor-pointer"
                            }`}
                    >
                        {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
                    </span>
                </div>
            </div>
        </div>
    );
}
