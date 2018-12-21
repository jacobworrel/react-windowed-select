import React, {Component} from 'react';
import {render} from 'react-dom';
import WindowSelect from '../../src';
import * as R from 'ramda';

const options = R.pipe(
  R.map(x => ({ value: x, label: `Option ${x}` }))
)(R.range(1,10000));

class Demo extends Component {
  render() {
    return (
      <div>
        <h2>Single Select</h2>
        <WindowSelect
          options={options}
          styles={{
            // control: (base) => ({
            //   ...base,
            //   ...controlOverride,
            //   height: getHeight(this.props),
            // }),
            option: (base) => ({
              ...base,
              height: 40,
              // height: getHeight(this.props),
              alignItems: 'center',
              display: 'flex',
            }),
            menuList: (base) => ({
              ...base,
              maxHeight: 200,
            })
          }}
        />
      </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'));
