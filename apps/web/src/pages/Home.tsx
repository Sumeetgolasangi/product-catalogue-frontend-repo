import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import Loading from "../components/common/Loading";
import ErrorState from "../components/common/ErrorState";
import ProductGrid from "../components/products/ProductGrid";

export default function Home() {
  const query = useQuery({ queryKey: ["featured"], queryFn: api.featured });

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">CURATED FOR YOU</p>
        <h1>Find something<br />worth keeping.</h1>
        <p>Explore our collection of customer-rated favourites.</p>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE COMMUNITY PICKS</p>
            <h2>Top rated products</h2>
          </div>
        </div>
        {query.isLoading ? (
          <Loading />
        ) : query.isError ? (
          <ErrorState message={query.error.message} />
        ) : (
          <ProductGrid products={query.data ?? []} />
        )}
      </section>
    </main>
  );
}
