---
title: Changing Rocky Linux Repository to a Custom Mirror
sidebar_position: 1
---

# Changing Rocky Linux Repository to a Custom Mirror

:::warning IMPORTANT
This guide involves modifying core system package management files. **A misconfiguration can prevent your system from installing or updating software.** While not as immediately locking as a firewall, a broken DNF can significantly impact your server's functionality. Proceed with caution and ensure you have a way to manually edit files if `dnf` becomes unresponsive.
:::

## Core Principle

The strategy involves:
1.  **Backup Existing Configuration:** Always save your current repository files so you can easily revert if needed.
2.  **Identify Mirror Structure:** Determine the exact path structure (e.g., capitalization, presence of `/os/`) of the custom mirror for `BaseOS`, `AppStream`, and `extras`.
3.  **Create New Repository File:** Configure a new `.repo` file with the custom mirror's details.
4.  **Verify & Clean:** Confirm `dnf` can use the new mirror and clean its cache.

## Preparation

Before you begin, gather the following information and ensure you have the necessary components:

*   **Rocky Linux Host:** Your Rocky Linux server.
*   **Root/Sudo Access:** You will need `sudo` or direct root access for file modifications.
*   **Custom Mirror URL:** The base URL of the mirror you wish to use (e.g., `https://rocky-linux-asia-southeast2.production.gcp.mirrors.ctrliq.cloud/pub/rocky`).
*   **Internet Connectivity:** Ensure your server has active internet access to reach the mirror.

### Find a Custom Mirror URL

Use the official Rocky Linux MirrorManager to find a mirror closest to your server's location:

- Rocky Linux MirrorManager: https://mirrors.rockylinux.org/mirrormanager/

Tip: Prefer geographically close HTTPS mirrors and confirm they host your Rocky major version and architecture.

### Identify Your Rocky Linux Version and Architecture

This information is crucial for constructing the correct mirror paths and GPG key location.

1.  **Get Major OS Version:**
    ```bash
    grep '^VERSION_ID=' /etc/os-release | cut -d'=' -f2 | cut -d'.' -f1 | tr -d '"'
    ```
    *   **Mark this down as `YOUR_ROCKY_VERSION`** (e.g., `9`).

2.  **Get System Architecture:**
    ```bash
    uname -i
    ```
    *   **Mark this down as `YOUR_ARCHITECTURE`** (e.g., `x86_64`, `aarch64`).

3.  **Confirm GPG Key Path:**
    Verify the existence of your Rocky Linux GPG key. It's usually `RPM-GPG-KEY-Rocky-X` where X is your major version.
    ```bash
    ls -l /etc/pki/rpm-gpg/RPM-GPG-KEY-Rocky-YOUR_ROCKY_VERSION
    ```
    *   **Mark this down as `YOUR_GPG_KEY_FILE`** (e.g., `/etc/pki/rpm-gpg/RPM-GPG-KEY-Rocky-9`).
    *   If this file is missing, you may need to install the appropriate `rocky-release` package or manually place the GPG key.

### Explore the Custom Mirror's Structure

This is a **critical step** as mirror structures vary. You need to understand how the mirror organizes `BaseOS`, `AppStream`, and `extras` for your specific `YOUR_ROCKY_VERSION` and `YOUR_ARCHITECTURE`.

1.  **Open in Browser:** Navigate to your mirror's base URL in a web browser, followed by `YOUR_ROCKY_VERSION`.
    *   Example: `https://rocky-linux-asia-southeast2.production.gcp.mirrors.ctrliq.cloud/pub/rocky/9/`

2.  **Identify Repository Directories:** Look for directories like `BaseOS/`, `AppStream/`, `extras/`, etc. **Pay close attention to capitalization** (e.g., `extras` vs. `Extras`).

3.  **Check for `/os/` subdirectory:** For each main repository (e.g., `BaseOS`), click into it, then into `YOUR_ARCHITECTURE/` (e.g., `x86_64/`). Observe if there's an `os/` subdirectory containing `repodata/`.
    *   **Example 1 (requires `/os/`):** `YOUR_MIRROR_BASE/YOUR_ROCKY_VERSION/BaseOS/YOUR_ARCHITECTURE/os/repodata/`
    *   **Example 2 (no `/os/`):** `YOUR_MIRROR_BASE/YOUR_ROCKY_VERSION/BaseOS/YOUR_ARCHITECTURE/repodata/`

4.  **Mark down the full, correct `baseurl` path** for each desired repository. These will be used in your new `.repo` file.
    *   **`BASEOS_MIRROR_URL`** (e.g., `https://rocky-linux-asia-southeast2.production.gcp.mirrors.ctrliq.cloud/pub/rocky/9/BaseOS/x86_64/os/`)
    *   **`APPSTREAM_MIRROR_URL`** (e.g., `https://rocky-linux-asia-southeast2.production.gcp.mirrors.ctrliq.cloud/pub/rocky/9/AppStream/x86_64/os/`)
    *   **`EXTRAS_MIRROR_URL`** (e.g., `https://rocky-linux-asia-southeast2.production.gcp.mirrors.ctrliq.cloud/pub/rocky/9/extras/x86_64/os/`)

## Phase 1: Backup & Configure New Repository

### 1. Access Your Rocky Linux Host

Use SSH or your preferred method to get a command-line interface.

```bash
ssh your_user@your_server_ip
```

### 2. Create a Backup Directory for Old Repositories

