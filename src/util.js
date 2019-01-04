import React from 'react';

export function flattenGroupedChildren (children) {
  return children.reduce((result, child) => {
    const {
      props: {
        children: nestedChildren = [],
      },
    } = child;

    return [
      ...result,
      React.cloneElement(
        child,
        { type: 'group' },
        []
      ),
      ...nestedChildren,
    ];
  }, []);
}

export function isFocused ({ props: { isFocused } = {} }) {
  return isFocused === true;
}

export function getCurrentIndex (children) {
  return Math.max(
    children.findIndex(isFocused),
    0
  );
}

export function createGetHeight ({ groupHeadingStyles, noOptionsMsgStyles, optionStyles }) {
  return function getHeight (child = {}) {
    const {
      props: {
        type,
        children,
        selectProps: {
          noOptionsMessage,
        },
      } = {}
    } = child;

    if (type === 'group') {
      const { height = 25 } = groupHeadingStyles;
      return height;
    }
    else if (type === 'option') {
      const { height = 35 } = optionStyles;
      return height;
    }
    else if (children === noOptionsMessage()) {
      const { height = 35 } = noOptionsMessageStyles;
      return height;
    }
    else {
      return 35;
    }
  };
}