import React from 'react';
import { observer, inject } from 'mobx-react';

import classnames from 'classnames';
import styles from '../styles/index.module.css';

import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '#/components/layout';
import Profile from '#/components/auth/profile';
import RussiaMap from '#/components/svgMap/russia';
import Modal from '#/components/modal/modal';

export async function getServerSideProps(context) {
  return {
    props: {
      regions,
      initialState: {
        activeModal: null,
      },
      auth: {
        auth: false,
      }
    }
  };
}


// TODO move to constants
export const regions = [
  {
    code: 'TUL',
    name: 'tula',
    nameRu: 'Тула',
  }
];


const Home = inject('store')(observer((props) => {
  const { regions, auth, store: { activeModal } } = props;
  console.log('props', props);
  const renderModal = () => {
    if (!activeModal) {
      return null;
    }

    const { options, name } = activeModal;
    const handleClose = props.store.hideModals;
    return (
      <Modal options={options} onClose={handleClose} />
    );
  };

  console.log(activeModal);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <main className={styles.mainPageContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <img className={styles.titleImage} src="/images/gp_logo.png" width="79" height="79" />
            <span>
              Карта проблем <br/>вашего города
            </span>
          </h1>
          <Profile auth={auth} className={styles.profile} />
        </header>


        <div className={styles.mapContainer}>
          <RussiaMap style={{ width: '680px', height: '386px' }} />
        </div>

        <div className={styles.cities}>
          <h3 className={styles.citiesHeader}>Выберите регион</h3>
          <div className={styles.addedCities}>
            {regions.map((region) => <Link href={`/map/${region.name}`}><a className={styles.cityLink}>{region.nameRu}</a></Link>)}
          </div>
        </div>

      </main>
      <footer className={styles.footer}>
        <div className={styles.otherLinks}>
          <Link href="/about"><a className={styles.footerLink}>О проекте</a></Link>
          <span className={styles.linkSeparator}>|</span>
          <Link href="/agreements"><a className={styles.footerLink}>Как помочь</a></Link>
        </div>
        <div className={styles.emailContainer}>
          <a href="mailto:gp-tula@gmail.com" className={styles.emailLink}>gp-tula@gmail.com</a>
        </div>
      </footer>

      {renderModal()}
    </Layout>
  );
}));

export default Home;