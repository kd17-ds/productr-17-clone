export default function EmptyState({
    icon,
    title,
    subtitle,
    actionLabel,
    onAction,
}) {
    return (
        <div className="flex flex-col items-center justify-center text-center h-[60vh]">
            <img src={icon} alt="empty-state" className="w-16 h-16 mb-4" />

            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

            <p className="text-sm text-gray-400 mt-1">{subtitle} <br /> Create your first product to publish</p>

            {actionLabel && (
                <button
                    onClick={onAction}
                    className="mt-6 bg-gradient-to-b from-blue-900 to-blue-700 text-white px-16 py-2 rounded-md transition hover:cursor-pointer hover:opacity-90"

                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
}
