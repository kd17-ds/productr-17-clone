import { FiCheckCircle, FiXCircle, FiX } from "react-icons/fi";

export default function Toast({ type = "success", message, onClose }) {
    if (!message) return null;

    const isSuccess = type === "success";

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]">
            <div
                className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg
                    bg-white border
                    ${isSuccess ? "border-green-200" : "border-red-200"}
                `}
            >
                {isSuccess ? (
                    <FiCheckCircle className="text-green-600 text-lg" />
                ) : (
                    <FiXCircle className="text-red-600 text-lg" />
                )}

                <span className="text-sm text-gray-800">
                    {message}
                </span>

                <button
                    onClick={onClose}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                >
                    <FiX />
                </button>
            </div>
        </div>
    );
}
