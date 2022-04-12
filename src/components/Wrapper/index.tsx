import { PropsWithChildren } from 'react';
import './style.scss';

export const Wrapper = (props: PropsWithChildren<{}>) => {
  return <div className="wrapper">{props.children}</div>;
};
