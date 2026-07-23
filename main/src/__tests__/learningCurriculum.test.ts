import {
  clearFields,
  getLearningLesson,
  learningProducts,
  promptLibrary,
  quickStart,
  toolkit,
} from "@/content/learning/curriculum";

describe("interactive learning curriculum", () => {
  it("contains the approved three-day sampler and six-section Toolkit", () => {
    expect(learningProducts).toHaveLength(2);
    expect(quickStart.lessons).toHaveLength(3);
    expect(toolkit.lessons).toHaveLength(6);
    expect(quickStart.label).toBe("FREE");
    expect(toolkit.priceLabel).toBe("$49 one-time purchase");
  });

  it("contains all twelve reusable Toolkit prompts", () => {
    expect(promptLibrary).toHaveLength(12);
    expect(new Set(promptLibrary.map((prompt) => prompt.title)).size).toBe(12);
    promptLibrary.forEach((prompt) => {
      expect(prompt.prompt.length).toBeGreaterThan(80);
      expect(prompt.verify).toBeTruthy();
    });
  });

  it("keeps all five CLEAR prompt parts in order", () => {
    expect(clearFields.map((field) => field.label.slice(0, 1))).toEqual([
      "C",
      "L",
      "E",
      "A",
      "R",
    ]);
  });

  it("resolves only known lessons", () => {
    expect(getLearningLesson(quickStart, "day-2")?.title).toBe(
      "Try three clear prompts",
    );
    expect(getLearningLesson(toolkit, "section-3")?.title).toBe(
      "Build a clearer prompt",
    );
    expect(getLearningLesson(toolkit, "section-99")).toBeUndefined();
  });

  it("retains a visible safety or review surface in every lesson", () => {
    for (const product of learningProducts) {
      for (const lesson of product.lessons) {
        const serialized = JSON.stringify(lesson.blocks).toLowerCase();
        expect(
          serialized.includes("review") ||
            serialized.includes("verify") ||
            serialized.includes("safety") ||
            serialized.includes("risk"),
        ).toBe(true);
      }
    }
  });
});
