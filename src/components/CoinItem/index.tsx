import { Component, ReactNode } from 'react';
import { ICoin } from '../../utils/interfaces';
import {
  IoSwapHorizontal,
  IoChevronDown,
  IoChevronUp,
  IoTrashOutline,
} from 'react-icons/io5';
import './style.scss';
import { Button } from '../Button';

interface IProps {
  coin: ICoin;
  removeCoin: Function;
}

export class CoinItem extends Component<IProps, {}> {
  handleClick = () => {
    this.props.removeCoin(this.props.coin);
  };

  render(): ReactNode {
    return (
      <div className="coin-item">
        <div className="coin-item__top">
          <p className="coin-item__name">
            {this.props.coin.name}
            <IoSwapHorizontal />
            USD
          </p>
          {this.props.coin.diff < 0 ? (
            <p className="coin-item__diff coin-item__diff_down">
              {this.props.coin.diff}
              <IoChevronDown />
            </p>
          ) : (
            <p className="coin-item__diff coin-item__diff_up">
              {this.props.coin.diff}
              <IoChevronUp />
            </p>
          )}
        </div>
        <div className="coin-item__content">
          <p className="coin-item__price">{this.props.coin.price}</p>
        </div>
        <div className="coin-item__bottom">
          <Button name="Remove coin" fill click={this.handleClick}>
            <IoTrashOutline />
          </Button>
        </div>
      </div>
    );
  }
}
