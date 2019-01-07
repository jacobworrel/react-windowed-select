import {
  createGetHeight,
  flattenGroupedChildren,
  getCurrentIndex,
} from './util';
import PropTypes from 'prop-types';
import React from 'react';
import { VariableSizeList as List } from 'react-window';

class ItemWrapper extends React.PureComponent {
  render() {
    const { data, index, style } = this.props;
    return (
      <div style={style}>{data[index]}</div>
    );
  }
}

class MenuList extends React.PureComponent {
  constructor (props) {
    super(props);

    this.list = React.createRef();
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
      const noOptionsMsgStyles = getStyles('noOptionsMessage', nextProps);
      const optionStyles = getStyles('option', nextProps);
      const getHeight = createGetHeight({
        groupHeadingStyles,
        noOptionsMsgStyles,
        optionStyles,
      });

      const heights = children.map(getHeight);

      const currentIndex = getCurrentIndex(children);

      const itemCount = children.length;

      // calc menu height
      const sum = (a, b) => a + b;
      const totalHeight = heights.reduce(sum, 0);
      const { maxHeight } = getStyles('menuList', nextProps);
      const menuHeight = Math.min(maxHeight, totalHeight);
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
      this.list.current.resetAfterIndex(0);
    }

    /**
     * enables scrolling on key down arrow
     *
     * note: prevents scrolling on index 0 and 1 to avoid
     * returning to top of menu when it remains open after selecting
     */
    if (currentIndex > 1) {
      this.list.current.scrollToItem(currentIndex);
    }
  }

  getItemSize (index) {
    return this.state.heights[index];
  }

  render() {
    const { getStyles, innerRef } = this.props;
    const { children: stateChildren, estimatedItemSize, menuHeight, itemCount } = this.state;

    const { maxHeight, ...menuListStyle } = getStyles('menuList', this.props);

    return (
      <div ref={innerRef} style={menuListStyle}>
        <List
          ref={this.list}
          estimatedItemSize={estimatedItemSize}
          height={menuHeight}
          itemCount={itemCount}
          itemData={stateChildren}
          itemSize={this.getItemSize}
        >
          {ItemWrapper}
        </List>
      </div>
    );
  }
}

MenuList.propTypes = {
  getStyles: PropTypes.func,
  getValue: PropTypes.func,
  options: PropTypes.array,
};

export default MenuList;
