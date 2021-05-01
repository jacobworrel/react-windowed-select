import * as stories from './../../storybook-static/stories.json';
import * as R from 'ramda';

describe.skip(`storybook`, () => {
  const storyNameList = R.pipe(
    R.prop('stories'),
    R.keys,
  )(stories);

  R.forEach(storyName => {
    it(`${storyName} - should load`, () => {
      cy.visit(`http://localhost:6006/?path=/story/${storyName}`);
      cy.get(`#${storyName}`).click();
    });
  })(storyNameList);
});