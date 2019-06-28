import MenuList from './MenuList';
import React from 'react';
import Select from 'react-select';

class WindowedSelect extends React.Component {
  render () {
    const {
      options,
      windowThreshold,
      selectRef
    } = this.props;

    const isWindowed = options.length >= windowThreshold;
    return (
      <Select {...this.props}
        ref={selectRef}
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
  selectRef: null,
};

export default WindowedSelect;
