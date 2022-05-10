import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { FC, ReactNode, useCallback, useEffect } from 'react';
import { fetchCoin } from '../store/fetchCoinPrice';
import { useAppDispatch } from '../store/hooks';
import { ICoin } from '../utils/interfaces';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styled from 'styled-components';
import { remove } from '../store/coinsSlice';

const CustomCard = styled(Card)`
  && {
    background-color: transparent;
    border-radius: 10px;
  }
`;

const CustomCardHeader = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CustomCardContent = styled(CardContent)`
  display: flex;
  align-items: center;
`;

const CustomCardActions = styled(CardActions)`
  display: flex;
  justify-content: flex-end;
`;

const DeleteButton = styled(Button)`
  && {
    margin: 0 5px 5px 0;
  }
`;

interface IProps {
  data: ICoin;
  children?: ReactNode;
}

export const Coin: FC<IProps> = ({ data, children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => dispatch(fetchCoin(data.name)), 5000);

    return () => clearInterval(interval);
  }, [dispatch, data]);

  const deleteCoin = useCallback(
    (id: string) => {
      dispatch(remove(id));
    },
    [dispatch]
  );

  return (
    <CustomCard>
      <CustomCardHeader>
        <Typography variant="h5">{data.name}</Typography>
        {data.diff > 0 ? (
          <KeyboardArrowUpIcon fontSize="large" color="success" />
        ) : (
          <KeyboardArrowDownIcon fontSize="large" color="error" />
        )}
      </CustomCardHeader>
      <CustomCardContent>
        <Typography variant="h4">$ {data.price}</Typography>
      </CustomCardContent>
      <CustomCardActions>
        <DeleteButton
          size="small"
          variant="outlined"
          color="error"
          onClick={() => deleteCoin(data.id)}
        >
          Delete
        </DeleteButton>
      </CustomCardActions>
    </CustomCard>
  );
};
