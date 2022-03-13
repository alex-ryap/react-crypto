import axios from 'axios';
import { PureComponent, ReactNode } from 'react';
import { CoinForm } from './components/CoinForm';
import { CoinList } from './components/CoinList';
import { Header } from './components/Header';
import { Logo } from './components/Logo';
import { Main } from './components/Main';
import { Wrapper } from './components/Wrapper';
import { API_KEY, BASE_URL } from './utils/constants';
import { ICoin, IAlert } from './utils/interfaces';
import { normalizeNumber } from './utils/commons';
import { Alert } from './components/Alert';
import { AlertType } from './utils/enums';
import './App.scss';

interface IProps {}
interface IState {
  currency: string;
  alert: IAlert;
  coins: ICoin[];
}

export class App extends PureComponent<{}, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currency: 'USD',
      coins: [],
      alert: {
        text: '',
        type: AlertType.info,
        show: false,
      },
    };
  }

  componentDidMount(): void {
    this.getCoin('DOGE').then((dogecoin) => {
      if (typeof dogecoin === 'object') {
        const coins = [dogecoin];
        this.setState({ coins });
        this.updateCoinPrice(dogecoin);
      }
    });
  }

  updateCoinPrice = (coin: ICoin): void => {
    coin.interval = window.setInterval(() => {
      this.getCoin(coin.name).then((refreshCoin) => {
        if (typeof refreshCoin === 'object') {
          let coins = [...this.state.coins];

          coins = coins.map((coinItem) => {
            if (coinItem.name === refreshCoin.name) {
              if (coinItem.price && coinItem.price !== refreshCoin.price)
                coin.diff = normalizeNumber(refreshCoin.price - coinItem.price);
              coin.price = refreshCoin.price;
              coinItem = coin;
            }

            return coinItem;
          });
          this.setState({ coins });
        }
      });
    }, 5000);
  };

  getCoin = async (coinName: string): Promise<ICoin | string> => {
    return await axios
      .get(`${BASE_URL}?fsym=${coinName}&tsyms=USD&api_key=${API_KEY}`)
      .then((response) => {
        if (response.data?.Response === 'Error')
          throw new Error(`Sorry! Coin "${coinName}" was not found`);

        const currentPrice = normalizeNumber(
          response.data[this.state.currency]
        );

        const coin = {
          name: coinName,
          price: currentPrice,
          diff: 0,
          interval: 0,
        };

        return coin;
      })
      .catch((err) => {
        return err.message;
      });
  };

  addCoin = (coinName: string): void => {
    const alert = { ...this.state.alert };
    alert.show = true;

    this.getCoin(coinName).then((newCoin) => {
      if (typeof newCoin === 'object') {
        const coins = [...this.state.coins];

        const alreadyAddedCoin = coins.find(
          (coin) => coin.name === newCoin.name
        );

        if (!alreadyAddedCoin) {
          alert.text = `Coin ${newCoin.name} succesfully add`;
          alert.type = AlertType.success;
          coins.push(newCoin);
          this.setState({ coins, alert });
          this.updateCoinPrice(newCoin);
        } else {
          alert.text = `Coin ${newCoin.name} already added`;
          alert.type = AlertType.info;
          this.setState({ alert });
        }
      } else {
        alert.text = newCoin;
        alert.type = AlertType.warning;
        this.setState({ alert });
      }
    });
  };

  removeCoin = (coin: ICoin): void => {
    window.clearInterval(coin.interval);
    let coins = [...this.state.coins];
    let alert = { ...this.state.alert };

    alert.text = `Coin ${coin.name} was removed`;
    alert.type = AlertType.success;
    alert.show = true;

    coins = coins.filter((coinItem) => coinItem.name !== coin.name);

    this.setState({ coins, alert });
  };

  hideAlert = (): void => {
    const alert = { ...this.state.alert };
    alert.text = '';
    alert.type = AlertType.info;
    alert.show = false;

    this.setState({ alert });
  };

  render(): ReactNode {
    return (
      <Wrapper>
        <Header>
          <Logo />
          <CoinForm addCoin={this.addCoin} />
        </Header>
        <Main>
          <h1 className="title">Last added coins:</h1>
          <CoinList coins={this.state.coins} removeCoin={this.removeCoin} />
        </Main>
        {this.state.alert.text ? (
          <Alert alert={this.state.alert} hideAlert={() => this.hideAlert()} />
        ) : (
          ''
        )}
      </Wrapper>
    );
  }
}

export default App;
