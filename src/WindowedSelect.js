import MenuList from './MenuList.js';
import React from 'react';
import Select from '../../react-select/src';
// import Select from 'react-select';

class WindowedSelect extends React.Component {
  render () {
    const {
      options,
      windowThreshold,
    } = this.props;

    const isWindowed = options.length >= windowThreshold;
    console.log('in windowed sel')
    return (
      <Select {...this.props}
        components={{
          ...this.props.components,
          ...(
            isWindowed
              ? { MenuList }
              : {}
          )
        }}
        renderMenu={true}
      />
    );
  }
}

WindowedSelect.defaultProps = {
  windowThreshold: 100,
  options: [],
};

export default WindowedSelect;
