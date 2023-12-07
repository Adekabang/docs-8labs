---
title: Reset Evaluation Trial ESXI Hack
sidebar_position: 1
---

# Reset Evaluation Trial ESXI Hack

Reset the Evaluation Trial to 60 days again.
Works on ESXI 8.
### Preparation
You can activate the SSH service. Actions > Services > Enable Secure Shell (SSH). SSH to your ESXI Machine.
```bash
ssh [username]@[ip_server]
```

Go to the vmware directory.
```bash
cd /etc/vmware/

```

Remove or backup your old license configuration.
```bash
rm -f license.cfg
#or 
mv license.{cfg,cfg.old}
```

Copy the default configuration and restart.
```bash
cp .#license.cfg license.cfg
/etc/init.d/vpxa restart
```

Or just copy this all
```
rm -f /etc/vmware/license.cfg
cp /etc/vmware/.#license.cfg /etc/vmware/license.cfg
/etc/init.d/vpxa restart
```

Voila!
![ESXI 60 Days License](./img/esxi_license_60days.png)

Don't forget to disable the SSH service. Actions > Services > Disable Secure Shell (SSH).