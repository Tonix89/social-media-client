describe('logout', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
    cy.wait(500);
    cy.get('#registerForm button')
      .contains('Login')
      .should('be.visible')
      .click();
    cy.wait(500);
    cy.get("input#loginEmail[type='email']").type(Cypress.env('email'));
    cy.get("input#loginPassword[type='password']").type(
      Cypress.env('password')
    );
    cy.get('#loginForm button').contains('Login').should('be.visible').click();
    cy.wait(5000);
  });

  it('can log out with the logout button', () => {
    cy.get('button').contains('Logout').click();
    cy.wait(5000).should(() => {
      expect(localStorage.token).eq(undefined);
    });
  });
});
