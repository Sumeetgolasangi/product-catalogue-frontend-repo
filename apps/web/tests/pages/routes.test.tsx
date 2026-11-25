import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import CategoryRoute from "../../src/pages/CategoryRoute";
import SearchRoute from "../../src/pages/SearchRoute";
import { api } from "../../src/api/client";
import { product, renderWithProviders } from "../test-utils";

vi.mock("../../src/api/client", () => ({
  api: { products: vi.fn() }
}));
const products = vi.mocked(api.products);

describe("URL-driven routes", () => {
  beforeEach(() => products.mockResolvedValue([product]));

  it("reads and decodes the category route parameter", async () => {
    renderWithProviders(
      <Routes><Route path="/category/:name" element={<CategoryRoute />} /></Routes>,
      { route: "/category/Home%20%26%20Living" }
    );
    expect(await screen.findByRole("heading", { name: "Home & Living" })).toBeInTheDocument();
    expect(products).toHaveBeenCalledWith({ category: "Home & Living", search: undefined });
  });

  it("reads the q search parameter", async () => {
    renderWithProviders(
      <Routes><Route path="/search" element={<SearchRoute />} /></Routes>,
      { route: "/search?q=travel%20bag" }
    );
    expect(await screen.findByRole("heading", { name: 'Search results for “travel bag”' })).toBeInTheDocument();
    expect(products).toHaveBeenCalledWith({ category: undefined, search: "travel bag" });
  });
});
