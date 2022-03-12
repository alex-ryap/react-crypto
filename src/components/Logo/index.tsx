import { Component, ReactNode } from 'react';
import logo from './logo.svg';
import './style.scss';

export class Logo extends Component {
  render(): ReactNode {
    return (
      <div className="logo">
        <img className="logo__img" src={logo} alt="logo" />
        <p className="logo__text">React Crypto</p>
      </div>
    );
  }
}
