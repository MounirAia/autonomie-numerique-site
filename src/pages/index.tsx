import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/module-1/1-1-demarrage-interface">
            Commencer le module 1
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Cours pour devenir autonome avec la technologie.">
      <HomepageHeader />
      <main>
        <section className={styles.introSection}>
          <div className="container">
            <Heading as="h2">A propos de la formation</Heading>
            <p>
              Autonomie numerique est une serie de cours qui vise l&apos;individu
              a devenir autonome avec la technologie.
            </p>
            <p>
              Le premier module couvre les bases de l&apos;ordinateur et l&apos;envoi
              d&apos;email avec des exercices pratiques.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
