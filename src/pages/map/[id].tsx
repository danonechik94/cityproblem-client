import React, { useState, FunctionComponent } from 'react';
import { inject, observer } from 'mobx-react';

import classnames from 'classnames';
import styles from '#/styles/map.module.css';

import Head from 'next/head'
import Layout, { siteTitle } from '#/components/layout'
import Map from '#/components/map/map';
import Legend from '#/components/map/misc/legend';
import Hamburger from '#/components/map/misc/hamburger';
import AddPoint from '#/components/addPoint';
import Modal from '#/components/modal/modal';
import IssueDetails from '#/components/map/misc/issueDetails';

import Profile from '#/components/auth/profile';

import { MapItemType } from '#/constants/mapItems';
import { regions } from '#/pages';
import Link from "next/link";

interface Props {
  store: Store;
  auth: Auth;
}


const MapPage: FunctionComponent<Props> = inject('store')(observer(({ store, auth }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const handleMenuToggle = () => {
    setMenuIsOpen(v => !v);
  };

  const [mapMode, setMapMode] = useState();

  const renderModal = () => {
    const { activeModal } = store;
    console.log(activeModal)
    if (!activeModal) {
      return null;
    }



    let modalOptions = { ...activeModal.options };
    switch (activeModal.name) {
      case 'issue':
        modalOptions.position = 'top';
        modalOptions.showOverlay = false;
        modalOptions.content = <IssueDetails data={store.selectedIssue} />
        break;
    }

    const handleClose = store.hideModals;
    return (
      <Modal options={modalOptions} onClose={handleClose} />
    );
  };

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={styles.container}>
        <div className={styles.mapContainer}>
          <Legend className={styles.legend} />
          <AddPoint className={styles.addPoint} onClick={() => {}} />

          <Map items={store.issues} />
        </div>

        <div className={classnames(styles.menu, { [styles.menuOpen]: menuIsOpen })}>
          <Hamburger className={styles.hamburger} open={menuIsOpen} onClick={handleMenuToggle} />

          <div className={styles.menuContent}>
            <div className={styles.viewSwitcherContainer}>
              &nbsp;
            </div>
            <h3 className={styles.cityTitle}>Тула</h3>


            <footer className={styles.menuFooter}>
              <div className={styles.otherLinks}>
                <Link href="/about"><a className={styles.footerLink}>О проекте</a></Link>
                <span className={styles.linkSeparator}>|</span>
                <Link href="/agreements"><a className={styles.footerLink}>Как помочь</a></Link>
              </div>
              <div className={styles.emailContainer}>
                <a href="mailto:gp-tula@gmail.com" className={styles.emailLink}>gp-tula@gmail.com</a>
              </div>
            </footer>

            <Profile className={styles.profile} auth={auth} />
          </div>
        </div>
      </section>

      {renderModal()}
    </Layout>
  );
}));

export default MapPage;

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
      // mapItems: [
      //   {
      //     id: 'a1b61a96aac14c4f94c48dd861f49124',
      //     coords: { lat: 54.194517, lng: 37.649878 },
      //     type: MapItemType.generalIssue,
      //     description: 'На данном участке отсутствует пешеходная инфраструктура и постоянно происходят конфликты.',
      //     address: 'Тула, Епифанская 132'
      //   },
      //   {
      //     id: 'b9ff93b9c1644329941393b8f4677b52',
      //     coords: { lat: 54.194270, lng: 37.650847 },
      //     type: MapItemType.crosswalkIssue,
      //     description: 'Отсутствует пешеходный переход, хотя пешеходный поток на улице достаточно большой.',
      //     address: 'Тула, Калинина 4'
      //   },
      // ],
      auth: {
        auth: false,
      },
    }
  };
}