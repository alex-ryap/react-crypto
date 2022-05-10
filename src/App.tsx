import styled from 'styled-components';
import { Header } from './components/Header';
import { Logo } from './components/Logo';
import { SearchForm } from './components/SearchForm';
import { Main } from './components/Main';
import { Coins } from './components/Coins';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { hide, SelectAlert } from './store/coinsSlice';
import { Alert, Snackbar } from '@mui/material';
import { useCallback } from 'react';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #261e35;
`;

function App() {
  const dispatch = useAppDispatch();
  const alert = useAppSelector(SelectAlert);

  const handleClose = useCallback(
    (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      dispatch(hide());
    },
    [dispatch]
  );

  return (
    <AppContainer>
      <Header>
        <Logo />
        <SearchForm />
      </Header>
      <Main>
        <Coins />
      </Main>
      {alert.show && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={3000}
          open={alert.show}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={alert.type} variant="filled">
            {alert.text}
          </Alert>
        </Snackbar>
      )}
    </AppContainer>
  );
}

export default App;
