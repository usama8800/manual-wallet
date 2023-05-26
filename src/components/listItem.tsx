import { classNames } from '@/lib/utils';
import styles from '@/styles/listItem.module.scss';
import { CSSProperties } from 'react';

export default function ListItem(props: {
  children: any,
  hoverable?: boolean,
  compact?: boolean,
  style?: CSSProperties,
  className?: string,
}) {
  return (
    <div
      className={classNames([styles.listItem, props.className], {
        [styles.compact]: props.compact,
        [styles.hoverable]: props.hoverable,
      })}
      style={props.style}
    >
      {props.children}
    </div>
  );
}
