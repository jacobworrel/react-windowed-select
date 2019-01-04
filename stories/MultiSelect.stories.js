import React from 'react';

import { storiesOf } from '@storybook/react';

import WindowedSelect from '../src';
import { options1 } from './storyUtil';
import { options50 } from './storyUtil';
import { options200 } from './storyUtil';
import { groupedOptions } from './storyUtil';

storiesOf('Multi Select', module)
.add('non-windowed - 50 options', () => <WindowedSelect options={options50} menuIsOpen isMulti />)
.add('non-windowed - grouped', () => <WindowedSelect options={groupedOptions} menuIsOpen isMulti />)
.add('windowed - 1 option', () => (
  <WindowedSelect options={options1} menuIsOpen windowThreshold={0} isMulti />
))
.add('windowed - 200 options', () => (
  <WindowedSelect options={options200} isMulti/>
))
.add('windowed - no scroll to top when closeMenuOnSelect === false', () => (
  <WindowedSelect options={options200} isMulti closeMenuOnSelect={false}/>
))
.add('windowed - grouped', () => (
  <WindowedSelect
    options={groupedOptions}
    menuIsOpen
    windowThreshold={0}
    isMulti />
))
.add('windowed - custom styles', () => (
  <WindowedSelect
    menuIsOpen
    isMulti
    options={options200}
    styles={{
      option: (base) => ({
        ...base,
        fontSize: 20,
        height: 40,
      }),
      menuList: (base) => ({
        ...base,
        maxHeight: 200,
      })
    }}
  />
))
.add('windowed - custom styles & grouped', () => (
  <WindowedSelect
    menuIsOpen
    isMulti
    options={groupedOptions}
    windowThreshold={0}
    styles={{
      groupHeading: (base) => ({
        ...base,
        height: 100,
      }),
      option: (base) => ({
        ...base,
        fontSize: 20,
        height: 40,
      }),
    }}
  />
));