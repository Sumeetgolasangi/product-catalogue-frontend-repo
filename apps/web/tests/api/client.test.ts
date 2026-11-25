import { afterEach, describe, expect, it, vi } from "vitest";
import { api } from "../../src/api/client";
import { product } from "../test-utils";

afterEach(() => vi.unstubAllGlobals());

describe("API client", () => {
  it("fetches featured products", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ products: [product] }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    await expect(api.featured()).resolves.toEqual([product]);
    expect(fetchMock).toHaveBeenCalledWith("/api/products/featured", expect.objectContaining({ headers: { "Content-Type": "application/json" } }));
  });

  it("encodes product search and category query parameters", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ products: [] }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    await api.products({ search: "travel bag", category: "Home & Living" });
    expect(fetchMock.mock.calls[0][0]).toBe("/api/products?search=travel+bag&category=Home+%26+Living");
  });

  it("posts enquiry data as JSON", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ message: "ok" }), { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);
    await api.enquiry({ productId: 1, productTitle: product.title, name: "Alex", email: "alex@example.com", message: "Please send more details." });
    expect(fetchMock).toHaveBeenCalledWith("/api/enquiries", expect.objectContaining({ method: "POST", body: expect.stringContaining('"productId":1') }));
  });

  it("surfaces API error messages", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ error: { message: "Product not found" } }), { status: 404 })));
    await expect(api.product(999)).rejects.toThrow("Product not found");
  });
});
