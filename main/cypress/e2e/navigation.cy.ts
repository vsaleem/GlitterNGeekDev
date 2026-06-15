describe("Site navigation", () => {
  it("navigates from Home to About", () => {
    cy.visit("/");
    cy.contains("a", "About").click();
    cy.url().should("include", "/about");
    cy.get("h1").should("be.visible");
  });

  it("navigates from Home to Portfolio", () => {
    cy.visit("/");
    cy.contains("a", "Portfolio").click();
    cy.url().should("include", "/portfolio");
    cy.get("h1").should("be.visible");
  });

  it("navigates from About back to Home", () => {
    cy.visit("/about");
    cy.contains("a", "Home").click();
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });

  it("all nav links are accessible and have valid hrefs", () => {
    cy.visit("/");
    cy.get("nav a").each(($a) => {
      cy.wrap($a).should("have.attr", "href").and("not.be.empty");
    });
  });
});
