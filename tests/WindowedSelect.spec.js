import Select, { components } from 'react-select';
import { mount, shallow } from 'enzyme';
import React from 'react';
import WindowedMenuList from '../src/MenuList';
import WindowedSelect from '../src/WindowedSelect';

const { MenuList } = components;

describe('WindowedSelect', () => {
  test('passes props to Select component', () => {
    const selectWrapper = shallow(<WindowedSelect foo={1} bar={2} />);

    expect(selectWrapper.find(Select).prop('foo')).toBeTruthy();
    expect(selectWrapper.find(Select).prop('bar')).toBeTruthy();
  });

  test('handles nil options', () => {
    expect(() => shallow(<WindowedSelect options={null} />)).not.toThrow();
    expect(() => shallow(<WindowedSelect options={undefined} />)).not.toThrow();
    expect(() => shallow(<WindowedSelect />)).not.toThrow();
  });

  test('renders a windowed menu when options length > windowThreshold', () => {
    const options = [
      { label: 'foo', value: 1 },
    ];

    let selectWrapper = mount(
      <WindowedSelect
        menuIsOpen
        options={options}
        windowThreshold={0}
      />
    );

    expect(selectWrapper.find(MenuList).exists()).toBeFalsy();
    expect(selectWrapper.find(WindowedMenuList).exists()).toBeTruthy();
  });

  test('renders a windowed menu when options length === windowThreshold', () => {
    const options = [
      { label: 'foo', value: 1 },
    ];

    let selectWrapper = mount(
      <WindowedSelect
        menuIsOpen
        options={options}
        windowThreshold={1}
      />
    );

    expect(selectWrapper.find(MenuList).exists()).toBeFalsy();
    expect(selectWrapper.find(WindowedMenuList).exists()).toBeTruthy();
  });

  test('renders a non-windowed menu when options length < windowThreshold', () => {
    const options = [
      { label: 'foo', value: 1 },
    ];

    let selectWrapper = mount(
      <WindowedSelect
        menuIsOpen
        options={options}
        windowThreshold={2}
      />
    );
    expect(selectWrapper.find(MenuList).exists()).toBeTruthy();
    expect(selectWrapper.find(WindowedMenuList).exists()).toBeFalsy();
  });

  test('forwards ref', () => {
    let windowedSelectRef;
    let selectRef;

    mount(
      <WindowedSelect
        windowThreshold={0}
        ref={x => windowedSelectRef = x}
      />
    );

    mount(<Select ref={x => selectRef = x}/>);

    expect(selectRef.state.prevProps.placeholder).toEqual(windowedSelectRef.state.prevProps.placeholder);
    expect(selectRef.context).toEqual(windowedSelectRef.context);
    expect(selectRef.refs).toEqual(windowedSelectRef.refs);
    expect(selectRef.updater).toEqual(windowedSelectRef.updater);
  })
});
