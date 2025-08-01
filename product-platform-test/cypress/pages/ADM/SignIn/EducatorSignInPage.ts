import { SDMUserData } from '../../../test_data/users/admUsers';
import Page from '../../Common/Page';

class EducatorSignInPage extends Page {
  public elements = {
    loginButton: 'button[data-testid="myLogin"]',
    loginIframe: 'iframe[title="My Login"]',
    emailInputField: '#user-text-field',
    submitEmailButton: 'button#signin-email-submit-button',
    passwordInputField: '#password-text-field',
    singInButton: 'button#password',
  };

  constructor() {
    super();
    this.url = `${Cypress.config('baseUrl')}/sign-in/staff`;
  }

  /**
   * @param email
   * @param password
   */
  public myLogin(user: SDMUserData) {
    cy.get(this.elements.loginButton).click();
    cy.enter(this.elements.loginIframe).then((getBody) => {
      getBody().find(this.elements.emailInputField).type(user.username);
      getBody().find(this.elements.submitEmailButton).click();
      getBody().find(this.elements.passwordInputField).type(user.password, { log: false });
      getBody().find(this.elements.singInButton).click();
    });
  }
}

export default new EducatorSignInPage();
