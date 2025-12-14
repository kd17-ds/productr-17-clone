import { FiTrash2 } from "react-icons/fi";

export default function ProductCard({
    product,
    onEdit,
    onTogglePublish,
    onDelete,
}) {
    const isPublished = product.isPublished;

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-lg transition ">
            {/* Image */}
            <div className="relative w-full h-44 bg-gray-50 border border-gray-300 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                {product.image?.url ? (
                    <img
                        src={product.image.url}
                        alt={product.name}
                        className="h-full object-contain"
                    />
                ) : (
                    <span className="text-xs text-gray-400">No Image</span>
                )}
            </div>

            {/* Name */}
            <h3 className="text-sm font-semibold text-gray-900 mb-2 truncate">
                {product.name}
            </h3>

            {/* Details */}
            <div className="space-y-1.5 text-sm text-gray-400">
                <div className="flex justify-between">
                    <span>Product type -</span>
                    <span className="text-gray">{product.type}</span>
                </div>
                <div className="flex justify-between">
                    <span>Quantity Stock -</span>
                    <span className="text-black">{product.stock}</span>
                </div>
                <div className="flex justify-between">
                    <span>MRP -</span>
                    <span className="text-black">₹ {product.mrp}</span>
                </div>
                <div className="flex justify-between">
                    <span>Selling Price -</span>
                    <span className="text-black">₹ {product.sellingPrice}</span>
                </div>
                <div className="flex justify-between">
                    <span>Brand Name -</span>
                    <span className="text-black">{product.brandName}</span>
                </div>
                <div className="flex justify-between">
                    <span>Exchange Eligibility -</span>
                    <span className="text-black">
                        {product.isExchangeReturnEligible ? "YES" : "NO"}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-4">
                <button
                    onClick={() => onTogglePublish(product)}
                    className={`flex-1 h-10 text-xs font-medium rounded-md ${isPublished
                        ? " bg-gradient-to-b from-green-600 to-green-400 text-white"
                        : " bg-gradient-to-b from-blue-900 to-blue-700 text-white"
                        } hover:cursor-pointer`}
                >
                    {isPublished ? "Unpublish" : "Publish"}
                </button>

                <button
                    disabled={!onEdit}
                    onClick={() => onEdit && onEdit(product)}
                    className={`flex-1 h-10 text-xs font-medium border rounded-md
        ${onEdit
                            ? "border-gray-300 hover:border-black text-black-700 hover:bg-black-50 hover:cursor-pointer"
                            : "border-gray-200 hover:border-black text-black-400 cursor-not-allowed bg-black-100"
                        }`}
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(product)}
                    className="hover:cursor-pointer h-10 w-10 flex items-center justify-center border border-gray-300 rounded-md text-gray-500 hover:text-red-600 hover:border-red-300"
                >
                    <FiTrash2 size={18} />
                </button>
            </div>

        </div>
    );
}
