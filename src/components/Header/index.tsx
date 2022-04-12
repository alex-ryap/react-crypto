import { PropsWithChildren } from 'react';
import './style.scss';

export const Header = (props: PropsWithChildren<{}>) => {
  return <header>{props.children}</header>;
};
