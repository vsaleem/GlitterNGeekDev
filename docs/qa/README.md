# GlitterNGeek QA Dashboard

This document is the single source of truth for the quality assurance strategy of the GlitterNGeek platform.

---

## 🟢 Test Status

| Layer | Tool | Location | Run Command |
|-------|------|----------|-------------|
| Unit tests | Jest + React Testing Library | `main/src/__tests__/` | `cd main && npm test` |
| API tests | Jest | `main/src/__tests__/api/` | `cd main && npm test` |
| E2E (smoke) | Cypress | `main/cypress/e2e/` | `cd main && npm run test:e2e` |
| Lint | ESLint | `main/` | `cd main && npm run lint` |
| Type-check | TypeScript | `main/` | `cd main && npm run typecheck` |
| Build | Next.js | `main/` | `cd main && npm run build` |

---

## 🗺️ Coverage by Page

| Route | Unit | API | E2E |
|-------|------|-----|-----|
| `/` (Home) | ✅ `pageData.test.ts` | — | ✅ `smoke.cy.ts` |
| `/about` | — | — | ✅ `about.cy.ts` |
| `/courses` | — | — | ✅ `courses.cy.ts` |
| `/portfolio` | — | — | ✅ `portfolio.cy.ts` |
| `/api/health` | — | ✅ `health.test.ts` | — |
| Nav (all pages) | — | — | ✅ `navigation.cy.ts` |

---

## 🔄 CI/CD Quality Gate

Every pull request targeting `main` runs the **Quality Gate** workflow (`.github/workflows/quality-gate.yml`) which must fully pass before a merge is allowed:

1. **Lint** — ESLint via `npm run lint`
2. **Typecheck** — TypeScript strict mode via `npm run typecheck`
3. **Unit + API tests** — Jest via `npm test`
4. **Build** — Next.js production build
5. **E2E smoke tests** — Cypress in headless Chrome

Additional workflows:
- `continuous-integration.yml` — lint, typecheck, build, unit tests on every push
- `cypress-smoke.yml` — Cypress tests on PRs and pushes to `main`
- `deploy-pipeline.yml` — build → dev → staging → prod gated deployment

---

## 🐛 Bug Report Process

File a bug using the [bug report template](../../.github/ISSUE_TEMPLATE/bug_report.md).

Severity levels:
| Level | Description |
|-------|-------------|
| 🔴 Critical | Site is broken or inaccessible |
| 🟠 High | Major feature is broken |
| 🟡 Medium | Minor feature is broken or looks wrong |
| 🟢 Low | Cosmetic / polish issue |

---

## 🤖 AI-Assisted Test Generation

Use the generation script to scaffold new test files:

```bash
# Generate a Cypress E2E test for a new page
node scripts/generate-test-cases.mjs --page <page-name> --type e2e

# Generate a Jest unit test stub for a new page
node scripts/generate-test-cases.mjs --page <page-name> --type unit
```

Available pages: `home`, `about`, `courses`, `portfolio`

To add a new page, extend the `PAGES` map in `scripts/generate-test-cases.mjs`.

---

## 🐳 Docker — Local Test Environment

Run the full app locally in Docker:

```bash
# Build and run the app
docker compose up app

# Run unit + API tests
docker compose run test

# Run Cypress E2E tests (requires app to be running)
docker compose up app -d
docker compose run e2e
```

---

## ✅ Regression Checklist

Run this checklist before each release or major merge:

### Core Pages
- [ ] Home page loads and renders heading
- [ ] About page loads and renders heading
- [ ] Courses page loads and renders heading
- [ ] Portfolio page loads and renders heading

### Navigation
- [ ] Home → About link works
- [ ] Home → Portfolio link works
- [ ] Home → Courses link works (when feature flag enabled)
- [ ] About → Home link works

### API
- [ ] `GET /api/health` returns `{ status: "ok" }`

### Feature Flags
- [ ] `NEXT_PUBLIC_COURSES_PAGE_RELEASE_PROD=false` hides Courses nav link and CTAs
- [ ] `NEXT_PUBLIC_COURSES_PAGE_RELEASE_PROD=true` shows Courses nav link and CTAs

### Performance & Accessibility
- [ ] Lighthouse score ≥ 90 on mobile and desktop
- [ ] No WCAG 2.1 AA violations on core pages
- [ ] No console errors on any page load

### Build & CI
- [ ] `npm run lint` passes with 0 errors
- [ ] `npm run typecheck` passes
- [ ] `npm run build` completes successfully
- [ ] All unit and API tests pass
- [ ] All Cypress E2E smoke tests pass

---

## 📦 Adding New Tests

### New E2E test
1. Create `main/cypress/e2e/<feature>.cy.ts`
2. Or scaffold with: `node scripts/generate-test-cases.mjs --page <page> --type e2e`
3. Tests run automatically in CI via `cypress-smoke.yml` and `quality-gate.yml`

### New unit / API test
1. Create `main/src/__tests__/<feature>.test.ts`
2. Or scaffold with: `node scripts/generate-test-cases.mjs --page <page> --type unit`
3. Tests run automatically in CI via `continuous-integration.yml` and `quality-gate.yml`
