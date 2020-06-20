import {
  createGetHeight,
  flattenGroupedChildren,
  getCurrentIndex,
  sum,
} from './util';

import React, { forwardRef, useRef, useMemo, useEffect, useLayoutEffect, useState } from 'react';
import { VariableSizeList as List } from 'react-window';

function MenuList (props) {
  const children = useMemo(
    () => {
      const children = React.Children.toArray(props.children);

      const head = children[0] || {};
      const {
        props: {
          data: {
            options = []
          } = {},
        } = {},
      } = head;
      const groupedChildrenLength = options.length;
      const isGrouped = groupedChildrenLength > 0;
      const flattenedChildren = isGrouped && flattenGroupedChildren(children);

      return isGrouped
        ? flattenedChildren
        : children;
    },
    [props.children]
  );

  const { getStyles } = props;
  const groupHeadingStyles = getStyles('groupHeading', props);
  const loadingMsgStyles = getStyles('loadingMessage', props);
  const noOptionsMsgStyles = getStyles('noOptionsMessage', props);
  const optionStyles = getStyles('option', props);
  const getHeight = createGetHeight({
    groupHeadingStyles,
    noOptionsMsgStyles,
    optionStyles,
    loadingMsgStyles,
  });

  const heights = useMemo(() => children.map(getHeight), [children]);
  const currentIndex = useMemo(() => getCurrentIndex(children), [children]);

  const itemCount = children.length;

  // calc menu height
  const { maxHeight, paddingBottom = 0, paddingTop = 0, ...menuListStyle } = getStyles('menuList', props);
  const totalHeight = useMemo(() => heights.reduce(sum, 0), [heights]);
  const totalMenuHeight = totalHeight + paddingBottom + paddingTop;
  const menuHeight = Math.min(maxHeight, totalMenuHeight);
  const estimatedItemSize = Math.floor(totalHeight / itemCount);

  const {
    innerRef,
    selectProps,
  } = props;

  const { classNamePrefix, isMulti } = selectProps || {};
  const list = useRef(null);


  const [measuredHeights, setMeasuredHeights] = useState({});
  useEffect(
    () => {
      setMeasuredHeights({});
    },
    [props.children]
  );

  // method to pass to inner item to set this items outer height
  const setMeasuredHeight = ({ index, measuredHeight }) => {
    if (measuredHeights[index] && measuredHeights[index] === measuredHeight) {
      return;
    }

    setMeasuredHeights({
      ...measuredHeights,
      [index]: measuredHeight,
    });

    // this forces the list to rerender items after the item positions resizing
    if (list.current)
      list.current.resetAfterIndex(index);
  };

  useEffect(
    () => {
      /**
       * enables scrolling on key down arrow
       */
      if (currentIndex >= 0 && list.current !== null) {
        list.current.scrollToItem(currentIndex);
      }
    },
    [currentIndex, children, list]
  );

  return (
    <List
      className={classNamePrefix ? `${classNamePrefix}__menu-list${isMulti ? ` ${classNamePrefix}__menu-list--is-multi`: ''}` : ''}
      style={menuListStyle}
      ref={list}
      outerRef={innerRef}
      estimatedItemSize={estimatedItemSize}
      innerElementType={forwardRef(({ style, ...rest }, ref) => (
        <div
          ref={ref}
          style={{
            ...style,
            height: `${ parseFloat(style.height) + paddingBottom + paddingTop }px`
          }}
          {...rest}
        />
      ))}
      height={menuHeight}
      itemCount={itemCount}
      itemData={children}
      itemSize={index => measuredHeights[index] || heights[index]}
    >
    {({ data, index, style}) => (
      <div
        style={{
          ...style,
          top: `${parseFloat(style.top) + paddingTop}px`,
        }}>
        <MenuItem
          data={data[index]} 
          index={index}
          setMeasuredHeight={setMeasuredHeight}
          height={heights[index]}
        />
      </div>
    )}
    </List>
  );
}

function MenuItem({
  data,
  index,
  setMeasuredHeight,
  height,
}) {
  const ref = useRef();

  // using useLayoutEffect prevents bounciness of options of re-renders
  useLayoutEffect(() => {
    if (ref.current) {
      const measuredHeight = ref.current.getBoundingClientRect().height;

      // only set menu item height when needed, else MenuList is rerendered for each windowed menu item
      if (measuredHeight > height) {
        setMeasuredHeight({ index, measuredHeight });
      }
    }
  }, [ref.current]);

  return (
    <div
      key={`option-${index}`}
      ref={ref}
    >
      {data}
    </div>
  );
}
export default MenuList;