```bash
sudo mkdir -p /etc/yum.repos.d/backup_$(date +%Y%m%d%H%M%S)
```
*   **Mark this down as `YOUR_BACKUP_DIR`** (e.g., `/etc/yum.repos.d/backup_20250910103000`). This is where your original repository files will be moved.

### 3. Backup and Remove Existing Repository Files

This step moves all existing `.repo` files out of the active DNF configuration directory, ensuring a clean slate for your new custom mirror.

```bash
sudo mv /etc/yum.repos.d/*.repo YOUR_BACKUP_DIR/
```
Verify the files have moved, and `/etc/yum.repos.d/` is now clean:
```bash
ls -l /etc/yum.repos.d/
ls -l YOUR_BACKUP_DIR/
```
`/etc/yum.repos.d/` should ideally now only contain the `YOUR_BACKUP_DIR` itself, not any `.repo` files directly.

### 4. Create the New Custom Repository File

Now, create a new `.repo` file using the specific URLs and GPG key path you identified earlier.

```bash
sudo vi /etc/yum.repos.d/custom-mirror.repo
```

**Paste the following content, carefully replacing the placeholder URLs and file paths with your actual identified mirror paths and GPG key path:**

```ini
[baseos]
name=Rocky Linux $releasever - BaseOS - Custom Mirror
baseurl=YOUR_BASEOS_MIRROR_URL
gpgcheck=1
enabled=1
gpgkey=file://YOUR_GPG_KEY_FILE
metadata_expire=6h

[appstream]
name=Rocky Linux $releasever - AppStream - Custom Mirror
baseurl=YOUR_APPSTREAM_MIRROR_URL
gpgcheck=1
enabled=1
gpgkey=file://YOUR_GPG_KEY_FILE
metadata_expire=6h

[extras]
name=Rocky Linux $releasever - Extras - Custom Mirror
baseurl=YOUR_EXTRAS_MIRROR_URL
gpgcheck=1
enabled=1
gpgkey=file://YOUR_GPG_KEY_FILE
metadata_expire=6h

# --- Optional Repositories (uncomment and verify paths if needed) ---
# Check your mirror's structure for these. Adjust BaseOS/AppStream/extras
# capitalization and the presence of '/os/' as necessary.

#[powertools]
#name=Rocky Linux $releasever - PowerTools - Custom Mirror
#baseurl=YOUR_MIRROR_BASE_URL/$releasever/PowerTools/$basearch/os/ # Example path; adjust as needed
#gpgcheck=1
#enabled=0
#gpgkey=file://YOUR_GPG_KEY_FILE
#metadata_expire=6h

#[resilientstorage]
#name=Rocky Linux $releasever - ResilientStorage - Custom Mirror
#baseurl=YOUR_MIRROR_BASE_URL/$releasever/ResilientStorage/$basearch/os/ # Example path; adjust as needed
#gpgcheck=1
#enabled=0
#gpgkey=file://YOUR_GPG_KEY_FILE
#metadata_expire=6h
```
*   **Remember to replace:**
    *   `YOUR_BASEOS_MIRROR_URL`
    *   `YOUR_APPSTREAM_MIRROR_URL`
    *   `YOUR_EXTRAS_MIRROR_URL`
    *   `YOUR_GPG_KEY_FILE`
    *   If including optional repos, `YOUR_MIRROR_BASE_URL` with the beginning of your mirror path.

### 5. Clean DNF Cache

This forces DNF to re-read all repository configurations and download new metadata from your configured mirror.

```bash
sudo dnf clean all
```

### 6. Verify New Repository Configuration (CRITICAL STEP)

It's crucial to confirm that DNF recognizes and can successfully access your new custom mirror.

```bash
sudo dnf repolist
```
*   You should see your new "Custom Mirror" repositories listed (e.g., "Rocky Linux 9 - BaseOS - Custom Mirror").
*   Look carefully for any `Error:` messages. If you see errors like "Failed to download metadata" or "repomd.xml parser error," it indicates an issue with the `baseurl` paths in your `custom-mirror.repo` file.

Now, attempt to check for updates. This performs a more thorough test by trying to download actual package metadata.
```bash
sudo dnf update --refresh
```
*   This command should execute without errors. If it fails or shows repository-related errors, immediately stop and follow the "Recovery Procedure" below.
*   If it lists available updates, it means the mirror is working correctly. You can then choose to apply the updates or not.

## Recovery Procedure (If DNF Breaks)

If `dnf update` or `dnf repolist` fails catastrophically after these changes (e.g., "Error: Cannot find a valid baseurl for repo", "metadata download failed"), follow these steps:

1.  **Access Your Rocky Linux Host:** Use SSH or direct console access.
2.  **Open Command Shell:** Get a root shell.
3.  **Restore Original Repository Configuration:**
    ```bash
    # Rename the problematic custom configuration file
    sudo mv /etc/yum.repos.d/custom-mirror.repo /etc/yum.repos.d/custom-mirror.repo.bad

    # Move your original working backup files back into the active DNF directory
    # Replace YOUR_BACKUP_DIR with the actual backup directory name
    sudo mv YOUR_BACKUP_DIR/*.repo /etc/yum.repos.d/

    # Clean DNF cache to pick up the original files
    sudo dnf clean all
    ```
4.  **Verify Access:**
    ```bash
    sudo dnf repolist
    sudo dnf update --refresh
    ```
    This should now work with your original, default repositories.
5.  **Troubleshoot:** Carefully review your custom mirror URL, its observed directory structure, and the paths you entered in your `custom-mirror.repo` file. Pay extremely close attention to capitalization and the presence/absence of `/os/` in the paths. Correct any errors, then retry the configuration steps.
