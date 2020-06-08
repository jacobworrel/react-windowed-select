import MenuList from './MenuList';
import React, { useMemo } from 'react';
import Select from 'react-select';
import { calcOptionsLength } from './util';

function WindowedSelect ({ windowThreshold = 100, ...passedProps }, ref) {
  const optionsLength = useMemo(
    () => calcOptionsLength(passedProps.options),
    [passedProps.options]
  );
  const isWindowed = optionsLength >= windowThreshold;

  return (
    <Select
      {...passedProps}
      components={{
        ...passedProps.components,
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