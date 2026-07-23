export type LearningProductId = "quick-start" | "toolkit";
export type Accent = "coral" | "violet" | "sky" | "mint" | "yellow";

export type WorksheetField = {
  id: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
};

export type LessonBlock =
  | {
      type: "note";
      title: string;
      body: string;
      tone?: "default" | "safety" | "success";
      bullets?: readonly string[];
    }
  | {
      type: "fields";
      title: string;
      description?: string;
      fields: readonly WorksheetField[];
    }
  | {
      type: "checklist";
      title: string;
      description?: string;
      items: readonly string[];
    }
  | {
      type: "prompt";
      title: string;
      prompt: string;
      verify: string;
    }
  | {
      type: "clear-builder";
      title: string;
    };

export type LearningLesson = {
  id: string;
  shortTitle: string;
  title: string;
  intro: string;
  accent: Accent;
  blocks: readonly LessonBlock[];
};

export type LearningProduct = {
  id: LearningProductId;
  name: string;
  label: string;
  priceLabel: string;
  description: string;
  lessons: readonly LearningLesson[];
};

export const humanReviewItems = [
  "Check facts, names, dates, numbers, prices, and links.",
  "Remove unsupported claims and invented details.",
  "Keep private and sensitive information out.",
  "Make sure the final wording sounds like your business.",
  "A human makes the final decision.",
] as const;

export const clearFields = [
  {
    id: "context",
    label: "C · Context",
    placeholder: "I run a [TYPE OF BUSINESS] that helps [AUDIENCE].",
  },
  {
    id: "lens",
    label: "L · Lens",
    placeholder: "Act as a careful drafting partner, not a decision-maker.",
  },
  {
    id: "expected-output",
    label: "E · Expected output",
    placeholder: "Create [DELIVERABLE] with [NUMBER] options.",
  },
  {
    id: "audience-constraints",
    label: "A · Audience + constraints",
    placeholder:
      "Use a [TONE] tone, keep it to [LENGTH], avoid unsupported claims, and do not invent facts.",
  },
  {
    id: "review-request",
    label: "R · Review request",
    placeholder:
      'End with a list called "Verify before use" covering facts, assumptions, sensitive information, and claims that need human review.',
  },
] as const;

