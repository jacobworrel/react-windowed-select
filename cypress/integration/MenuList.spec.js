import * as R from 'ramda';
/**
 * @see https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/
 **/
const getIframeDocument = () => {
  return cy
    .get('#storybook-preview-iframe')
    // Cypress yields jQuery element, which has the real
    // DOM element under property "0".
    // From the real DOM iframe element we can get
    // the "document" element, it is stored in "contentDocument" property
    // Cypress "its" command can access deep properties using dot notation
    // https://on.cypress.io/its
    .its('0.contentDocument').should('exist');
};

const getIframeBody = () => {
  // get the document
  return getIframeDocument()
    // automatically retries until body is loaded
    .its('body').should('not.be.null')
    // wraps "body" DOM element to allow
    // chaining more Cypress commands, like ".find(...)"
    .then(cy.wrap);
};

describe('Default Select', () => {
  beforeEach(() => {
    cy.visit('http://localhost:6006/?path=/story/select--default');
  });

  it(`scrolls on arrow down`, () => {
    const focusedInput = getIframeBody().find('#default')
      .find('input')
      .first()
      .focus();

    R.times(() => focusedInput.type('{downarrow}', { force: true }), 15);

    getIframeBody().find('.default__menu-list').contains('Option 15');
  });
});