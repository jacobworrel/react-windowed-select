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
  it(`scrolls on arrow down`, () => {
    const story = 'default';
    cy.visit(`http://localhost:6006/?path=/story/select--${story}`);
    cy.get("#select--default").click();
    const focusedInput = getIframeBody().find(`#${story}`, { timeout: 15000 })
      .find('input')
      .first()
      .focus();

    R.times(() => focusedInput.type('{downarrow}', { force: true }), 15);

    getIframeBody().find(`.${story}__menu-list`).contains('Option 15');
  });

  it(`should have dynamic no options input value`, () => {
    const story = 'no-options-msg-with-dynamic-input-value';
    cy.visit(`http://localhost:6006/?path=/story/select--${story}`);
    cy.get(`#select--${story}`).click();
    const focusedInput = getIframeBody().find(`#${story}`, { timeout: 15000 })
      .find('input')
      .first()
      .focus();

    focusedInput.type('darn', { force: true });

    getIframeBody().find(`.${story}__menu-list`).contains('No darn options');
  });

  it(`should have dynamic loading input value`, () => {
    const story = 'loading-msg-with-dynamic-input-value';
    cy.visit(`http://localhost:6006/?path=/story/select--${story}`);
    cy.get(`#select--${story}`).click();
    const focusedInput = getIframeBody().find(`#${story}`, { timeout: 15000 })
      .find('input')
      .first()
      .focus();

    focusedInput.type('cool stuff', { force: true });

    getIframeBody().find(`.${story}__menu-list`).contains('Loading cool stuff...');
  });
});