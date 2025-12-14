export default function DeleteConfirmModal({
    open,
    productName,
    onClose,
    onConfirm,
    loading = false,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-3">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-between px-5 py-4">
                    <h2 className="text-sm font-medium text-gray-800">
                        Delete Product
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                    >
                        ✕
                    </button>
                </div>


                <div className="px-5 py-4 text-sm text-gray-600">
                    Are you sure you really want to delete this Product
                    <span className="font-medium text-gray-800">
                        {" "}“{productName}”
                    </span>{" "}
                    ?
                </div>


                <div className="flex justify-end px-5 py-4 ">
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="px-4 h-9 text-sm rounded-md bg-gradient-to-b from-blue-900 to-blue-700 text-white hover:bg-blue-700 disabled:opacity-60 hover:cursor-pointer"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}
