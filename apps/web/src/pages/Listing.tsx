import { useQuery } from "@tanstack/react-query";
import type { Product } from "@catalogue/contracts";
import { api } from "../api/client";
import Loading from "../components/common/Loading";
import ErrorState from "../components/common/ErrorState";
import ProductGrid from "../components/products/ProductGrid";

type ListingProps = {
  category?: string;
  search?: string;
};

export default function Listing({ category, search }: ListingProps) {
  const query = useQuery({
    queryKey: ["products", category, search],
    queryFn: () => api.products({ category, search })
  });
  const title = category ?? `Search results for “${search ?? ""}”`;
  const products: Product[] = query.data ?? [];

  return (
    <main className="section listing">
      <p className="eyebrow">EXPLORE THE COLLECTION</p>
      <h1>{title}</h1>
      {query.isLoading ? (
        <Loading />
      ) : query.isError ? (
        <ErrorState message={query.error.message} />
      ) : (
        <>
          {category && (
            <>
              <h2 className="subheading">Top rated</h2>
              <ProductGrid products={products.filter(product => product.isTopRated)} />
              <h2 className="subheading">More in this category</h2>
            </>
          )}
          <ProductGrid products={products.filter(product => !category || !product.isTopRated)} />
        </>
      )}
    </main>
  );
}
