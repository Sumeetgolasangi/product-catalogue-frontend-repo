import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/client";

export default function Header() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const categories = useQuery({ queryKey: ["categories"], queryFn: api.categories });

  return (
    <header className="header">
      <Link className="brand" to="/">CATALOGUE<span>.</span></Link>
      <nav>
        <Link to="/">Home</Link>
        {categories.data?.map(category => (
          <Link key={category} to={`/category/${encodeURIComponent(category)}`}>{category}</Link>
        ))}
      </nav>
      <form className="search" onSubmit={event => {
        event.preventDefault();
        navigate(`/search?q=${encodeURIComponent(term)}`);
      }}>
        <input
          aria-label="Search products"
          placeholder="Search products..."
          value={term}
          onChange={event => setTerm(event.target.value)}
        />
        <button>Search</button>
      </form>
    </header>
  );
}
