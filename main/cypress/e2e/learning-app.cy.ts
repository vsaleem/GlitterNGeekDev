describe("Interactive Toolkit learning application", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("renders the approved customer library and persists theme choice", () => {
    cy.visit("/learn");

    cy.get(".learn-welcome").should("have.length", 1);
    cy.contains("h1", "Welcome back, Victoria").should("be.visible");
    cy.contains("Three-Day AI Quick Start").should("be.visible");
    cy.contains("Small Business AI Toolkit").should("be.visible");
    cy.get('img[alt="GlitterNGeek"]').should("have.length", 1);

    cy.get('button[aria-label="Dark theme"]').click();
    cy.get("html").should("have.attr", "data-learning-theme", "dark");
    cy.reload();
    cy.get("html").should("have.attr", "data-learning-theme", "dark");
    cy.screenshot("learning-library-desktop-dark", {
      capture: "viewport",
    });
  });

  it("saves worksheet responses and lesson completion in the browser", () => {
    cy.visit("/learn/quick-start/day-2");

    cy.contains("h1", "Try three clear prompts").should("be.visible");
    cy.get("details").first().click();
    cy.contains("button", "Copy prompt").should("be.visible");
    cy.get('textarea[id$="field:worked"]').type(
      "The structure made the next action clearer.",
    );
    cy.contains("button", "Mark complete").click();
    cy.reload();

    cy.get('textarea[id$="field:worked"]').should(
      "have.value",
      "The structure made the next action clearer.",
    );
    cy.contains("button", "Completed").should("be.visible");
  });

  it("contains the complete CLEAR builder and twelve-prompt pack", () => {
    cy.visit("/learn/toolkit/section-3");

    cy.contains("h1", "Build a clearer prompt").should("be.visible");
    cy.get(".learn-clear-fields label").should("have.length", 5);
    cy.get(".learn-prompt-block").should("have.length", 12);
    cy.contains("Human review").should("be.visible");
  });

  it("keeps the learning application inside a mobile viewport", () => {
    cy.viewport(390, 844);

    [
      "/learn",
      "/learn/quick-start/day-2",
      "/learn/toolkit/section-3",
    ].forEach((path) => {
      cy.visit(path);
      cy.document().then((document) => {
        expect(document.documentElement.scrollWidth).to.be.at.most(
          document.documentElement.clientWidth + 1,
        );
      });
    });

    cy.get('button[aria-label="Light theme"]').click();
    cy.scrollTo("top");
    cy.get(".learn-mobile-progress select").should("be.visible");
    cy.screenshot("toolkit-clear-mobile-light", { capture: "viewport" });
  });

  it("does not serve review-draft PDFs", () => {
    cy.request({
      url: "/api/learn/download/toolkit",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(503);
      expect(response.body.error).to.contain("release-ready PDF");
    });
  });
});
