import { useEffect, useState } from "react";
import { api } from "../../contexts/ApiContext";
import ProductsGrid from "../../components/ProductGrid";
import EmptyState from "../../components/EmptyState";
import ProductModal from "../../components/ProductModal";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState("add");
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        type: "",
        stock: "",
        mrp: "",
        sellingPrice: "",
        brandName: "",
        isExchangeReturnEligible: "true",
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        try {
            const res = await api.get("/products/all");
            setProducts(res.data.data || []);
        } catch (err) {
            console.error("Fetch products failed:", err);
            setProducts([]);
        }
    }

    function handleAddProduct() {
        setMode("add");
        resetForm();
        setSubmitted(false);
        setModalOpen(true);
    }

    function handleFileChange(e) {
        setImageFile(e.target.files[0]);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleEditProduct(product) {
        setMode("edit");
        setSubmitted(false);
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

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);

        const form = e.target;

        if (!form.checkValidity()) {
            return;
        }

        try {
            const payload = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                payload.append(key, value);
            });

            if (imageFile) {
                payload.append("image", imageFile);
            }

            if (mode === "add") {
                await api.post("/products/add", payload);
            }

            setModalOpen(false);
            fetchProducts();
        } catch (err) {
            console.error("Product submit failed:", err);
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
                        <h1 className="text-lg font-medium text-gray-800">Products</h1>
                        <button
                            onClick={handleAddProduct}
                            className="text-sm text-blue-600 font-medium"
                        >
                            + Add Product
                        </button>
                    </div>

                    <div className="mt-6">
                        <ProductsGrid products={products} onEdit={handleEditProduct} />
                    </div>
                </>
            )}

            <ProductModal
                open={modalOpen}
                mode={mode}
                formData={formData}
                submitted={submitted}
                onClose={() => setModalOpen(false)}
                onChange={handleChange}
                onFileChange={handleFileChange}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
