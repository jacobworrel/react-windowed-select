import {
  createGetHeight,
  flattenGroupedChildren,
  getCurrentIndex,
} from './util';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { VariableSizeList as List } from 'react-window';

class MenuList extends React.PureComponent {
  constructor (props) {
    super(props);

    this.setListRef = this.setListRef.bind(this);
    this.getItemSize = this.getItemSize.bind(this);

    this.state = {
      currentIndex: 0,
      children: null,
      heights: [],
      itemCount: 0,
      menuHeight: 0,
    };
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.children !== prevState.children) {
      const { getStyles } = nextProps;
      let children = React.Children.toArray(nextProps.children);

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

      children = isGrouped
        ? flattenedChildren
        : children;

      const groupHeadingStyles = getStyles('groupHeading', nextProps);
      const loadingMsgStyles = getStyles('loadingMessage', nextProps);
      const noOptionsMsgStyles = getStyles('noOptionsMessage', nextProps);
      const optionStyles = getStyles('option', nextProps);
      const getHeight = createGetHeight({
        groupHeadingStyles,
        noOptionsMsgStyles,
        optionStyles,
        loadingMsgStyles,
      });

      const heights = children.map(getHeight);

      const currentIndex = getCurrentIndex(children);

      const itemCount = children.length;

      // calc menu height
      const sum = (a, b) => a + b;
      const { maxHeight, paddingBottom = 0, paddingTop = 0 } = getStyles('menuList', nextProps);
      const totalHeight = heights.reduce(sum, 0);
      const totalMenuHeight = totalHeight + paddingBottom + paddingTop;
      const menuHeight = Math.min(maxHeight, totalMenuHeight);
      const estimatedItemSize = Math.floor(totalHeight / itemCount);

      return {
        children,
        currentIndex,
        estimatedItemSize,
        heights,
        itemCount,
        menuHeight,
      };
    }

    return null;
  }

  componentDidUpdate() {
    const { currentIndex } = this.state;

    if (this.state.children.length === 1) {
      this.list.resetAfterIndex(0);
    }

    /**
     * enables scrolling on key down arrow
     *
     * note: prevents scrolling on index 0 to avoid
     * returning to top of menu when it remains open after selecting
     */
    if (currentIndex >= 1) {
      this.list.scrollToItem(currentIndex);
    }
  }

  getItemSize (index) {
    return this.state.heights[index];
  }

  setListRef(ref) {
    this.list = ref;
  }

  render() {
    const { getStyles, innerRef, selectProps } = this.props;
    const { children: stateChildren, estimatedItemSize, menuHeight, itemCount } = this.state;

    const {
      maxHeight, // must be removed bc state.menuHeight should be the single source of truth
      paddingTop,
      paddingBottom,
      ...menuListStyle
    } = getStyles('menuList', this.props);
    const { classNamePrefix, isMulti } = selectProps || {};

    return (
      <List
        className={classNamePrefix ? `${classNamePrefix}__menu-list${isMulti ? ` ${classNamePrefix}__menu-list--is-multi`: ''}` : ''}
        style={menuListStyle}
        ref={this.setListRef}
        outerRef={innerRef}
        estimatedItemSize={estimatedItemSize}
        innerElementType={forwardRef(({ style, ...rest }, ref) => (
          <div
            ref={ref}
            style={{
              ...style,
              height: `${parseFloat(style.height) + paddingBottom + paddingTop}px`
            }}
            {...rest}
          />
        ))}
        height={menuHeight}
        itemCount={itemCount}
        itemData={stateChildren}
        itemSize={this.getItemSize}
      >
        {({ data, index, style }) => {
          return (
            <div
              style={{
                ...style,
                top: `${parseFloat(style.top) + paddingTop}px`
              }}
            >
              {data[index]}
            </div>
          );
        }}
      </List>
    );
  }
}

MenuList.propTypes = {
  getStyles: PropTypes.func,
  getValue: PropTypes.func,
  options: PropTypes.array,
};

export default MenuList;
