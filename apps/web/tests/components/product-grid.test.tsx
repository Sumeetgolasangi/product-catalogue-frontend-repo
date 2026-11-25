import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import ProductGrid from "../../src/components/products/ProductGrid";
import { product, renderWithProviders } from "../test-utils";

describe("ProductGrid", () => {
  it("renders an empty state when no products are supplied", () => {
    renderWithProviders(<ProductGrid products={[]} />);
    expect(screen.getByText("No products found.")).toBeInTheDocument();
  });

  it("renders product details and links to the product page", () => {
    renderWithProviders(<ProductGrid products={[product]} />);
    expect(screen.getByRole("heading", { name: product.title })).toBeInTheDocument();
    expect(screen.getByText("$49.99")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/products/1");
    expect(screen.getByRole("img", { name: product.title })).toHaveAttribute("src", product.image);
  });
});