export const promptLibrary = [
  {
    title: "Turn rough notes into an outline",
    prompt:
      'Organize the non-confidential notes below into a clear outline for [PURPOSE]. Preserve the meaning, do not invent facts, and place uncertain details under "Questions to resolve." Audience: [AUDIENCE]. Tone: [TONE]. Notes: [SAFE NOTES]. End with "Verify before use."',
    verify:
      "Are any assumptions presented as facts? Is the sequence logical?",
  },
  {
    title: "Rewrite for clarity",
    prompt:
      "Rewrite the text below in plain language for [AUDIENCE]. Keep the original meaning, use short sentences, and preserve any required facts. Do not add promises or new claims. Provide one concise version and one warmer version. Text: [SAFE TEXT]. End with changes I should review.",
    verify: "Did the meaning, terms, price, deadline, or policy change?",
  },
  {
    title: "Create content angles",
    prompt:
      "Generate 10 educational content angles about [TOPIC] for [AUDIENCE]. Our perspective is [POINT OF VIEW]. Mix beginner questions, common mistakes, mini how-tos, and behind-the-scenes ideas. Avoid fear-based language, guaranteed outcomes, and invented customer stories. For each angle, give a one-sentence takeaway.",
    verify:
      "Which ideas are true to your expertise and safe to claim?",
  },
  {
    title: "Repurpose one source",
    prompt:
      "Using only the source notes below, draft: (1) three short post ideas, (2) one email outline, and (3) five short hooks. Do not add statistics, testimonials, or facts not present in the notes. Audience: [AUDIENCE]. Voice: [VOICE DESCRIPTION]. Source notes: [SAFE NOTES]. Label anything that requires verification.",
    verify: "Compare every factual statement with the original source.",
  },
  {
    title: "Customer inquiry reply",
    prompt:
      "Draft a helpful reply to a general customer inquiry about [TOPIC]. Acknowledge the question, provide the approved information below, state the next step, and use placeholders for missing details. Do not promise availability, results, refunds, or exceptions. Approved information: [NON-SENSITIVE FACTS]. Tone: [TONE].",
    verify:
      "Confirm policy, price, timing, availability, and recipient details.",
  },
  {
    title: "Follow-up message",
    prompt:
      "Draft a brief follow-up for a customer who [GENERAL SITUATION]. Goal: [GOAL]. Include a respectful opening, one clear action, and a low-pressure close. Do not use guilt, urgency I did not provide, or unsupported promises. Use [TONE] and keep it under [WORD COUNT] words.",
    verify:
      "Does the message respect the relationship and communication preferences?",
  },
  {
    title: "FAQ first draft",
    prompt:
      'Turn the approved information below into a beginner-friendly FAQ. Use only the supplied facts. If an answer is missing, write "[BUSINESS TO COMPLETE]" instead of guessing. Group questions under Getting Started, What to Expect, Payment, and Support where relevant. Approved information: [SAFE INFORMATION].',
    verify: "Verify every answer, especially policies and payment language.",
  },
  {
    title: "Offer description",
    prompt:
      'Draft a plain-language description of [OFFER] for [AUDIENCE] using the approved details below. Include who it is for, what is included, what is not included, and the next step. Use "helps you" language instead of guarantees. Do not invent bonuses, urgency, scarcity, testimonials, or results. Details: [APPROVED DETAILS].',
    verify:
      "Confirm scope, deliverables, exclusions, price, and public claims.",
  },
  {
    title: "Weekly planning",
    prompt:
      "Help me organize the following non-confidential tasks into a realistic weekly plan. Group them by must do, should do, and could do. Ask me to confirm deadlines and capacity before assigning days. Tasks: [TASK LIST]. Constraints: [HOURS, FIXED COMMITMENTS]. Do not assume every task fits.",
    verify:
      "Does the plan match your real energy, deadlines, and obligations?",
  },
  {
    title: "SOP first draft",
    prompt:
      'Turn the process notes below into a first-draft SOP. Use sections for purpose, trigger, owner, inputs, numbered steps, decision points, quality check, and escalation. Mark missing information as "[CONFIRM]". Do not invent permissions, tools, or policies. Process notes: [SAFE NOTES].',
    verify:
      "Walk through the SOP in real life and correct what the draft missed.",
  },
  {
    title: "Identify automation candidates",
    prompt:
      "Review the non-confidential task list below and identify possible automation candidates. For each, explain the repeated trigger, standard steps, exceptions, data sensitivity, human approval point, and what could go wrong. This is an assessment only—do not claim the task should be automated or provide credentials/configuration steps. Tasks: [TASK LIST].",
    verify:
      "Is the process stable enough to consider automation? Are exceptions common?",
  },
  {
    title: "Critique without rewriting",
    prompt:
      "Review the draft below without rewriting it yet. Identify unclear wording, missing context, unsupported claims, tone risks, privacy concerns, and facts that need verification. Separate required fixes from optional improvements. Draft: [SAFE DRAFT]. Audience: [AUDIENCE]. Intended action: [ACTION].",
    verify:
      "Decide which feedback fits your goals before accepting changes.",
  },
] as const;

