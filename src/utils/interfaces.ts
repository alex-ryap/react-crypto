import { AlertTypes } from './enums';

export interface ICoin {
  id: string;
  name: string;
  price: number;
  diff: number;
}

export interface IAlert {
  text: string;
  type: AlertTypes;
  show: boolean;
}
