describe("Courses page", () => {
  beforeEach(() => {
    cy.visit("/courses");
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

  it("displays course tracks", () => {
    cy.get("h3").should("have.length.greaterThan", 0);
  });

  it("shows the footer", () => {
    cy.get("footer").should("exist");
  });
});
