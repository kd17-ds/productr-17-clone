export default function ProductModal({
    open,
    onClose,
    mode = "add",
    formData,
    submitted,
    loading,
    onChange,
    onFileChange,
    onSubmit,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-3 sm:px-0">
            <div
                className="
                    w-full max-w-md bg-white rounded-lg shadow-lg
                    max-h-[90vh] overflow-y-auto
                "
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 className="text-sm font-medium text-gray-600">
                        {mode === "add" ? "Add Product" : "Edit Product"}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="text-gray-800 hover:text-gray-600 disabled:opacity-50"
                    >
                        ✕
                    </button>
                </div>

                <form
                    noValidate
                    onSubmit={onSubmit}
                    className="
                        px-4 py-4 space-y-3
                        sm:px-5 sm:py-5 sm:space-y-4
                        lg:px-6 lg:py-5
                    "
                >
                    {/* Product Name */}
                    <div>
                        <label className="block text-xs text-black mb-1">
                            Product Name
                        </label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                            required
                            placeholder="Enter product name"
                            className={`
                                peer w-full h-9 px-3 text-sm rounded-md
                                placeholder:text-gray-400
                                focus:outline-none focus:border-purple-600
                                border border-gray-300
                                ${submitted ? "invalid:border-red-500 focus:invalid:border-red-500" : ""}
                            `}
                        />
                        {submitted && (
                            <p className="hidden peer-invalid:block text-xs text-red-500 mt-1">
                                Product name is required
                            </p>
                        )}
                    </div>

                    {/* Product Type */}
                    <div>
                        <label className="block text-xs text-black mb-1">
                            Product Type
                        </label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={onChange}
                            required
                            className={`
                                peer w-full h-9 px-3 text-sm bg-white rounded-md
                                focus:outline-none focus:border-purple-600
                                border border-gray-300
                                ${formData.type ? "text-gray-900" : "text-gray-400"}
                                ${submitted ? "invalid:border-red-500" : ""}
                            `}
                        >
                            <option value="">Select product type</option>
                            <option>Foods</option>
                            <option>Electronics</option>
                            <option>Clothes</option>
                            <option>Beauty Products</option>
                            <option>Others</option>
                        </select>
                        {submitted && (
                            <p className="hidden peer-invalid:block text-xs text-red-500 mt-1">
                                Product type is required
                            </p>
                        )}
                    </div>

                    {/* Quantity Stock */}
                    <div>
                        <label className="block text-xs text-black mb-1">
                            Quantity Stock
                        </label>
                        <input
                            name="stock"
                            type="number"
                            min="0"
                            required
                            value={formData.stock}
                            onChange={onChange}
                            placeholder="Total numbers of stock available"
                            className={`
                                peer w-full h-9 px-3 text-sm rounded-md
                                placeholder:text-gray-400
                                focus:outline-none focus:border-purple-600
                                border border-gray-300
                                ${submitted ? "invalid:border-red-500" : ""}
                            `}
                        />
                        {submitted && (
                            <p className="hidden peer-invalid:block text-xs text-red-500 mt-1">
                                Enter a valid stock quantity
                            </p>
                        )}
                    </div>

                    {/* MRP */}
                    <div>
                        <label className="block text-xs text-black mb-1">
                            MRP
                        </label>
                        <input
                            name="mrp"
                            type="number"
                            min="0"
                            required
                            value={formData.mrp}
                            onChange={onChange}
                            placeholder="Total numbers of stock available"
                            className={`
                                peer w-full h-9 px-3 text-sm rounded-md
                                placeholder:text-gray-400
                                focus:outline-none focus:border-purple-600
                                border border-gray-300
                                ${submitted ? "invalid:border-red-500" : ""}
                            `}
                        />
                        {submitted && (
                            <p className="hidden peer-invalid:block text-xs text-red-500 mt-1">
                                Enter a valid MRP
                            </p>
                        )}
                    </div>

                    {/* Selling Price */}
                    <div>
                        <label className="block text-xs text-black mb-1">
                            Selling Price
                        </label>
                        <input
                            name="sellingPrice"
                            type="number"
                            min="0"
                            required
                            value={formData.sellingPrice}
                            onChange={onChange}
                            placeholder="Total numbers of stock available"
                            className={`
                                peer w-full h-9 px-3 text-sm rounded-md
                                placeholder:text-gray-400
                                focus:outline-none focus:border-purple-600
                                border border-gray-300
                                ${submitted ? "invalid:border-red-500" : ""}
                            `}
                        />
                        {submitted && (
                            <p className="hidden peer-invalid:block text-xs text-red-500 mt-1">
                                Enter a valid selling price
                            </p>
                        )}
                    </div>

                    {/* Brand Name */}
                    <div>
                        <label className="block text-xs text-black mb-1">
                            Brand Name
                        </label>
                        <input
                            name="brandName"
                            value={formData.brandName}
                            onChange={onChange}
                            required
                            placeholder="Total numbers of stock available"
                            className={`
                                peer w-full h-9 px-3 text-sm rounded-md
                                placeholder:text-gray-400
                                focus:outline-none focus:border-purple-600
                                border border-gray-300
                                ${submitted ? "invalid:border-red-500" : ""}
                            `}
                        />
                        {submitted && (
                            <p className="hidden peer-invalid:block text-xs text-red-500 mt-1">
                                Brand name is required
                            </p>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-xs text-black mb-1">
                            Upload Product Image
                        </label>

                        <div className="border border-dashed rounded-md py-3 sm:py-4 text-center text-xs text-gray-400">
                            JPG / PNG image <br />
                            <button
                                type="button"
                                onClick={() =>
                                    document.getElementById("product-image-input").click()
                                }
                                disabled={loading}
                                className="mt-1 text-blue-600 font-medium hover:cursor-pointer disabled:opacity-60"
                            >
                                Browse
                            </button>
                            <input
                                id="product-image-input"
                                type="file"
                                accept="image/*"
                                onChange={onFileChange}
                                required={mode === "add"}
                                className="peer hidden"
                            />
                        </div>

                        {submitted && mode === "add" && (
                            <p className="hidden peer-invalid:block text-xs text-red-500 mt-1">
                                Product image is required
                            </p>
                        )}
                    </div>

                    {/* Exchange */}
                    <div>
                        <label className="block text-xs text-black mb-1">
                            Exchange or return eligibility
                        </label>
                        <select
                            name="isExchangeReturnEligible"
                            value={formData.isExchangeReturnEligible}
                            onChange={onChange}
                            required
                            className="
                                w-full h-9 px-3 text-sm bg-white rounded-md
                                text-gray-400
                                focus:outline-none focus:border-purple-600
                                border border-gray-300
                            "
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end pt-4 border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                h-9 px-4 text-sm rounded-md
                                bg-gradient-to-b from-blue-900 to-blue-700
                                text-white hover:bg-blue-700 transition
                                disabled:opacity-60
                            "
                        >
                            {loading
                                ? mode === "add"
                                    ? "Creating..."
                                    : "Updating..."
                                : mode === "add"
                                    ? "Create"
                                    : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
