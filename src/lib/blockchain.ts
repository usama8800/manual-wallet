import * as blockCypher from './slices/blockcypher';
import { BalanceApi, PriceApi } from './slices/config';
import { Network } from './slices/networks';

export async function balance(api: BalanceApi, network: Network, address: string): Promise<number> {
  switch (api) {
    case 'blockcypher': return blockCypher.balance(network.symbol, address);
  }
}

export async function price(api: PriceApi, network: Network): Promise<number> {
  switch (api) {
    case 'blockcypher': return blockCypher.price(network.symbol);
  }
}
