import {
  ButtonHTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
} from 'react';
import './style.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  border?: boolean;
  fill?: boolean;
  click?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = (props: PropsWithChildren<ButtonProps>) => {
  const btnClasses = ['btn'];
  if (props.border) btnClasses.push('btn_border');
  if (props.fill) btnClasses.push('btn_fill');

  return (
    <button
      type={props.type}
      className={btnClasses.join(' ')}
      onClick={props.click}
    >
      {props.children}
      {props.name}
    </button>
  );
};
