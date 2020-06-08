import * as R from 'ramda';

describe('MenuList', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it(`scrolls on arrow down`, () => {
    const focusedInput = cy.get('#demo-1K')
      .get('input')
      .first()
      .focus();

    R.times(() => focusedInput.type('{downarrow}'), 15);

    cy.get('.demo__menu-list').contains('Option 15');
  });
});