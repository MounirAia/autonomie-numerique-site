import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const modules = [
  {
    id: 1,
    label: 'Bases & Envoi de courriel',
    description:
      "Démarrer l'ordinateur, naviguer sur Internet, gérer ses fichiers et envoyer un premier courriel.",
    to: '/docs/module-1/1-1-demarrage-interface',
  },
  {
    id: 2,
    label: 'Recherche en ligne et IA',
    description:
      'Maîtriser les recherches Google, trouver des tutoriels YouTube et utiliser ChatGPT.',
    to: '/docs/module-2/2-1-recherche-google',
  },
  {
    id: 3,
    label: 'Outils bureautiques',
    description:
      "Utiliser une clé USB, rédiger des courriels professionnels, Google Maps et Zoom.",
    to: '/docs/module-3/3-1-cle-usb',
  },
  {
    id: 4,
    label: 'Téléphone intelligent',
    description:
      'Prendre en main son téléphone, régler les paramètres, utiliser la caméra et envoyer des messages.',
    to: '/docs/module-4/4-1-bases-smartphone',
  },
  {
    id: 5,
    label: 'Applications du quotidien',
    description:
      "Réseaux sociaux, achats d'occasion, transport, recherche d'emploi et services courants.",
    to: '/docs/module-5/5-1-reseaux-sociaux',
  },
  {
    id: 6,
    label: 'Sécurité numérique',
    description:
      "Créer des mots de passe forts, éviter les arnaques et reconnaître l'hameçonnage.",
    to: '/docs/module-6/6-1-mots-de-passe',
  },
];

function HomepageHero() {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroOverlay} />
      <div className={`container ${styles.heroContent}`}>
        <Heading as="h1" className={styles.heroTitle}>
          Autonomie Numérique
        </Heading>
        <p className={styles.heroSubtitle}>
          Une série de cours pour devenir autonome avec la technologie.
        </p>
        <p className={styles.heroInstructor}>
          Enseigné par <strong>Mounir Aiache</strong> au SAC Anjou
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/module-1/1-1-demarrage-interface">
            Commencer le cours
          </Link>
        </div>
      </div>
    </header>
  );
}

function AboutSection() {
  return (
    <section className={styles.aboutSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          À propos de la formation
        </Heading>
        <p>
          <strong>Autonomie Numérique</strong> est une formation pratique qui guide les débutants
          pas à pas dans l&apos;utilisation de l&apos;ordinateur, du téléphone intelligent et des
          outils numériques du quotidien. Les cours sont conçus pour être accessibles à tous, avec
          des exercices pratiques après chaque module.
        </p>
        <p>
          La formation est présentée au{' '}
          <a href="https://sacanjou.org/" target="_blank" rel="noopener noreferrer">
            Centre d&apos;action bénévole Anjou (SACANJOU)
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function ModulesSection() {
  return (
    <section className={styles.modulesSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Les modules du cours
        </Heading>
        <div className={styles.modulesGrid}>
          {modules.map((mod) => (
            <Link key={mod.id} to={mod.to} className={styles.moduleCard}>
              <span className={styles.moduleNumber}>Module {mod.id}</span>
              <h3 className={styles.moduleTitle}>{mod.label}</h3>
              <p className={styles.moduleDescription}>{mod.description}</p>
              <span className={styles.moduleLink}>Commencer &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className={styles.contactSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Contacter l'instructeur
        </Heading>
        <div className={styles.contactLinks}>
          <a
            href="https://www.facebook.com/people/Autonomie-Num%C3%A9rique/61580302981771/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactItem}>
            Facebook — Autonomie Numérique
          </a>
          <a href="mailto:aiamounir@hotmail.com" className={styles.contactItem}>
            aiamounir@hotmail.com
          </a>
          <a
            href="https://autonomie-numerique.ca"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactItem}>
            autonomie-numerique.ca
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Cours pour devenir autonome avec la technologie, présenté au SACANJOU.">
      <HomepageHero />
      <main>
        <AboutSection />
        <ModulesSection />
        <ContactSection />
      </main>
    </Layout>
  );
}
