import Page from '../../Common/Page';

class StudentPortalPage extends Page {
  public elements = {
    headerMessage: '.vol-page-header__message',
    appCard: 'div.vol-program-card__title',
  };

  constructor() {
    super();
    this.url = `${Cypress.config('baseUrl')}/student`;
  }

  public verifyUserIsSignedIn() {
    cy.url().should('contain', this.url);
    cy.get(this.elements.headerMessage).should('be.visible');
  }

  public clickCardApp() {
    cy.get(this.elements.appCard).contains('Ready4Reading').click();
  }
}

export default new StudentPortalPage();
