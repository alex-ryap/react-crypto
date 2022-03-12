import { Component, FormEvent, ReactNode } from 'react';
import { Button } from '../Button';
import './style.scss';

interface IProps {
  addCoin: Function;
}

interface IState {
  coinName: string;
}

export class CoinForm extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      coinName: '',
    };
  }

  handleChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ coinName: e.currentTarget.value.toUpperCase() });
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.addCoin(this.state.coinName);
    this.setState({ coinName: '' });
  };

  render(): ReactNode {
    return (
      <form className="coin-form" onSubmit={this.handleSubmit}>
        <input
          className="coin-form__input"
          type="text"
          placeholder="Search coin"
          onChange={this.handleChange}
          value={this.state.coinName}
        />
        <Button name="Add" type="submit" border />
      </form>
    );
  }
}
