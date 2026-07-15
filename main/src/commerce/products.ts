export const SMALL_BUSINESS_AI_TOOLKIT_SLUG =
  "small-business-ai-toolkit" as const;

export type ProductSlug = typeof SMALL_BUSINESS_AI_TOOLKIT_SLUG;

export type Product = {
  slug: ProductSlug;
  name: string;
  shortDescription: string;
  description: string;
  audience: string;
  includes: readonly string[];
  promises: readonly string[];
  boundaries: readonly string[];
};

export const smallBusinessAiToolkit: Product = {
  slug: SMALL_BUSINESS_AI_TOOLKIT_SLUG,
  name: "Small Business AI Toolkit",
  shortDescription:
    "A beginner-friendly set of prompts, worksheets, and planning tools for practical small-business AI use.",
  description:
    "Find a useful place to begin with AI, create more structured first drafts, and build a seven-day plan with human review built in.",
  audience:
    "Small-business owners, solopreneurs, service providers, creators, coaches, consultants, local businesses, and nonprofit operators who want a plain-language starting point.",
  includes: [
    "A quick-start guide and AI safety checklist",
    "A business-task inventory and AI opportunity worksheet",
    "Beginner-friendly prompt starters for common business tasks",
    "Content repurposing and customer-message planning tools",
    "An SOP builder and automation-opportunity checklist",
    "A practical seven-day implementation tracker",
  ],
  promises: [
    "Identify practical AI use cases for your business",
    "Start common drafts with reusable prompts and templates",
    "Review AI output with clearer safety and quality checks",
    "Decide what to handle yourself and what may need added support",
  ],
  boundaries: [
    "This Toolkit does not build automations or custom AI systems.",
    "It does not guarantee revenue, leads, growth, sales, or time savings.",
    "It is not legal, financial, medical, tax, HR, or compliance advice.",
    "AI output still requires fact-checking, privacy review, and human judgment.",
  ],
};

export const products = [smallBusinessAiToolkit] as const;

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

