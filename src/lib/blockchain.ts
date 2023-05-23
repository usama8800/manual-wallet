interface BalanceResponse {
  'address': string;
  'total_received': number;
  'total_sent': number;
  'balance': number;
  'unconfirmed_balance': number;
  'final_balance': number;
  'n_tx': number;
  'unconfirmed_n_tx': number;
  'final_n_tx': number;
}

const unitConvertor = {
  btc: 1e8,
  eth: 1e18,
};

const symbolConvertor = {
  btc: 'bitcoin',
  eth: 'ethereum',
} as { [key: string]: string };

export async function balance(symbol: string, address: string) {
  const resp = await fetch(`https://api.blockcypher.com/v1/${symbol}/main/addrs/${address}/balance`);
  const data: BalanceResponse = await resp.json();
  return data.final_balance / unitConvertor[symbol as keyof typeof unitConvertor];
}

export async function price(symbol: string): Promise<{
  usd: number;
  pkr: number;
}> {
  const resp = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbolConvertor[symbol]}&vs_currencies=usd,pkr`);
  const data: {
    [key: string]: {
      usd: number,
      pkr: number,
    }
  } = await resp.json();
  return data[symbolConvertor[symbol]];
}
