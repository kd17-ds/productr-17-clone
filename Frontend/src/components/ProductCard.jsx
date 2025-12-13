export default function ProductCard({ product, onEdit }) {
    return (
        <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-sm transition">
            {/* Image */}
            <div className="h-36 w-full bg-gray-100 rounded-md overflow-hidden mb-3">
                {product.image?.url ? (
                    <img
                        src={product.image.url}
                        alt={product.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">
                        No Image
                    </div>
                )}
            </div>

            {/* Name */}
            <h3 className="text-sm font-medium text-gray-800 truncate">
                {product.name}
            </h3>

            {/* Brand */}
            <p className="text-xs text-gray-500 mt-0.5">
                {product.brandName}
            </p>

            {/* Prices */}
            <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-semibold text-gray-900">
                    ₹{product.sellingPrice}
                </span>
                <span className="text-xs text-gray-400 line-through">
                    ₹{product.mrp}
                </span>
            </div>

            {/* Stock */}
            <div className="mt-1 text-xs text-gray-500">
                Stock: {product.stock}
            </div>

            {/* Actions */}
            <div className="flex justify-end mt-3">
                <button
                    onClick={() => onEdit(product)}
                    className="text-xs text-blue-600 hover:underline"
                >
                    Edit
                </button>
            </div>
        </div>
    );
}
