import Head from 'next/head'
import styles from './layout.module.css'

export const siteTitle = 'Карта проблем городской среды Тулы'

export default function Layout({ children, home }) {
  return (
    <div className={styles.layoutContainer}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Карта, на которой пользователи могут отмечать проблемы с городской средой."
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </Head>
      {children}
    </div>
  )
}