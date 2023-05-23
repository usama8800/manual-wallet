import { fetchAmounts } from "@/lib/slices/wallets";
import store from "@/lib/store";
import { mainLayout } from "@/lib/utils";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";

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
    if (loading || walletsStatus !== "idle") return;
    setLoading(true);
    store.dispatch(fetchAmounts(wallets));
    setLoading(false);
  }, [loading, wallets, walletsStatus]);

  return (
    <Provider store={store}>
      <Root>{getLayout(<Component {...pageProps} />)}</Root>
    </Provider>
  );
}

function Root(props: any) {
  // const wallets = useAppSelector(selectWallets);
  // const walletsStatus = useAppSelector(selectStatus);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (walletsStatus === "idle") {
  //     dispatch(fetchAmounts(wallets));
  //   }
  // }, [dispatch, wallets, walletsStatus]);
  return <>{props.children}</>;
}
