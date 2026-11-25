
# Product Catalogue

A modern, responsive product catalogue application built with **React, TypeScript, and Vite**. The application allows customers to browse products, explore categories, search the catalogue, view product details, and submit product enquiries.

The project follows a modular, component-based architecture with reusable UI components, centralized API communication, shared validation contracts, and automated testing.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [Application Routes](#application-routes)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Form Validation](#form-validation)
- [Testing Strategy](#testing-strategy)
- [Running Tests](#running-tests)
- [Code Quality](#code-quality)
- [Error Handling](#error-handling)
- [Design Decisions](#design-decisions)
- [Future Improvements](#future-improvements)

---

## Overview

The Product Catalogue is an enquiry-based e-commerce application.

Customers can:

1. Browse featured products.
2. Explore products by category.
3. Search for products.
4. View detailed product information.
5. Submit enquiries for products they are interested in.

The application focuses on providing a simple and intuitive browsing experience while maintaining a scalable and maintainable codebase.

**Scope of the MVP:** This application supports product discovery and enquiry submission. It does not include shopping cart, payment processing, or checkout functionality.

## Features

### Product Discovery
- Display featured products on the home page.
- Browse the complete product catalogue.
- Explore products by category.
- View top-rated products separately.
- Display product information using reusable product cards.

### Search
- Search products using keywords.
- Display matching search results.
- Support URL-driven search queries.

### Product Details
- View individual product information.
- Display product images, descriptions, pricing, and other available details.
- Navigate from product listings to product detail pages.

### Product Enquiries
- Submit enquiries for individual products.
- Validate required form fields.
- Validate message length.
- Display submission success and error feedback.
- Include a honeypot field to help detect automated submissions.

### User Experience
- Responsive layouts.
- Reusable loading and error states.
- Consistent navigation.
- Shared components and styling.
- Client-side routing.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| React 18 | UI development |
| TypeScript | Static typing |
| Vite | Development server and build tooling |
| React Router | Client-side routing |
| TanStack Query | Server state and API caching |
| React Hook Form | Form state management |
| Zod | Runtime schema validation |
| Vitest | Unit and component testing |
| React Testing Library | Component testing |
| Playwright | End-to-end browser testing |
| npm Workspaces | Monorepo dependency management |

### Shared Contracts

The `packages/contracts` workspace contains shared API contracts and validation schemas.

This helps maintain consistent data structures between application layers and reduces duplicated type definitions.

---

## Architecture

The application follows a modular, component-based architecture.

Responsibilities are separated into:

- **Pages:** Represent complete application screens.
- **Components:** Contain reusable UI elements.
- **API:** Centralizes communication with backend endpoints.
- **Contracts:** Contains shared schemas and TypeScript types.
- **Tests:** Validates components, pages, API behavior, and user journeys.

### High-Level Architecture

```text
                Customer
                   |
                   v
             React Application
                   |
          +--------+--------+
          |        |        |
          v        v        v
        Pages  Components  Router
          |
          v
       TanStack Query
          |
          v
       API Client
          |
          v
       REST API
          |
          v
       Backend Service
          |
          v
       Fake Store API Call
```

The frontend communicates with the backend through a centralized API client.

The Vite development server proxies API requests to the backend running on port `4000`.

---

## Project Structure

```text
react-frontend-npm/
│
├── apps/
│   └── web/
│       │
│       ├── src/
│       │   ├── api/
│       │   │   └── client.ts
│       │   │
│       │   ├── components/
│       │   │   ├── common/
│       │   │   │   ├── Loading.tsx
│       │   │   │   ├── ErrorState.tsx
│       │   │   │   ├── Global.css
│       │   │   │   └── Responsive.css
│       │   │   │
│       │   │   ├── layout/
│       │   │   │   ├── Header.tsx
│       │   │   │   ├── Header.css
│       │   │   │   ├── Footer.tsx
│       │   │   │   └── Footer.css
│       │   │   │
│       │   │   ├── products/
│       │   │   │   ├── ProductGrid.tsx
│       │   │   │   └── ProductGrid.css
│       │   │   │
│       │   │   └── enquiry/
│       │   │       ├── EnquiryForm.tsx
│       │   │       └── EnquiryForm.css
│       │   │
│       │   ├── pages/
│       │   │   ├── Home.tsx
│       │   │   ├── Home.css
│       │   │   ├── Listing.tsx
│       │   │   ├── Listing.css
│       │   │   ├── CategoryRoute.tsx
│       │   │   ├── SearchRoute.tsx
│       │   │   ├── ProductDetail.tsx
│       │   │   └── ProductDetail.css
│       │   │
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   └── styles.css
│       │
│       ├── tests/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── api/
│       │   ├── setup.ts
│       │   ├── test-utils.tsx
│       │   └── README.md
│       │
│       ├── e2e/
│       │   └── catalogue.spec.ts
│       │
│       ├── vitest.config.ts
│       └── playwright.config.ts
│
├── packages/
│   └── contracts/
│       └── src/
│           └── index.ts
│
├── package.json
└── README.md
```

### Folder Responsibilities

| Folder | Responsibility |
|---|---|
| `components/common` | Shared loading, error, and global UI styles |
| `components/layout` | Application header and footer |
| `components/products` | Product listing and grid components |
| `components/enquiry` | Product enquiry form |
| `pages` | Application screens and route-specific logic |
| `api` | Centralized API communication |
| `packages/contracts` | Shared types and validation schemas |
| `tests/components` | Component-level tests |
| `tests/pages` | Page and routing tests |
| `tests/api` | API client tests |
| `e2e` | Browser-based user journey tests |

---

## Prerequisites

Make sure the following are installed:

- Node.js (LTS recommended)
- npm
- Git

Verify your installation:

```bash
node --version
npm --version
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate to the project

```bash
cd react-frontend-npm
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The Vite development server starts the frontend application.

The frontend development server proxies `/api` requests to:

```text
http://localhost:4000
```

Make sure the backend service is running separately.

---

## Environment Configuration

The frontend uses the Vite development proxy for API communication.

Example development configuration:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:4000
API:      /api
```

The API client uses relative `/api` paths, allowing the frontend to communicate through the Vite proxy during local development.

If the backend URL or proxy configuration changes, update the Vite configuration accordingly.

---

## Available Scripts

Run these commands from the repository root.

| Command | Description |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start the frontend development server |
| `npm test` | Run Vitest tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:e2e` | Run Playwright browser tests |
| `npm run test:all` | Run unit/component tests and E2E tests |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run build` | Generate the production build |

Install the Playwright browser if it has not been installed:

```bash
npx playwright install chromium
```

---

## Application Routes

The application uses React Router for client-side navigation.

| Route | Page | Description |
|---|---|---|
| `/` | Home | Featured products and catalogue landing page |
| `/category/:name` | Category | Products belonging to a selected category |
| `/search` | Search | Search results based on URL query parameters |
| `/products/:id` | Product Details | Detailed information for a selected product |

### URL Examples

```text
/
```

```text
/category/accessories
```

```text
/search?q=watch
```

```text
/products/1
```

Route parameters and query strings allow pages to be refreshed or shared without losing the navigation context.

---

## API Integration

All backend communication is centralized in:

```text
apps/web/src/api/client.ts
```

This avoids duplicating HTTP request logic across components and pages.

### API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/products/featured` | Retrieve featured products |
| GET | `/api/products` | Retrieve products with optional filters |
| GET | `/api/categories` | Retrieve product categories |
| GET | `/api/products/:id` | Retrieve a product by ID |
| POST | `/api/enquiries` | Submit a product enquiry |

### Example: Fetch Products

```http
GET /api/products?category=Accessories
```

### Example: Search Products

```http
GET /api/products?search=watch
```

### Example: Fetch Product Details

```http
GET /api/products/1
```

### Example: Submit an Enquiry

```http
POST /api/enquiries
Content-Type: application/json
```

The request body follows the shared enquiry contract defined in `packages/contracts`.

The API client is responsible for handling HTTP communication and exposing typed results to the application.

---

## State Management

The application uses **TanStack Query** for server state management.

It provides:

- API request lifecycle management.
- Loading and error states.
- Query caching.
- Background refetching.
- Request deduplication.
- Controlled retry behavior.

The application configures a default query stale time of 60 seconds and one retry.

This reduces unnecessary API requests while keeping the product catalogue reasonably fresh.

Server state is kept separate from local UI and form state.

---

## Form Validation

Product enquiry forms use:

- React Hook Form for managing form state.
- Zod for schema-based validation.
- Shared contracts for consistent validation rules.

The form validates user input before submitting an enquiry.

Validation covers required fields and message length according to the enquiry schema.

A honeypot field named `website` is included to help identify automated submissions.

**Security note:** Honeypot validation on the frontend is not sufficient by itself. The backend must independently validate the request and apply appropriate spam protection.

---

## Testing Strategy

The project uses a layered testing strategy to verify individual components, application behavior, API communication, and complete user journeys.

### 1. Unit and Component Testing

**Tools:** Vitest and React Testing Library.

These tests validate individual UI components and their expected behavior.

Coverage includes:

- Loading component.
- Error state component.
- Header and footer.
- Product grid.
- Empty product states.
- Enquiry form.
- Form validation.
- Successful enquiry submission.
- Failed enquiry submission.

### 2. Page Testing

Page tests verify how individual screens behave when interacting with mocked API responses.

Coverage includes:

- Home page featured products.
- Category product listing.
- Top-rated product separation.
- Search results.
- Product detail page.
- Enquiry form rendering.

### 3. API Testing

API client tests verify:

- GET request behavior.
- POST request behavior.
- Query parameter handling.
- Successful responses.
- HTTP error handling.
- Request payload handling.

### 4. End-to-End Testing

**Tool:** Playwright.

E2E tests run the application in a real browser and validate complete customer journeys.

Scenarios include:

1. Open the catalogue home page.
2. Browse featured products.
3. Search for a product.
4. Navigate to a category.
5. Open product details.
6. Submit a product enquiry.
7. Validate required enquiry fields.
8. Handle API failures.

### E2E API Mocking

The backend is not required for frontend E2E tests.

Playwright intercepts `/api/**` requests and returns controlled responses. This allows the frontend's real browser behavior to be tested independently of backend availability.

These tests validate frontend integration with the API contract, not the actual backend implementation.

### Test Documentation

For detailed test coverage, setup instructions, and API-mocking details, see:

`apps/web/tests/README.md`

---

## Running Tests

### Run all Vitest tests

```bash
npm test
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Run Playwright E2E tests

```bash
npm run test:e2e
```

### Run all tests

```bash
npm run test:all
```

### Run a specific test file

```bash
npx vitest run apps/web/tests/components/product-grid.test.tsx
```

### Run Playwright in headed mode

```bash
npx playwright test --headed
```

### View the Playwright HTML report

```bash
npx playwright show-report
```

---

## Code Quality

The project follows these development practices:

- TypeScript for type safety.
- Reusable components to avoid duplication.
- Separation of UI, API, and validation responsibilities.
- Centralized API communication.
- Shared contracts for data consistency.
- Consistent loading and error handling.
- Component-level stylesheets.
- Automated tests for important application behavior.
- URL-driven navigation and search state.

Run type checking and the production build before submitting changes:

```bash
npm run typecheck
npm run build
```

---

## Error Handling

The application handles common API and UI states.

### Loading State

Displays feedback while data is being retrieved.

### Error State

Displays an error message when an API request fails.

### Empty State

Displays an appropriate message when no products match the current category or search query.

### Enquiry Submission

Displays success feedback only after the enquiry API request succeeds.

If the API request fails, the user receives error feedback instead of a false success message.

---

## Design Decisions

### Component-Based Architecture

UI components are separated according to responsibility.

This improves reuse, maintainability, and testability.

### Centralized API Client

All API requests are handled through a shared client instead of making direct HTTP calls from individual components.

### Shared Contracts

Shared schemas and types are maintained in `packages/contracts` to reduce inconsistencies between application layers.

### Server State Management

TanStack Query manages remote data, caching, and loading states rather than duplicating server data in local component state.

### Enquiry-Based MVP

The product catalogue focuses on discovery and enquiries instead of introducing unnecessary checkout and payment complexity.

### Independent Frontend Testing

Mocked API responses allow frontend tests to run independently of backend availability.

---

## Future Improvements

Potential enhancements beyond the MVP include:

- Pagination and infinite scrolling.
- Advanced product filtering and sorting.
- Product comparison.
- User authentication.
- Wishlist functionality.
- Product reviews and ratings.
- Image optimization and lazy loading.
- Accessibility improvements.
- Backend integration and database persistence.
- API response validation at runtime.
- Continuous integration with automated test execution.
- Production deployment and monitoring.

---

## Development Guidelines

When adding new functionality:

1. Keep page-specific logic inside the relevant page.
2. Extract reusable UI into shared components.
3. Keep API requests inside the centralized API client.
4. Add or update shared contracts when API structures change.
5. Add component or page tests for new behavior.
6. Add E2E coverage for important customer journeys.
7. Run tests, type checking, and the production build before submitting changes.

---

## License

This project was created as a product catalogue application and technical demonstration.

Add the appropriate license information before distributing it publicly.
