import MenuList from './MenuList';
import * as React from 'react';
import Select, {createFilter, Props as SelectProps} from 'react-select';
import {calcOptionsLength} from './util';
import {useState} from "react";

interface WindowedSelectProps extends SelectProps {
    windowThreshold: number
}

function WindowedSelect({windowThreshold = 100, ...passedProps}: WindowedSelectProps, ref) {
    const [inputValue, setInputValue] = useState(passedProps.inputValue || '');
    const filterOption = passedProps.filterOption || createFilter({});
    const onInputChange = (newValue, actionMeta) => {
        setInputValue(newValue);
        if (passedProps.onInputChange) {
            passedProps.onInputChange(newValue, actionMeta);
        }
    }

    const optionsLength = React.useMemo(
        () => {
            console.log('memo', passedProps.options?.length, inputValue);
            const option = passedProps.options || [];
            const filteredOptions = option.filter(({label, value, ...data}) => filterOption({
                label,
                value,
                data
            }, inputValue));
            let optionsLength1 = calcOptionsLength(filteredOptions);
            console.log('optionslenght', optionsLength1);
            return optionsLength1;
        },
        [passedProps.options, inputValue]
    );
    const isWindowed = optionsLength >= windowThreshold;
    console.log('windowed?', isWindowed, optionsLength, windowThreshold)
    return (
        <Select
            {...passedProps}
            components={{
                ...passedProps.components,
                ...(
                    isWindowed
                        ? {MenuList}
                        : {}
                )
            }}
            ref={ref}
            inputValue={inputValue}
            onInputChange={onInputChange}
        />
    );
}

export default React.forwardRef(WindowedSelect);