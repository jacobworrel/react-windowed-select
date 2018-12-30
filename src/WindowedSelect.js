import MenuList from './MenuList.js';
import React from 'react';
import Select from 'react-select';

class WindowedSelect extends React.Component {
  render () {
    const {
      options,
      windowThreshold,
    } = this.props;

    const isWindowed = options.length >= windowThreshold;
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
      />
    );
  }
}

WindowedSelect.defaultProps = {
  windowThreshold: 100,
  options: [],
};

export default WindowedSelect;
