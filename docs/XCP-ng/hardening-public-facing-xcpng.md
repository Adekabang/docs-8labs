---
title: Hardening Public-Facing XCP-ng with OPNsense & WireGuard
sidebar_position: 1
---

# Hardening Public-Facing XCP-ng with OPNsense & WireGuard

:::warning NOT TESTED YET
This tutorial has not been tested in any XCP-ng version. Please proceed carefully, as it is not production-ready.
:::

This guide outlines a robust method for securing a public-facing XCP-ng hypervisor by routing all management traffic through a WireGuard VPN tunnel on an OPNsense firewall VM. This minimizes the attack surface on the XCP-ng host itself.

:::danger IMPORTANT DISCLAIMER
This setup is highly restrictive. **You MUST have out-of-band console access (e.g., IPMI, iLO, DRAC, SOL) to your XCP-ng host.** This is your only lifeline if you inadvertently lock yourself out. Test your console access thoroughly before proceeding.
:::

## Core Principle

The strategy involves:
1.  **Dedicated Firewall VM:** Deploying an OPNsense VM on the XCP-ng host.
2.  **WireGuard VPN:** Configuring WireGuard on OPNsense to serve as your secure management access point.
3.  **Strict `iptables` on XCP-ng:** Configuring the XCP-ng host's firewall to *only* accept management traffic from the public IP address of your OPNsense VM.

## Preparation

Before you begin, gather the following information and ensure you have the necessary components:

*   **XCP-ng Host:** Your XCP-ng server with a public IP address.
*   **Console Access:** Confirmed working IPMI/KVM/SOL access to your XCP-ng host.
*   **Public IP Addresses:** At least two public IPv4 addresses (one for XCP-ng management, others for VMs routed through your OPNsense VM).
*   **OPNsense ISO:** Download the latest OPNsense ISO for VM installation.
*   **XOA Access:** Ensure you have Xen Orchestra Appliance (XOA) access to manage your XCP-ng environment.

### Identify Your XCP-ng Management WAN IP

This is the public IPv4 address currently assigned to your XCP-ng host, which you typically use for SSH, XOA, or XenCenter access.
*   **Mark this down as `YOUR_XCPNG_MANAGEMENT_IP`.**

## Phase 1: OPNsense VM & Network Setup

### 1. Deploy OPNsense Firewall VM

1.  In XOA, create a new VM for OPNsense.
2.  **Configure VM Autostart:** For the OPNsense VM, ensure **"Auto power on"** is enabled in its settings. This is crucial so your firewall and VPN come up automatically with the hypervisor.
3.  **Install Guest Utilities:** Install appropriate guest utilities within the OPNsense VM after installation.
4.  **Disable TX Checksum Offloading:** Within OPNsense, navigate to **Interfaces > [WAN Interface] > Hardware Offloading** and disable checksum offloading if experiencing network issues.

### 2. Create an Internal Network in XCP-ng

1.  In XOA, go to **Networking** and create a **new internal-only network**.
2.  **Mark this down as `internal_network`**. This will be used for communication between OPNsense and other VMs that will be behind the firewall.

### 3. Configure Network Interfaces for OPNsense VM

Attach two network interfaces to your OPNsense VM:

1.  **WAN Interface:**
    *   Connect this to the physical network interface on your XCP-ng host that handles your `YOUR_XCPNG_MANAGEMENT_IP`.
    *   Assign a **vMAC** to this interface if your cloud provider (e.g., OVH) requires it for additional public IPs.
    *   Configure this interface in OPNsense to obtain its public IP (`YOUR_XCPNG_MANAGEMENT_IP`) via DHCP or static assignment.
    *   **Mark this down as `YOUR_FIREWALL_WAN_IP`** (this will be the same as `YOUR_XCPNG_MANAGEMENT_IP` in many setups).

