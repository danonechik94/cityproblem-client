import React from 'react';

import classnames from 'classnames';
import commonStyles from './controls.module.css';
import styles from './input.module.css';

const Input = ({className, ...restProps}) => {
  return <input className={classnames(className, styles.input)} {...restProps} />;
};

export default Input;