import React from 'react';

import classnames from 'classnames';
import styles from './legend.module.css';

import { MapItemType } from 'src/constants/mapItems';

import {
  MAP_ITEM_TYPE_NAME,
  MAP_ITEM_NAME_TEXT
} from '#/constants/mapItems';

export default function Legend({ items }) {
  // В enum хранится дубликаты пара-значение, так что нужно отфильтровать половину
  const legendItems = Object.values(MapItemType).filter((value) => !Number.isNaN(Number(value)));
  return (
    <div className={styles.legend}>
      {legendItems.map((itemType) => (
        <div className={styles.item} key={itemType}>
          <div className={classnames(styles.itemIcon, styles[`itemIcon--${MAP_ITEM_TYPE_NAME[itemType]}`])} />
          <div className={styles.itemName}>{MAP_ITEM_NAME_TEXT[itemType]}</div>
        </div>
      ))}
    </div>
  );
}