2.  **LAN Interface:**
    *   Connect this to the `internal_network` you created in XCP-ng.
    *   Configure this interface in OPNsense with a static private IP address (e.g., `10.0.0.1/24`). This will be the gateway for your other VMs.

### 4. Configure WireGuard VPN on OPNsense

1.  Log into your OPNsense web interface.
2.  Navigate to **VPN > WireGuard**.
3.  **Create a new Local Configuration (Server):**
    *   Generate a key pair.
    *   Assign a **tunnel address** (e.g., `10.8.0.1/24`).
    *   Configure a **Listen Port** (e.g., `51820`).
    *   Enable the WireGuard instance.
4.  **Add a Peer for Your Client Machine:**
    *   Generate a key pair for your client.
    *   Enter the public key of your client.
    *   For **"Allowed IPs"**, it's crucial to include:
        *   Your WireGuard tunnel network (e.g., `10.8.0.0/24`).
        *   **`YOUR_XCPNG_MANAGEMENT_IP/32`** (replace with your actual IP). This routes management traffic for the hypervisor through the VPN.
        *   Any other networks you need to access behind OPNsense (e.g., `10.0.0.0/24` for the LAN network).
5.  **Assign WireGuard as a New Interface:**
    *   Go to **Interfaces > Assignments**, add a new interface for your WireGuard tunnel (e.g., `WG0`).
    *   Enable and configure this new interface.
6.  **Add Firewall Rules on OPNsense:**
    *   **WAN Interface Rules:** Add a rule to allow incoming **UDP** traffic on your WireGuard Listen Port (e.g., `51820`) from `any` source.
    *   **WireGuard Interface (WG0) Rules:** Add rules to allow outgoing traffic from your WireGuard clients to `YOUR_XCPNG_MANAGEMENT_IP` (and any other internal resources you need to access).
    *   **LAN Interface Rules:** Ensure traffic can flow between your LAN network and the WireGuard network if your VMs need to interact with VPN clients.

### 5. Configure WireGuard Client on Your Administrative Machine

1.  Install the WireGuard client on your administrative machine (laptop, workstation).
2.  Create a new tunnel configuration with the following:
    *   **Private Key:** Your client's private key (generated in OPNsense or separately).
    *   **Address:** An IP within your WireGuard tunnel network (e.g., `10.8.0.2/32`).
    *   **DNS:** (Optional) Set your preferred DNS server if you want internet access through the VPN.
    *   **Peer (OPNsense Server):**
        *   **Public Key:** The public key of your OPNsense WireGuard server.
        *   **Endpoint:** `YOUR_FIREWALL_WAN_IP:51820` (replace with your public IP and WireGuard port).
        *   **Allowed IPs:**
            *   **`YOUR_XCPNG_MANAGEMENT_IP/32`** (replace with actual IP).
            *   `10.8.0.0/24` (your WireGuard tunnel network).
            *   `10.0.0.0/24` (your OPNsense LAN network, if needed).
            *   *(Optional)* `0.0.0.0/0` to route *all* traffic through the VPN.

### 6. Verify VPN Connectivity to XCP-ng (CRITICAL STEP)

**Before making any `iptables` changes on the XCP-ng host:**

1.  **Connect** to the WireGuard VPN on your client machine.
2.  **Test Access:**
    *   Ping `YOUR_XCPNG_MANAGEMENT_IP`.
    *   Attempt to SSH to `YOUR_XCPNG_MANAGEMENT_IP`.
    *   Access XOA/XenCenter in your browser using `YOUR_XCPNG_MANAGEMENT_IP`.
    *   Confirm all these actions are successful *only when the VPN is connected*.
3.  **Disconnect** from your VPN.
4.  **Test Blocked Access:** Repeat the ping, SSH, and XOA/XenCenter attempts. **You should NOT be able to reach the XCP-ng host's management interface.** If you can, there's an issue with your OPNsense or WireGuard routing, and you must resolve it before proceeding.

## Phase 2: Hardening XCP-ng Host `iptables`

