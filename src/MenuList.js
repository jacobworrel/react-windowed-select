import PropTypes from 'prop-types';
import React from 'react';
import { VariableSizeList as List } from 'react-window';

const coerceToNum = x => {
  if (typeof x !== 'number') {
    return 0;
  }
  return x;
};

const flattenChildren = children => {
  return children.reduce((result, child) => {
    const {
      props: {
        children: nestedChildren = [],
      } = {},
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
    const { height: optionHeight = 35 } = nextProps.getStyles('option', nextProps);

    if (nextProps.children !== prevState.children) {
      const { getStyles } = nextProps;

      const head = nextProps.children[0] || {};
      const {
        props: {
          data: {
            options = []
          } = {},
        } = {},
      } = head;
      const groupedChildrenLength = options.length;
      const isGrouped = groupedChildrenLength > 0;
      const flattenedChildren = isGrouped && flattenChildren(nextProps.children);

      const children = isGrouped
        ? React.Children.toArray(flattenedChildren)
        : React.Children.toArray(nextProps.children);

      // calc option height
      const heights = children.map((option = {}) => {
        if (isGrouped) {
          const {
            props: {
              type,
            } = {}
          } = option;

          if (type === 'group') {
            let {
              height: groupHeight,
              marginBottom: groupMarginBottom,
              marginTop: groupMarginTop,
              paddingBottom: groupPaddingBottom,
              paddingTop: groupPaddingTop,
            } = getStyles('group', nextProps);

            groupHeight = coerceToNum(groupHeight);
            groupMarginBottom = coerceToNum(groupMarginBottom);
            groupMarginTop = coerceToNum(groupMarginTop);
            groupPaddingBottom = coerceToNum(groupPaddingBottom);
            groupPaddingTop = coerceToNum(groupPaddingTop);

            let {
              height: groupHeadingHeight,
              marginBottom: groupHeadingMarginBottom,
              marginTop:  groupHeadingMarginTop,
              paddingBottom: groupHeadingPaddingBottom,
              paddingTop: groupHeadingPaddingTop,
            } = getStyles('groupHeading', nextProps);

            groupHeadingHeight = coerceToNum(groupHeadingHeight);
            groupHeadingMarginBottom = coerceToNum(groupHeadingMarginBottom);
            groupHeadingMarginTop = coerceToNum(groupHeadingMarginTop);
            groupHeadingPaddingBottom = coerceToNum(groupHeadingPaddingBottom);
            groupHeadingPaddingTop = coerceToNum(groupHeadingPaddingTop);

            return (groupHeight || (groupPaddingBottom + groupPaddingTop))
              + groupMarginBottom
              + groupMarginTop

              + groupHeadingHeight || (groupHeadingPaddingBottom + groupHeadingPaddingTop)
              + groupHeadingMarginBottom
              + groupHeadingMarginTop
          }
        }

        return optionHeight;
      });

      // find focused item
      const isFocusedPredicate = ({ props: { isFocused } = {} }) => isFocused;
      const focusedIndex = children.findIndex(isFocusedPredicate);
      const currentIndex = Math.max(focusedIndex, 0);

      const itemCount = children.length;

      // calc menu height
      const sum = (a, b) => a + b;
      const { maxHeight } = getStyles('menuList', nextProps);
      const totalHeight = heights.reduce(sum, 0);
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

    this.list.current.scrollToItem(currentIndex);
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
MenuList.defaultProps = {};

export default MenuList;
