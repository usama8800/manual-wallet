import styles from '@/styles/input.module.scss';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import ListItem from './listItem';

export default function Select<T>(props: {
  children: string, style?: CSSProperties,
  options: { value: T, display: string, key: string }[],
  selectedIndex: number, setSelectedIndex: (i: number) => void,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener('click', outsideClickHandler, true);
    return () => {
      document.removeEventListener('click', outsideClickHandler, true);
    };
  }, []);

  function mainClickHandler() {
    setOpen(!open);
  }
  function optionClickHandler(index: number) {
    props.setSelectedIndex(index);
    setOpen(false);
  }
  function outsideClickHandler(event: any) {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  }

  return (
    <div className={styles.input} style={props.style} ref={ref}>
      <ListItem compact hoverable onClick={mainClickHandler} className={styles.main}>
        <span className={styles.placeholder}>{props.children}</span>
        <span className={styles.value}>{props.selectedIndex >= 0 && props.options[props.selectedIndex].display}</span>
      </ListItem>
      {open && (
        <div className={styles.options}>
          {props.options.map((option, i) => (
            <div
              key={option.key}
              onClick={() => optionClickHandler(i)}
            >{option.display}</div>
          ))}
        </div>
      )}
    </div>
  );
}
