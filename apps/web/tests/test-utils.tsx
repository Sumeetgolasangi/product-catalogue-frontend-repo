import type { PropsWithChildren, ReactElement } from "react";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";

export function renderWithProviders(
  ui: ReactElement,
  { route = "/" }: { route?: string } = {}
) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } }
  });
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{children}</MemoryRouter>
      </QueryClientProvider>
    );
  }
  return { ...render(ui, { wrapper: Wrapper }), queryClient };
}

export const product = {
  id: 1,
  title: "Classic Backpack",
  price: 49.99,
  description: "A durable everyday backpack.",
  category: "Accessories",
  image: "https://example.com/backpack.jpg",
  rating: { rate: 4.5, count: 120 },
  isTopRated: true
};
