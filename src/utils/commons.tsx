import axios from 'axios';
import { API_KEY, BASE_URL, CURRENCY } from './constants';

export const normalizeNumber = (num: number): number => {
  if (num < 1) {
    return Number(num.toPrecision(5));
  }
  return Number(num.toFixed(3));
};

export const getPrice = async (name: string): Promise<string | number> => {
  try {
    const url = `${BASE_URL}?fsym=${name}&tsyms=${CURRENCY}&api_key=${API_KEY}`;
    const response = await axios.get(url);

    if (response.data?.Response === 'Error')
      throw new Error(`Sorry! Coin "${name}" was not found`);

    const currentPrice = normalizeNumber(response.data[CURRENCY]);
    return currentPrice;
  } catch (err) {
    console.log(err);
    return (err as Error).message;
  }
};
