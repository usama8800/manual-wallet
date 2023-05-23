import styles from '@/styles/button.module.scss';

export default function Button(props: { children: string; icon?: string }) {
  return <div className={styles.button}>{props.children}</div>;
}
