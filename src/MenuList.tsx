import {
  createGetHeight,
  flattenGroupedChildren,
  getCurrentIndex
} from './util';

import * as React from 'react';
import { ListChildComponentProps, VariableSizeList as List } from 'react-window';
import { OptionProps, GroupBase } from 'react-select';
import {useRef} from "react";

interface Style extends React.CSSProperties {
  top: number,
}

interface ListChildProps extends ListChildComponentProps {
  style: Style
}

interface OptionTypeBase {
  [key: string]: any;
}

function MenuList (props) {
  const children = React.useMemo(
    () => {
      const children = React.Children.toArray(props.children);

      const head = children[0] || {};

      if (React.isValidElement<OptionProps<OptionTypeBase, boolean, GroupBase<OptionTypeBase>>>(head)) {
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
      }
      else {
        return [];
      }
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

  const heights = React.useMemo(() => children.map(getHeight), [children]);
  const currentIndex = React.useMemo(() => getCurrentIndex(children), [children]);

  const itemCount = children.length;

  const [measuredHeights, setMeasuredHeights] = React.useState({});

  // calc menu height
  const { maxHeight, paddingBottom = 0, paddingTop = 0, ...menuListStyle } = getStyles('menuList', props);
  const totalHeight = React.useMemo(() => {
    return heights.reduce((sum, height, idx) => {
      if (measuredHeights[idx]) {
        return sum + measuredHeights[idx];
      }
      else {
        return sum + height;
      }
    }, 0);
  }, [heights, measuredHeights]);
  const totalMenuHeight = totalHeight + paddingBottom + paddingTop;
  const menuHeight = Math.min(maxHeight, totalMenuHeight);
  const estimatedItemSize = Math.floor(totalHeight / itemCount);

  const {
    selectProps,
  } = props;

  const ref = useRef<HTMLDivElement>();

  const { classNamePrefix, isMulti } = selectProps || {};
  const list = React.useRef<List>(null);

  React.useEffect(
    () => {
      setMeasuredHeights({});
    },
    [props.children]
  );

  // method to pass to inner item to set this items outer height
  const setMeasuredHeight = ({ index, measuredHeight }) => {
    if (measuredHeights[index] !== undefined && measuredHeights[index] === measuredHeight) {
      return;
    }

    setMeasuredHeights(measuredHeights => ({
      ...measuredHeights,
      [index]: measuredHeight,
    }));

    // this forces the list to rerender items after the item positions resizing
    if (list.current) {
      list.current.resetAfterIndex(index);
    }
  };

  React.useEffect(
    () => {
      /**
       * enables scrolling on key down arrow
       */
      const refCurrent = ref.current;

      if (currentIndex >= 0 && list.current !== null && (refCurrent !== null && refCurrent !== undefined)) {
        const currentItem = document.getElementById(children[currentIndex].props.innerProps.id)

        if (currentItem) {
          const currentItemRect = currentItem.getBoundingClientRect();
          const menuRect = refCurrent.getBoundingClientRect();

          if (Math.abs(currentItemRect.top - menuRect.bottom) <= Math.abs(currentItemRect.top - menuRect.top)) {
            if (currentItemRect.top + 5 >= menuRect.bottom) {
              list.current.scrollToItem(currentIndex);
            }
          } else {
            if ((currentItemRect.bottom - 5) < menuRect.top) {
              list.current.scrollToItem(currentIndex);
            }
          }
        } else {
          list.current.scrollToItem(currentIndex);
        }
      }
    },
    [currentIndex, children, list, ref]
  );

  return (
      <List
          className={classNamePrefix ? `${classNamePrefix}__menu-list${isMulti ? ` ${classNamePrefix}__menu-list--is-multi`: ''}` : ''}
          style={menuListStyle}
          ref={list}
          outerRef={ref}
          estimatedItemSize={estimatedItemSize}
          innerElementType={React.forwardRef(({ style, ...rest }, ref) => (
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
          width="100%"
          itemCount={itemCount}
          itemData={children}
          itemSize={index => measuredHeights[index] || heights[index]}
      >
        {({ data, index, style}: ListChildProps) => {
          return (
              <div
                  style={{
                    ...style,
                    top: `${parseFloat(style.top.toString()) + paddingTop}px`,
                  }}>
                <MenuItem
                    data={data[index]}
                    index={index}
                    setMeasuredHeight={setMeasuredHeight}
                />
              </div>
          )
        }}
      </List>
  );
}

function MenuItem({
  data,
  index,
  setMeasuredHeight,
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  // using useLayoutEffect prevents bounciness of options of re-renders
  React.useLayoutEffect(() => {
    if (ref.current) {
      const measuredHeight = ref.current.getBoundingClientRect().height;

      setMeasuredHeight({ index, measuredHeight });
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
