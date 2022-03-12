import {
  ButtonHTMLAttributes,
  Component,
  MouseEventHandler,
  ReactNode,
} from 'react';
import './style.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  border?: boolean;
  fill?: boolean;
  click?: MouseEventHandler<HTMLButtonElement>;
}

export class Button extends Component<ButtonProps, {}> {
  render(): ReactNode {
    const btnClasses = ['btn'];
    if (this.props.border) btnClasses.push('btn_border');
    if (this.props.fill) btnClasses.push('btn_fill');

    return (
      <button
        type={this.props.type}
        className={btnClasses.join(' ')}
        onClick={this.props.click}
      >
        {this.props.children}
        {this.props.name}
      </button>
    );
  }
}
