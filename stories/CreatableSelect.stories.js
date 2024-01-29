import React from 'react';

import { storiesOf } from '@storybook/react';
import CreatableSelect from 'react-select/creatable';

import { WindowedMenuList } from '../src';

import { groupedOptions, options200 } from './storyUtil';

storiesOf('Creatable Select', module)
    .add('default', () => (
        <CreatableSelect
            // menuIsOpen
            options={options200}
            components={{ MenuList: WindowedMenuList }}
            onChange={(newValue, actionMeta) => {
                console.group('Value Changed');
                console.log(newValue);
                console.log(`action: ${actionMeta.action}`);
                console.groupEnd();
            }}
            onInputChange={(inputValue, actionMeta) => {
                console.group('Input Changed');
                console.log(inputValue);
                console.log(`action: ${actionMeta.action}`);
                console.groupEnd();
            }}
        />
    )).add('grouped', () => (
        <CreatableSelect
            // menuIsOpen
            options={groupedOptions}
            components={{ MenuList: WindowedMenuList }}
            onChange={(newValue, actionMeta) => {
                console.group('Value Changed');
                console.log(newValue);
                console.log(`action: ${actionMeta.action}`);
                console.groupEnd();
            }}
            onInputChange={(inputValue, actionMeta) => {
                console.group('Input Changed');
                console.log(inputValue);
                console.log(`action: ${actionMeta.action}`);
                console.groupEnd();
            }}
        />
      ))
      