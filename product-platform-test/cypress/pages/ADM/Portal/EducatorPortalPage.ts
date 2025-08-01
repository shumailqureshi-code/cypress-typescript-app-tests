import Page from '../../Common/Page';

class EducatorPortalPage extends Page {
  public elements = {
    headerMessage: '.vol-page-header__message',
    orgDropdown: 'div[data-testid="vol-organization-select"] div.vol-select-list__control',
    orgDropdownOption: 'div.vol-select-list__menu-list div',
    userAvatar: 'button[data-testid="vol-avatar"]',
    teacherRoleSelector: 'div.vol-profile-avatar__role:contains("TEACHER")',
    appCard: 'div.vol-program-card__title',
  };

  constructor() {
    super();
    this.url = `${Cypress.config('baseUrl')}/teacher`;
  }

  /**
   * Checks the user successfully signed in to app and landed on their portal page
   */
  public verifyUserIsSignedIn() {
    cy.url().should('contain', this.url);
    cy.get(this.elements.headerMessage)
      .should('be.visible')
      .invoke('text')
      .should('match', /^Welcome, .+!$/);
  }

  public switchUserRoleToTeacher() {
    cy.get(this.elements.userAvatar).click({ force: true });
    cy.get(this.elements.teacherRoleSelector).click({ force: true });
  }

  public selectOrg(orgName: string) {
    cy.get(this.elements.orgDropdown).click();
    cy.get(this.elements.orgDropdownOption).contains(orgName).click();
  }

  public clickR4RCardApp() {
    cy.get(this.elements.appCard).contains('Ready4Reading').click();
  }
}

export default new EducatorPortalPage();
