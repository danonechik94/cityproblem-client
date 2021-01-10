import React, { FunctionComponent } from 'react';

import classnames from 'classnames';
import styles from './stats.module.css';

interface Props {
  data: Issue;
}

const Stats: FunctionComponent<Props> = ({ data }) => {
  return (
    <div className={styles.container}>
      {JSON.stringify(data)}
    </div>
  );
};

export default Stats;