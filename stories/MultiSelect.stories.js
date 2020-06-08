import React from 'react';

import { storiesOf } from '@storybook/react';

import { options1 } from './storyUtil';
import { options50 } from './storyUtil';
import { options200 } from './storyUtil';
import { options10K } from './storyUtil';
import { groupedOptions, StoryWrapper } from './storyUtil';

storiesOf('Multi Select', module)
.add('200 options', () => (
  <StoryWrapper options={options200} isMulti />
))
.add('grouped', () => (
  <StoryWrapper
    options={groupedOptions}
    menuIsOpen
    windowThreshold={10}
    isMulti
  />
))
.add('1 option', () => (
  <StoryWrapper
    options={options1}
    menuIsOpen
    isMulti
    classNamePrefix="foo"
  />
))
.add('no options msg (with dynamic input value)', () => (
  <StoryWrapper
    isMulti
    menuIsOpen
    options={[]}
    noOptionsMessage={({ inputValue } = {}) => `No ${inputValue !== '' ? `${inputValue} ` : ''}options`}
  />
))
.add('loading msg (with dynamic input value', () => (
  <StoryWrapper
    isLoading
    isMulti
    loadingMessage={({ inputValue }) => `Loading ${inputValue}...`}
    menuIsOpen
    options={[]}
    windowThreshold={0}
  />
))
.add('no scroll to top when closeMenuOnSelect === false', () => (
  <StoryWrapper
    options={options200}
    isMulti
    closeMenuOnSelect={false}
    windowThreshold={0}
  />
))
.add('custom styles', () => (
  <StoryWrapper
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
.add('custom styles & grouped', () => (
  <StoryWrapper
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