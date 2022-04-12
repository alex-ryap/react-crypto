import { CoinItem } from '../CoinItem';
import { selectCoins } from '../../store/coins/selectors';
import { useTypedSelector } from '../../store/hooks';
import './style.scss';

interface IProps {
  removeCoin: Function;
}

export const CoinList = (props: IProps) => {
  const coins = useTypedSelector(selectCoins);
  console.log(coins);

  return (
    <div className="coin-list">
      {coins.length > 0 ? (
        coins.map((coin, index) => (
          <CoinItem key={index} coin={coin} removeCoin={props.removeCoin} />
        ))
      ) : (
        <h2 className="coin-list__empty">No coins</h2>
      )}
    </div>
  );
};
