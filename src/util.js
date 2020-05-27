import React, { useRef, useEffect } from 'react';

export function calcOptionsLength (options) {
  options = options || [];
  const head = options[0] || {};
  const isGrouped = head.options !== undefined;

  return isGrouped
    ? options.reduce((result, group) => result + group.options.length, 0)
    : options.length;
}

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

export function isFocused ({ props: { isFocused } = {} } = {}) {
  return isFocused === true;
}

export function getCurrentIndex (children) {
  return Math.max(
    children.findIndex(isFocused),
    0
  );
}

export function createGetHeight ({
  groupHeadingStyles,
  noOptionsMsgStyles,
  optionStyles,
  loadingMsgStyles,
} = {}) {
  return function getHeight (child = {}) {
    const {
      props: {
        type,
        children,
        inputValue,
        selectProps: {
          noOptionsMessage,
          loadingMessage,
        } = {},
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
    else if (typeof noOptionsMessage === 'function' && children === noOptionsMessage({ inputValue })) {
      const { height = 35 } = noOptionsMsgStyles;
      return height;
    }
    else if (typeof loadingMessage === 'function' && children === loadingMessage({ inputValue })) {
      const { height = 35 } = loadingMsgStyles;
      return height;
    }
    else {
      return 35;
    }
  };
}

export const sum = (a, b) => a + b;

/**
 * This hooks allows the component to hold a ref while also exposing the same ref to its parents.
 * For example:
 * const MyComponent = (props, ref) => {
 *   const innerRef = useShareForwardedRef(ref);
 *
 *   ...
 *
 *   return <div ref={ref}>
 *    ...
 *   </div>
 * }
 *
 * https://gist.github.com/pie6k/b4717f392d773a71f67e110b42927fea
 */
export const useShareForwardedRef = forwardedRef => {
  // final ref that will share value with forward ref. this is the one we will attach to components
  const innerRef = useRef(null);

  // after every render - try to share current ref value with forwarded ref
  useEffect(() => {
    if (!forwardedRef) {
      return;
    }
    if (typeof forwardedRef === "function") {
      forwardedRef(innerRef.current);
    } else {
      forwardedRef.current = innerRef.current;
    }
  });

  return innerRef;
};
