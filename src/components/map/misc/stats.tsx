import React, { FunctionComponent } from 'react';
import { inject } from 'mobx-react'

import classnames from 'classnames';
import styles from './stats.module.css';

interface Props {
  store: Store;
}


const Stats: FunctionComponent<Props> = inject('store')((props) => {



  return (
    <div className={styles.form}>

    </div>
  );
});

export default Stats;