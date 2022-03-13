import { Component, ReactNode } from 'react';
import { ICoin } from '../../utils/interfaces';
import { CoinItem } from '../CoinItem';
import './style.scss';

interface IProps {
  coins: ICoin[];
  removeCoin: Function;
}

export class CoinList extends Component<IProps, {}> {
  render(): ReactNode {
    return (
      <div className="coin-list">
        {this.props.coins.length > 0 ? (
          this.props.coins.map((coin, index) => (
            <CoinItem
              key={index}
              coin={coin}
              removeCoin={this.props.removeCoin}
            />
          ))
        ) : (
          <h2 className="coin-list__empty">No coins</h2>
        )}
      </div>
    );
  }
}
