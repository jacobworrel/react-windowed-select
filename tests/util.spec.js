import {
  calcOptionsLength,
  createGetHeight,
  flattenGroupedChildren,
  getCurrentIndex,
  isFocused,
} from '../src/util';
import React from 'react';

describe(`util`, () => {
  describe(`calcOptionsLength`, () => {
    it(`should calculate options length`, () => {
      const options = [1,2,3];
      expect(calcOptionsLength(options)).toEqual(3);
    });

    it(`should calculate grouped options length`, () => {
      const groupedOptions = [
        { options: [1,2,3] },
        { options: [4,5,6] },
        { options: [7,8,9] },
      ];
      expect(calcOptionsLength(groupedOptions)).toEqual(9);
    });

    it(`should handle nil options`, () => {
      expect(() => calcOptionsLength()).not.toThrow();
      expect(() => calcOptionsLength(undefined)).not.toThrow();
      expect(() => calcOptionsLength(null)).not.toThrow();
    });
  });

  describe(`createGetHeight`, () => {
    const groupHeadingStyles = { height: 0 };
    const optionStyles = { height: 1 };
    const noOptionsMsgStyles = { height: 2 };
    const loadingMsgStyles = { height: 3 };

    const getHeight = createGetHeight({
      groupHeadingStyles,
      optionStyles,
      noOptionsMsgStyles,
      loadingMsgStyles,
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

    test(`calls noOptionsMessage with inputValue`, () => {
      const noOptionsMessage = jest.fn(({ inputValue }) => inputValue);
      const child = {
        props: {
          children: 'Foo',
          inputValue: 'Foo',
          selectProps: {
            noOptionsMessage,
          },
        },
      };

      expect(getHeight(child)).toEqual(2);
      expect(noOptionsMessage.mock.calls[0][0]).toEqual({ inputValue: 'Foo' });
    });

    test(`returns loadingMessage height`, () => {
      const child = {
        props: {
          children: 'Loading...',
          selectProps: {
            loadingMessage: () => 'Loading...',
          },
        },
      };

      expect(getHeight(child)).toEqual(3);
    });

    test(`calls loadingMessage with inputValue`, () => {
      const loadingMessage = jest.fn(({ inputValue }) => inputValue);
      const child = {
        props: {
          children: 'Foo',
          inputValue: 'Foo',
          selectProps: {
            loadingMessage,
          },
        },
      };

      expect(getHeight(child)).toEqual(3);
      expect(loadingMessage.mock.calls[0][0]).toEqual({ inputValue: 'Foo' });
    });

    test(`returns default height`, () => {
      expect(getHeight({})).toEqual(35);
    });

    describe(`when no height in custom styles`, () => {
      const getHeight = createGetHeight({
        groupHeadingStyles: {},
        optionStyles: {},
        noOptionsMsgStyles: {},
        loadingMsgStyles: {},
      });

      test(`returns default height when no height in loadingMessage styles`, () => {
        expect(getHeight({
          props: {
            children: 'Loading...',
            selectProps: {
              loadingMessage: () => 'Loading...',
            },
          },
        })).toEqual(35);
      });

      test(`returns default height when no height in noOptionsMessage styles`, () => {
        expect(getHeight({
          props: {
            children: 'No Options',
            selectProps: {
              noOptionsMessage: () => 'No Options',
            },
          },
        })).toEqual(35);
      });

      test(`returns default height when no height in option styles`, () => {
        expect(getHeight({
          props: {
            type: 'option',
          },
        })).toEqual(35);
      });

      test(`returns default height when no height in group styles`, () => {
        expect(getHeight({
          props: {
            type: 'group',
          },
        })).toEqual(25);
      });
    });

    test(`negative: handles noop`, () => {
      expect(() => createGetHeight()()).not.toThrow();
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

    test(`negative: handles noop`, () => {
      expect(() => isFocused()).not.toThrow();
    });
  });
});