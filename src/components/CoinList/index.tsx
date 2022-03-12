import { Component, ReactNode } from 'react';
import { Coin } from '../../utils/interfaces';
import { CoinItem } from '../CoinItem';
import './style.scss';

interface IProps {
  coins: Coin[];
  removeCoin: Function;
}

export class CoinList extends Component<IProps, {}> {
  render(): ReactNode {
    return (
      <div className="coin-list">
        {this.props.coins.map((coin, index) => (
          <CoinItem
            key={index}
            coin={coin}
            removeCoin={this.props.removeCoin}
          />
        ))}
      </div>
    );
  }
}
