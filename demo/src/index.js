import React, { Component } from 'react';
import { render } from 'react-dom';
import WindowedSelect, { WindowedMenuList } from '../../src/index';
import Select from 'react-select';

import {
  groupedOptions,
  options1K,
  options5K,
  options10K,
  options100K,
  options1M,
} from '../../stories/storyUtil';

class Demo extends Component {
  render() {
    return (
      <div>
        <h2>Single Select</h2>

        <h4>1K options</h4>
        <WindowedSelect options={options1K} />

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

        <h2>Original React Select + MenuList</h2>
        <Select
          options={options1K}
          components={{ MenuList: WindowedMenuList }}
        />
      </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'));
