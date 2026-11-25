import { Link } from "react-router-dom";
import type { Product } from "@catalogue/contracts";

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return <p className="state">No products found.</p>;
  }

  return (
    <div className="grid">
      {products.map(product => (
        <Link className="product-card" to={`/products/${product.id}`} key={product.id}>
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-info">
            <span className="category">{product.category}</span>
            <h3>{product.title}</h3>
            <div className="product-meta">
              <strong>${product.price.toFixed(2)}</strong>
              <span>★ {product.rating.rate} ({product.rating.count})</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
