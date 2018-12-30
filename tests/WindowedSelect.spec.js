import Select, { components } from 'react-select';
import 'jest-dom/extend-expect'; //todo remove?
import { mount, shallow } from 'enzyme';
import React from 'react';
import WindowedMenuList from '../src/MenuList';
import WindowedSelect from '../src/WindowedSelect';

const { MenuList } = components;

describe.only('WindowedSelect', () => {
  test('sets default props', () => {
    const selectWrapper = shallow(<WindowedSelect />);

    expect(selectWrapper.prop('options')).toEqual([]);
    expect(selectWrapper.prop('windowThreshold')).toEqual(100);
  });

  test('passes props to Select component', () => {
    const selectWrapper = shallow(<WindowedSelect foo={1} bar={2} />);

    expect(selectWrapper.find(Select).prop('foo')).toBeTruthy();
    expect(selectWrapper.find(Select).prop('bar')).toBeTruthy();
  });

  test('renders a windowed menu', async () => {
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

  test('renders a non-windowed menu', async () => {
    const options = [
      { label: 'foo', value: 1 },
    ];

    let selectWrapper = mount(
      <WindowedSelect
        menuIsOpen
        options={options}
      />
    );
    expect(selectWrapper.find(MenuList).exists()).toBeTruthy();
    expect(selectWrapper.find(WindowedMenuList).exists()).toBeFalsy();
  })
});
