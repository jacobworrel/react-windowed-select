import { VariableSizeList as List } from 'react-window';
import PropTypes from 'prop-types';
import React from 'react';

const GROUP_HEADER_HEIGHT = 17;
const GROUP_PADDING = 16;

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

        const { height: optionHeight = 35 } = nextProps.getStyles('option', nextProps);
        if (option.props.data.options) {
          console.log('INSIDE');
          const height = option.props.data.options.length * optionHeight + GROUP_HEADER_HEIGHT + GROUP_PADDING;
          totalHeight += height;

          result.push(height);
          return result;
        }
        totalHeight += optionHeight;
        result.push(optionHeight);
        return result;

      }, []);
      console.log('TOTAL HEIGHT', totalHeight);
      console.log('HEIGHTS', heights);
      // const currentIndex = Math.max(
      //   children.findIndex(({ props: { isFocused } }) => isFocused),
      //   0
      // );
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
    // const option = this.props.options[idx];
    // const { height: optionHeight = 35 } = this.props.getStyles('option', this.props);
    // if (option.options) {
    //   return option.options.length * optionHeight + GROUP_HEADER_HEIGHT;
    // }
    // return optionHeight;

    return this.state.heights[index];
  }

  render() {
    const {
      children: rawChildren,
      getStyles,
      getValue,
      options,
    } = this.props;

    const { itemCount, menuHeight } = this.state;

    const [ value ] = getValue();
    const { maxHeight } = getStyles('menuList', this.props);

    // const { height: optionHeight = 35 } = getStyles('option', this.props);
    // const initialOffset = options.indexOf(value) * optionHeight;

    // const menuHeight = itemCount * optionHeight < maxHeight
    //   ? itemCount * optionHeight
    //   : maxHeight;

    const children = React.Children.toArray(rawChildren);

    return (
      <List
        ref={this.list}
        height={menuHeight}
        itemCount={children.length}
        itemSize={this.getItemSize}
        // initialScrollOffset={initialOffset}
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
