---
title: Importing an OVA Virtual Machine
sidebar_position: 4
---

# Importing an OVA Virtual Machine



### Preparation
```bash
# make a working directory
mkdir ova_import && cd ova_import
# download the ova - this example is using Wazuh OVA
wget -O wazuh-4.7.3.ova https://packages.wazuh.com/4.x/vm/wazuh-4.7.3.ova
# extract the downloaded ova
tar xvf wazuh-4.7.3.ova
```

### Import Execution
```bash
### Import the OVF
# create a new vm from the ova
# usage
# qm importovf <unused vmid> <path to ova> <destination storage pool name> [OPTIONS]
qm importovf 300 ./wazuh-4.7.3.ovf local --format qcow2
```
You will see the VM with the VMID you already decide. Review and adjust the setting as needed.

### Clean Up
```bash
cd ..
rm ova_import/ -r
```

Reference: [link](https://i12bretro.github.io/tutorials/0387.html)