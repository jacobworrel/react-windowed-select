import { VariableSizeList as List } from 'react-window';
import PropTypes from 'prop-types';
import React from 'react';

class MenuList extends React.Component {
  constructor (props) {
    super(props);

    this.list = React.createRef();
    this.getItemSize = this.getItemSize.bind(this);

    this.state = {
      currentIndex: 0,
      children: null,
    };
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.children !== prevState.children) {
      const children = React.Children.toArray(nextProps.children);
      let focusedIndex = 0;
      let totalHeight = 0;

      const heights = children.reduce((result, option, index) => {
        const { props: { isFocused } } = option;
        if (isFocused) {
          focusedIndex = index;
        }

        //todo figure out how to get computed heights of 'option', 'group' and 'groupHeading' components
        const { height: optionHeight = 35 } = nextProps.getStyles('option', nextProps);
        const groupStyles = nextProps.getStyles('group', nextProps);
        // const groupHeadingStyles = nextProps.getStyles('groupHeading', nextProps);
        // handle grouped options
        if (option.props.data.options) {
          const groupHeaderHeight= 17;
          const height = option.props.data.options.length * optionHeight
            + groupHeaderHeight
            + groupStyles.paddingBottom
            + groupStyles.paddingTop;

          totalHeight += height;

          result.push(height);
          return result;
        }

        totalHeight += optionHeight;

        result.push(optionHeight);
        return result;
      }, []);

      const currentIndex = Math.max(focusedIndex, 0);
      const itemCount = children.length;
      const { maxHeight } = nextProps.getStyles('menuList', nextProps);
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
    const {
      children: rawChildren,
      getStyles,
      getValue,
    } = this.props;

    const { menuHeight, itemCount } = this.state;

    const children = React.Children.toArray(rawChildren);

    return (
      <List
        ref={this.list}
        height={menuHeight}
        itemCount={itemCount}
        itemSize={this.getItemSize}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
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
