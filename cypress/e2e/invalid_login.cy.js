describe('invalid login credentials', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
    cy.wait(500);
  });

  it('will fail the test if the email did not match the required pattern', () => {
    cy.get('#registerForm button')
      .contains('Login')
      .should('be.visible')
      .click();
    cy.wait(500);
    cy.get("input#loginEmail[type='email']").type('invalidUser@yahoo.com');
    cy.get('#loginForm button').contains('Login').should('be.visible').click();

    cy.get('input#loginEmail[name="email"]').should(($input) => {
      const value = $input.val();
      expect(value).to.match(/[\w\-.]+@(stud.)?noroff.no$/);
    });
  });

  it('will fail the test if the password length is less than the required length', () => {
    cy.get('#registerForm button')
      .contains('Login')
      .should('be.visible')
      .click();
    cy.wait(500);
    cy.get("input#loginEmail[type='email']").type('userTest@noroff.no');
    cy.get("input#loginPassword[type='password']").type('12345');
    cy.get('#loginForm button').contains('Login').should('be.visible').click();

    cy.get('input#loginPassword[name="password"]').should(($input) => {
      expect($input.val().length).to.be.at.least(8);
    });
    cy.get('.form-control:invalid').should('be.visible');
  });

  it('will throw an error message if the login credentials is not valid', () => {
    cy.get('#registerForm button')
      .contains('Login')
      .should('be.visible')
      .click();
    cy.wait(500);
    cy.get("input#loginEmail[type='email']").type('invalidUser@noroff.no');
    cy.get("input#loginPassword[type='password']").type('123445678');
    cy.get('#loginForm button').contains('Login').should('be.visible').click();

    cy.window().then((win) => {
      cy.stub(win, 'alert');
    });

    cy.wait(1000);

    cy.window().then((win) => {
      expect(win.alert).to.be.calledOnce;
      expect(win.alert).to.be.calledWith(
        'Either your username was not found or your password is incorrect'
      );
    });
  });
});
