import React from 'react';

import classnames from 'classnames';
import styles from './cluster.module.css';

interface Props extends React.HTMLProps<HTMLDivElement> {
  className: string;
  children?: React.ReactNode;
}

export default function Cluster({ className, children, ...restProps }: Props) {
  return (
    <div className={classnames(className, styles.cluster)} {...restProps}>
      {children}
    </div>
  );
}