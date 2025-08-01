export default abstract class Page {
  /**
   * URL for the page
   */
  public url: string;

  /**
   * Contains all the specified selectors for the page
   */
  abstract elements: Record<string, string>;

  /**
   * Navigates to the url for this page
   */
  public visit(url = this.url) {
    cy.visit(url);
  }
}
