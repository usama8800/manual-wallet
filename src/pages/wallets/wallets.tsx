import Currency from '@/components/currency';
import Header from '@/components/header';
import Icon from '@/components/icon';
import ListItem from '@/components/listItem';
import WalletListItem from '@/components/walletListItem';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchPrice, selectAllNetworks } from '@/lib/slices/networks';
import { fetchAmount, selectActiveWallets, selectInactiveWallets } from '@/lib/slices/wallets';
import { default as styles, default as walletListItemStyles } from '@/styles/walletListItem.module.scss';
import { useEffect, useState } from 'react';

export default function Wallets() {
  const [showDeleted, setShowDeleted] = useState(false);
  const wallets = useAppSelector(showDeleted ? selectInactiveWallets : selectActiveWallets);
  const networks = useAppSelector(selectAllNetworks);
  const dispatch = useAppDispatch();

  const notAllDone = wallets.some((wallet) => wallet.status !== 'fulfilled')
    || networks.some((network) => network.status !== 'fulfilled');
  const total = notAllDone ? -1 : wallets.reduce((prev, curr) => {
    const network = networks.find(n => n.symbol === curr.networkSymbol);
    if (!network) return prev;
    return prev + curr.amountCoins * network.price;
  }, 0);

  useEffect(() => {
    if (notAllDone) {
      const unfulfilledNetworks = networks.filter((network) => ['idle', 'error'].includes(network.status));
      const unfulfilledWallets = wallets.filter((wallet) => ['idle', 'error'].includes(wallet.status));
      unfulfilledNetworks.forEach(n => {
        dispatch(fetchPrice({ api: 'coingecko', network: n }));
      });
      unfulfilledWallets.forEach(w => {
        dispatch(fetchAmount({ api: 'blockcypher', wallet: w }));
      });
    }
  }, [dispatch, networks, notAllDone, wallets]);

  return (
    <div>
      <Header title={(showDeleted ? 'Deleted ' : '') + 'Wallets'} trailing={(
        <>
          <div style={{ flex: 1 }}></div>
          <Icon
            className='icon'
            size={24}
            icon={showDeleted ? 'eyeOff' : 'eye'}
            onClick={() => setShowDeleted(!showDeleted)}
          ></Icon>
        </>
      )}></Header>

      {/* <ListItem compact style={{ marginBottom: 25 }}>
        Search
      </ListItem> */}

      <div>
        {!showDeleted && (
          <ListItem compact className={walletListItemStyles.walletListItem}>
            <div style={{ textAlign: 'center' }}>Total</div>
            <div></div>
            <div>
              {total === -1 ? '' : <Currency currency='$'>{total}</Currency>}
            </div>
            <Icon className={styles.small} icon="none"></Icon>
          </ListItem>
        )}
        {wallets.map((wallet) => (
          <WalletListItem key={wallet.name} wallet={wallet} />
        ))}
        {!showDeleted && (
          <ListItem compact hoverable link={'/wallets/add'} style={{
            justifyContent: 'center',
            border: '1px dashed #666',
            backgroundColor: 'transparent',
            color: 'rgb(var(--foreground-2-rgb))',
            userSelect: 'none',
          }}>Add Wallet <Icon size={22} icon={'add'}></Icon></ListItem>
        )}
      </div>
    </div>
  );
}
