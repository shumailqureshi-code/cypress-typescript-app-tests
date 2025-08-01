import './commands';
import 'cypress-iframe';
// @ts-expect-error @see https://github.com/cypress-io/cypress/tree/develop/npm/grep
import registerCypressGrep from '@cypress/grep';

registerCypressGrep();

Cypress.on('uncaught:exception', () => {
  return false;
});
