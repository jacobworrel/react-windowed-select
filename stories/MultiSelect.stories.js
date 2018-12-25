import React from 'react';

import { storiesOf } from '@storybook/react';

import WindowSelect from '../src';
import * as su from './storyUtil';
import * as R from 'ramda';

import { options1 } from './storyUtil';
import { options50 } from './storyUtil';
import { options200 } from './storyUtil';
import { groupedOptions } from './storyUtil';

storiesOf('Multi Select', module)
.add('non-windowed - 50 options', () => <WindowSelect options={options50} menuIsOpen isMulti />)
.add('non-windowed - grouped', () => <WindowSelect options={groupedOptions} menuIsOpen isMulti />)
.add('windowed - 1 option', () => (
  <WindowSelect options={options1} menuIsOpen windowThreshold={0} isMulti />
))
.add('windowed - 200 options', () => (
  <WindowSelect options={options200} menuIsOpen isMulti />
))
.add('windowed - grouped', () => <WindowSelect options={groupedOptions} menuIsOpen windowThreshold={0} isMulti />)
.add('windowed - custom styles', () => (
  <WindowSelect
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
  <WindowSelect
    menuIsOpen
    isMulti
    options={groupedOptions}
    windowThreshold={0}
    styles={{
      group: (base) => ({
        paddingBottom: 20,
        paddingTop: 20,
        border: '50px solid black',
      }),
      groupHeading: (base) => ({
        ...base,
        // height: 50,
      }),
      option: (base) => ({
        ...base,
        fontSize: 20,
        height: 40,
      }),
    }}
  />
));