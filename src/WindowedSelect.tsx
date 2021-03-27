import MenuList from './MenuList';
import * as React from 'react';
import Select, { Props } from 'react-select';
import { calcOptionsLength } from './util';

interface WindowedSelectProps extends Props {
  windowThreshold: number
}

function WindowedSelect ({ windowThreshold = 100, ...passedProps }: WindowedSelectProps, ref) {
  const optionsLength = React.useMemo(
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