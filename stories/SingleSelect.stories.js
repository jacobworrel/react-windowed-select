import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import WindowSelect from '../src';
import * as su from './storyUtil';
import * as R from 'ramda';

const options50 = su.createOptions(R.range(1, 51));
const options200 = su.createOptions(R.range(1, 201));
const options1000 = su.createOptions(R.range(1, 1001));
const options5000 = su.createOptions(R.range(1, 5001));
const options10000 = su.createOptions(R.range(1, 10001));

const groupedOptions = [
  { label: `Group 1`, options: su.createOptions(R.range(1, 4)) },
  { label: `Group 2`, options: su.createOptions(R.range(4, 7)) },
];

storiesOf('Single Select', module)
  .add('non-windowed - 50 options', () => <WindowSelect options={options50} />)
  .add('non-windowed - grouped', () => <WindowSelect options={groupedOptions} />)
  .add('windowed - 1,000 options', () => <WindowSelect options={options1000} />)
  .add('windowed - 5,000 options', () => <WindowSelect options={options5000} />)
  .add('windowed - 10,000 options', () => <WindowSelect options={options10000} />)
  .add('windowed - grouped', () => <WindowSelect options={groupedOptions} windowThreshold={0} />);
