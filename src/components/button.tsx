import styles from '@/styles/listItem.module.scss';
import { CSSProperties } from 'react';
import ListItem from './listItem';

export default function Button(props: {
  children: string,
  icon?: string,
  disabled?: boolean,
  onClick?: () => void,
  style?: CSSProperties,
  oppositeColors?: boolean,
}) {
  return (
    <ListItem
      className={styles.button}
      style={{
        ...(props.disabled ? { color: 'rgb(var(--foreground-2-rgb))' } : {}),
        ...props.style,
      }}
      compact
      oppositeColors={props.oppositeColors}
      hoverable={!props.disabled}
      onClick={props.disabled ? () => { } : props.onClick}
    >{props.children}</ListItem>
  );
}
