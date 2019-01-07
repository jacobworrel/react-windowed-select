import 'jest-dom/extend-expect'; //todo remove?
import { mount, shallow } from 'enzyme';
import React from 'react';
import MenuList from '../src/MenuList';

describe('MenuList', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('calls scrollToItem when curent index > 1', () => {
    const scrollToItem = jest.fn();

    function mockSetListRef(ref) {
      this.list = { scrollToItem };
    }
    jest.spyOn(MenuList.prototype, 'setListRef').mockImplementationOnce(mockSetListRef);

    const MockComponent = () => (<div/>);
    const children = [
      React.createElement(MockComponent, { key: 1 }),
      React.createElement(MockComponent, { key: 2 }),
      React.createElement(MockComponent, { key: 3, isFocused: true })
    ];
    const props = {
      getStyles () {
        return {
          maxHeight: 200,
        }
      }
    };
    const wrapper = mount(<MenuList {...props}>{children}</MenuList>);

    wrapper.setState({ currentIndex: 2 });
    expect(scrollToItem.mock.calls.length).toBe(1);
  });

  test('calls resetAfterIndex when state.children.length === 1', () => {
    const resetAfterIndex = jest.fn();

    function mockSetListRef(ref) {
      this.list = { resetAfterIndex };
    }
    jest.spyOn(MenuList.prototype, 'setListRef').mockImplementationOnce(mockSetListRef);

    const MockComponent = () => (<div/>);
    const children = [React.createElement(MockComponent, { key: 1 })];
    const props = {
      getStyles () {
        return {
          maxHeight: 200,
        }
      }
    };
    const wrapper = mount(<MenuList {...props}>{children}</MenuList>);
    wrapper.setState({ children: [React.createElement(MockComponent, { key: 1 })]});

    expect(resetAfterIndex.mock.calls.length).toBe(1);
  });
});
