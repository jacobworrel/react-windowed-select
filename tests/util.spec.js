import {
  coerceToNum,
  flattenGroupedChildren,
  getCurrentIndex,
  isFocused,
} from '../src/util';
import React from 'react';

describe(`util`, () => {
  describe(`coerceToNum`, () => {
    test(`returns 0 when input is not a number`, () => {
      expect(coerceToNum('100%')).toEqual(0);
    });

    test(`noops when input is a number`, () => {
      expect(coerceToNum(1)).toEqual(1);
    });
  });
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
  describe(`getCurrentIndex`, () => {
    test(`returns focused item index when item is focused`, () => {
      const children = [
        { props: { isFocused: false } },
        { props: { isFocused: true } },
      ];
      expect(getCurrentIndex(children)).toEqual(1);
    });

    test(`returns 0 when no item is focused`, () => {
      const children = [
        { props: { isFocused: false } },
        { props: { isFocused: false } },
      ];
      expect(getCurrentIndex(children)).toEqual(0);
    });
  });
  describe.only(`isFocused`, () => {
    test(`returns true when isFocused is true`, () => {
      const item = {
        props: {
          isFocused: true,
        },
      };
      expect(isFocused(item)).toEqual(true);
    });

    test(`returns false when isFocused is not true`, () => {
      expect(isFocused({ props: { isFocused: false } })).toEqual(false);

      expect(isFocused({ props: {} })).toEqual(false);
    });
  });
});