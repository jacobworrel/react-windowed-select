import MenuList from './MenuList';
import React from 'react';
import Select from 'react-select';

function WindowedSelect (props, ref) {
  const { windowThreshold = 100 } = props;
  const isWindowed = (props.options || []).length >= windowThreshold;
  return (
    <Select
      {...props}
      components={{
        ...props.components,
        ...(
          isWindowed
            ? { MenuList }
            : {}
        )
      }}
      ref={ref}
    />
  );
}

export default React.forwardRef(WindowedSelect);