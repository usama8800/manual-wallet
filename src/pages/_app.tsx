import { mainLayout } from '@/components/utils';
import { fetchAmounts } from '@/lib/slices/wallets';
import store from '@/lib/store';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';

export type NextPageWithLayout = ReactElement & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? mainLayout;

  const [loading, setLoading] = useState(false);
  const state = store.getState();
  const wallets = state.wallets.wallets;
  const walletsStatus = state.wallets.status;
  useEffect(() => {
    if (loading || walletsStatus !== 'idle') return;
    setLoading(true);
    store.dispatch(fetchAmounts({ wallets, api: state.config.balanceApi }));
    setLoading(false);
  }, [loading, state.config.balanceApi, wallets, walletsStatus]);

  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
}