Once you've confirmed VPN connectivity and that access without the VPN is blocked (due to OPNsense routing), you can lock down the XCP-ng host's firewall using `iptables`.

### 1. SSH into XCP-ng Host (via WireGuard VPN)

```bash
ssh root@YOUR_XCPNG_MANAGEMENT_IP
```

### 2. Backup Current `iptables` Configuration

This is your most important recovery step!

```bash
cp /etc/sysconfig/iptables /etc/sysconfig/iptables.backup
```

### 3. Edit `iptables` Configuration

Open `/etc/sysconfig/iptables` with a text editor.

```bash
vi /etc/sysconfig/iptables
```

### 4. Apply the Hardened `iptables` Configuration

**Replace the *entire* content of `/etc/sysconfig/iptables` with the following.**

**Remember to replace `YOUR_FIREWALL_WAN_IP/32` with the actual public IP address of your OPNsense VM (e.g., `192.0.2.10/32` for a single IP).**

```iptables
# Generated by XCP-ng Hardening Guide (2025) - Adapted for OPNsense & WireGuard
# This configuration restricts all incoming management traffic to the OPNsense WAN IP.
*filter
:INPUT DROP [0:0]           # CRITICAL: Default policy for incoming traffic is DROP
:FORWARD DROP [0:0]          # CRITICAL: Default policy for forwarded traffic is DROP
:OUTPUT ACCEPT [0:0]         # Allow all outbound traffic (can be further hardened if needed)

# Custom chains for managing incoming traffic
:RH-Firewall-1-INPUT - [0:0]
:xapi-INPUT - [0:0]         # For specific XAPI related ports

# Jump to custom chains for INPUT and FORWARD processing
-A INPUT -j xapi-INPUT
# Allow GRE protocol, if used by your provider/network setup
# -A INPUT -p gre -j ACCEPT  
-A INPUT -j RH-Firewall-1-INPUT
-A FORWARD -j RH-Firewall-1-INPUT

# --- ESSENTIAL LOCAL TRAFFIC ---
# Allow loopback interface traffic
-A RH-Firewall-1-INPUT -i lo -j ACCEPT

# Allow established and related connections (replies to outbound traffic, etc.)
-A RH-Firewall-1-INPUT -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT

# DHCP for host internal networks (assuming xenapi is an internal XCP-ng interface)
-A RH-Firewall-1-INPUT -i xenapi -p udp -m udp --dport 67 -j ACCEPT

# --- RESTRICTED ADMINISTRATIVE ACCESS (from YOUR_FIREWALL_WAN_IP) ---
# Allow ICMP (ping) for basic connectivity checks, only from your OPNsense WAN IP
-A RH-Firewall-1-INPUT -s YOUR_FIREWALL_WAN_IP/32 -p icmp -m icmp --icmp-type any -j ACCEPT

# Allow SSH access (Port 22 TCP), only from your OPNsense WAN IP
-A RH-Firewall-1-INPUT -s YOUR_FIREWALL_WAN_IP/32 -p tcp -m conntrack --ctstate NEW -m tcp --dport 22 -j ACCEPT

# Allow XOA/XenAPI (HTTPS Port 443 TCP) access, only from your OPNsense WAN IP
-A RH-Firewall-1-INPUT -s YOUR_FIREWALL_WAN_IP/32 -p tcp -m conntrack --ctstate NEW -m tcp --dport 443 -j ACCEPT

# Optional: Allow XOA/XenAPI (HTTP Port 80 TCP) access, only if strictly necessary and from your OPNsense WAN IP
# -A RH-Firewall-1-INPUT -s YOUR_FIREWALL_WAN_IP/32 -p tcp -m conntrack --ctstate NEW -m tcp --dport 80 -j ACCEPT

# --- XCP-ng Cluster Communication (if applicable, restricted to OPNsense WAN IP) ---
# Distributed Lock Manager (DLM) Ports - Critical for HA/Storage in a cluster
# Only allow if this host is part of a cluster AND these ports are needed over the public-facing interface.
# For standalone hosts or private cluster networks, these rules can be removed or further restricted to internal IPs.
-A RH-Firewall-1-INPUT -s YOUR_FIREWALL_WAN_IP/32 -p tcp -m tcp --dport 21064 -j ACCEPT
-A RH-Firewall-1-INPUT -s YOUR_FIREWALL_WAN_IP/32 -p udp -m multiport --dports 5404,5405 -j ACCEPT

# Linux HA heartbeat (Port 694 UDP) - If using HA, restrict to OPNsense WAN IP
# Similar to DLM, only allow if truly needed from the public-facing interface.
# -A RH-Firewall-1-INPUT -s YOUR_FIREWALL_WAN_IP/32 -p udp -m conntrack --ctstate NEW -m udp --dport 694 -j ACCEPT

# --- Additional XAPI Ports (from advanced XCP-ng configurations) ---
# These ports (6653, 6640) may be used by certain XCP-ng/XenServer versions or features.
# Only allow if you know they are required for your setup, and from your OPNsense WAN IP.
-A xapi-INPUT -s YOUR_FIREWALL_WAN_IP/32 -p tcp -m conntrack --ctstate NEW -m tcp --dport 6653 -j ACCEPT
-A xapi-INPUT -s YOUR_FIREWALL_WAN_IP/32 -p tcp -m conntrack --ctstate NEW -m tcp --dport 6640 -j ACCEPT

# Return to the calling chain (INPUT)
-A xapi-INPUT -j RETURN 

# --- DEFAULT DENY (for RH-Firewall-1-INPUT chain) ---
# Reject all other incoming traffic not explicitly allowed above, sending an ICMP error.
-A RH-Firewall-1-INPUT -j REJECT --reject-with icmp-host-prohibited
COMMIT
```

