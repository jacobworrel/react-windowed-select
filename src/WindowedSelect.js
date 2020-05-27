import MenuList from './MenuList';
import React, { useMemo } from 'react';
import Select from 'react-select';
import { calcOptionsLength } from './util';

function WindowedSelect (props, ref) {
  const { windowThreshold = 100 } = props;
  const optionsLength = useMemo(
    () => calcOptionsLength(props.options),
    [props.options]
  );
  const isWindowed = optionsLength >= windowThreshold;

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