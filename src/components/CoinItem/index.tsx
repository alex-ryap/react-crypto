import { Component, ReactNode } from 'react';
import { Coin } from '../../utils/interfaces';
import {
  FaAngleDoubleRight,
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaTrash,
} from 'react-icons/fa';
import './style.scss';
import { Button } from '../Button';

interface IProps {
  coin: Coin;
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
            <FaAngleDoubleRight />
            USD
          </p>
          {this.props.coin.diff < 0 ? (
            <p className="coin-item__diff coin-item__diff_down">
              {this.props.coin.diff}
              <FaArrowAltCircleDown />
            </p>
          ) : (
            <p className="coin-item__diff coin-item__diff_up">
              {this.props.coin.diff}
              <FaArrowAltCircleUp />
            </p>
          )}
        </div>
        <div className="coin-item__content">
          <p className="coin-item__price">{this.props.coin.price}</p>
        </div>
        <div className="coin-item__bottom">
          <Button name="Remove coin" fill click={this.handleClick}>
            <FaTrash />
          </Button>
        </div>
      </div>
    );
  }
}
