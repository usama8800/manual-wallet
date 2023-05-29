import styles from '@/styles/layouts.module.scss';
import { ReactElement } from 'react';

export function mainLayout(page: ReactElement) {
  return (
    <div className={styles.main}>
      {/* <Menu></Menu> */}
      <div className={styles.rightSide}>{page}</div>
    </div>
  );
}
