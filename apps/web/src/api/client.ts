import type { Product, Enquiry } from "@catalogue/contracts";
const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`/api${path}`, {
    ...init, headers: { "Content-Type": "application/json", ...init?.headers }
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error?.message ?? "Something went wrong");
  }
  return response.json() as Promise<T>;
};
export const api = {
  featured: () => request<{ products: Product[] }>("/products/featured").then(r => r.products),
  products: (params: { search?: string; category?: string } = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.set("search", params.search);
    if (params.category) query.set("category", params.category);
    return request<{ products: Product[] }>(`/products${query.size ? `?${query}` : ""}`).then(r => r.products);
  },
  categories: () => request<{ categories: string[] }>("/categories").then(r => r.categories),
  product: (id: number) => request<Product>(`/products/${id}`),
  enquiry: (data: Enquiry) => request<{ message: string }>("/enquiries", { method: "POST", body: JSON.stringify(data) })
};
