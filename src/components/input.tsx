import styles from '@/styles/input.module.scss';
import { HTMLInputTypeAttribute, ReactNode, useRef } from 'react';
import ListItem from './listItem';

export default function Input(props: {
  children: string,
  trailing?: ReactNode,
  value: string, setValue: (v: string) => void,
  type?: HTMLInputTypeAttribute,
}) {
  const input = useRef<any>(null);
  const type = props.type || 'text';

  return (
    <div className={styles.input}>
      <ListItem compact className={styles.main}>
        <span
          className={styles.placeholder}
          onClick={() => input.current.focus()}
        >{props.children}</span>
        <input
          ref={input}
          className={styles.value}
          type={type}
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
        ></input>
        {!!props.trailing && props.trailing}
      </ListItem>
    </div>
  );
}