### 5. Save and Apply `iptables` Rules

```bash
systemctl restart iptables
```

### 6. Verify `iptables` Status

```bash
systemctl status iptables
```
Ensure the `iptables` service is active and running without errors.

### 7. Final Connectivity Test (via WireGuard VPN)

1.  From your client machine, ensure you are **connected** to the WireGuard VPN.
2.  Verify you can successfully:
    *   SSH to `YOUR_XCPNG_MANAGEMENT_IP`.
    *   Access XOA/XenCenter in your browser using `YOUR_XCPNG_MANAGEMENT_IP`.
3.  **CRITICAL:** **Disconnect** from your WireGuard VPN.
4.  Attempt the SSH and XOA/XenCenter connections again. **You should be completely blocked.** If you can still access the XCP-ng host, your `iptables` rules are incorrect or too permissive, and you need to troubleshoot immediately using console access.

## Recovery Procedure (If You Get Locked Out)

If you lose network access to your XCP-ng host after applying the `iptables` rules, follow these steps immediately:

1.  **Access Console:** Use your out-of-band console connection (IPMI/KVM/SOL) to your XCP-ng host.
2.  **Open Local Command Shell:** Get a root shell on the host.
3.  **Restore Backup `iptables` Configuration:**
    ```bash
    mv /etc/sysconfig/iptables /etc/sysconfig/iptables.new # Rename the problematic config
    cp /etc/sysconfig/iptables.backup /etc/sysconfig/iptables # Copy your original working backup
    systemctl restart iptables # Apply the original, more permissive rules
    ```
4.  **Verify Access:** You should now be able to SSH/XOA/XenCenter directly to your XCP-ng host (without the VPN).
5.  **Troubleshoot:** Fix the issue in your OPNsense/WireGuard setup or your `iptables` rules, and then re-apply the hardened configuration carefully.

### Reference
- [Securing cloud-based/Public DC XCP-ng installation without additional physical firewall](https://forum.level1techs.com/t/securing-cloud-based-public-dc-xcp-ng-installation-without-additional-physical-firewall/177567/3)



