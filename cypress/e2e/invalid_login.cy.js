const invalidEmail = 'invalidUser@yahoo.com';
const invalidPassword = '12345';
const minlength = 8;
describe('invalid login credentials', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
    cy.wait(5000);
  });

  it('will throw error message if the email input will not match the required pattern', () => {
    cy.get('#registerForm button')
      .contains('Login')
      .should('be.visible')
      .click();
    cy.wait(5000);
    cy.get("input#loginEmail[type='email']").type(invalidEmail);
    cy.get('#loginForm button').contains('Login').should('be.visible').click();

    cy.get('input#loginEmail[name="email"]')
      .should(($input) => {
        const pattern = new RegExp($input.attr('pattern'));
        expect(pattern.test(invalidEmail)).to.be.false;
      })
      .then(() => {
        cy.get('input:invalid').should('be.visible');
      });
  });

  it('will throw error message if the password length is less than the required length', () => {
    cy.get('#registerForm button')
      .contains('Login')
      .should('be.visible')
      .click();
    cy.wait(5000);
    cy.get("input#loginEmail[type='email']").type(Cypress.env('email'));
    cy.get("input#loginPassword[type='password']").type(invalidPassword);
    cy.get('#loginForm button').contains('Login').should('be.visible').click();

    cy.get('input.form-control#loginPassword').should('be.visible');
  });

  it('will throw an error message if the login credentials is not valid', () => {
    cy.get('#registerForm button')
      .contains('Login')
      .should('be.visible')
      .click();
    cy.wait(5000);
    cy.get("input#loginEmail[type='email']").type('invalidUser@noroff.no');
    cy.get("input#loginPassword[type='password']").type('123445678');
    cy.get('#loginForm button').contains('Login').should('be.visible').click();

    cy.window().then((win) => {
      cy.stub(win, 'alert');
    });

    cy.wait(10000);

    cy.window().then((win) => {
      expect(win.alert).to.be.calledOnce;
      expect(win.alert).to.be.calledWith(
        'Either your username was not found or your password is incorrect'
      );
    });
  });
});
