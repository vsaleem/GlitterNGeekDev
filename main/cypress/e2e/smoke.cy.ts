describe("Home page smoke test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads successfully and shows the main heading", () => {
    cy.get("main").should("exist");
    cy.get("h1").should("be.visible");
  });

  it("shows the navigation bar", () => {
    cy.get("nav").should("exist");
    cy.contains("a", "Home").should("have.attr", "href", "/");
  });

  it("shows the About nav link", () => {
    cy.contains("a", "About").should("be.visible");
  });

  it("shows the footer", () => {
    cy.get("footer").should("exist");
  });
});
