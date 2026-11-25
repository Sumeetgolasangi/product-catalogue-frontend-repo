import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import Home from "../../src/pages/Home";
import Listing from "../../src/pages/Listing";
import ProductDetail from "../../src/pages/ProductDetail";
import { Route, Routes } from "react-router-dom";
import { api } from "../../src/api/client";
import { product, renderWithProviders } from "../test-utils";

vi.mock("../../src/api/client", () => ({
  api: { featured: vi.fn(), products: vi.fn(), product: vi.fn(), categories: vi.fn(), enquiry: vi.fn() }
}));
const mockedApi = vi.mocked(api);

describe("catalogue pages", () => {
  beforeEach(() => {
    mockedApi.featured.mockResolvedValue([product]);
    mockedApi.products.mockResolvedValue([product, { ...product, id: 2, title: "Travel Book", isTopRated: false }]);
    mockedApi.product.mockResolvedValue(product);
    mockedApi.categories.mockResolvedValue([]);
  });

  it("renders the home page featured products", async () => {
    renderWithProviders(<Home />);
    expect(await screen.findByRole("heading", { name: "Top rated products" })).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: product.title })).toBeInTheDocument();
  });

  it("loads category products and separates top-rated products", async () => {
    renderWithProviders(<Listing category="Accessories" />);
    expect(await screen.findByRole("heading", { name: "Accessories" })).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: "Top rated" })).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: "More in this category" })).toBeInTheDocument();
    expect(mockedApi.products).toHaveBeenCalledWith({ category: "Accessories", search: undefined });
  });

  it("loads search results", async () => {
    renderWithProviders(<Listing search="backpack" />);
    expect(await screen.findByRole("heading", { name: 'Search results for “backpack”' })).toBeInTheDocument();
    expect(mockedApi.products).toHaveBeenCalledWith({ category: undefined, search: "backpack" });
  });

  it("renders product detail and enquiry form", async () => {
    renderWithProviders(<Routes><Route path="/products/:id" element={<ProductDetail />} /></Routes>, { route: "/products/1" });
    expect(await screen.findByRole("heading", { name: product.title })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Enquire about this product" })).toBeInTheDocument();
    expect(mockedApi.product).toHaveBeenCalledWith(1);
  });
});
