import Currency from '@/components/currency';
import Header from '@/components/header';
import Icon from '@/components/icon';
import ListItem from '@/components/listItem';
import WalletListItem from '@/components/walletListItem';
import { useAppSelector } from '@/lib/hooks';
import { selectAllNetworks } from '@/lib/slices/networks';
import { selectAllWallets } from '@/lib/slices/wallets';
import walletListItemStyles from '@/styles/walletListItem.module.scss';
import { useEffect, useState } from 'react';

export default function Wallets() {
  const wallets = useAppSelector(selectAllWallets);
  const networks = useAppSelector(selectAllNetworks);
  const [total, setTotal] = useState(-1);
  useEffect(() => {
    if (wallets.some(w => w.status !== 'fulfilled')) return;
    const networksRequired = wallets.map(w => w.networkSymbol);
    const nets = networks.filter(n => networksRequired.includes(n.symbol));
    if (nets.some(n => n.status !== 'fulfilled')) return;
    setTotal(wallets.reduce((acc, w) => {
      const net = nets.find(n => n.symbol === w.networkSymbol);
      return acc + w.amountCoins * net!.price;
    }, 0));
  }, [networks, wallets]);
  // const [search, setSearch] = useState('');

  return (
    <div>
      <Header title="Wallets"></Header>

      <ListItem compact>
        Search
      </ListItem>

      <div style={{ paddingTop: 25 }}>
        <ListItem className={walletListItemStyles.walletListItem}>
          <div>Total</div>
          <div></div>
          <div>
            {total === -1 ? '...' : <Currency currency='$'>{total}</Currency>}
          </div>
        </ListItem>
        {wallets.map((wallet) => (
          <WalletListItem key={wallet.name} wallet={wallet} />
        ))}
        <ListItem hoverable style={{
          justifyContent: 'center',
          border: '1px dashed #666',
          backgroundColor: 'transparent',
          color: 'rgb(var(--foreground-2-rgb))',
          userSelect: 'none',
        }}>Add Account <Icon size={24}>add</Icon></ListItem>
      </div>
    </div>
  );
}
