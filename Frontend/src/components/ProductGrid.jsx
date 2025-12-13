import ProductCard from "./ProductCard";

export default function ProductsGrid({ products, onEdit }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
}