export const quickStart: LearningProduct = {
  id: "quick-start",
  name: "Three-Day AI Quick Start",
  label: "FREE",
  priceLabel: "Free · no card required",
  description:
    "One safe, useful business experiment without trying to automate everything.",
  lessons: [
    {
      id: "day-1",
      shortTitle: "Choose safely",
      title: "Choose a safe starting task",
      intro:
        "Start with one low-risk task that is useful even when the first draft is imperfect.",
      accent: "coral",
      blocks: [
        {
          type: "note",
          title: "Good first experiments",
          body: "Keep your first test non-confidential and easy to review.",
          bullets: [
            "Outline a non-confidential idea.",
            "Rewrite your own draft for clarity.",
            "Brainstorm educational content angles.",
            "Organize a generic checklist.",
            "Document a process you already understand.",
          ],
        },
        {
          type: "fields",
          title: "Pick one low-risk task",
          fields: [
            { id: "task", label: "My task", multiline: true },
            {
              id: "useful-result",
              label: "A useful first result would be",
              multiline: true,
            },
            {
              id: "replace",
              label: "Private details I will replace with placeholders",
              multiline: true,
            },
            {
              id: "verify",
              label: "What I will verify",
              multiline: true,
            },
            {
              id: "decision-maker",
              label: "The human making the final decision",
            },
          ],
        },
        {
          type: "checklist",
          title: "Day 1 check",
          items: [
            "My task is low risk.",
            "I can describe the result I want.",
            "I removed sensitive information.",
            "I know how I will check the output.",
          ],
        },
      ],
    },
    {
      id: "day-2",
      shortTitle: "Try prompts",
      title: "Try three clear prompts",
      intro: "Practice with safe, non-confidential information.",
      accent: "violet",
      blocks: [
        {
          type: "prompt",
          title: "Organize",
          prompt:
            'Organize the non-confidential notes below into a clear outline for [PURPOSE]. Do not invent facts. Put uncertain details under "Questions to resolve." Audience: [AUDIENCE]. Notes: [SAFE NOTES]. End with "Verify before use."',
          verify:
            "Check that the outline preserves your meaning and labels uncertainty.",
        },
        {
          type: "prompt",
          title: "Rewrite",
          prompt:
            "Rewrite the text below in plain language for [AUDIENCE]. Keep the original meaning, do not add promises or facts, and provide one concise version and one warmer version. Text: [SAFE TEXT]. End with a list of changes I should review.",
          verify:
            "Compare the rewrite with the source and restore any changed meaning.",
        },
        {
          type: "prompt",
          title: "Plan",
          prompt:
            "Help me turn this low-risk task into a short plan. Ask me to confirm the goal, deadline, available time, and definition of done before suggesting steps. Do not assume every step fits. Task: [TASK]. Constraints: [SAFE CONSTRAINTS].",
          verify:
            "Confirm that the plan fits your actual time, obligations, and definition of done.",
        },
        {
          type: "fields",
          title: "Day 2 reflection",
          fields: [
            { id: "worked", label: "What worked?", multiline: true },
            {
              id: "correction",
              label: "What needs correction?",
              multiline: true,
            },
          ],
        },
        {
          type: "checklist",
          title: "Review before use",
          items: [
            "I checked facts, names, dates, numbers, and links.",
            "I removed unsupported claims.",
            "I revised the draft in my own voice.",
            "I—not the AI—made the final decision.",
          ],
        },
      ],
    },
    {
      id: "day-3",
      shortTitle: "Map workflow",
      title: "Build one mini workflow",
      intro:
        "Document the current process, identify the human review point, and decide what to do next.",
      accent: "mint",
      blocks: [
        {
          type: "fields",
          title: "Write the current process",
          fields: [
            { id: "process", label: "Process name" },
            { id: "trigger", label: "Trigger—what starts it" },
            { id: "step-1", label: "Step 1", multiline: true },
            { id: "step-2", label: "Step 2", multiline: true },
            { id: "step-3", label: "Step 3", multiline: true },
            {
              id: "human-review",
              label: "Human review point",
              multiline: true,
            },
            {
              id: "risk",
              label: "What could go wrong?",
              multiline: true,
            },
          ],
        },
        {
          type: "checklist",
          title: "Test the fit",
          items: [
            "The AI output was useful as a first draft.",
            "I could verify it without guessing.",
            "The process protected sensitive data.",
            "I would use this workflow again.",
          ],
        },
        {
          type: "fields",
          title: "Decide",
          fields: [
            {
              id: "decision",
              label:
                "Keep practicing, return to manual, try another task, or seek guided help?",
              multiline: true,
            },
            { id: "learned", label: "What I learned", multiline: true },
          ],
        },
      ],
    },
  ],
};

