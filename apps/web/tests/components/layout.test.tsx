import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { useLocation } from "react-router-dom";
import Header from "../../src/components/layout/Header";
import Footer from "../../src/components/layout/Footer";
import { renderWithProviders } from "../test-utils";
import { api } from "../../src/api/client";

vi.mock("../../src/api/client", () => ({ api: { categories: vi.fn() } }));
const mockedCategories = vi.mocked(api.categories);

function CurrentLocation() {
  const location = useLocation();
  return <output data-testid="current-location">{location.pathname}{location.search}</output>;
}

describe("layout components", () => {
  beforeEach(() => mockedCategories.mockResolvedValue(["Accessories", "Books"]));

  it("renders brand, home and categories in the header", async () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole("link", { name: /catalogue/i })).toHaveAttribute("href", "/");
    expect(await screen.findByRole("link", { name: "Accessories" })).toHaveAttribute("href", "/category/Accessories");
    expect(screen.getByRole("link", { name: "Books" })).toBeInTheDocument();
  });

  it("navigates to search using the submitted search term", async () => {
    renderWithProviders(<><Header /><CurrentLocation /></>);
    const input = screen.getByRole("textbox", { name: "Search products" });
    fireEvent.change(input, { target: { value: "travel bag" } });
    fireEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(await screen.findByRole("link", { name: "Accessories" })).toBeInTheDocument();
    expect(screen.getByTestId("current-location")).toHaveTextContent("/search?q=travel%20bag");
  });

  it("renders the footer", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText(/© 2026 Catalogue/)).toBeInTheDocument();
  });
});
