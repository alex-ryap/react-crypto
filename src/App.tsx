import { FC, useEffect } from 'react';
import { CoinForm } from './components/CoinForm';
import { CoinList } from './components/CoinList';
import { Header } from './components/Header';
import { Logo } from './components/Logo';
import { Main } from './components/Main';
import { Wrapper } from './components/Wrapper';
import { ICoin } from './utils/interfaces';
import { Alert } from './components/Alert';
import { AlertType } from './utils/enums';
import './App.scss';
import { useDispatch } from 'react-redux';
import { addCoin, RemoveCoin } from './store/coins/actions';
import { selectAlert } from './store/alerts/selectors';
import { addAlert } from './store/alerts/actions';
import { useTypedSelector } from './store/hooks';

export const App: FC = () => {
  const dispatch = useDispatch();
  const alert = useTypedSelector(selectAlert);

  useEffect(() => {
    dispatch(addCoin('DOGE'));
  }, [dispatch]);

  const addNewCoin = (coinName: string): void => {
    dispatch(addCoin(coinName));
    const newAlert = {
      text: `Success add coin ${coinName}`,
      type: AlertType.success,
      show: true,
    };
    dispatch(addAlert(newAlert));
  };

  const removeCoin = (coin: ICoin): void => {
    dispatch(RemoveCoin(coin));
    const newAlert = {
      text: `Success remove coin ${coin.name}`,
      type: AlertType.success,
      show: true,
    };
    dispatch(addAlert(newAlert));
  };

  return (
    <Wrapper>
      <Header>
        <Logo />
        <CoinForm addCoin={addNewCoin} />
      </Header>
      <Main>
        <h1 className="title">Last added coins:</h1>
        <CoinList removeCoin={removeCoin} />
      </Main>
      {alert.text ? <Alert alert={alert} /> : ''}
    </Wrapper>
  );
};

export default App;
