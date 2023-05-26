import { useAppSelector } from '@/lib/hooks';
import { selectNetwork } from '@/lib/slices/networks';
import { Wallet } from '@/lib/slices/wallets';
import styles from '@/styles/walletListItem.module.scss';
import { CSSProperties } from 'react';
import Currency from './currency';
import Icon from './icon';
import ListItem from './listItem';
import NetworkName from './networkName';

export default function WalleListItem(props: { wallet: Wallet, style?: CSSProperties }) {
  const wallet = props.wallet;
  const network = useAppSelector(selectNetwork(wallet.networkSymbol));
  if (!network) return <></>;
  return (
    <ListItem hoverable style={props.style} className={styles.walletListItem}>
      <div className={styles.networkContainer}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Icon>{wallet.networkSymbol}</Icon>
        </div>
        <div style={{ paddingLeft: 10 }}>
          <NetworkName symbol={wallet.networkSymbol} style={{ paddingBottom: 3 }}></NetworkName>
          <div>{wallet.name}</div>
        </div>
      </div>
      <div>
        {wallet.status === 'pending' ?
          '...' :
          wallet.status === 'rejected' ?
            'error' :
            wallet.amountCoins}
      </div>
      <div>
        {network.status === 'pending' ?
          '...' :
          network.status === 'rejected' ?
            'error' :
            <Currency currency='$'>{wallet.amountCoins * network.price}</Currency>}
      </div>
    </ListItem>
  );
}
