import styles from '@/styles/walletListItem.module.scss';
import { Wallet } from '@prisma/client';
import Icon from './icon';
import Input from './input';
import NetworkName from './networkName';

// Wallet Icon Network Name
export default function WalletINN(props: { wallet: Wallet, name?: string, setName?: (name: string) => void }) {
  return (
    <div className={styles.networkContainer}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Icon icon={props.wallet.networkSymbol as any}></Icon>
      </div>
      <div style={{ paddingLeft: 10 }}>
        <NetworkName symbol={props.wallet.networkSymbol} style={{ paddingBottom: 3 }}></NetworkName>
        {props.setName ? (
          <Input clear value={props.name ?? props.wallet.name} setValue={props.setName}></Input>
        ) : (
          <div>{props.wallet.name}</div>
        )}
      </div>
    </div>
  );
}
