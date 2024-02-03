---
title: DHCP not working on Ubuntu 22.04 and above template
sidebar_position: 2
---

# DHCP not working on Ubuntu 22.04 and above template
To work around this issue, VMware recommends to prepare a VM template running an Ubuntu Guest OS with an empty /etc/machine-id.

## Solution 1
1. Clone your VM template to a new VM.
2. Power on the new VM and run these commands inside the Linux Guest OS:
```bash
echo -n > /etc/machine-id
rm /var/lib/dbus/machine-id
ln -s /etc/machine-id /var/lib/dbus/machine-id
```
3. Re-clone the new VM to a new VM template.

## Solution 2
Alternatively, prepare a VM template explicitly setting the dhcp client identifier to mac.

### Example 1: 
set the `dhcp-identifier: mac` in the /etc/netplan/*.yaml file as below:
```bash
network:
  version: 2
  renderer: networkd
  ethernets:
    default:
      match:
        name: e*
      dhcp4: yes
      dhcp-identifier: mac
```

### Example 2: 
set the `ClientIdentifier=mac` in the /etc/systemd/network/default.network file.

Reference: [link](https://kb.vmware.com/s/article/82229)