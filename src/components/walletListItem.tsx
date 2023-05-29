import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectNetwork } from '@/lib/slices/networks';
import { WalletState, fetchAllWallets } from '@/lib/slices/wallets';
import { classNames } from '@/lib/utils';
import styles from '@/styles/walletListItem.module.scss';
import { useRouter } from 'next/router';
import { CSSProperties } from 'react';
import Currency from './currency';
import Icon from './icon';
import ListItem from './listItem';
import WalletINN from './walletINN';

export default function WalleListItem(props: { wallet: WalletState, style?: CSSProperties }) {
  const wallet = props.wallet;
  const network = useAppSelector(selectNetwork(wallet.networkSymbol));
  const dispact = useAppDispatch();
  const router = useRouter();

  async function removeWallet() {
    if (wallet.deleted) await window.electron.updateWallet(wallet.id, { deleted: false });
    else await window.electron.updateWallet(wallet.id, { deleted: true });
    dispact(fetchAllWallets());
  }

  if (!network) return <></>;
  return (
    <ListItem
      hoverable
      style={props.style}
      className={styles.walletListItem}
      onClick={() => router.replace(`/wallets/${wallet.id}`)}
    >
      <WalletINN wallet={wallet}></WalletINN>
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
