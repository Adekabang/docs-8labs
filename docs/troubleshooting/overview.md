---
sidebar_position: 0
---

# Troubleshooting

Common issues and their solutions.

## Connection Issues

### Can't SSH into my Virtual Lab

- Make sure the Virtual Lab is **running** (not stopped)
- Verify you're using the correct IP address from the Cloud Panel
- Check that your SSH key or password is correct
- See the [Accessing Virtual Labs](/docs/getting-started/accessing-virtual-labs) guide

### Permission denied (publickey)

This usually means your SSH key isn't properly set up. Try:
1. Generate a new key: `ssh-keygen -t ed25519`
2. Add it to your Virtual Lab via the Cloud Panel
3. Ensure correct permissions: `chmod 600 ~/.ssh/id_ed25519`

## Performance

### Virtual Lab feels slow

- Check resource usage with `htop` or `top`
- Consider upgrading to a higher plan if you need more resources
- Some operations (first boot, system updates) are naturally slower

## Docker Issues

### Docker won't start on IPv6-only VPS

See our dedicated guide: [Install Docker and Enable IPv6](/docs/getting-started/install-docker-ipv6)

:::note Still stuck?
If these solutions don't help, reach out to our support team through the Client Panel.
:::
