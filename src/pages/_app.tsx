import { mainLayout } from '@/components/utils';
import { fetchAllNetworks } from '@/lib/slices/networks';
import { fetchAllWallets } from '@/lib/slices/wallets';
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
    dispatch(fetchAllNetworks());
    dispatch(fetchAllWallets());
  }, [dispatch]);

  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
}
