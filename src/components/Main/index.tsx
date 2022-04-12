import { PropsWithChildren } from 'react';
import './style.scss';

export const Main = (props: PropsWithChildren<{}>) => {
  return <main>{props.children}</main>;
};
