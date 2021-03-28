import React from 'react';
import MenuList from '../src/MenuList';
import { render } from '@testing-library/react';

describe('MenuList', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // test('calls resetAfterIndex when state.children.length === 1', () => {
  //   const resetAfterIndex = jest.fn();
  //
  //   function mockSetListRef(ref) {
  //     this.list = { resetAfterIndex };
  //   }
  //   jest.spyOn(MenuList.prototype, 'setListRef').mockImplementationOnce(mockSetListRef);
  //
  //   const MockComponent = () => (<div/>);
  //   const children = [React.createElement(MockComponent, { key: 1 })];
  //   const props = {
  //     getStyles () {
  //       return {
  //         maxHeight: 200,
  //       }
  //     }
  //   };
  //   const wrapper = mount(<MenuList {...props}>{children}</MenuList>);
  //   wrapper.setState({ children: [React.createElement(MockComponent, { key: 1 })]});
  //
  //   expect(resetAfterIndex.mock.calls.length).toBe(1);
  // });

  const MockComponent = () => (<div/>);
  const children = [
    React.createElement(MockComponent, { key: 1, selectProps: {} }),
  ];

  test('add class name prefix to menu list', () => {
    const props = {
      selectProps: {
        classNamePrefix: 'foo',
      },
      getStyles () {
        return {
          maxHeight: 200,
        }
      },
    };
    const { container } = render(<MenuList {...props}>{children}</MenuList>);

    expect(container.firstChild.className).toMatch('foo__menu-list');
  });

  test('add class name prefix to menu list when isMulti is true', () => {
    const props = {
      selectProps: {
        classNamePrefix: 'foo',
        isMulti: true,
      },
      getStyles () {
        return {
          maxHeight: 200,
        }
      },
    };
    const { container } = render(<MenuList {...props}>{children}</MenuList>);

    expect(container.firstChild.className).toMatch('foo__menu-list--is-multi');
  })
});
