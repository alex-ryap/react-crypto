import { Button, InputAdornment, OutlinedInput } from '@mui/material';
import { FC, FormEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from '../store/hooks';
import { fetchCoin } from '../store/fetchCoinPrice';

const SearchFormContainer = styled.div`
  display: flex;
  column-gap: 10px;
`;

const SearchInput = styled(OutlinedInput)`
  .MuiOutlinedInput-input {
    padding: 10px 15px 10px 0px;
  }
`;

const Form = styled.form`
  display: flex;
  column-gap: 10px;
`;

export const SearchForm: FC = () => {
  const [coinName, setCoinName] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (newValue: string): void => {
      setCoinName(newValue.toUpperCase());
    },
    [setCoinName]
  );

  const addCoin = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(fetchCoin(coinName));
      setCoinName('');
    },
    [coinName, dispatch]
  );

  return (
    <SearchFormContainer>
      <Form onSubmit={addCoin}>
        <SearchInput
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          onChange={(e) => handleChange(e.target.value)}
          value={coinName}
        />
        <Button color="primary" variant="outlined" type="submit">
          add
        </Button>
      </Form>
    </SearchFormContainer>
  );
};
