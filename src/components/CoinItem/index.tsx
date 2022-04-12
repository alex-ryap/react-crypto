import { useEffect } from 'react';
import { ICoin } from '../../utils/interfaces';
import {
  IoSwapHorizontal,
  IoChevronDown,
  IoChevronUp,
  IoTrashOutline,
} from 'react-icons/io5';
import './style.scss';
import { Button } from '../Button';
import { useDispatch } from 'react-redux';
import { updateCoinPrice } from '../../store/coins/actions';

interface IProps {
  coin: ICoin;
  removeCoin: Function;
}

export const CoinItem = (props: IProps) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    props.removeCoin(props.coin);
  };

  useEffect(() => {
    const interval = window.setInterval(
      () => dispatch(updateCoinPrice(props.coin)),
      5000
    );

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="coin-item">
      <div className="coin-item__top">
        <p className="coin-item__name">
          {props.coin.name}
          <IoSwapHorizontal />
          USD
        </p>
        {props.coin.diff < 0 ? (
          <p className="coin-item__diff coin-item__diff_down">
            {props.coin.diff}
            <IoChevronDown />
          </p>
        ) : (
          <p className="coin-item__diff coin-item__diff_up">
            {props.coin.diff}
            <IoChevronUp />
          </p>
        )}
      </div>
      <div className="coin-item__content">
        <p className="coin-item__price">{props.coin.price}</p>
      </div>
      <div className="coin-item__bottom">
        <Button name="Remove coin" fill click={handleClick}>
          <IoTrashOutline />
        </Button>
      </div>
    </div>
  );
};
