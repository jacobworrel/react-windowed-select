import {
  createGetHeight,
  flattenGroupedChildren,
  getCurrentIndex,
  isFocused,
} from '../src/util';
import React from 'react';

describe(`util`, () => {
  describe(`createGetHeight`, () => {
    const groupHeadingStyles = { height: 0 };
    const optionStyles = { height: 1 };
    const noOptionsMsgStyles = { height: 2 };

    const getHeight = createGetHeight({
      groupHeadingStyles,
      optionStyles,
      noOptionsMsgStyles,
    });

    test(`returns group height`, () => {
      const child = {
        props: {
          type: 'group',
        },
      };

      expect(getHeight(child)).toEqual(0);
    });

    test(`returns option height`, () => {
      const child = {
        props: {
          type: 'option',
        },
      };

      expect(getHeight(child)).toEqual(1);
    });

    test(`returns noOptionsMessage height`, () => {
      const child = {
        props: {
          children: 'No Options',
          selectProps: {
            noOptionsMessage: () => 'No Options',
          },
        },
      };

      expect(getHeight(child)).toEqual(2);
    });

    test(`returns default height`, () => {
      expect(getHeight({})).toEqual(35);
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
  describe(`isFocused`, () => {
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