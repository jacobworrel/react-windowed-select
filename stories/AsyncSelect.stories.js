import React from 'react';

import { storiesOf } from '@storybook/react';
import AsyncSelect from 'react-select/async';

import { WindowedMenuList } from '../src';

const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
    { value: 'silver', label: 'Silver', color: '#666666' },
    { value: 'silver', label: 'Silver', color: '#666666' },
    { value: 'silver', label: 'Silver', color: '#666666' },
    { value: 'silver', label: 'Silver', color: '#666666' },
    { value: 'silver', label: 'Silver', color: '#666666' },
    { value: 'silver', label: 'Silver', color: '#666666' },
    { value: 'silver', label: 'Silver', color: '#666666' },
    { value: 'silver', label: 'Silver', color: '#666666' },
    { value: 'silver', label: 'Silver', color: '#666666' },
    { value: 'silver', label: 'Silver', color: '#666666' },
    { value: 'silver', label: 'Silver', color: '#666666' },
];

const filterColors = (inputValue) => {
    return colourOptions.filter(i =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
};

const promiseOptions = inputValue =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(filterColors(inputValue));
        }, 1000);
    });

storiesOf('Async Select', module)
    .add('default', () => (
        <AsyncSelect
            components={{ MenuList: WindowedMenuList }}
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
        />
    ));