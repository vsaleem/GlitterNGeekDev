describe("About page smoke test", () => {
  beforeEach(() => {
    cy.visit("/about");
  });

  it("loads successfully", () => {
    cy.get("main").should("exist");
  });

  it("shows a heading", () => {
    cy.get("h1").should("be.visible");
  });

  it("shows the navigation bar", () => {
    cy.get("nav").should("exist");
  });
});
