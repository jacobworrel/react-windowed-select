import MenuList from './MenuList.js';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';

class WindowSelect extends React.Component {
  render () {
    const {
      options,
      windowThreshold,
    } = this.props;

    const isWindow = options.length >= windowThreshold;
    return (
      <Select {...this.props}
        components={{
          ...this.props.components,
          ...(
            isWindow
              ? { MenuList }
              : {}
          )
        }}
        styles={{
          groupHeading: (base) => ({
            ...base,
            marginBottom: 3,
          }),
        }}
      />
    );
  }
}

WindowSelect.propTypes = {};
WindowSelect.defaultProps = {
  windowThreshold: 100,
};

export default WindowSelect;
