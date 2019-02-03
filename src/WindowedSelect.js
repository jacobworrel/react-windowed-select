import MenuList from './MenuList.js';
import React from 'react';
import Select from '../../react-select/src';
// import Select from 'react-select';

import {
  AllSubstringsIndexStrategy,
  Search,
  UnorderedSearchIndex,
} from 'js-search';

class WindowedSelect extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      search: null,
      prevOptions: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.filterOption = this.filterOption.bind(this);
    this.searchResults = null;
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const { options } = nextProps;

    if (options !== prevState.prevOptions) {
      // Prepare a searcher
      const search = new Search('value');
      search.searchIndex = new UnorderedSearchIndex();
      search.indexStrategy = new AllSubstringsIndexStrategy();
      search.addIndex('label');

      search.addDocuments(options);

      return {
        search,
        prevOptions: options,
      };
    }

    return null;
  }

  filterOption({ value }, inputValue) {
    // Looking up in the precomputed results
    return this.searchResults ? this.searchResults.indexOf(value) > -1 : true;
  }

  handleInputChange(inputValue, action) {
    const { search } = this.state;
    this.searchResults = inputValue
      ? search.search(inputValue).map(({ value }) => value)
      : null;

    if (typeof this.props.onInputChange === 'function') {
      this.props.onInputChange(inputValue, action);
    }
  }

  render () {
    const {
      options,
      windowThreshold,
    } = this.props;

    const isWindowed = options.length >= windowThreshold;
    return (
      <Select
        {...this.props}
        components={{
          ...this.props.components,
          ...(
            isWindowed
              ? { MenuList }
              : {}
          )
        }}
        isWindowed={true}
        filterOption={this.filterOption}
        onInputChange={this.handleInputChange}
      />
    );
  }
}

WindowedSelect.defaultProps = {
  windowThreshold: 100,
  options: [],
};

export default WindowedSelect;
