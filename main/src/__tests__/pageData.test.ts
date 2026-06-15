import {
  youtubeUrl,
  navLinks,
  learningPillars,
  courseTracks,
  homepageHighlights,
} from "@/components/gng/pageData";

describe("pageData", () => {
  describe("youtubeUrl", () => {
    it("is a valid YouTube channel URL", () => {
      expect(youtubeUrl).toMatch(/^https:\/\/www\.youtube\.com\//);
    });
  });

  describe("navLinks", () => {
    it("contains at least one navigation link", () => {
      expect(navLinks.length).toBeGreaterThan(0);
    });

    it("includes a home link", () => {
      expect(navLinks.some((link) => link.href === "/")).toBe(true);
    });

    it("each link has an href and label", () => {
      navLinks.forEach((link) => {
        expect(link.href).toBeTruthy();
        expect(link.label).toBeTruthy();
      });
    });
  });

  describe("learningPillars", () => {
    it("has three pillars", () => {
      expect(learningPillars).toHaveLength(3);
    });

    it("each pillar has a label and copy", () => {
      learningPillars.forEach((pillar) => {
        expect(pillar.label).toBeTruthy();
        expect(pillar.copy).toBeTruthy();
      });
    });
  });

  describe("courseTracks", () => {
    it("has four course tracks", () => {
      expect(courseTracks).toHaveLength(4);
    });

    it("each track has an eyebrow, title, and copy", () => {
      courseTracks.forEach((track) => {
        expect(track.eyebrow).toBeTruthy();
        expect(track.title).toBeTruthy();
        expect(track.copy).toBeTruthy();
      });
    });
  });

  describe("homepageHighlights", () => {
    it("has three highlights", () => {
      expect(homepageHighlights).toHaveLength(3);
    });

    it("each highlight has a label and copy", () => {
      homepageHighlights.forEach((highlight) => {
        expect(highlight.label).toBeTruthy();
        expect(highlight.copy).toBeTruthy();
      });
    });
  });
});
