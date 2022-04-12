import { FormEvent, useState } from 'react';
import { Button } from '../Button';
import './style.scss';

interface IProps {
  addCoin: Function;
}

export const CoinForm = (props: IProps) => {
  const [coinName, setCoinName] = useState('');

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setCoinName(e.currentTarget.value.toUpperCase());
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.addCoin(coinName);
    setCoinName('');
  };

  return (
    <form className="coin-form" onSubmit={handleSubmit}>
      <input
        className="coin-form__input"
        type="text"
        placeholder="Search coin"
        onChange={handleChange}
        value={coinName}
      />
      <Button name="Add" type="submit" border />
    </form>
  );
};
