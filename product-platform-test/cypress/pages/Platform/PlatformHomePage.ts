import Page from '../Common/Page';

class PlatformHomePage extends Page {
  public elements = {
    r4rAppCard: 'a[href$="ready4reading"]',
  };

  constructor() {
    super();
    this.url = `${Cypress.config('baseUrl')}`;
  }

  public clickR4RAppCard() {
    cy.get(this.elements.r4rAppCard).click();
  }
}

export default new PlatformHomePage();
