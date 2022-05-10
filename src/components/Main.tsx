import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  color: #fff;
`;

interface IProps {
  children?: ReactNode;
}

export const Main: FC<IProps> = ({ children }) => {
  return <MainContainer>{children}</MainContainer>;
};
