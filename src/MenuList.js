import PropTypes from 'prop-types';
import React from 'react';
import { VariableSizeList as List } from 'react-window';

class MenuList extends React.Component {
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

        const { height: optionHeight = 35 } = getStyles('option', nextProps);

        if (options) {
          const {
            height: groupHeight = 0,
            marginBottom: groupMarginBottom = 0,
            marginTop: groupMarginTop = 0,
            paddingBottom: groupPaddingBottom = 8,
            paddingTop: groupPaddingTop = 8,
          } = getStyles('group', nextProps);

          const {
            height: groupHeadingHeight = 0,
            marginBottom: groupHeadingMarginBottom = 0,
            marginTop: groupHeadingMarginTop = 0,
            paddingBottom: groupHeadingPaddingBottom = 8,
            paddingTop: groupHeadingPaddingTop = 8,
          } = getStyles('groupHeading', nextProps);

          const groupHeaderHeight= 17;

          return options.length
            * optionHeight
            + groupHeaderHeight
            + groupPaddingBottom
            + groupPaddingTop;
        }

        return optionHeight;
      });

      const focusedIndex = children.findIndex(({ props: { isFocused } = {} }) => isFocused === true);
      const currentIndex = Math.max(focusedIndex, 0);

      const itemCount = children.length;

      // calc menu height
      const sum = (a, b) => a + b;
      const totalHeight = heights.reduce(sum, 0);
      const { maxHeight } = getStyles('menuList', nextProps);
      const menuHeight = Math.min(maxHeight, totalHeight);

      return {
        children: nextProps.children,
        currentIndex,
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
    const { children: rawChildren, innerRef, innerProps } = this.props;
    const { menuHeight, itemCount } = this.state;
    const children = React.Children.toArray(rawChildren);

    return (
      <div ref={innerRef} {...innerProps}>
        <List
          ref={this.list}
          height={menuHeight}
          itemCount={itemCount}
          itemSize={this.getItemSize}
        >
          {({ index, style }) => <div style={style}>{children[index]}</div>}
        </List>
      </div>
    );

  }
}

MenuList.propTypes = {
  options: PropTypes.array,
  getStyles: PropTypes.func,
  getValue: PropTypes.func,
};
MenuList.defaultProps = {};

export default MenuList;
