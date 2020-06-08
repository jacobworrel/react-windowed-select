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
      <h2>Single Select</h2>

      <h4>1K options</h4>
      {/* id and classNamePrefix used to target elements in Cypress test*/}
      <WindowedSelect options={options1K} id="demo-1K" classNamePrefix="demo"/>

      <h4>5K options</h4>
      <WindowedSelect options={options5K} />

      <h4>10K options</h4>
      <WindowedSelect options={options10K}/>

      <h4>Grouped</h4>
      <WindowedSelect options={groupedOptions} windowThreshold={0} />

      <h2>Multi Select</h2>

      <h4>1K options</h4>
      <WindowedSelect isMulti options={options10K} />

      <h4>5K options</h4>
      <WindowedSelect isMulti options={options5K} />

      <h4>10K options</h4>
      <WindowedSelect isMulti options={options10K}/>
    </div>
  );
}

render(<Demo/>, document.querySelector('#demo'));
