# Testing strategy

This workspace uses two complementary test layers:

- **Vitest + React Testing Library** for API client, component and page behaviour.
- **Playwright** for real-browser end-to-end customer journeys.

## Run tests

From the repository root:

```bash
npm install
npm test                 # component, page and API tests
npm run test:watch       # watch mode
npm run test:e2e         # browser journeys (starts Vite automatically)
npm run test:all         # unit/component tests followed by E2E
```

Playwright browser binaries may need to be installed once:

```bash
npx playwright install chromium
```

## Coverage map

| Area | What is verified |
| --- | --- |
| Loading / ErrorState | Loading copy and API error message |
| Header / Footer | Brand, navigation categories, search control, footer |
| ProductGrid | Empty state, product content, image and product link |
| EnquiryForm | Required-field validation, valid submission, success state, failed request |
| Home | Featured products load and render |
| Listing | Category filtering groups and search results query |
| Product detail | Product lookup and enquiry form rendering |
| API client | Request URLs, query encoding, JSON POST and error propagation |
| Browser E2E | Home, search, category navigation, product detail, enquiry validation and successful submission, API failure |

## E2E backend strategy

The supplied repository contains the frontend and shared contracts, but not the API server. E2E tests therefore intercept `/api/**` with deterministic fixtures using Playwright. This verifies the browser experience and frontend/API contract without pretending to test a backend that is not included. When the backend is added, a separate integration environment can replace these route mocks.