export const toolkit: LearningProduct = {
  id: "toolkit",
  name: "Small Business AI Toolkit",
  label: "$49 · Purchased",
  priceLabel: "$49 one-time purchase",
  description:
    "A practical, beginner-safe workbook for clearer first drafts and repeatable workflows.",
  lessons: [
    {
      id: "section-1",
      shortTitle: "Prepare",
      title: "Quick Start + Safety",
      intro:
        "Use AI as a drafting partner, not an unquestioned decision-maker.",
      accent: "coral",
      blocks: [
        {
          type: "note",
          title: "A simple working loop",
          body: "Choose, contextualize, draft, check, revise, and decide.",
          bullets: [
            "Choose one clear task.",
            "Contextualize it with safe, relevant details.",
            "Draft with AI.",
            "Check facts, tone, privacy, and fit.",
            "Revise in your own voice.",
            "Decide whether it is safe and useful to use.",
          ],
        },
        {
          type: "note",
          tone: "safety",
          title: "Before you paste",
          body:
            "Never paste passwords, payment details, identity numbers, private health, legal or HR records, confidential contracts, or information you do not have permission to share.",
          bullets: [
            "Use placeholders such as [CUSTOMER NAME], [SERVICE], [DATE], and [GENERAL CONCERN].",
            "If the task requires sensitive information, stop and use an approved secure process.",
          ],
        },
        {
          type: "fields",
          title: "Quick-start worksheet",
          fields: [
            { id: "task", label: "The low-risk task I will test" },
            {
              id: "context",
              label: "The safe context the AI needs",
              multiline: true,
            },
            {
              id: "placeholders",
              label: "Information I will replace with placeholders",
              multiline: true,
            },
            {
              id: "verify",
              label: "What I must verify afterward",
              multiline: true,
            },
            { id: "human", label: "Who makes the final decision" },
          ],
        },
        {
          type: "checklist",
          title: "Human review",
          items: humanReviewItems,
        },
      ],
    },
    {
      id: "section-2",
      shortTitle: "Evaluate",
      title: "Business Task Inventory + Where AI Fits",
      intro:
        "Inventory recurring work, sort the kind of help needed, and choose one low-risk experiment.",
      accent: "sky",
      blocks: [
        {
          type: "note",
          title: "Help types",
          body:
            "Use B for brainstorm, O for organize, D for draft, R for rewrite, S for summarize, and H for human-only.",
        },
        {
          type: "fields",
          title: "Recurring task inventory",
          fields: [
            {
              id: "content",
              label: "Content tasks",
              placeholder: "Task, frequency, friction, and risk",
              multiline: true,
            },
            {
              id: "communication",
              label: "Customer communication tasks",
              multiline: true,
            },
            {
              id: "sales",
              label: "Sales and offer tasks",
              multiline: true,
            },
            {
              id: "admin",
              label: "Administration and operations tasks",
              multiline: true,
            },
            {
              id: "planning",
              label: "Planning tasks",
              multiline: true,
            },
          ],
        },
        {
          type: "fields",
          title: "Choose the first experiment",
          description:
            "Look for work that repeats, is easy to verify, remains useful as a draft, and is low risk.",
          fields: [
            { id: "selected-task", label: "My selected task" },
            {
              id: "reason",
              label: "I selected it because",
              multiline: true,
            },
          ],
        },
        {
          type: "checklist",
          title: "Fit check",
          items: [
            "The task has a clear beginning and end.",
            "I can describe a useful output.",
            "I can provide context without sensitive information.",
            "I know how to check the result.",
            "I will keep a human decision point.",
          ],
        },
      ],
    },
    {
      id: "section-3",
      shortTitle: "Build prompt",
      title: "Build a clearer prompt",
      intro:
        "Use the CLEAR recipe to give AI enough direction without sharing private data.",
      accent: "violet",
      blocks: [
        { type: "clear-builder", title: "The CLEAR prompt recipe" },
        ...promptLibrary.map((prompt) => ({
          type: "prompt" as const,
          ...prompt,
        })),
        {
          type: "checklist",
          title: "Human review",
          items: humanReviewItems,
        },
      ],
    },
    {
      id: "section-4",
      shortTitle: "Plan messages",
      title: "Content + Customer-Message Planner",
      intro:
        "Turn one useful idea into several reviewed drafts, then build customer messages from approved facts.",
      accent: "yellow",
      blocks: [
        {
          type: "fields",
          title: "One idea, several useful drafts",
          fields: [
            { id: "idea", label: "Core idea", multiline: true },
            {
              id: "experience",
              label: "What I know from experience",
              multiline: true,
            },
            {
              id: "verify",
              label: "What I need to verify",
              multiline: true,
            },
            { id: "audience", label: "Audience" },
            {
              id: "next-action",
              label: "Useful next action for the audience",
            },
          ],
        },
        {
          type: "fields",
          title: "Customer-message builder",
          fields: [
            { id: "situation", label: "Situation", multiline: true },
            { id: "goal", label: "Goal", multiline: true },
            {
              id: "approved-facts",
              label: "Approved facts",
              multiline: true,
            },
            { id: "boundary", label: "Boundary", multiline: true },
            { id: "tone", label: "Tone" },
            { id: "next-step", label: "Single clearest next step" },
          ],
        },
        {
          type: "checklist",
          title: "Final customer-message check",
          items: [
            "Correct recipient and channel.",
            "Correct names, dates, prices, policies, and links.",
            "No confidential information.",
            "No invented exception, guarantee, or deadline.",
            "One clear next action.",
            "Human-approved final wording.",
          ],
        },
      ],
    },
    {
      id: "section-5",
      shortTitle: "Build SOP",
      title: "SOP Builder + Automation Candidate Checklist",
      intro:
        "Document the current process before deciding whether it may be an automation candidate.",
      accent: "mint",
      blocks: [
        {
          type: "fields",
          title: "SOP builder",
          fields: [
            { id: "process", label: "Process name" },
            { id: "purpose", label: "Purpose", multiline: true },
            { id: "trigger", label: "Trigger—what starts it" },
            { id: "owner", label: "Owner" },
            { id: "inputs", label: "Inputs needed", multiline: true },
            { id: "tools", label: "Tools used" },
            { id: "output", label: "Expected output", multiline: true },
            {
              id: "steps",
              label: "Numbered process",
              placeholder: "1.\n2.\n3.\n4.\n5.",
              multiline: true,
            },
            {
              id: "exceptions",
              label: "Decision points and exceptions",
              multiline: true,
            },
            {
              id: "escalation",
              label: "Escalate to a human when",
              multiline: true,
            },
          ],
        },
        {
          type: "note",
          tone: "safety",
          title: "Assessment only",
          body:
            "This checklist identifies candidates only. It does not build automations, connect apps, create agents, provide security approval, or establish that automation is appropriate.",
        },
        {
          type: "checklist",
          title: "Automation candidate check",
          items: [
            "The trigger and normal steps are documented.",
            "Exceptions are uncommon and identifiable.",
            "A human can verify success.",
            "Sensitive data is avoided or an approved secure method exists.",
            "A failed run can be detected and corrected without serious harm.",
            "A human approval point exists before high-impact action.",
            "Someone will own testing and maintenance.",
            "There is a manual fallback.",
          ],
        },
        {
          type: "fields",
          title: "Candidate decision",
          fields: [
            { id: "candidate", label: "Candidate process" },
            { id: "candidate-trigger", label: "Potential trigger" },
            {
              id: "approval",
              label: "Human approval point",
              multiline: true,
            },
            {
              id: "failure",
              label: "Biggest failure risk",
              multiline: true,
            },
            { id: "fallback", label: "Manual fallback", multiline: true },
            {
              id: "decision",
              label: "Keep manual, improve process, or explore with support?",
            },
          ],
        },
      ],
    },
    {
      id: "section-6",
      shortTitle: "Complete",
      title: "Seven-Day Implementation Tracker + Next-Step Guide",
      intro:
        "Test one useful, low-risk workflow and record what actually happened.",
      accent: "coral",
      blocks: [
        {
          type: "checklist",
          title: "Seven-day experiment",
          items: [
            "Day 1: Choose one low-risk task, complete the safety check, and define a useful output.",
            "Day 2: Draft a CLEAR prompt, replace sensitive details, and ask the tool to flag assumptions.",
            "Day 3: Check facts, tone, privacy, and claims; revise in your own voice.",
            "Day 4: Change one prompt variable and compare the two drafts.",
            "Day 5: Complete the SOP builder, add decision points, and test the steps.",
            "Day 6: Evaluate usefulness, review effort, privacy, and repeatability.",
            "Day 7: Keep, refine, stop, choose another experiment, or seek guided help.",
          ],
        },
        {
          type: "fields",
          title: "Results snapshot",
          fields: [
            {
              id: "clarity",
              label: "Clarity of first draft: before, after, and what I learned",
              multiline: true,
            },
            {
              id: "review",
              label: "Ease of review: before, after, and what I learned",
              multiline: true,
            },
            {
              id: "voice",
              label: "Fit with my voice: before, after, and what I learned",
              multiline: true,
            },
            {
              id: "confidence",
              label: "Confidence in process: before, after, and what I learned",
              multiline: true,
            },
          ],
        },
        {
          type: "note",
          title: "Choose the next step",
          body:
            "Continue DIY when the task is low risk and easy to verify. Consider a paid workshop when guided examples, feedback, or accountability would help. The AI Workflow Audit is planned for a later launch and is not included with this Toolkit.",
        },
        {
          type: "fields",
          title: "My next step",
          fields: [
            { id: "next-step", label: "My next step", multiline: true },
            { id: "why", label: "Why", multiline: true },
            {
              id: "question",
              label: "The question I still need answered",
              multiline: true,
            },
            {
              id: "operating-rule",
              label:
                "I will use AI to help me ___, but I will always ___",
              multiline: true,
            },
          ],
        },
        {
          type: "checklist",
          title: "Final review card",
          items: [
            "Privacy: I am allowed to share every piece of information used.",
            "Accuracy: I verified facts, names, dates, numbers, and links.",
            "Claims: I can support every promise or outcome statement.",
            "People: The wording does not unfairly harm, stereotype, pressure, or exclude.",
            "Voice: This sounds like my business and fits the relationship.",
            "Decision: A named human is accountable for the final result.",
          ],
        },
      ],
    },
  ],
};

export const learningProducts = [quickStart, toolkit] as const;

export function getLearningProduct(id: string): LearningProduct | undefined {
  return learningProducts.find((product) => product.id === id);
}

export function getLearningLesson(
  product: LearningProduct,
  lessonId: string,
): LearningLesson | undefined {
  return product.lessons.find((lesson) => lesson.id === lessonId);
}
