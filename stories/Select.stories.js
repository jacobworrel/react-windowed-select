import React from 'react';

import { storiesOf } from '@storybook/react';

import { options1 } from './storyUtil';
import { options200 } from './storyUtil';
import { groupedOptions, StoryWrapper } from './storyUtil';
import * as R from 'ramda';

storiesOf('Select', module)
.add('Default', () => (
  <StoryWrapper
    id="default"
    classNamePrefix="default"
    options={options200}
  />
))
.add('grouped', () => (
  <StoryWrapper
    id="grouped"
    classNamePrefix="grouped"
    options={groupedOptions}
    menuIsOpen
  />
))
.add('1 option', () => (
  <StoryWrapper
    id="1option"
    classNamePrefix="1option"
    options={options1}
    menuIsOpen
  />
))
.add('no options msg (with dynamic input value)', () => (
  <StoryWrapper
    id="noOptionsDynamicValue"
    classNamePrefix="noOptionsDynamicValue"
    menuIsOpen
    options={[]}
    noOptionsMessage={({ inputValue } = {}) => `No ${inputValue !== '' ? `${inputValue} ` : ''}options`}
  />
))
.add('loading msg (with dynamic input value', () => (
  <StoryWrapper
    id="loadingDynamicValue"
    classNamePrefix="loadingDynamicValue"
    isLoading
    loadingMessage={({ inputValue }) => `Loading ${inputValue}...`}
    menuIsOpen
    options={[]}
  />
))
.add('custom styles', () => (
  <StoryWrapper
    menuIsOpen
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
.add('custom styles & grouped', () => (
  <StoryWrapper
    menuIsOpen
    options={groupedOptions}
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
))
.add('long label text', () => (
  <StoryWrapper
    id="default"
    classNamePrefix="default"
    options={R.pipe(
      R.map(x => ({ value: x, label: `Option ${x}` })),
      R.insert(3, { value: 'long', label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' })
    )(R.range(0, 15))}
  />
));