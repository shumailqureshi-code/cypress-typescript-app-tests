import Page from '../Common/Page';
import { UserData } from '../../test_data/users/platformUsers/sync';

class PlatformSignInPage extends Page {
  public elements = {
    userNameInput: 'input[name="username"]',
    passwordInput: 'input[name="password"]',
    districtDropdown: 'input[placeholder="District"',
  };

  constructor() {
    super();
    this.url = `${Cypress.config('baseUrl')}/sign-in`;
  }

  /**
   * @param email
   * @param password
   */
  public ssLogIn(user: UserData) {
    cy.intercept({
      method: 'POST',
      url: /rosterstreams\.com\/auth/,
    }).as('loginRequest');
    cy.intercept({
      method: 'GET',
      url: /\/api\/auth\/v2\/me/,
    }).as('userDataRequest');
    cy.contains('Sync').click();
    const args = {
      elements: this.elements,
      user,
    };
    cy.origin('https://so.us-east-1.rewsdt.com', { args }, ({ elements, user }) => {
      Cypress.on('uncaught:exception', () => false);
      cy.get(elements.userNameInput).click();
      cy.get(elements.passwordInput).type(user.username);
      cy.get(elements.passwordInput).click();
      cy.get(elements.passwordInput).type(user.password);
      cy.get(elements.districtDropdown).click();
      cy.contains(new RegExp(`^${user.district}$`)).click();
      cy.contains('Login').click();
      cy.wait('@loginRequest');
      cy.wait('@userDataRequest');
    });
    cy.visit('/');
    cy.wait('@userDataRequest');
    cy.getCookie('platform').should('exist');
  }
}

export default new PlatformSignInPage();
