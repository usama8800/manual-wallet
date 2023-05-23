import styles from "@/styles/menu.module.scss";
import Link from "next/link";

export default function Menu() {
  return (
    <div className={styles.menu}>
      <h1>Menu</h1>
      <MenuItem>Portfolio</MenuItem>
      <MenuItem>Market</MenuItem>
      <MenuItem>Wallets</MenuItem>
      <MenuItem>Discover</MenuItem>
      <MenuItem>Send</MenuItem>
      <MenuItem>Receive</MenuItem>
      <MenuItem link="buysell">Buy / Sell</MenuItem>
      <MenuItem>Swap</MenuItem>
      <MenuItem>Card</MenuItem>
    </div>
  );
}

function MenuItem(props: { children: string; link?: string }) {
  let link = props.link;
  if (!link) link = "/" + props.children.toLowerCase();
  if (!link.startsWith("/")) link = "/" + link;
  return (
    <Link className={styles.menuItem} href={link}>
      {props.children}
    </Link>
  );
}
