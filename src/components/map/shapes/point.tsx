import React from 'react';

import classnames from 'classnames';
import styles from './point.module.css';

import { MAP_ITEM_TYPE_NAME } from '#/constants/mapItems';

type Props = {
  className: string;
  itemData: Issue;
  onClick: (issue: Issue) => void;
  selected: boolean;
};

export default function Point({ itemData: { category }, itemData, onClick, className, selected }: Props) {
  const handleClick = () => { onClick(itemData) };
  const pointClassNames = classnames(
    styles.point,
    className,
    styles[`point--${MAP_ITEM_TYPE_NAME[category]}`],
    { [styles.selected]: selected }
  );
  return <div className={pointClassNames} onClick={handleClick} />
}