import { mainLayout } from '@/components/utils';
import { defaultNetwork, fetchPrice, setNetworks } from '@/lib/slices/networks';
import { defaultWallet, fetchAmount, setWallets } from '@/lib/slices/wallets';
import store from '@/lib/store';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';

export type NextPageWithLayout = ReactElement & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? mainLayout;

  const dispatch = store.dispatch;
  useEffect(() => {
    console.log('init networks');
    const state = store.getState();
    const networks = state.networks;
    if (networks.ids.length > 0) return;
    dispatch(setNetworks(['btc', 'eth'].map(s => ({
      ...defaultNetwork,
      symbol: s,
    }))));
  }, [dispatch]);

  useEffect(() => {
    console.log('init networks price');
    const state = store.getState();
    const networks = state.networks;
    if (networks.ids.length === 0) return;
    for (const networkId of networks.ids) {
      const network = networks.entities[networkId]!;
      dispatch(fetchPrice({ api: 'coingecko', network }));
    }
  }, [dispatch]);

  useEffect(() => {
    console.log('init wallets');
    const state = store.getState();
    const wallets = state.wallets;
    if (wallets.ids.length > 0) return;
    store.dispatch(setWallets([
      {
        ...defaultWallet,
        id: 1,
        networkSymbol: 'btc',
        name: 'My BTC Wallet',
        address: '186zeVrx7hXe9iiXk9oS48cSKe4QPwXMgm',
      },
      {
        ...defaultWallet,
        id: 2,
        networkSymbol: 'eth',
        name: 'My ETH Wallet',
        address: '0x8624613061799e9472e4e4579e88afa39d8887ab',
      },
    ]));
  }, [dispatch]);

  useEffect(() => {
    console.log('init wallet amounts');
    const state = store.getState();
    const wallets = state.wallets;
    if (wallets.ids.length === 0) return;
    for (const walletId of wallets.ids) {
      const wallet = wallets.entities[walletId]!;
      dispatch(fetchAmount({ api: 'blockcypher', wallet }));
    }
  }, [dispatch]);

  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
}
