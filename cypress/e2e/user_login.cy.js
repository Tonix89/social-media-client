describe('login user', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
    cy.wait(500);
  });

  it('can login and access their profile', () => {
    cy.get('#registerForm button')
      .contains('Login')
      .should('be.visible')
      .click();
    cy.wait(500);
    cy.get("input#loginEmail[type='email']").type('userTest@noroff.no');
    cy.get("input#loginPassword[type='password']").type('12345678');
    cy.get('#loginForm button').contains('Login').should('be.visible').click();
    cy.url().should('include', 'profile');
  });
});
