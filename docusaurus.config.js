// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import tailwindPlugin from "./plugins/tailwind-config.cjs"; // add this

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Cloud Environment',
  tagline: 'Stay Hungry, Stay Foolish',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.8labs.id',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Adekabang', // Usually your GitHub org/user name.
  projectName: 'docs-8labs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Adekabang/selfdocu/tree/main',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Adekabang/selfdocu/tree/main',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Cloud Environment',
        logo: {
          alt: '8Labs Cloud Environment',
          src: 'img/logo.svg',
          href: 'https://8labs.id'
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://my.8labs.id',
            label: 'Client Panel',
            position: 'right',
          },
          {
            href: 'https://cloud.8labs.id',
            label: 'Cloud Panel',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '8Labs',
            items: [
              {
                label: 'Documentation',
                to: '/docs/intro',
              },
              {
                label: 'Client Panel',
                href: 'https://my.8labs.id',
              },
              {
                label: 'Cloud Panel',
                href: 'https://cloud.8labs.id',
              },
            ],
          },
          {
            title: 'Social Media',
            items: [
              {
                label: 'Github',
                href: 'https://github.com/Adekabang',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/Mraskaa',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Adekabang/selfdocu',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 8Labs, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash'],
      },
    }),
    plugins:[tailwindPlugin],
    scripts: [
      { src: 'https://beacon.8labs.id/js/script.js', defer: true, 'data-domain': 'docs.8labs.id' },
    ]
};

export default config;
