import React, { FunctionComponent } from 'react';

import classnames from 'classnames';
import commonStyles from './controls.module.css';
import styles from './button.module.css';

interface Props {
  className: string;
  size: 'default' | 'small';
}

const Button: FunctionComponent<Props> = ({className, size, ...restProps}) => {
  return <button className={classnames(className, styles.button, styles[`button--${size}`])} {...restProps} />;
};

export default Button;