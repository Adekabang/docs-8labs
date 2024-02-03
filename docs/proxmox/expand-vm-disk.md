---
title: Expand Disk on VM
sidebar_position: 3
---

# Expand Disk on VM
Example OS: Ubuntu

Make sure to adjust the LV, PV, dev name before run the command.

Resize the file system in UI, under VM -> Hardware -> Click on the disk to resize, click "Resize disk" button.

Confirm increase in disk space (1TB in my case):
```bash
lsblk
```
Output:
```bash
NAME                      MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda                         8:0    0    1T  0 disk
├─sda1                      8:1    0    1M  0 part
├─sda2                      8:2    0    1G  0 part /boot
└─sda3                      8:3    0    1T  0 part
  └─ubuntu--vg-ubuntu--lv 253:0    0   31G  0 lvm  /
```
Resize the partition
```bash
sudo parted
```
Output:
```bash
GNU Parted 3.3
Using /dev/sda
Welcome to GNU Parted! Type 'help' to view a list of commands.
(parted) resizepart 3 100%
(parted) quit
Information: You may need to update /etc/fstab.
```

Extend the logical volume now
```bash
sudo lvextend -r -l +100%FREE /dev/mapper/ubuntu--vg-ubuntu--lv
```
Output:
```bash
  Size of logical volume ubuntu-vg/ubuntu-lv changed from <31.00 GiB (7935 extents) to 1.03 TiB (270079 extents).
  Logical volume ubuntu-vg/ubuntu-lv successfully resized.
resize2fs 1.45.5 (07-Jan-2020)
Filesystem at /dev/mapper/ubuntu--vg-ubuntu--lv is mounted on /; on-line resizing required
old_desc_blocks = 4, new_desc_blocks = 132
The filesystem on /dev/mapper/ubuntu--vg-ubuntu--lv is now 276560896 (4k) blocks long.
```

Resize the physical volume (may or may not need)
```bash
sudo pvresize /dev/sda3
```
Output:
```bash
Physical volume "/dev/sda3" changed
1 physical volume(s) resized or updated / 0 physical volume(s) not resized
```

Confirm resize complete
```bash
$ lsblk
```
Output:
```bash
NAME                      MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda                         8:0    0    1T  0 disk
├─sda1                      8:1    0    1M  0 part
├─sda2                      8:2    0    1G  0 part /boot
└─sda3                      8:3    0    1T  0 part
  └─ubuntu--vg-ubuntu--lv 253:0    0    1T  0 lvm  /
```

Reference: [link](https://gist.github.com/gjrdiesel/4e93d8743b71babb58dcba4ee049247c)