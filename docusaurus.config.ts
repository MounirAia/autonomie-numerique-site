import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Autonomie numerique',
  tagline:
    "Une serie de cours visant a aider chaque individu a devenir autonome avec la technologie.",
  favicon: 'img/logo.webp',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://autonomie-numerique.ca',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'MounirAia',
  projectName: 'autonomie-numerique-site',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  plugins: ['docusaurus-plugin-image-zoom'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: undefined,
          exclude: ['**/_brouillons/**'],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/logo.webp',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
    },
    navbar: {
      title: 'Autonomie Numérique',
      logo: {
        alt: 'Autonomie Numérique',
        src: 'img/logo.webp',
      }
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Modules',
          items: [
            {
              label: 'Module 1 — Introduction à Windows',
              to: '/docs/module-1/1-1-demarrage-interface',
            },
            {
              label: 'Module 2 — Clavier et raccourcis',
              to: '/docs/module-2/2-1-clavier',
            },
            {
              label: 'Module 3 — Courriel et pièces jointes',
              to: '/docs/module-3/3-1-courriel',
            },
            {
              label: 'Module 4 — Recherche en ligne et IA',
              to: '/docs/module-4/2-1-recherche-google',
            },
            {
              label: 'Module 5 — Outils bureautiques',
              to: '/docs/module-5/3-1-cle-usb',
            },
            {
              label: 'Module 6 — Téléphone intelligent',
              to: '/docs/module-6/4-1-bases-smartphone',
            },
            {
              label: 'Module 7 — Applications de base du téléphone',
              to: '/docs/module-7/7-1-telephone',
            },
            {
              label: 'Module 8 — Gmail et sécurité',
              to: '/docs/module-8/8-1-gmail',
            },
            {
              label: 'Module 9 — Applications du quotidien',
              to: '/docs/module-9/5-1-reseaux-sociaux',
            },
            {
              label: 'Module 10 — Sécurité numérique',
              to: '/docs/module-10/6-1-mots-de-passe',
            },
          ],
        },
        {
          title: 'Programme',
          items: [
            {
              label: 'Page d\'accueil',
              to: '/',
            },
            {
              label: 'SACANJOU',
              href: 'https://sacanjou.org/',
            },
          ],
        },
        {
          title: 'Contact',
          items: [
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/people/Autonomie-Num%C3%A9rique/61580302981771/',
            },
            {
              label: 'aiamounir@hotmail.com',
              href: 'mailto:aiamounir@hotmail.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Autonomie Numérique`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    zoom: {
      selector: '.markdown img',
      background: {
        light: 'rgba(0, 0, 0, 0.6)',
        dark: 'rgba(0, 0, 0, 0.8)',
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
