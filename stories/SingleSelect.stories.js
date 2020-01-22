import React from 'react';

import { storiesOf } from '@storybook/react';

import WindowedSelect from '../src';

import { options1 } from './storyUtil';
import { options50 } from './storyUtil';
import { options200 } from './storyUtil';
import { groupedOptions } from './storyUtil';

storiesOf('Single Select', module)
  .add('non-windowed - 50 options', () =>
    <WindowedSelect
      options={options50}
      menuIsOpen
    />
  )
  .add('non-windowed - grouped', () => (
    <WindowedSelect
      options={groupedOptions}
      menuIsOpen
    />))
  .add('windowed - 1 option', () => (
    <WindowedSelect
      options={options1}
      menuIsOpen
      windowThreshold={0}
      noOptionsMessage={() => "Hello"}
    />
  ))
.add('windowed - 200 options', () => (
  <WindowedSelect
    options={options200}
    menuIsOpen
  />
))
  .add('windowed - grouped', () => (
    <WindowedSelect
      options={groupedOptions}
      menuIsOpen
      windowThreshold={0}
    />))
  .add('windowed - no options', () => (
    <WindowedSelect
      options={[]}
      noOptionsMessage={({ inputValue } = {}) => `No ${inputValue !== '' ? `${inputValue} ` : ''}options`}
      menuIsOpen
      windowThreshold={0} />
  ))
.add('windowed - custom loading message/height', () => (
  <WindowedSelect
    options={[]}
    menuIsOpen
    windowThreshold={0}
    loadingMessage={({ inputValue }) => `Loading ${inputValue}...`}
    styles={{
      loadingMessage: (base) => ({
        ...base,
        height: 50,
      })
    }}
    isLoading
  />
))
  .add('windowed - custom styles', () => (
    <WindowedSelect
      menuIsOpen
      options={options200}
      styles={{
        option: (base) => ({
          ...base,
          fontSize: 20,
          height: 60,
          padding: '10px 12px',
          margin: '10px 0px',
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
      options={groupedOptions}
      windowThreshold={0}
      styles={{
        group: (base) => ({
          paddingBottom: 0,
          paddingTop: 0,

        }),
        groupHeading: (base) => ({
          ...base,
          height: 100,
        }),
      }}
    />
  ));