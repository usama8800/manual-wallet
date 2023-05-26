import { getRandomWallet as bitcoin } from './bitcoin';
import { getRandomWallet as ethereum } from './ethereum';

export function getRandomWallet(symbol: string): {
  address: string;
  privateKey: string;
} {
  switch (symbol) {
    case 'btc':
      return bitcoin();
    case 'eth':
      return ethereum();
    default:
      throw new Error(`Unsupported symbol: ${symbol}`);
  }
}
