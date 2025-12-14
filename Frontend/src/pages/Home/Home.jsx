import { useEffect, useState } from "react";
import { api } from "../../contexts/ApiContext";
import ProductsGrid from "../../components/ProductGrid";
import ProductTabs from "../../components/ProductTabs";
import EmptyState from "../../components/EmptyState";
import Toast from "../../utils/Toast";
import DeleteConfirmModal from "../../components/DeleteConfirmModel";
import useProductActions from "../../hooks/useProductActions";

export default function Home() {
    const [activeTab, setActiveTab] = useState("published");
    const [products, setProducts] = useState([]);
    const [toast, setToast] = useState({ type: "", message: "" });

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deletingProduct, setDeletingProduct] = useState(null);

    function showToast(type, message) {
        setToast({ type, message });
        setTimeout(() => setToast({ type: "", message: "" }), 3000);
    }

    async function fetchProducts() {
        const res = await api.get("/products/all");
        setProducts(res.data.data || []);
    }

    const { togglePublish, deleteProduct } =
        useProductActions(fetchProducts, showToast);

    function handleDeleteClick(product) {
        setDeletingProduct(product);
        setDeleteModalOpen(true);
    }

    async function handleConfirmDelete() {
        await deleteProduct(deletingProduct);
        setDeleteModalOpen(false);
        setDeletingProduct(null);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const filteredProducts = products.filter((p) =>
        activeTab === "published" ? p.isPublished : !p.isPublished
    );

    return (
        <div>
            <ProductTabs activeTab={activeTab} onChange={setActiveTab} />

            {filteredProducts.length === 0 ? (
                <div className="mt-16">
                    <EmptyState
                        icon="/centric-icon.png"
                        title={
                            activeTab === "published"
                                ? "No Published Products"
                                : "No Unpublished Products"
                        }
                        subtitle="Products will appear here"
                    />
                </div>
            ) : (
                <div className="mt-6">
                    <ProductsGrid
                        products={filteredProducts}
                        onTogglePublish={togglePublish}
                        onDelete={handleDeleteClick}
                    />
                </div>
            )}

            <DeleteConfirmModal
                open={deleteModalOpen}
                productName={deletingProduct?.name}
                onConfirm={handleConfirmDelete}
                onClose={() => setDeleteModalOpen(false)}
            />

            <Toast
                type={toast.type}
                message={toast.message}
                onClose={() => setToast({ type: "", message: "" })}
            />
        </div>
    );
}
