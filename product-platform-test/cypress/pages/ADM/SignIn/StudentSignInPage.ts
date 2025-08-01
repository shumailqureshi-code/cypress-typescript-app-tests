import { SDMUserData } from '../../../test_data/users/admUsers';
import Page from '../../Common/Page';

class StudentSignInPage extends Page {
  public elements = {
    userInputField: '#sign-in-username',
    passwordInputField: '#sign-in-password',
    signInButton: 'button[data-testid="submitButton"]',
    headerMessage: '.vol-page-header__message',
  };

  constructor() {
    super();
    this.url = `${Cypress.config('baseUrl')}/sign-in`;
  }

  /**
   * @param email
   * @param password
   */
  public studentLogin(user: SDMUserData) {
    cy.get(this.elements.userInputField).type(user.username);
    cy.get(this.elements.passwordInputField).type(user.password, { log: false });
    cy.get(this.elements.signInButton).click();
  }
}

export default new StudentSignInPage();
