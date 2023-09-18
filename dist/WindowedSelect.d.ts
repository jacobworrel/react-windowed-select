import * as React from 'react';
import { Props as SelectProps } from 'react-select';
interface WindowedSelectProps extends SelectProps {
    windowThreshold: number;
}
declare const _default: React.ForwardRefExoticComponent<WindowedSelectProps & React.RefAttributes<unknown>>;
export default _default;
