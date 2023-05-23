import Button from "@/components/button";
import { useAppSelector } from "@/lib/hooks";
import { Wallet, selectStatus, selectWallets } from "@/lib/slices/wallets";
import styles from "@/styles/wallets.module.scss";

export default function Wallets() {
  const wallets = useAppSelector(selectWallets);
  return (
    <div className={styles.wallets}>
      <div className={styles.header}>
        <div>Wallets</div>
        <div>
          <Button icon="plus">Add account</Button>
        </div>
      </div>

      <div>
        {wallets.map((wallet) => (
          <WalletItem key={wallet.name} wallet={wallet} />
        ))}
      </div>
    </div>
  );
}

function WalletItem(props: { wallet: Wallet }) {
  const walletsStatus = useAppSelector(selectStatus);
  return (
    <div className={styles.wallet}>
      <div>{props.wallet.network.name}</div>
      <div>{props.wallet.name}</div>
      {walletsStatus === "loading" ? (
        <>...</>
      ) : (
        <div>{props.wallet.amountCoins}</div>
      )}
    </div>
  );
}
