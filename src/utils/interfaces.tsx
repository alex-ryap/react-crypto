import { AlertType } from './enums';

export interface ICoin {
  name: string;
  price: number;
  diff: number;
  interval: number;
}

export interface IAlert {
  text: string;
  type: AlertType;
  show: boolean;
}
