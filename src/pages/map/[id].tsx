import React, { useState } from 'react';

import classnames from 'classnames';
import styles from '#/styles/map.module.css';

import Head from 'next/head'
import Layout, { siteTitle } from '#/components/layout'
import Map from '#/components/map/map';
import Legend from '#/components/map/misc/legend';
import Hamburger from '#/components/map/misc/hamburger';
import AddPoint from '#/components/addPoint';

import { MapItemType } from '#/constants/mapItems';
import { regions } from '#/src/pages';


export default function MapPage({ mapItems }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const handleMenuToggle = () => {
    setMenuIsOpen(v => !v);
  };

  const [mapMode, setMapMode] = useState();

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={styles.container}>
        <div className={styles.floatingBar}>
          <Legend items={mapItems} />
          <AddPoint className={styles.addPoint} onClick={() => {}} />
        </div>

        <Map items={mapItems} />
        <div className={classnames(styles.menu, { [styles.menuOpen]: menuIsOpen })}>
          <Hamburger open={menuIsOpen} onClick={handleMenuToggle} />
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: regions.map((region) => ({
      params: {
        id: region.name,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      mapItems: [
        {
          id: 'a1b61a96aac14c4f94c48dd861f49124',
          coords: { lat: 54.194517, lng: 37.649878 },
          type: MapItemType.generalIssue,
          description: 'На данном участке отсутствует пешеходная инфраструктура и постоянно происходят конфликты.',
          address: 'Тула, Епифанская 132'
        },
        {
          id: 'b9ff93b9c1644329941393b8f4677b52',
          coords: { lat: 54.194270, lng: 37.650847 },
          type: MapItemType.crosswalkIssue,
          description: 'Отсутствует пешеходный переход, хотя пешеходный поток на улице достаточно большой.',
          address: 'Тула, Калинина 4'
        },
      ],
    }
  };
}