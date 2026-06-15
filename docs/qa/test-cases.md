# GlitterNGeek — Test Cases & Regression Checklist

This document defines the manual and automated test cases for the GlitterNGeek platform. It is the source of truth for regression coverage and release readiness.

---

## 📋 Test Case Index

| ID | Area | Type | Priority | Status |
|----|------|------|----------|--------|
| TC-001 | Home page | E2E | High | ✅ Automated |
| TC-002 | About page | E2E | High | ✅ Automated |
| TC-003 | Courses page | E2E | High | ✅ Automated |
| TC-004 | Portfolio page | E2E | High | ✅ Automated |
| TC-005 | Navigation | E2E | High | ✅ Automated |
| TC-006 | API Health Check | API | Medium | ✅ Automated |
| TC-007 | pageData exports | Unit | Medium | ✅ Automated |
| TC-008 | Feature flag — courses hidden | Manual | High | 🟡 Manual |
| TC-009 | Feature flag — courses visible | Manual | High | 🟡 Manual |
| TC-010 | Accessibility — core pages | Manual | High | 🟡 Manual |
| TC-011 | Responsive layout | Manual | Medium | 🟡 Manual |
| TC-012 | Performance — Lighthouse | Automated | Medium | ✅ CI |

---

## 🧪 Detailed Test Cases

### TC-001 — Home page loads

**Type:** E2E (Cypress)
**File:** `main/cypress/e2e/smoke.cy.ts`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Visit `/` | Page loads with HTTP 200 |
| 2 | Check `<main>` | Element exists |
| 3 | Check `<h1>` | Visible |
| 4 | Check `<nav>` | Exists |
| 5 | Check "Home" nav link | Has `href="/"` |
| 6 | Check "About" nav link | Visible |
| 7 | Check `<footer>` | Exists |

---

### TC-002 — About page loads

**Type:** E2E (Cypress)
**File:** `main/cypress/e2e/about.cy.ts`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Visit `/about` | Page loads with HTTP 200 |
| 2 | Check `<main>` | Element exists |
| 3 | Check `<h1>` | Visible |
| 4 | Check `<nav>` | Exists |

---

### TC-003 — Courses page loads

**Type:** E2E (Cypress)
**File:** `main/cypress/e2e/courses.cy.ts`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Visit `/courses` | Page loads with HTTP 200 |
| 2 | Check `<main>` | Element exists |
| 3 | Check `<h1>` | Visible |
| 4 | Check `<nav>` | Exists |
| 5 | Check course track headings | At least one `<h3>` |
| 6 | Check `<footer>` | Exists |

---

### TC-004 — Portfolio page loads

**Type:** E2E (Cypress)
**File:** `main/cypress/e2e/portfolio.cy.ts`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Visit `/portfolio` | Page loads with HTTP 200 |
| 2 | Check `<main>` | Element exists |
| 3 | Check `<h1>` | Visible |
| 4 | Check `<nav>` | Exists |
| 5 | Check `<footer>` | Exists |

---

### TC-005 — Site navigation

**Type:** E2E (Cypress)
**File:** `main/cypress/e2e/navigation.cy.ts`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Visit `/`, click "About" | URL changes to `/about` |
| 2 | Check `<h1>` on `/about` | Visible |
| 3 | Visit `/`, click "Portfolio" | URL changes to `/portfolio` |
| 4 | Visit `/about`, click "Home" | URL returns to `/` |
| 5 | Check all nav `<a>` tags | Each has non-empty `href` |

---

### TC-006 — API health check

**Type:** Unit/API (Jest)
**File:** `main/src/__tests__/api/health.test.ts`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Call `GET /api/health` | Response status is 200 |
| 2 | Parse response body | `status` field equals `"ok"` |
| 3 | Parse response body | `service` field equals `"GlitterNGeek"` |
| 4 | Parse response body | `timestamp` is a valid ISO date string |

---

### TC-007 — pageData exports

**Type:** Unit (Jest)
**File:** `main/src/__tests__/pageData.test.ts`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Import `youtubeUrl` | Matches YouTube channel URL pattern |
| 2 | Import `navLinks` | Array with ≥ 1 items |
| 3 | Check navLinks | Contains entry with `href: "/"` |
| 4 | Each navLink | Has truthy `href` and `label` |
| 5 | Import `learningPillars` | Array with exactly 3 items |

---

### TC-008 — Feature flag: courses hidden

**Type:** Manual
**Precondition:** `NEXT_PUBLIC_COURSES_PAGE_RELEASE_PROD=false`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Visit `/` | "Courses" not visible in nav |
| 2 | Check home hero | Shows "Coming soon." heading |
| 3 | Check footer | "Courses" link not present in CTAs |

---

### TC-009 — Feature flag: courses visible

**Type:** Manual
**Precondition:** `NEXT_PUBLIC_COURSES_PAGE_RELEASE_PROD=true`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Visit `/` | "Courses" visible in nav |
| 2 | Check home hero | Shows full heading, not "Coming soon." |
| 3 | Check CTAs | "Explore courses" link visible |
| 4 | Click "Courses" nav link | Navigates to `/courses` |

---

### TC-010 — Accessibility: core pages

**Type:** Manual (or axe DevTools)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Run axe on `/` | 0 WCAG 2.1 AA violations |
| 2 | Run axe on `/about` | 0 WCAG 2.1 AA violations |
| 3 | Run axe on `/courses` | 0 WCAG 2.1 AA violations |
| 4 | Run axe on `/portfolio` | 0 WCAG 2.1 AA violations |
| 5 | Tab through nav on `/` | All links focusable in logical order |

---

### TC-011 — Responsive layout

**Type:** Manual

| Step | Viewport | Expected Result |
|------|----------|-----------------|
| 1 | 375×812 (iPhone) | Nav collapses or stacks; no overflow |
| 2 | 768×1024 (iPad) | Two-column grid collapses appropriately |
| 3 | 1440×900 (Desktop) | Full layout with all columns |
| 4 | All | No horizontal scrollbar |

---

### TC-012 — Performance (Lighthouse)

**Type:** Automated (CI — Lighthouse)
**Workflow:** `.github/workflows/lighthouse.yml`

| Metric | Threshold |
|--------|-----------|
| Performance | ≥ 90 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |

---

## 🔄 Regression Checklist (pre-release)

Copy this into your PR description or release notes before merging to `main`:

```
## Regression Checklist

### Automated (must all pass in CI)
- [ ] Lint passes (`npm run lint`)
- [ ] Typecheck passes (`npm run typecheck`)
- [ ] All unit tests pass (`npm test`)
- [ ] Build succeeds (`npm run build`)
- [ ] All Cypress E2E smoke tests pass

### Manual
- [ ] TC-008: Feature flag OFF — courses hidden
- [ ] TC-009: Feature flag ON — courses visible (if applicable)
- [ ] TC-010: Accessibility check on changed pages
- [ ] TC-011: Responsive layout check on changed pages
- [ ] No new console errors on any page
```
