import Page from '../Common/Page';

class TeacherHubHomePage extends Page {
  public elements = {
    globalHeaderLogo: '[data-testid="global-header__logo"]',
  };

  constructor() {
    super();
    this.url = Cypress.env('R4R_TEACHER_URL');
  }

  public verifyUserIsNavigatedToR4R() {
    cy.url().should('contain', this.url);
    cy.get(this.elements.globalHeaderLogo).should('be.visible');
  }
}

export default new TeacherHubHomePage();
