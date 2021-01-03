import React from 'react';

import classnames from 'classnames';
import styles from './addPoint.module.css';

export default function Legend({ onClick, className }) {
  return (
    <div className={classnames(styles.addPoint, className)} onClick={onClick}>
      &#xFF0B;
    </div>
  );
}