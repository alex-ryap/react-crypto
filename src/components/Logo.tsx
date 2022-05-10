import { FC } from 'react';
import styled from 'styled-components';
import logo from '../img/logo.svg';

const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  color: #fff;
  &:hover {
    cursor: pointer;
  }
`;

const BrandImage = styled.img`
  width: 40px;
  height: 40px;
`;

const BrandName = styled.p`
  font-weight: 700;
  font-size: 20px;
`;

export const Logo: FC = () => {
  return (
    <Container>
      <BrandImage src={logo} alt="logo" />
      <BrandName>React Crypto</BrandName>
    </Container>
  );
};
