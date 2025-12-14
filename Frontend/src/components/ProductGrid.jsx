import ProductCard from "./ProductCard";

export default function ProductsGrid({
    products,
    onEdit,
    onTogglePublish,
    onDelete,
}) {
    return (
        <div className="
            grid gap-4 justify-center
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
        ">
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                    onEdit={onEdit}
                    onTogglePublish={onTogglePublish}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
