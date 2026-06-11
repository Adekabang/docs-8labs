// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

const showLastUpdate = process.env.DOCS_SHOW_LAST_UPDATE !== 'false';
const editUrl = 'https://github.com/Adekabang/docs-8labs/tree/main';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '8Labs Docs',
  tagline: 'Cloud Infrastructure Guides & Tutorials',
  favicon: 'img/favicon.ico',
  url: 'https://docs.8labs.id',
  baseUrl: '/',
  organizationName: 'Adekabang',
  projectName: 'docs-8labs',

  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

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
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: './sidebarsDocs.js',
          editUrl,
          showLastUpdateAuthor: showLastUpdate,
          showLastUpdateTime: showLastUpdate,
        },
        blog: {
          showReadingTime: true,
          editUrl,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'guides',
        path: 'guides',
        routeBasePath: 'guides',
        sidebarPath: './sidebarsGuides.js',
        editUrl,
        showLastUpdateAuthor: showLastUpdate,
        showLastUpdateTime: showLastUpdate,
      },
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      ({
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        indexPages: false,
        docsRouteBasePath: ['docs', 'guides'],
        searchResultLimits: 8,
        searchBarShortcut: true,
        searchBarShortcutHint: true,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'https://8labs.id/opengraph.jpg',
      navbar: {
        title: '8Labs Docs',
        logo: {
          alt: '8Labs Docs',
          src: 'img/logo.svg',
          href: 'https://8labs.id',
        },
        items: [
          {
            type: 'dropdown',
            label: 'Docs',
            position: 'left',
            items: [
              { label: 'Getting Started', to: '/docs/getting-started/intro' },
              { label: 'Billing & Plans', href: '/docs/billing-plans/overview' },
              { label: 'FAQ', href: '/docs/faq/overview' },
              { label: 'Troubleshooting', href: '/docs/troubleshooting/overview' },
            ],
          },
          {
            type: 'dropdown',
            label: 'Guides',
            position: 'left',
            items: [
              { label: 'Proxmox', href: '/guides/proxmox' },
              { label: 'VMware', href: '/guides/vmware' },
              { label: 'XCP-ng', href: '/guides/xcp-ng' },
              { label: 'Rocky Linux', href: '/guides/rocky-linux' },
              { label: 'Caddy', href: '/guides/caddy' },
              { label: 'WireGuard', href: '/guides/wireguard' },
              { label: 'Git', href: '/guides/git' },
              { label: 'Coolify', href: '/guides/coolify' },
              { label: 'OpenCode', href: '/guides/opencode' },
              { label: 'ECC', href: '/guides/ecc' },
              { label: 'Caveman', href: '/guides/caveman' },
            ],
          },
          { to: '/blog', label: 'Blog', position: 'left' },
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
              { label: 'Documentation', href: '/docs/getting-started/intro' },
              { label: 'Guides', href: '/guides/proxmox' },
              { label: 'Client Panel', href: 'https://my.8labs.id' },
              { label: 'Cloud Panel', href: 'https://cloud.8labs.id' },
            ],
          },
          {
            title: 'Social Media',
            items: [
              { label: 'Github', href: 'https://github.com/Adekabang' },
              { label: 'Twitter', href: 'https://twitter.com/Mraskaa' },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'Blog', to: '/blog' },
              { label: 'Docs Repo', href: 'https://github.com/Adekabang/docs-8labs' },
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
  scripts: [
    { src: 'https://beacon.8labs.id/script.js', defer: true, 'data-website-id': '57890745-9236-46f9-965f-2deb733d445a' },
  ],
};

export default config;
