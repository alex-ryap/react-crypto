import { Component, ReactNode } from 'react';
import './style.scss';

export class Main extends Component<{}, {}> {
  render(): ReactNode {
    return <main>{this.props.children}</main>;
  }
}
