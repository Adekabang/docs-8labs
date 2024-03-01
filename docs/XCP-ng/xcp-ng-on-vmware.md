---
title: XCP-ng on VMware/ESXI
sidebar_position: 1
---

# XCP-ng on VMware/ESXI

NOT FOR PRODUCTION.
Works on ESXI 8.

## Preparation
Download XCP-ng ISO [here](https://xcp-ng.org/) and upload to datastore on ESXI

## Configure Network
1. Create New Port Group for XCP-ng environment (you can make new vSwitch if necessary).
2. On `Security` Setting Accept all options.
    - `Promiscuous mode`: Accept ✅
    - `Mac address changes`: Accept ✅
    - `Forged transmits`: Accept ✅

## Create / Register VM
### Name, Guest OS, and Datastore
- `Name`: Anything you want
- `Guest OS family`: Linux
- `Guest OS version`: Other Linux(64-bit)
- `Datastore`: Select any free storage

### Customize Settings
- `CPU`: Any Number minimum 4 (around 2GHz)
    - `Cores per Socket` : same as CPU or half to achieve 1 socket or 2 socket only
    - `Hardware virtualization`: ✅
- `Memory`: Any Number minimum 8GB
- `Hard disk`: minimum 100 GB
- `SCSI Controller`: LSI Logic SAS
- `Network Adapter`: New Port Group (created before)
    - `Adapter Type`: E1000
- `CD/DVD Drive`: ISO downloaded before

### Install XCP-ng
Follow [tutorial](https://docs.xcp-ng.org/installation/install-xcp-ng/) from XCP-ng Official Documentation

### Reference
- [XCP-ng in a VM](https://docs.xcp-ng.org/guides/xcpng-in-a-vm/)
- [Install XCP-ng](https://docs.xcp-ng.org/installation/install-xcp-ng/)




