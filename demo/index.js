import React from 'react';
import { render } from 'react-dom';
import WindowedSelect from '../src';

import {
  groupedOptions,
  options1K,
  options5K,
  options10K,
  options100K,
  options1M,
} from './../stories/storyUtil';

function Demo () {
  return (
    <div>
      <h4>1K options</h4>
      <WindowedSelect options={options1K} />

      <h4>5K options</h4>
      <WindowedSelect options={options5K} />

      <h4>10K options</h4>
      <WindowedSelect options={options10K} />

      <h4>Grouped</h4>
      <WindowedSelect options={groupedOptions} windowThreshold={0} />
    </div>
  );
}

render(<Demo/>, document.querySelector('#demo'));
