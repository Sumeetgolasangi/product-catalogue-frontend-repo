import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/common/Loading";
import ErrorState from "../components/common/ErrorState";
import EnquiryForm from "../components/enquiry/EnquiryForm";
import { api } from "../api/client";

export default function ProductDetail() {
  const { id = "" } = useParams();
  const query = useQuery({
    queryKey: ["product", id],
    queryFn: () => api.product(Number(id))
  });

  if (query.isLoading) return <Loading />;

  if (query.isError) {
    return (
      <main className="section">
        <ErrorState message={query.error.message} />
      </main>
    );
  }

  const product = query.data!;

  return (
    <main className="section detail">
      <Link to="/" className="back">← Back to catalogue</Link>
      <div className="detail-layout">
        <div className="detail-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.title}</h1>
          <p className="rating">★ {product.rating.rate} · {product.rating.count} reviews</p>
          <h2>${product.price.toFixed(2)}</h2>
          <p>{product.description}</p>
          <EnquiryForm product={product} />
        </div>
      </div>
    </main>
  );
}
