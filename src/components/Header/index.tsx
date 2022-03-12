import { Component, ReactNode } from 'react';
import './style.scss';

export class Header extends Component<{}, {}> {
  render(): ReactNode {
    return <header>{this.props.children}</header>;
  }
}
