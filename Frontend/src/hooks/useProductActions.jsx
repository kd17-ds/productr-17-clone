import { useState } from "react";
import { api } from "../contexts/ApiContext";

export default function useProductActions(fetchProducts, showToast) {
    const [loadingId, setLoadingId] = useState(null);

    async function togglePublish(product) {
        try {
            setLoadingId(product._id);

            await api.patch(`/products/${product._id}/publish`);

            showToast(
                "success",
                product.isPublished
                    ? "Product unpublished successfully"
                    : "Product published successfully"
            );

            fetchProducts();
        } catch (err) {
            showToast(
                "error",
                err?.response?.data?.message ||
                "Failed to update publish status"
            );
        } finally {
            setLoadingId(null);
        }
    }

    async function deleteProduct(product) {
        try {
            setLoadingId(product._id);

            await api.delete(`/products/${product._id}`);

            showToast("success", "Product deleted successfully");
            fetchProducts();
        } catch (err) {
            showToast(
                "error",
                err?.response?.data?.message || "Delete failed"
            );
        } finally {
            setLoadingId(null);
        }
    }

    return {
        togglePublish,
        deleteProduct,
        loadingId,
    };
}
