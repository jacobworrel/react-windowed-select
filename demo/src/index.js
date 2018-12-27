import React, {Component} from 'react';
import {render} from 'react-dom';
import WindowSelect from '../../src';
import * as R from 'ramda';

import { options1 } from '../../stories/storyUtil';
import { options50 } from '../../stories/storyUtil';
import { options200 } from '../../stories/storyUtil';
import { options1000 } from '../../stories/storyUtil';
import { options5000 } from '../../stories/storyUtil';
import { options10000 } from '../../stories/storyUtil';
import { groupedOptions } from '../../stories/storyUtil';

class Demo extends Component {
  render() {
    return (
      <div>
        <h2>Single Select</h2>

        <h4>1000 options</h4>
        <WindowSelect options={options1000} />

        <h4>5000 options</h4>
        <WindowSelect options={options5000} />

        <h4>10000 options</h4>
        <WindowSelect
          options={options10000}
          // styles={{
          //   // control: (base) => ({
          //   //   ...base,
          //   //   ...controlOverride,
          //   //   height: getHeight(this.props),
          //   // }),
          //   option: (base) => ({
          //     ...base,
          //     height: 40,
          //     // height: getHeight(this.props),
          //     alignItems: 'center',
          //     display: 'flex',
          //   }),
          //   menuList: (base) => ({
          //     ...base,
          //     maxHeight: 200,
          //   })
          // }}
        />

        <h4>Grouped</h4>
        <WindowSelect options={groupedOptions} windowThreshold={0} />

        <h2>Multi Select</h2>

        <h4>1,000 options</h4>
        <WindowSelect isMulti options={options1000} />

        <h4>5,000 options</h4>
        <WindowSelect isMulti options={options5000} />

        <h4>10,000 options</h4>
        <WindowSelect isMulti options={options1000}/>
      </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'));
