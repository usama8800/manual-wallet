import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectNetwork } from '@/lib/slices/networks';
import { WalletState, fetchAllWallets } from '@/lib/slices/wallets';
import { classNames } from '@/lib/utils';
import styles from '@/styles/walletListItem.module.scss';
import { CSSProperties } from 'react';
import Currency from './currency';
import Icon from './icon';
import ListItem from './listItem';
import NetworkName from './networkName';

export default function WalleListItem(props: { wallet: WalletState, style?: CSSProperties }) {
  const wallet = props.wallet;
  const network = useAppSelector(selectNetwork(wallet.networkSymbol));
  const dispact = useAppDispatch();

  async function removeWallet() {
    if (wallet.deleted) await window.electron.updateWallet(wallet.id, { deleted: false });
    else await window.electron.updateWallet(wallet.id, { deleted: true });
    dispact(fetchAllWallets());
  }

  if (!network) return <></>;
  return (
    <ListItem hoverable style={props.style} className={styles.walletListItem}>
      <div className={styles.networkContainer}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Icon icon={wallet.networkSymbol as any}></Icon>
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
      <Icon
        className={classNames(['icon', styles.small])}
        icon={wallet.deleted ? 'undelete' : 'delete'}
        size={25}
        onClick={removeWallet}
      ></Icon>
    </ListItem>
  );
}
