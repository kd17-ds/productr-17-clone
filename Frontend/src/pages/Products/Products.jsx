import { useEffect, useState } from "react";
import { api } from "../../contexts/ApiContext";
import ProductsGrid from "../../components/ProductGrid";
import EmptyState from "../../components/EmptyState";
import ProductModal from "../../components/ProductModal";
import Toast from "../../utils/Toast";
import DeleteConfirmModal from "../../components/DeleteConfirmModel";
import useProductActions from "../../hooks/useProductActions";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState("add");
    const [submitted, setSubmitted] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deletingProduct, setDeletingProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ type: "", message: "" });

    const [formData, setFormData] = useState({
        name: "",
        type: "",
        stock: "",
        mrp: "",
        sellingPrice: "",
        brandName: "",
        isExchangeReturnEligible: "true",
    });

    function showToast(type, message) {
        setToast({ type, message });
        setTimeout(() => setToast({ type: "", message: "" }), 3000);
    }

    async function fetchProducts() {
        try {
            const res = await api.get("/products/all");
            setProducts(res.data.data || []);
        } catch (err) {
            console.error("Fetch products failed:", err);
            setProducts([]);
        }
    }

    const { togglePublish, deleteProduct, loadingId } =
        useProductActions(fetchProducts, showToast);

    useEffect(() => {
        fetchProducts();
    }, []);

    function handleAddProduct() {
        setMode("add");
        resetForm();
        setEditingProductId(null);
        setImageFile(null);
        setSubmitted(false);
        setModalOpen(true);
    }

    function handleFileChange(e) {
        setImageFile(e.target.files[0]);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleEditProduct(product) {
        setMode("edit");
        setSubmitted(false);
        setEditingProductId(product._id);
        setImageFile(null);
        setFormData({
            name: product.name,
            type: product.type,
            stock: product.stock,
            mrp: product.mrp,
            sellingPrice: product.sellingPrice,
            brandName: product.brandName,
            isExchangeReturnEligible: String(product.isExchangeReturnEligible),
        });
        setModalOpen(true);
    }

    function handleDeleteClick(product) {
        setDeletingProduct(product);
        setDeleteModalOpen(true);
    }

    async function handleConfirmDelete() {
        await deleteProduct(deletingProduct);
        setDeleteModalOpen(false);
        setDeletingProduct(null);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);

        const form = e.target;
        if (!form.checkValidity()) return;

        try {
            setLoading(true);

            const payload = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                payload.append(key, value);
            });

            if (imageFile) payload.append("image", imageFile);

            if (mode === "add") {
                await api.post("/products/add", payload);
                showToast("success", "Product added successfully");
            } else {
                await api.put(`/products/${editingProductId}`, payload);
                showToast("success", "Product updated successfully");
            }

            setModalOpen(false);
            setEditingProductId(null);
            setImageFile(null);
            fetchProducts();
        } catch (err) {
            const msg =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "Something went wrong";
            showToast("error", msg);
        } finally {
            setLoading(false);
        }
    }

    function resetForm() {
        setFormData({
            name: "",
            type: "",
            stock: "",
            mrp: "",
            sellingPrice: "",
            brandName: "",
            isExchangeReturnEligible: "true",
        });
    }

    return (
        <div>
            {products.length === 0 ? (
                <div className="mt-16">
                    <EmptyState
                        icon="/centric-icon.png"
                        title="Feels a little empty over here..."
                        subtitle="You can create products without connecting store"
                        actionLabel="Add your Products"
                        onAction={handleAddProduct}
                    />
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-medium text-gray-800">
                            Products
                        </h1>
                        <button
                            onClick={handleAddProduct}
                            className="text-xl text-gray-600 font-medium hover:cursor-pointer"
                        >
                            + &nbsp;Add Product
                        </button>
                    </div>

                    <div className="mt-6">
                        <ProductsGrid
                            products={products}
                            onEdit={handleEditProduct}
                            onTogglePublish={togglePublish}
                            onDelete={handleDeleteClick}
                        />
                    </div>
                </>
            )}

            <ProductModal
                open={modalOpen}
                mode={mode}
                formData={formData}
                submitted={submitted}
                loading={loading}
                onClose={() => setModalOpen(false)}
                onChange={handleChange}
                onFileChange={handleFileChange}
                onSubmit={handleSubmit}
            />

            <DeleteConfirmModal
                open={deleteModalOpen}
                productName={deletingProduct?.name}
                loading={loadingId === deletingProduct?._id}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />

            <Toast
                type={toast.type}
                message={toast.message}
                onClose={() => setToast({ type: "", message: "" })}
            />
        </div>
    );
}
