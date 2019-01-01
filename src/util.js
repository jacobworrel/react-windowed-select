import React from 'react';

export const coerceToNum = x => {
  if (typeof x !== 'number') {
    return 0;
  }
  return x;
};

export const flattenGroupedChildren = children => {
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
};

export const isFocused = ({ props: { isFocused } = {} }) => isFocused === true;

export const getCurrentIndex = children => Math.max(
  children.findIndex(isFocused),
  0
);