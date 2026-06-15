describe("Portfolio page", () => {
  beforeEach(() => {
    cy.visit("/portfolio");
  });

  it("loads successfully", () => {
    cy.get("main").should("exist");
  });

  it("shows the main heading", () => {
    cy.get("h1").should("be.visible");
  });

  it("shows the navigation bar", () => {
    cy.get("nav").should("exist");
  });

  it("shows the footer", () => {
    cy.get("footer").should("exist");
  });
});
