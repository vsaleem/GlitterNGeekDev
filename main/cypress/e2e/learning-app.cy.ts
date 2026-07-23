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
    cy.contains("Not purchased").should("be.visible");
    cy.contains("button", "Start locked").should("be.disabled");
    cy.contains("button", "PDF locked").should("be.disabled");
    cy.get('img[alt="GlitterNGeek"]').should("have.length", 1);
    cy.scrollTo("top");
    cy.screenshot("learning-library-desktop-light", {
      capture: "viewport",
    });
    cy.get(".learn-safety-illustration")
      .scrollIntoView()
      .should("be.visible")
      .and(($image) => {
        expect(($image[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(
          0,
        );
      });
    cy.screenshot("learning-library-safety-light", {
      capture: "viewport",
    });
    cy.scrollTo("top");

    cy.get('button[aria-label="Dark theme"]').click();
    cy.get("html").should("have.attr", "data-learning-theme", "dark");
    cy.reload();
    cy.get("html").should("have.attr", "data-learning-theme", "dark");
    cy.scrollTo("top");
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

  it("keeps the paid Toolkit route behind its entitlement", () => {
    cy.visit("/learn/toolkit/section-3");

    cy.location("pathname").should("equal", "/learn/no-access");
    cy.contains("h1", "Whoops, you don't have access.").should("be.visible");
  });

  it("keeps the learning application inside a mobile viewport", () => {
    cy.viewport(390, 844);

    ["/learn", "/learn/quick-start/day-2"].forEach((path) => {
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
    cy.screenshot("quick-start-mobile-light", { capture: "viewport" });
  });

  it("does not serve review-draft PDFs", () => {
    cy.request({
      url: "/api/learn/download/toolkit",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(403);
      expect(response.body.error).to.equal("Access denied.");
    });

    cy.request({
      url: "/api/learn/download/quick-start",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(503);
      expect(response.body.error).to.contain("release-ready PDF");
    });
  });
});
