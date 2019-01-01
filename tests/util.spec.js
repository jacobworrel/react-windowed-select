import { coerceToNum, flattenGroupedChildren } from '../src/util';
import React from 'react';

describe(`util`, () => {
  describe(`flattenGroupedChildren`, () => {
    const TestOption = React.createElement('div', { key: 'key' });
    const TestGroup = React.createElement(
     'div',
      {},
      [TestOption, TestOption]
    );

    test(`flattens grouped children one level deep`, () => {
      const children = flattenGroupedChildren([TestGroup]);
      expect(children).toEqual([
        React.cloneElement(TestGroup, { type: 'group' }, []),
        TestOption,
        TestOption,
      ])
    });

    test(`negative: handles nil nested children`, () => {
      const Test = React.createElement('div');
      expect(() => flattenGroupedChildren([Test])).not.toThrow();
    });
  });

  describe(`coerceToNum`, () => {
    describe(`when input is not a number`, () => {
      test(`returns 0`, () => {
        expect(coerceToNum('100%')).toEqual(0);
      });
    });

    describe(`when input is a number`, () => {
      test(`noops`, () => {
        expect(coerceToNum(1)).toEqual(1);
      });
    });
  });
});