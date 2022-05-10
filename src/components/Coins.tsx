import { Typography } from '@mui/material';
import { FC } from 'react';
import styled from 'styled-components';
import { SelectCoins } from '../store/coinsSlice';
import { useAppSelector } from '../store/hooks';
import { Coin } from './Coin';

const CoinsContainer = styled.div`
  padding: 10px 30px;
`;

const CoinsContent = styled.div`
  display: grid;
  justify-content: center;
  gap: 20px;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1150px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 882px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

export const Coins: FC = () => {
  const coins = useAppSelector(SelectCoins);

  return (
    <CoinsContainer>
      <Typography variant="h4" mb={2} mt={2}>
        Coins:
      </Typography>
      <CoinsContent>
        {coins.length ? (
          coins.map((coin) => <Coin key={coin.id} data={coin} />)
        ) : (
          <h2>No added coins</h2>
        )}
      </CoinsContent>
    </CoinsContainer>
  );
};
