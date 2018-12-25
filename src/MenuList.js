import PropTypes from 'prop-types';
import React from 'react';
import { VariableSizeList as List } from 'react-window';

const coerceToNum = x => {
  if (typeof x !== 'number') {
    return 0;
  }
  return x;
};

class OptionWrapper extends React.PureComponent {
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
      const children = React.Children.toArray(nextProps.children);

      const { getStyles } = nextProps;

      // calc option height
      const heights = children.map((option = {}) => {
        const {
          props: {
            isFocused,
            data: {
              options = [],
            } = {},
          } = {},
        } = option;

        if (options.length > 0) {
          let {
            height: groupHeight,
            marginBottom: groupMarginBottom,
            marginTop: groupMarginTop,
            paddingBottom: groupPaddingBottom,
            paddingTop: groupPaddingTop,
          } = getStyles('group', nextProps);

          let {
            height: groupHeadingHeight,
            marginBottom: groupHeadingMarginBottom,
            marginTop:  groupHeadingMarginTop,
            paddingBottom: groupHeadingPaddingBottom,
            paddingTop: groupHeadingPaddingTop,
          } = getStyles('groupHeading', nextProps);


          groupHeight = coerceToNum(groupHeight);
          groupMarginBottom = coerceToNum(groupMarginBottom);
          groupMarginTop = coerceToNum(groupMarginTop);
          groupPaddingBottom = coerceToNum(groupPaddingBottom);
          groupPaddingTop = coerceToNum(groupPaddingTop);

          groupHeadingHeight = coerceToNum(groupHeadingHeight);
          groupHeadingMarginBottom = coerceToNum(groupHeadingMarginBottom);
          groupHeadingPaddingBottom = coerceToNum(groupHeadingPaddingBottom);
          groupHeadingPaddingTop = coerceToNum(groupHeadingPaddingTop);


          return options.length * optionHeight
            + (groupHeight || (groupPaddingBottom + groupPaddingTop))
            + groupMarginBottom
            + groupMarginTop

            + groupHeadingHeight || (groupHeadingPaddingBottom + groupHeadingPaddingTop)
            + groupHeadingMarginBottom
            + groupHeadingMarginTop
        }

        return optionHeight;
      });

      const focusedIndex = children.findIndex(({ props: { isFocused } = {} }) => isFocused);
      const currentIndex = Math.max(focusedIndex, 0);

      const itemCount = children.length;

      // calc menu height
      const sum = (a, b) => a + b;
      const { maxHeight } = getStyles('menuList', nextProps);
      const totalHeight = heights.reduce(sum, 0);
      const menuHeight = Math.min(maxHeight, totalHeight);
      const estimatedItemSize = Math.floor(totalHeight / itemCount);

      return {
        children: nextProps.children,
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
    this.list.current.scrollToItem(currentIndex);
  }

  getItemSize (index) {
    return this.state.heights[index];
  }

  render() {
    const { children: rawChildren, getStyles, innerRef } = this.props;
    const { estimatedItemSize, menuHeight, itemCount } = this.state;
    const children = React.Children.toArray(rawChildren);

    const { maxHeight, ...menuListStyle } = getStyles('menuList', this.props);

    return (
      <div ref={innerRef} style={menuListStyle}>
        <List
          ref={this.list}
          estimatedItemSize={estimatedItemSize}
          height={menuHeight}
          itemCount={itemCount}
          itemSize={this.getItemSize}
          itemData={children}
        >
          {OptionWrapper}
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
