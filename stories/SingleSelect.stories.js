import React from 'react';

import { storiesOf } from '@storybook/react';

import { options1 } from './storyUtil';
import { options50 } from './storyUtil';
import { options200 } from './storyUtil';
import { groupedOptions, StoryWrapper } from './storyUtil';

storiesOf('Single Select', module)
  .add('grouped', () => (
    <StoryWrapper
      options={groupedOptions}
      menuIsOpen
    />))
  .add('1 option', () => (
    <StoryWrapper
      options={options1}
      menuIsOpen
      noOptionsMessage={() => "Hello"}
    />
  ))
.add('200 options', () => (
  <StoryWrapper
    options={options200}
    menuIsOpen
  />
))
  .add('no options', () => (
    <StoryWrapper
      options={[]}
      noOptionsMessage={({ inputValue } = {}) => `No ${inputValue !== '' ? `${inputValue} ` : ''}options`}
      menuIsOpen
    />
  ))
.add('custom loading message/height', () => (
  <StoryWrapper
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
  .add('custom styles', () => (
    <StoryWrapper
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
  .add('custom styles & grouped', () => (
    <StoryWrapper
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