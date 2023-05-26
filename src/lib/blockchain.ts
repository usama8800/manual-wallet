import * as blockcypher from './slices/blockcypher';
import * as coingecko from './slices/coingecko';
import { BalanceApi, PriceApi } from './slices/config';

export async function balance(api: BalanceApi, networkSymbol: string, address: string): Promise<number> {
  switch (api) {
    case 'blockcypher': return blockcypher.balance(networkSymbol, address);
  }
}

export async function price(api: PriceApi, networkSymbol: string): Promise<number> {
  switch (api) {
    case 'coingecko': return coingecko.price(networkSymbol);
  }
}
