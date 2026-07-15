describe("Portfolio production gate", () => {
  it("returns not found while the production release flag is disabled", () => {
    cy.request({ url: "/portfolio", failOnStatusCode: false }).then(
      (response) => {
        expect(response.status).to.eq(404);
      },
    );
  });
});
