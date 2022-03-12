import { Component, ReactNode } from 'react';
import './style.scss';

export class Wrapper extends Component<{}, {}> {
  render(): ReactNode {
    return <div className="wrapper">{this.props.children}</div>;
  }
}
