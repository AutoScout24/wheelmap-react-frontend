// @flow

import React, { Component } from 'react';
import CategoryMenu from './CategoryMenu';
import Toolbar from '../Toolbar';
import SearchInputField from './SearchInputField';

type Props = {
  className: string,
};

type DefaultProps = {};

export default class SearchToolbar extends Component<DefaultProps, Props, *> {
  static defaultProps: DefaultProps;
  props: Props;

  constructor(props: Props) {
    super(props);
    this.state = {
      categoryMenuIsVisible: false,
    };
  }

  toggleCategoryMenu() {
    this.setState(prevState => ({
      categoryMenuIsVisible: !prevState.categoryMenuIsVisible,
    }));
  }

  render() {
    return (
      <Toolbar>
        <SearchInputField />
        <CategoryMenu isVisible={this.state.categoryMenuIsVisible} />
      </Toolbar>
    );
  }
}