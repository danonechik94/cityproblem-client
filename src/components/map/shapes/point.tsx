import React from 'react';

import classnames from 'classnames';
import styles from './point.module.css';

import { MAP_ITEM_TYPE_NAME } from '#/constants/mapItems';

type Props = {
  itemData: {};
  onClick: () => void;
};

export default function Point({ itemData: { type }, itemData, onClick, className }: Props) {
  const handleClick = () => { onClick(itemData) };
  const pointClassNames = classnames(styles.point, className, styles[`point--${MAP_ITEM_TYPE_NAME[type]}`]);
  return <div className={pointClassNames} onClick={handleClick} />
}