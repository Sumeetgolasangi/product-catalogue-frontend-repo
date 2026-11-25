import { expect, test } from "@playwright/test";

const backpack = {
  id: 1,
  title: "Classic Backpack",
  price: 49.99,
  description: "A durable everyday backpack.",
  category: "Accessories",
  image: "https://example.com/backpack.jpg",
  rating: { rate: 4.5, count: 120 },
  isTopRated: true
};
const book = {
  ...backpack,
  id: 2,
  title: "Travel Book",
  price: 19.5,
  category: "Books",
  isTopRated: false
};

async function mockCatalogueApi(page: import("@playwright/test").Page) {
  await page.route("**/api/**", async route => {
    const url = new URL(route.request().url());
    const path = url.pathname;
    if (path.endsWith("/categories")) {
      return route.fulfill({ json: { categories: ["Accessories", "Books"] } });
    }
    if (path.endsWith("/products/featured")) {
      return route.fulfill({ json: { products: [backpack] } });
    }
    if (path.endsWith("/products/1")) {
      return route.fulfill({ json: backpack });
    }
    if (path.endsWith("/products")) {
      return route.fulfill({ json: { products: [backpack, book] } });
    }
    if (path.endsWith("/enquiries")) {
      return route.fulfill({ status: 201, json: { message: "Enquiry received" } });
    }
    return route.fulfill({ status: 404, json: { error: { message: "Not found" } } });
  });
}

test.beforeEach(async ({ page }) => {
  await mockCatalogueApi(page);
});

test("home page displays featured products and category navigation", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Top rated products" })).toBeVisible();
  await expect(page.getByRole("heading", { name: backpack.title })).toBeVisible();
  await expect(page.getByRole("link", { name: "Accessories" })).toBeVisible();
});

test("customer can search and browse a category", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("textbox", { name: "Search products" }).fill("travel bag");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page).toHaveURL(/\/search\?q=travel%20bag/);
  await expect(page.getByRole("heading", { name: 'Search results for “travel bag”' })).toBeVisible();

  await page.getByRole("link", { name: "Books" }).click();
  await expect(page).toHaveURL(/\/category\/Books/);
  await expect(page.getByRole("heading", { name: "Books" })).toBeVisible();
});

test("customer can open a product and submit an enquiry", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: new RegExp(backpack.title) }).click();
  await expect(page).toHaveURL(/\/products\/1$/);
  await expect(page.getByRole("heading", { name: "Enquire about this product" })).toBeVisible();

  await page.getByLabel("Your name").fill("Alex Customer");
  await page.getByLabel("Email address").fill("alex@example.com");
  await page.getByLabel("Phone (optional)").fill("9876543210");
  await page.getByLabel("Message").fill("Please share availability and delivery details.");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByRole("heading", { name: "Thank you!" })).toBeVisible();
});

test("enquiry form blocks invalid submissions", async ({ page }) => {
  await page.goto("/products/1");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByText(/at least 1 character/i).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Thank you!" })).toHaveCount(0);
});

test("product API failure shows an error state", async ({ page }) => {
  await page.route("**/api/products/404", route => route.fulfill({
    status: 404,
    json: { error: { message: "Product not found" } }
  }));
  await page.goto("/products/404");
  await expect(page.getByText("Product not found")).toBeVisible();
});
