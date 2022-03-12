import axios from 'axios';
import { PureComponent, ReactNode } from 'react';
import { CoinForm } from './components/CoinForm';
import { CoinList } from './components/CoinList';
import { Header } from './components/Header';
import { Logo } from './components/Logo';
import { Main } from './components/Main';
import { Wrapper } from './components/Wrapper';
import { API_KEY, BASE_URL } from './utils/constants';
import { Coin } from './utils/interfaces';
import './App.scss';
import { normalizeNumber } from './utils/commons';

interface IProps {}
interface IState {
  currency: string;
  coins: Coin[];
}

export class App extends PureComponent<{}, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currency: 'USD',
      coins: [],
    };
  }

  componentDidMount() {
    const dogecoin = {
      name: 'DOGE',
      price: 0,
      diff: 0,
      interval: 0,
    };
    const coins = [dogecoin];

    this.setState({ coins });
    this.updateCoinPrice(dogecoin);
  }

  updateCoinPrice(coin: Coin) {
    coin.interval = window.setInterval(() => {
      axios
        .get(`${BASE_URL}?fsym=${coin.name}&tsyms=USD&api_key=${API_KEY}`)
        .then((response) => {
          let coins = [...this.state.coins];
          const currentPrice = normalizeNumber(
            response.data[this.state.currency]
          );

          coins = coins.map((coinItem) => {
            if (coinItem.name === coin.name) {
              if (coinItem.price && coinItem.price !== currentPrice)
                coin.diff = normalizeNumber(currentPrice - coinItem.price);
              coin.price = currentPrice;
              coinItem = coin;
            }

            return coinItem;
          });

          this.setState({ coins });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, 5000);
  }

  addCoin = (coinName: string) => {
    const coins = [...this.state.coins];
    const alreadyAddedCoin = coins.find((coin) => coin.name === coinName);

    if (!alreadyAddedCoin) {
      const newCoin = {
        name: coinName,
        price: 0,
        diff: 0,
        interval: 0,
      };
      coins.push(newCoin);

      this.setState({ coins });
      this.updateCoinPrice(newCoin);
    }
  };

  removeCoin = (coin: Coin) => {
    window.clearInterval(coin.interval);
    let coins = [...this.state.coins];

    coins = coins.filter((coinItem) => coinItem.name !== coin.name);
    this.setState({ coins });
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
      </Wrapper>
    );
  }
}

export default App;
