import React from 'react';

import classnames from 'classnames';
import styles from './hamburger.module.css';

export default function Hamburger({ open, onClick }) {
  return (
    <div onClick={onClick} className={classnames(styles.hamburger, { [styles.hamburgerActive]: open })}>
      <div className={styles.box}>
        <div className={styles.inner}></div>
      </div>
    </div>
  );
}