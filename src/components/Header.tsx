import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  padding: 5px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 550px) {
    row-gap: 10px;
    flex-direction: column;
  }
`;

interface IProps {
  children?: ReactNode;
}

export const Header: FC<IProps> = ({ children }) => {
  return <HeaderContainer>{children}</HeaderContainer>;
};
