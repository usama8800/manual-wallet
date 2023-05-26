import { symbol2Name } from '../utils';

export async function price(symbol: string): Promise<number> {
  const resp = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol2Name[symbol]}&vs_currencies=usd`);
  const data: {
    [key: string]: {
      usd: number,
    }
  } = await resp.json();
  return data[symbol2Name[symbol]].usd;
}
