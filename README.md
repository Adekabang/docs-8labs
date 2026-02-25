# 8Labs Documentation

[![Website](https://img.shields.io/badge/Website-docs.8labs.id-blue)](https://docs.8labs.id)
[![Built with Docusaurus](https://img.shields.io/badge/Built%20with-Docusaurus-green)](https://docusaurus.io/)

> **Cloud infrastructure guides, tutorials, and best practices by [8Labs](https://8labs.id)**

This repository contains the source code for the 8Labs documentation website, built with [Docusaurus](https://docusaurus.io/). It provides comprehensive guides for cloud infrastructure management, virtualization platforms, and system administration.

## 📚 Documentation Topics

### Virtualization & Hypervisors
- **[XCP-ng](./docs/XCP-ng/)** - XCP-ng deployment, hardening, and VMware coexistence
  - Hardening public-facing XCP-ng with OPNsense & WireGuard
  - Running XCP-ng nested in VMware/ESXi
- **[Proxmox](./docs/proxmox/)** - Proxmox VE tutorials
  - DHCP troubleshooting, OVA importing, disk expansion

### Web Servers & Proxy
- **[Caddy 101](./docs/caddy-101/)** - Caddy web server setup on Rocky Linux 8
  - Installation and configuration guides

### Operating Systems
- **[Rocky Linux](./docs/rocky-linux/)** - Enterprise Linux configuration
  - Custom mirror repository setup

### Virtualization Platforms
- **[VMware](./docs/VMware/)** - VMware/ESXi administration
  - Resetting evaluation trials

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Yarn](https://yarnpkg.com/) package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/Adekabang/docs-8labs.git
cd docs-8labs

# Install dependencies
yarn install
```

### Local Development

```bash
# Start development server
yarn start
```

This command starts a local development server at `http://localhost:3000` and opens your browser. Most changes are reflected live without restarting the server.

### Build

```bash
# Generate static content
yarn build
```

This command generates static content into the `build` directory, which can be served using any static hosting service.

## 🌐 Deployment

The documentation is automatically deployed to **https://docs.8labs.id**

For manual deployment to GitHub Pages:

```bash
# Using SSH
USE_SSH=true yarn deploy

# Using HTTPS
GIT_USER=<Your GitHub username> yarn deploy
```

## 📝 Contributing

We welcome contributions! If you find errors or want to add new guides:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-guide`)
3. Commit your changes (`git commit -am 'Add new guide'`)
4. Push to the branch (`git push origin feature/new-guide`)
5. Open a Pull Request

## 🔗 Related Resources

- **8Labs Website:** https://8labs.id
- **Client Panel:** https://my.8labs.id
- **Cloud Panel:** https://cloud.8labs.id
- **GitHub:** https://github.com/Adekabang

## 📄 License

This project is licensed under the MIT License - see the repository for details.

---

**Maintained by [8Labs](https://8labs.id)** | Built with ❤️ using Docusaurus + Tailwind CSS
