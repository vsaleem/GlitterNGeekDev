describe("Glitch to Clarity launch surfaces", () => {
  it("presents the learning promise and launch calls to action", () => {
    cy.visit("/");

    cy.get("h1").should(
      "contain.text",
      "Tech feels glitchy at first. We’ll help it click.",
    );
    cy.contains("a", "Explore the AI Toolkit").should(
      "have.attr",
      "href",
      "/products/small-business-ai-toolkit",
    );
    cy.contains("A glitch is information").should("be.visible");
    cy.get('img[alt="GlitterNGeek mascot"]').should("have.length", 1);
  });

  it("centers the mascot in the products learning visual", () => {
    cy.visit("/products");

    cy.get('[data-testid="products-mascot-visual"]').then(($visual) => {
      cy.get('[data-testid="products-mascot"]').then(($mascot) => {
        const visual = $visual[0].getBoundingClientRect();
        const mascot = $mascot[0].getBoundingClientRect();
        const visualCenter = visual.left + visual.width / 2;
        const mascotCenter = mascot.left + mascot.width / 2;

        expect(Math.abs(visualCenter - mascotCenter)).to.be.lessThan(2);
      });
    });
  });

  it("keeps the launch pages inside a mobile viewport", () => {
    cy.viewport(390, 844);

    ["/", "/products", "/products/small-business-ai-toolkit"].forEach(
      (path) => {
        cy.visit(path);
        cy.document().then((document) => {
          expect(document.documentElement.scrollWidth).to.be.at.most(
            document.documentElement.clientWidth + 1,
          );
        });
      },
    );
  });

  it("shows the Toolkit contents and preserves the checkout gate", () => {
    cy.visit("/products/small-business-ai-toolkit");

    cy.contains("h1", "one useful next step").should("be.visible");
    cy.contains("A quick-start guide and AI safety checklist").should(
      "be.visible",
    );
    cy.contains("Checkout opens soon.").should("be.visible");
    cy.get('form[action="/api/checkout"]').should("not.exist");
  });
});
