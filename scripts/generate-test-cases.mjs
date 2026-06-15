#!/usr/bin/env node
/**
 * AI-assisted test case generator for GlitterNGeek.
 *
 * Usage:
 *   node scripts/generate-test-cases.mjs --page about
 *   node scripts/generate-test-cases.mjs --page courses --type e2e
 *   node scripts/generate-test-cases.mjs --page home --type unit
 *
 * This script scaffolds test files based on known page structure.
 * Extend the PAGES map below to add new routes as the app grows.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ─── Page definitions ────────────────────────────────────────────────────────
const PAGES = {
  home: {
    route: "/",
    heading: "h1",
    selectors: ["main", "nav", "footer", "h1"],
    description: "Home page",
  },
  about: {
    route: "/about",
    heading: "h1",
    selectors: ["main", "nav", "footer", "h1"],
    description: "About page",
  },
  courses: {
    route: "/courses",
    heading: "h1",
    selectors: ["main", "nav", "footer", "h1", "h3"],
    description: "Courses page",
  },
  portfolio: {
    route: "/portfolio",
    heading: "h1",
    selectors: ["main", "nav", "footer", "h1"],
    description: "Portfolio page",
  },
};

// ─── Templates ───────────────────────────────────────────────────────────────
function e2eTemplate(page, info) {
  const checks = info.selectors
    .map((sel) => `    cy.get("${sel}").should("exist");`)
    .join("\n");

  return `describe("${info.description}", () => {
  beforeEach(() => {
    cy.visit("${info.route}");
  });

  it("loads successfully", () => {
${checks}
  });

  it("shows the main heading", () => {
    cy.get("${info.heading}").should("be.visible");
  });

  it("shows the navigation bar", () => {
    cy.get("nav").should("exist");
  });

  it("shows the footer", () => {
    cy.get("footer").should("exist");
  });
});
`;
}

function unitTemplate(page, info) {
  return `/**
 * Unit tests for ${info.description} data / utilities.
 * Extend this file as you add data exports or helper functions for this page.
 */

describe("${info.description} — unit tests", () => {
  it("placeholder: add unit tests for ${page} page data here", () => {
    expect(true).toBe(true);
  });
});
`;
}

// ─── CLI ─────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const pageArg = args[args.indexOf("--page") + 1];
const typeArg = args[args.indexOf("--type") + 1] ?? "e2e";

if (!pageArg) {
  console.error("Usage: node scripts/generate-test-cases.mjs --page <page> [--type e2e|unit]");
  console.error(`Available pages: ${Object.keys(PAGES).join(", ")}`);
  process.exit(1);
}

const info = PAGES[pageArg];
if (!info) {
  console.error(`Unknown page "${pageArg}". Available: ${Object.keys(PAGES).join(", ")}`);
  process.exit(1);
}

let outPath, content;
if (typeArg === "e2e") {
  outPath = path.join(ROOT, "main", "cypress", "e2e", `${pageArg}.cy.ts`);
  content = e2eTemplate(pageArg, info);
} else if (typeArg === "unit") {
  outPath = path.join(ROOT, "main", "src", "__tests__", `${pageArg}.test.ts`);
  content = unitTemplate(pageArg, info);
} else {
  console.error(`Unknown type "${typeArg}". Use "e2e" or "unit".`);
  process.exit(1);
}

if (fs.existsSync(outPath)) {
  console.warn(`⚠️  File already exists, skipping: ${outPath}`);
  process.exit(0);
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, content, "utf8");
console.log(`✅ Generated ${typeArg} test: ${path.relative(ROOT, outPath)}`);
