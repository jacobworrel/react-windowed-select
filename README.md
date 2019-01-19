# react-windowed-select

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

An integration of `react-window` with `react-select` v2 to efficiently render large lists.

## Installation and Usage

The easiest way to use `react-windowed-select` is to install it from npm:

```
npm install react-windowed-select
```

Then use it in your app:

```javascript
import React from "react";
import WindowedSelect from "react-windowed-select";

const options = [];

for (let i = 0; i < 10000; i += 1) {
  options.push({
    label: `Option ${i}`,
    value: i
  });
}

class App extends React.Component {
  render() {
    return <WindowedSelect options={options} />;
  }
}
```

[![Edit react-windowed-select](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/n592j4l13m)


## Props

`react-windowed-select` is just a wrapper around `react-select`.
All props passed to the `WindowedSelect` component are forwarded to the underlying `Select` component from `react-select`.

### windowThreshold | default = 100

The number of options beyond which the menu will be windowed.

## Custom Styles

You can still use the [styles API](https://www.react-select.com/styles) from `react-select` v2 to customize how your Select component looks.
The height property of the `Option`, `GroupHeading` and/or `NoOptionsMessage` components is used to determine the total height of the windowed menu and the following defaults are provided:

|Component         |Default Height|
|------------------|--------------|
|`Option`          |35px          |
|`GroupHeading`    |25px          |
|`NoOptionsMessage`|35px          |
|`LoadingMessage`  |35px          |

To override these values, use the `styles` prop like you would with a regular `react-select` component.

```javascript
<WindowedSelect
  options={options}
  styles={{
    option: (base) => ({
      ...base,
      height: 60,
      padding: '20px 12px',
    }),
  }}
/>
```

## Grouped Options

Grouped options are not fully supported.
In order to ensure proper scrolling and focus behavior, options nested inside the `Group` component are flattened. This changes the component structure within `MenuList` in the following way:

```
MenuList  
│
└───Group
│   │
|   └───GroupHeading
|
└───Option 1
|
└───Option 2
```

[build-badge]: https://img.shields.io/travis/jacobworrel/react-windowed-select/master.png?style=flat-square
[build]: https://travis-ci.org/jacobworrel/react-windowed-select

[npm-badge]: https://img.shields.io/npm/v/react-windowed-select.png?style=flat-square
[npm]: https://www.npmjs.com/package/react-windowed-select

[coveralls-badge]: https://img.shields.io/coveralls/jacobworrel/react-windowed-select/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/jacobworrel/react-windowed-select
