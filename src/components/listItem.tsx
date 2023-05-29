import { classNames } from '@/lib/utils';
import styles from '@/styles/listItem.module.scss';
import { useRouter } from 'next/router';
import { CSSProperties, MouseEvent } from 'react';

export default function ListItem(props: {
  children: any,
  hoverable?: boolean,
  compact?: boolean,
  style?: CSSProperties,
  className?: string,
  link?: string,
  oppositeColors?: boolean,
  onClick?: (event: MouseEvent<HTMLDivElement, any>) => void,
}) {
  const router = useRouter();
  const onClick = (e: MouseEvent<HTMLDivElement, any>) => {
    if (props.link) router.replace(props.link);
    if (props.onClick) props.onClick(e);
  };

  return (
    <div
      className={classNames([styles.listItem, props.className], {
        [styles.compact]: props.compact,
        [styles.hoverable]: props.hoverable,
        [styles.oppositeColors]: props.oppositeColors,
      })}
      style={props.style}
      onClick={onClick}
    >
      {props.children}
    </div>
  );
}
